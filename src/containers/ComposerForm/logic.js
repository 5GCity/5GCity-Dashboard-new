/**
 * ComposerForm Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from 'utils'
//import { } from './utils'

import PropTypes from 'prop-types'
// import { mapWSErrorsToForm, scrollToFirstFormError } from 'utils'
import * as Check from 'validations'

import SDKContainerLogic from 'containers/SDKContainer/logic'


const DEFAULT_FORM = {
  service_name: 'ubi_test_name', // change to null
  service_designer: 'ubi_test_VNF', // change to null
  service_version: '0.1', // change to null
  service_license_type: 'PUBLIC', // change to null
  service_license_url: 'http://www.ubiwhere.com', // change to null
  service_parameter: [],
}

const propTypes = {
  service_name: PropTypes.string,
  service_designer: PropTypes.string,
  service_version: PropTypes.string,
  service_license_type: PropTypes.string,
  service_license_url: PropTypes.string,
  service_parameter: PropTypes.arrayOf(PropTypes.any),
}

const VALIDATIONS = {
  fieldName: [
    Check.isRequired
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
    setValue: (key, value) => ({ key, value }),
    setValues: (values) => ({ values }),
    changeForm: (form) => ({ form }),
    submit: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    setValueParameters: (key, value, index) => ({ key, value, index }),
    addParameter: (index) => ({ index }),
    removeParameter: (index) => ({ index }),


    reset: () => true,
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.shape(propTypes),{
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, { [payload.key]: payload.value })
      },
      [actions.setValues]: (state, payload) => {
        return Object.assign({}, state, payload.values)
      },
      [actions.setValueParameters]:(state, payload) => {
        return Object.assign({}, state, state.service_parameter[payload.index]= payload.value)
      },
      [actions.addParameter]: (state, payload) => {
        return Object.assign({}, state, state.service_parameter.push(null))
      },
      [actions.removeParameter]: (state, payload) => {
        return Object.assign({}, state, state.service_parameter.splice(payload.index, 1))
      },

      [actions.changeForm]: (state, payload) => payload.form,
      [actions.submitSuccess]: () => DEFAULT_FORM,

      [actions.reset]: () => DEFAULT_FORM,
    }],

    dirty: [false, PropTypes.bool, {
      [actions.setValue]: () => true,
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

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },


  takeLatest: ({ actions, workers }) => ({
    [actions.getServiceInfo]: workers.getServiceInfo,
    [actions.submit]: workers.submit,
  }),

  workers: {
    * getServiceInfo () {
      const { changeForm } = this.actions
      const form = this.props.serviceData
      const setDefaultValues = {...DEFAULT_FORM}

      if('name' in form) {
        setDefaultValues.service_name = form.name
        setDefaultValues.service_designer =  form.designer
        setDefaultValues.service_version =  form.version
        setDefaultValues.service_parameter =  form.parameter
      }

      yield put(changeForm(setDefaultValues))
    },
    * submit (action) {
      const {
        error,
        response,
        setForm,
        changeForm,
        reset,
        changeActiveTab,
        changeSaveStatus,
      } = this.actions
      const service = this.props.serviceData
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      service.name = form.service_name
      service.designer = form.service_designer
      service.version = form.service_version
      service.license.type = form.service_license_type
      service.license.url = form.service_license_url
      service.parameter = form.service_parameter
      if(dirty){
        yield put(changeSaveStatus(false))
      }
      yield put(changeActiveTab('composer'))
      // Check validations
    /*   const validation = Check.checkValidation(form, VALIDATIONS)

      if (dirty && validation.invalid) {
        // try to scroll to first form field error
        // scrollToFirstFormError(validation.form)
        yield put(error([]))
        return false
      }

      if (!dirty && validation.invalid) {
        // try to scroll to first form field error
        // scrollToFirstFormError(validation.form)
        yield put(setForm(validation.form))
        yield put(error([]))
        return false
      }

      // Transform object and remove uneeded state values
      let params = mapValues(form, ({ value }) => value)

      try {
        const request = yield call(axios.post, ENDPOINT, params)
        yield put(response(request.data))
        yield put(reset())
      } catch (er) {
        if (er.response.data) {
          // map WS return errors to form format
          // put the errors on each field and changed them to invalid
          const newForm = mapWSErrorsToForm(er.response.data, form)
          yield put(changeForm(newForm))
          // try to scroll to first form field error
          scrollToFirstFormError(newForm)
        }

        yield put(error([]))
      } */
    },
  }

})

