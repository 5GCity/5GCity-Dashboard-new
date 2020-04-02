/**
 * ModalNewNetwork Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'
import * as Check from 'validations'
import mapValues from 'lodash/mapValues'
import {
  DEFAULT_FORM,
  VALIDATIONS,
  SetField,
  SetForm,
  SetPorts,
  SetComputes,
  AddPort,
  RemovePort
} from './utils'

/* Logic */
import ListNewNetworksLogic from 'containers/Lists/ListNewNetworks/logic'
import ListSlicesLogic from 'containers/Lists/ListSlices/logic'

export default kea({
  path: () => ['scenes', 'containers', 'NewNetworkForm'],

  connect: {
    props: [
      ListNewNetworksLogic, [
        'selectNetwork',
        'modalVisibled'
      ],
      ListSlicesLogic, [
        'slices'
      ]
    ],
    actions: [
      ListNewNetworksLogic, [
        'actionModal',
        'submit',
        'actionModalError',
        'loading'
      ]
    ]
  },

  actions: () => ({
    error: (error) => ({ error }),
    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    setValuePorts: (key, value, index) => ({ key, value, index }),
    addPort: (index) => ({ index }),
    removePort: (index) => ({ index }),
    runInstance: () => ({ }),
    setOptions: (options) => ({ options }),

    reset: () => ({})

  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM(), PropTypes.object, {
      [actions.change]: (state, payload) => SetField(state, payload),
      [actions.setForm]: (state, payload) => SetForm(payload.form),
      [actions.setValuePorts]: (state, payload) => SetPorts(state, payload),
      [actions.addPort]: (state, payload) => AddPort(state),
      [actions.removePort]: (state, payload) => RemovePort(state, payload.index),
      [actions.changeForm]: (state, payload) => payload.form
    }],
    computeOptions: [{disabled: true, options: []}, PropTypes.object, {
      [actions.setOptions]: (state, payload) => payload.options,
      [actions.reset]: () => ({disabled: true, options: []})
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.setValueProvisioned]: () => false,
      [actions.error]: () => true,
      [actions.reset]: () => false
    }]
  }),

  selectors: ({ selectors }) => ({
    listSlices: [
      () => [selectors.slices],
      (slices) => {
        const list = []
        slices && slices.forEach(element => {
          list.push({name: element.name, value: element.id, id: element.id})
        })
        return list
      },
      PropTypes.array
    ]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: workers.submitForm,
    [actions.change]: workers.chooseSlice,
    [actions.actionModal]: workers.statusModal
  }),

  workers: {
    * chooseSlice (action) {
      const { setOptions } = this.actions
      const slices = yield this.get('slices')
      if (Object.keys(action.payload.field)[0] === 'sliceId') {
        const computesOptions = SetComputes(action, slices)
        yield put(setOptions(computesOptions))
      }
    },

    * submitForm () {
      const { actionModal,
        error,
        setForm,
        changeEdition,
        reset,
        actionModalError,
        loading
      } = this.actions
      const form = yield this.get('form')
      const networkSelect = yield this.get('selectNetwork')
      const dirty = yield this.get('dirty')
      yield put(loading())
        // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)
      if (dirty && validation.invalid) {
        yield put(error())
        yield put(loading())
        return false
      } else if (!dirty && validation.invalid) {
        yield put(setForm(validation.form))
        yield put(error())
        yield put(loading())
        return false
      } else if (!validation.invalid && !dirty) {
        yield put(changeEdition(null))
        yield put(loading())
        yield put(reset())
      } else if (!validation.invalid && dirty) {
          // Transform object and remove uneeded state values
        let params = mapValues(form, ({ value }) => value)
        let ports = form.ports.array.map(port => port.value)
        const dataRunInstance = {
          description: params.description,
          name: params.nameInstance,
          networkServiceId: networkSelect.instanceId,
          ports: ports,
          slic3Id: params.sliceId,
          floatingIpRequired: true,
          inputNodeId: params.computeSelect,
          trusted: params.trusted
        }
        try {
          yield call(axios.post, `${API_SLICE_MANAGEMENT}/network_service_instance`, dataRunInstance)
          yield put(actionModal())
          yield put(reset())
          yield put(loading())
          yield call(this.props.history.push, `/network`)
        } catch (er) {
          yield put(actionModal())
          yield put(loading())
          yield put(actionModalError(er.response.data.message))
        }
      }
    },

    * statusModal () {
      const { reset, setForm } = this.actions
      const modalStatus = yield this.get('modalVisibled')
      if (!modalStatus) {
        yield put(setForm(SetForm(DEFAULT_FORM())))
        yield put(reset())
      }
    }
  }
})
