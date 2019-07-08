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
import { AddNewParameter } from './utils'

import SDKContainerLogic from 'containers/SDKContainer/logic'



const DEFAULT_FORM = {
  service_name: {
    value: null,
  },
  service_designer: {
    value: null
  },
  service_version:{
    value: null
  },
  service_license_type:{
    value: null
  },
  service_license_url:{
    value: null
  },
  service_parameter:{
    array: [{value: null, valid: false}]
  },
}

const VALIDATIONS = {
  service_name: [
    Check.isRequired
  ],
  service_designer: [
    Check.isRequired
  ],
  service_version: [
    Check.isRequired,
    Check.isVersion,
  ],
  service_license_type: [
    Check.isRequired
  ],
  service_license_url: [
    Check.isRequired,
    Check.isValidWebsite
  ],
  service_parameter: [
    Check.isRequired,
  ],
}

export default kea({
  path: () => ['scenes', 'containers', 'ComposerForm'],

  connect: {
    actions: [
      SDKContainerLogic, [
        'changeActiveTab',
        'changeSaveStatus',
      ]
    ]
  },

  actions: () => ({
    getServiceInfo: () => ({ }),

    submit: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    setValueParameters: (key, value, index) => ({ key, value, index }),
    addParameter: (index) => ({ index }),
    removeParameter: (index) => ({ index }),

    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    reset: () => ({}),
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.object,{
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.setValueParameters]:(state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addParameter]: (state, payload) =>  Check.checkValidation(AddNewParameter(state), VALIDATIONS).form,
      [actions.removeParameter]: (state, payload) => {
        return Object.assign({}, state, state.service_parameter.array.splice(payload.index,1))
      },
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM,
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
  }),
  start: function * () {
    const { getServiceInfo } = this.actions

    yield put(getServiceInfo())
  },

  stop: function * () {
    const { reset } = this.actions
    yield put(reset())
  },

  takeEvery: ({ actions, workers }) => ({

  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.getServiceInfo]: workers.getServiceInfo,
    [actions.submit]: workers.submit,
  }),

  workers: {
    * getServiceInfo () {
      const { changeForm } = this.actions
      const form = this.props.serviceData
      const setDefaultValues = {...DEFAULT_FORM}
      setDefaultValues.service_name.value = form.name
      setDefaultValues.service_designer.value =  form.designer
      setDefaultValues.service_version.value =  form.version
      setDefaultValues.service_license_type.value =  form.license.type
      setDefaultValues.service_license_url.value =  form.license.url
      setDefaultValues.service_parameter.array =  form.parameters.length <= 0 ? setDefaultValues.service_parameter.array : form.parameters

      const validForm = Check.checkValidation(setDefaultValues, VALIDATIONS).form
      yield put(changeForm(validForm))
    },
    * submit (action) {
      const {
        error,
        setForm,
        changeActiveTab,
        changeSaveStatus,
      } = this.actions
      const service = this.props.serviceData
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      service.name = form.service_name.value
      service.designer = form.service_designer.value
      service.version = form.service_version.value
      service.license.type = form.service_license_type.value
      service.license.url = form.service_license_url.value
      const newArrayParameters = []
      form.service_parameter.array.forEach(element => {
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
    },
  }

})

