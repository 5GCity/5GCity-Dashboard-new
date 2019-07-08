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

/* Logic */
import SDKContainerLogic from 'containers/SDKContainer/logic'

const DEFAULT_FORM = {
  parameters_values: [],
}

const propTypes = {
  parameters_values: PropTypes.arrayOf(PropTypes.string),
}

export default kea({
  path: () => ['scenes', 'containers', 'ModalServiceParameters'],

  connect: {
    actions: [
      SDKContainerLogic , [
        'activeLoadingPublish',
      ]
    ],
    props: [
      SDKContainerLogic, [
        'serviceInfo',
        'isPublishLoading',
        'idService',
      ]
    ],
  },

  actions: () => ({
    getForm: () => ({ }),
    setForm : ( form ) => ({ form }),
    setValue: (key, value, index) => ({ key, value, index }),
    setValues: (values) => ({ values }),
    submitForm: (form) => ({ form }),
    submitSuccess: () => ({ }),

    reset: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, propTypes ,{
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, state.parameters_values[payload.index]= payload.value)
      },
      [actions.setForm]: (state, payload) => payload.form,
      [actions.submitSuccess]: () =>DEFAULT_FORM,
      [actions.reset]: () => DEFAULT_FORM,
    }],
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
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
      const { activeLoadingPublish } = this.actions
      //Loading
      yield put(activeLoadingPublish())
      try{
        const parameters = yield this.get('form')
        const service = yield this.get('serviceInfo')
        const idService = yield this.get('idService')
        const body = {parameterValues: parameters.parameters_values}
        const postPublish = yield call(axios.post,`${API_BASE_SDK}/sdk/services/service/${idService}/publish`,body)
        const { status } = postPublish
        if(status === 202){
            Message({
              showClose: false,
              message: 'Service Publish',
              type: 'success'
            })
            yield put(activeLoadingPublish())
            yield call(this.props.history.push, '/sdk/services')
            yield call(this.props.action)
        }
      }catch (error) {
        console.log(error)
        switch (error.response.status) {
          case 400:
              Message({
                showClose: false,
                message: error.response.data,
                type: 'error'
              })
            break;
            case 403:
                Message({
                  showClose: false,
                  message: error.response.data,
                  type: 'error'
                })
              break;
          default:
              Message({
                showClose: false,
                message: 'Error',
                type: 'error'
              })
            break;
        }
        yield put(activeLoadingPublish())
        yield call(this.props.action)
      }
    }
  }
})

