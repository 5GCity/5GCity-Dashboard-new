/**
 * ModalNewNetwork Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_URL } from 'config'
import PropTypes from 'prop-types'
//import * as Check from 'validations'

/* Logic */
import ListNewNetworksLogic from 'containers/Lists/ListNewNetworks/logic'
import ListSlicesLogic from 'containers/Lists/ListSlices/logic'


const defaults = {
  nameInstance: null,
  description: null,
  ports: [],
  slice_id:null,
}

const propTypes = {
  nameInstance: PropTypes.string,
  description: PropTypes.string,
  ports: PropTypes.arrayOf(PropTypes.string),
  slice_id: PropTypes.string,
}

const message = 'This field is required'

export default kea({
  path: () => ['scenes', 'containers', 'ModalNewNetwork'],

  connect: {
    props: [
      ListNewNetworksLogic, [
        'modalVisibled',
        'selectNetwork'
      ],
      ListSlicesLogic, [
        'slices'
      ],
    ],
    actions: [
      ListNewNetworksLogic, [
        'actionModal',
        'actionModalError',
      ],

    ]
  },


  actions: () => ({
    setValue: (key, value) => ({ key, value }),
    setValues: (values) => ({ values }),
    setValuePorts: (key, value, index) => ({ key, value, index }),
    addPort: (index) => ({ index }),
    removePort: (index) => ({ index }),
    runInstance: () => ({ }),

    submit: true,
    submitSuccess: true,
    submitFailure: true,
  }),

  reducers: ({ actions }) => ({
    values:[defaults, PropTypes.shape(propTypes),{
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, { [payload.key]: payload.value })
      },
      [actions.setValuePorts]:(state, payload) => {
        return Object.assign({}, state, state.ports[payload.index]= payload.value)
      },
      [actions.setValues]: (state, payload) => {
        return Object.assign({}, state, payload.values)
      },
      [actions.addPort]: (state, payload) => {
        return Object.assign({}, state, state.ports.push(null))
      },
      [actions.removePort]: (state, payload) => {
        return Object.assign({}, state, state.ports.splice(payload.index, 1))
      },
      [actions.submitSuccess]: () => defaults,
    }],
    isSubmitting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false,
      [actions.submitFailure]: () => false,
    }],

    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false
    }],
  }),

  selectors: ({ selectors }) => ({
    listSlices: [
      () => [selectors.slices],
      (slices) => {
        const list = []
       slices && slices.forEach(element => {
          list.push({name: element.name , value: element.id, id: element.id})
        });
        return list;
      },
      PropTypes.array
    ],
    errors: [
      () => [selectors.values],
      (values) => ({
        nameInstance: !values.nameInstance ? message : null,
        description: !values.description ? message : null,
        // ports: !values.message ? message : null,
        slice_id: !values.slice_id ? message : null
      }),
      PropTypes.object
    ],
    hasErrors: [
      () => [selectors.errors],
      (errors) => Object.values(errors).filter(k => k).length > 0,
      PropTypes.bool
    ]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: workers.submitFormWorker,
    [actions.runInstance]: workers.runInstanceWorker,
  }),

  workers: {
    * submitFormWorker () {
      const { submitSuccess, submitFailure, actionModal, runInstance } = this.actions

      // get the form data...
      const values = yield this.get('values')
      console.log('Submitting form with values:', values)

      // simulate a 1sec async request.
      // yield delay(1000)

      if (true) {
        // if the request was successful
        yield put(runInstance())
        yield put(actionModal())
        yield put(submitSuccess())
      } else {
        // if the request was Error
       // window.alert('Error')
        yield put(submitFailure())
      }
    },

    * runInstanceWorker () {
      const values = yield this.get('values'),
      network_id = yield this.get('selectNetwork'),
      { actionModalError } = this.actions,

      dataRunInstance ={
          description: values.description,
          name: values.nameInstance,
          network_service_id: network_id,
          ports: values.ports,
          slic3_id: values.slice_id
        }

      try {
        yield call(axios.post,`${API_BASE_URL}/slicemanagerapi/network_service_instance`, dataRunInstance)
        yield call(this.props.history.push, `/network`)
      } catch(error){
        console.error(`Error ${error}`)
        yield put(actionModalError())
      }
    },
  }
})

