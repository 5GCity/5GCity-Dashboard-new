/**
 * FormBasicSettings Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import {
  DEFAULT_FORM,
  VALIDATIONS,
  AddNewParameter,
  SetFormBasic,
  SetFormBasicSettings
} from './utils'

import PropTypes from 'prop-types'
import * as Check from 'validations'

/* Logic */
import SDKContainerLogic from 'containers/SDKContainer/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'
import ComposerFormLogic from 'containers/ComposerForm/logic'

export default kea({
  path: () => ['scenes', 'containers', 'FormBasicSettings'],

  connect: {
    actions: [
      SDKContainerLogic, [
        'setServiceInfo'
      ],
      ComposerFormLogic, [
        'nextButton',
        'nextStep',
        'invalidStep',
        'successStep',
        'activeStep',
        'doneButton',
        'submit'
      ]
    ],
    props: [
      PageTitleOrganizationLogic, [
        'organizations'
      ],
      SDKContainerLogic, [
        'serviceInfo'
      ],
      ComposerFormLogic, [
        'steps'
      ]
    ]
  },

  actions: () => ({
    setForm: (form) => ({ form }),

    change: (field) => ({ field }),
    changeForm: (form) => ({ form }),

    setValueParameters: (key, value, index) => ({ key, value, index }),
    addParameter: (index) => ({ index }),
    removeParameter: (index) => ({ index }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    formBasic: [DEFAULT_FORM(), PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.setValueParameters]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addParameter]: (state, payload) => Check.checkValidation(AddNewParameter(state), VALIDATIONS).form,
      [actions.removeParameter]: (state, payload) => {
        return Object.assign({}, state, state.service_parameter.array.splice(payload.index, 1))
      },
      [actions.changeForm]: (state, payload) => payload.form,

      [actions.reset]: () => DEFAULT_FORM()
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.changeForm]: () => true,
      [actions.removeParameter]: () => true,
      [actions.addParameter]: () => true,
      [actions.setValueParameters]: () => true,

      [actions.reset]: () => false
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.setServiceInfo]: workers.createForm,
    [actions.nextButton]: workers.validationForm,
    [actions.doneButton]: workers.validationFormDone
  }),

  workers: {
    * createForm () {
      try {
        const { setForm, activeStep } = this.actions
        const service = yield this.get('serviceInfo')
        const form = SetFormBasic(service)
        if (service.actions && service.actions.length > 0) {
          yield put(activeStep(2))
        }
        yield put(setForm(form))
      } catch (e) {
        console.log(e)
      }
    },
    * validationForm () {
      try {
        const {
          invalidStep,
          nextStep,
          setServiceInfo,
          successStep
        } = this.actions
        const form = yield this.get('formBasic')
        const service = yield this.get('serviceInfo')
        const dirty = yield this.get('dirty')
       // Check validations
        const validation = Check.checkValidation(form, VALIDATIONS)
        if (dirty && validation.invalid) {
          yield put(invalidStep(1))
          yield put(nextStep())
          return false
        } else if (validation.invalid && !dirty) {
          yield put(invalidStep(1))
          yield put(nextStep())
          return false
        } else {
          const newService = SetFormBasicSettings(form, service)
          yield put(successStep(1))
          yield put(setServiceInfo(newService))
          yield put(nextStep())
        }
      } catch (e) {
        console.log(e)
      }
    },
    * validationFormDone () {
      try {
        const { invalidStep, setServiceInfo, submit } = this.actions
        const form = yield this.get('formBasic')
        const service = yield this.get('serviceInfo')
        const dirty = yield this.get('dirty')
       // Check validations
        const validation = Check.checkValidation(form, VALIDATIONS)
        if (dirty && validation.invalid) {
          yield put(invalidStep(1))
          return false
        } else if (validation.invalid && !dirty) {
          yield put(invalidStep(1))
          return false
        } else {
          const newService = SetFormBasicSettings(form, service)
          yield put(setServiceInfo(newService))
          yield put(submit())
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

})
