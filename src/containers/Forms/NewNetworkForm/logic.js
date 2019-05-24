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


const DEFAULT_FORM = {
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

export default kea({
  path: () => ['scenes', 'containers', 'NewNetworkForm'],

  connect: {
    props: [
      ListNewNetworksLogic, [
        'selectNetwork'
      ],
      ListSlicesLogic, [
        'slices'
      ],
    ],
    actions: [
      ListNewNetworksLogic, [
        'actionModal',
        'submit',
      ]
    ]
  },

  actions: () => ({
    setValue: (key, value) => ({ key, value }),
    setValues: (values) => ({ values }),
    setValuePorts: (key, value, index) => ({ key, value, index }),
    addPort: (index) => ({ index }),
    removePort: (index) => ({ index }),
    runInstance: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    values:[DEFAULT_FORM, PropTypes.shape(propTypes),{
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
      [actions.submitSuccess]: () => DEFAULT_FORM,
    }],

    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
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
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: workers.submitForm,
    [actions.runInstance]: workers.runInstanceWorker,
  }),

  workers: {
    * submitForm () {
      const { actionModal, runInstance } = this.actions
        console.log('entrou Submit')

        yield put(runInstance())
        yield put(actionModal())
    },

    * runInstanceWorker () {
      const values = yield this.get('values')
      const network = yield this.get('selectNetwork'),
      { actionModalError } = this.actions

      const dataRunInstance ={
          description: values.description,
          name: values.nameInstance,
          network_service_id: network.id,
          ports: values.ports,
          slic3_id: values.slice_id,
          floating_ip_required: true,
        }
        console.log(this.props)
      try {
        yield call(axios.post,`${API_BASE_URL}/network_service_instance`, dataRunInstance)
        yield call(this.props.history.push, `/network`)
      } catch(error){
        console.error(`Error ${error}`)
        yield put(actionModalError())
      }
    },
  }
})

