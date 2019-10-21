/**
 * ModalNewNetwork Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'
import * as Check from 'validations'
import mapValues from 'lodash/mapValues'

/* Logic */
import ListNewNetworksLogic from 'containers/Lists/ListNewNetworks/logic'
import ListSlicesLogic from 'containers/Lists/ListSlices/logic'

const DEFAULT_FORM = {
  nameInstance: {
    value: null
  },
  description: {
    value: null
  },
  ports: {
    array: [{value: null, valid: false}]
  },
  slice_id: {
    value: null
  }
}

const VALIDATIONS = {
  nameInstance: [
    Check.isRequired
  ],
  description: [
    Check.isRequired
  ],
  slice_id: [
    Check.isRequired
  ],
  ports: [
    Check.isNumber
  ]
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
    getForm: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    setValuePorts: (key, value, index) => ({ key, value, index }),
    addPort: (index) => ({ index }),
    removePort: (index) => ({ index }),
    runInstance: () => ({ }),
    reset: () => ({})

  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.setValuePorts]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addPort]: (state, payload) => {
        const copyState = {...state}
        const newValue = {value: null, valid: false}
        copyState.ports.array.push({newValue})
        return copyState
      },
      [actions.removePort]: (state, payload) => {
        const copyState = {...state}
        state.ports.array.splice(payload.index, 1)
        return copyState
      },
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => {
        const form = { ...DEFAULT_FORM }
        form.ports.array = [{value: null, valid: false}]
        return form
      }
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.response]: () => false,
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
    [actions.submit]: workers.submitForm
  }),

  workers: {
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
          network_service_id: networkSelect.id,
          ports: ports,
          slic3_id: params.slice_id,
          floating_ip_required: true
        }
        try {
          yield call(axios.post, `${API_SLICE_MANAGEMENT}/network_service_instance`, dataRunInstance)
          yield put(actionModal())
          yield put(reset())
          yield put(loading())
          yield call(this.props.history.push, `/network`)
        } catch (er) {
          if (er.response.data) {
              // map WS return errors to form format
              // put the errors on each field and changed them to invalid

          }
          yield put(actionModal())
          yield put(loading())
          yield put(actionModalError())
        }
      }
    }
  }
})
