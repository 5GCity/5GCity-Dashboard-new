/**
 * formSDKActions Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import {
  SetFormActions,
  DEFAULT_FORM,
  ValidationForm,
  AddAction,
  RemoveAction,
  SetNewService,
  VALIDATIONS
} from './utils'

import * as Check from 'validations'
import PropTypes from 'prop-types'

/* Logic */
import SDKContainerLogic from 'containers/SDKContainer/logic'
import ComposerFormLogic from 'containers/ComposerForm/logic'

export default kea({
  path: () => ['scenes', 'containers', 'formSDKActions'],

  connect: {
    actions: [
      ComposerFormLogic, [
        'nextStep',
        'activeStep',
        'nextButton'
      ],
      SDKContainerLogic, [
        'setServiceInfo'
      ]
    ],
    props: [
      SDKContainerLogic, [
        'serviceInfo',
        'VNFServices'
      ]
    ]
  },

  actions: () => ({
    startActions: () => ({ }),

    createForm: () => ({ }),
    setForm: (form) => ({ form }),

    change: (field, index) => ({ field, index }),

    setVNFOptions: (options) => ({ options }),
    changeVNFOptions: (options) => ({ options }),

    addAction: () => ({ }),
    removeAction: (index) => ({ index }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    formActions: [DEFAULT_FORM(), PropTypes.array, {
      [actions.change]: (state, payload) => ValidationForm(state, payload),
      [actions.addAction]: (state, payload) => AddAction(state),
      [actions.removeAction]: (state, payload) => RemoveAction(state, payload.index),
      [actions.setForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM()
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.changeVNFOptions]: () => true,
      [actions.reset]: () => false
    }],
    VNFOptions: [null, PropTypes.array, {
      [actions.setVNFOptions]: (state, payload) => payload.options
    }]
  }),

  start: function * () {
    const { startActions } = this.actions

    yield put(startActions())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.setVNFOptions]: workers.createForm,
    [actions.startActions]: workers.fetchActions,
    [actions.nextButton]: workers.addServiceInfo
  }),

  workers: {
    * addServiceInfo () {
      const { setServiceInfo, activeStep, nextStep } = this.actions
      const service = yield this.get('serviceInfo')
      const dirty = yield this.get('dirty')
      const form = yield this.get('formActions')
      // Check validations
      let isInvalid = false
      form.forEach(monitoring => {
        if (isInvalid === false) {
          const validationForm = Check.checkValidation(monitoring, VALIDATIONS)
          isInvalid = validationForm.invalid
        }
        return isInvalid
      })
      if (!dirty && isInvalid) {
        return false
      } else if (isInvalid && dirty) {
        return false
      } else {
        yield put(activeStep(3))
        const newService = SetNewService(service, form)
        yield put(setServiceInfo(newService))
        yield put(nextStep())
      }
    },

    * fetchActions () {
      const { setVNFOptions } = this.actions
      const VNF = yield this.get('VNFServices')

      yield put(setVNFOptions(VNF))
    },

    * createForm () {
      try {
        const { setForm } = this.actions
        const service = yield this.get('serviceInfo')
        const form = SetFormActions(service)
        yield put(setForm(form))
      } catch (e) {
        console.log(e)
      }
    }
  }

})
