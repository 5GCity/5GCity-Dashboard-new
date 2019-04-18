/**
 * ModalServiceParameters Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { Message } from 'element-react'
import axios from 'axios'
import { API_BASE_SDK } from 'config'
import PropTypes from 'prop-types'

const DEFAULT_FORM = {
  parameters_values: [],
}

const propTypes = {
  parameters_values: PropTypes.arrayOf(PropTypes.string),
}

export default kea({
  path: () => ['scenes', 'containers', 'ModalServiceParameters'],

  actions: () => ({
    getForm: () => ({ }),
    setForm : ( form ) => ({ form }),
    setValue: (key, value, index) => ({ key, value, index }),
    setValues: (values) => ({ values }),
    submitForm: (form) => ({ form }),
    submitSuccess: () => ({ }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, propTypes ,{
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, state.parameters_values[payload.index]= payload.value)
      },

      [actions.setForm]: (state, payload) => payload.form,
      [actions.submitSuccess]: () => DEFAULT_FORM,

    }],
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submitForm]: workers.publishComposer,
  }),

  workers: {
    * getForm () {
      const { setForm } = this.actions
      yield put(setForm({parameters_values:[]}))
    },

    *publishComposer() {
      try{
        const serviceId = this.props.service.id
        const parameters = yield this.get('form')
        const body = {parameter_values: parameters.parameters_values}
        let postDescriptor = yield call(axios.post,`${API_BASE_SDK}/sdk/composer/services/${serviceId}/create-descriptor`,body)
        const { status, data } = postDescriptor
        if(status === 200){
          let responseResult = yield call(axios.post,`${API_BASE_SDK}/sdk/composer/services/${data}/publish`)
          const { status } = responseResult
          if(status === 201) {
            yield call(this.props.action)
          }
        }
      }catch (error){
        yield call(this.props.action)
        Message({
          showClose: false,
          message: 'Error cannot publish',
          type: 'error'
        })
        console.log(error)
      }
    }
  }
})

