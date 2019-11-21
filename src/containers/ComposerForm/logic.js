/**
 * ComposerForm Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'

import PropTypes from 'prop-types'
import * as Check from 'validations'
import { AddNewParameter, STEPS } from './utils'
import cloneDeep from 'lodash/cloneDeep'

/* Logic */
import SDKContainerLogic from 'containers/SDKContainer/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'

const DEFAULT_FORM = {
  service_name: {
    value: null
  },
  service_access_level: {
    value: null
  },
  service_organization: {
    value: null
  },
  service_designer: {
    value: null
  },
  service_version: {
    value: null
  },
  service_license_type: {
    value: null
  },
  service_license_url: {
    value: null
  },
  service_parameter: {
    array: []
  }
}

const VALIDATIONS = {
  service_name: [
    Check.isRequired
  ],
  service_organization:[
    Check.isRequired
  ],
  service_access_level: [
    Check.isRequired
  ],
  service_designer: [
    Check.isRequired
  ],
  service_version: [
    Check.isRequired,
    Check.isVersion
  ],
  service_license_type: [
    Check.isRequired
  ],
  service_license_url: [
    Check.isRequired
  ],
  service_parameter: [
  ]
}

export default kea({
  path: () => ['scenes', 'containers', 'ComposerForm'],

  connect: {
    actions: [
      SDKContainerLogic, [
        'changeActiveTab',
        'changeSaveStatus',
        'setServiceInfo',
        'resetService'
      ],
    ],
    props: [
      PageTitleOrganizationLogic, [
        'organizations'
      ],
      SDKContainerLogic, [
       'serviceInfo'
      ]
    ]
  },

  actions: () => ({
    submit: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    setValueParameters: (key, value, index) => ({ key, value, index }),
    addParameter: (index) => ({ index }),
    removeParameter: (index) => ({ index }),

    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.setValueParameters]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addParameter]: (state, payload) => Check.checkValidation(AddNewParameter(state), VALIDATIONS).form,
      [actions.removeParameter]: (state, payload) => {
        return Object.assign({}, state, state.service_parameter.array.splice(payload.index, 1))
      },
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.setValueParameters]: () => true,
      [actions.response]: () => false,
      [actions.error]: () => true,
      [actions.reset]: () => false
    }],

    submiting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.error]: () => false,
      [actions.response]: () => false,
      [actions.reset]: () => false
    }],
    steps: [STEPS, PropTypes.array, {
      // [actions.activeStep]: (state, payload) => payload.steps,
      [actions.reset]: () => STEPS,
    }],
  }),

  stop: function * () {
    const { reset } = this.actions
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.setServiceInfo]: workers.getServiceInfo,
    [actions.submit]: workers.submit
  }),

  workers: {
    * getServiceInfo () {
      try{
      const { changeForm } = this.actions
      const form = yield this.get('serviceInfo')
      if(form){
        const setDefaultValues = cloneDeep(DEFAULT_FORM)
        // Verify if service has parameters key
        if (form.parameters) {
          setDefaultValues.service_name.value = form.name
          setDefaultValues.service_organization.value = form.sliceId
          setDefaultValues.service_access_level.value =  form.accessLevel === null ? form.accessLevel : form.accessLevel.toString()
          setDefaultValues.service_designer.value = form.designer
          setDefaultValues.service_version.value = form.version
          setDefaultValues.service_license_type.value = form.license.type
          setDefaultValues.service_license_url.value = form.license.url
          setDefaultValues.service_parameter.array = form.parameters
        } else {
          setDefaultValues.service_name.value = form.name
          setDefaultValues.service_organization.value = form.sliceId
          setDefaultValues.service_access_level.value =  form.accessLevel === null ? form.accessLevel : form.accessLevel.toString()
          setDefaultValues.service_designer.value = form.designer
          setDefaultValues.service_version.value = form.version
          setDefaultValues.service_license_type.value = form.license.type
          setDefaultValues.service_license_url.value = form.license.url
          setDefaultValues.service_parameter.array = setDefaultValues.service_parameter.array
        }

      const validForm = Check.checkValidation(setDefaultValues, VALIDATIONS).form
      yield put(changeForm(validForm))
    }
  }catch (e) {
    console.log(e)
  }
    },
    * submit (action) {
      const {
        error,
        setForm,
        changeActiveTab,
        changeSaveStatus
      } = this.actions
      const service = yield this.get('serviceInfo')
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      service.name = form.service_name.value
      service.accessLevel = form.service_access_level.value
      service.sliceId = form.service_organization.value
      service.designer = form.service_designer.value
      service.version = form.service_version.value
      service.license.type = form.service_license_type.value
      service.license.url = form.service_license_url.value
      const newArrayParameters = []
      form.service_parameter.array.length > 0 && form.service_parameter.array.forEach(element => {
        newArrayParameters.push(element.value)
      })
      service.parameters = newArrayParameters
      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)

      if (dirty && validation.invalid) {
        yield put(error([]))
        return false
      } else if (!dirty && validation.invalid) {
        yield put(setForm(validation.form))
        yield put(error([]))
        return false
      } else if (!validation.invalid && !dirty) {
        yield put(changeActiveTab('composer'))
      } else if (!validation.invalid && dirty) {
        yield put(changeActiveTab('composer'))
        yield put(changeSaveStatus(false))
      }
    }
  }

})
