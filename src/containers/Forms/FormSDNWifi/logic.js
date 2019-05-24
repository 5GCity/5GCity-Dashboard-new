/**
 * FormSDNWifi Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'

import PropTypes from 'prop-types'
import * as Check from 'validations'
import axios from 'axios'
import { API_BASE_URL } from 'config'
import mapValues from 'lodash/mapValues'
import { CreateForm, AddChannel } from './utils'

/* Logic */
import PanelResourceLogic from 'containers/Panel/PanelResource/logic'
import InfraManagementLogic from 'containers/InfraManagement/logic'

const DEFAULT_FORM = {
  name: {
    value: null,
  },
  channels:[{
    bandwidth: {
      value: null
    },
    number:{
      value: null
    },
    txPower:{
      value: null
    }
  }]
}

const VALIDATIONS = {
  name: [
    Check.isRequired,
  ],
  bandwidth: [
    Check.isRequired,
    Check.isNumber,
  ],
  number: [
    Check.isRequired,
    Check.isNumber,
  ],
  txPower: [
    Check.isRequired,
    Check.isNumber,
  ]
}


export default kea({
  path: () => ['scenes', 'containers', 'FormSDNWifi'],

  connect: {
    actions: [
      PanelResourceLogic, [
        'submit',
        'closePanel',
        'changeEdition',
      ],
      InfraManagementLogic, [
        'fetchResources',
      ]
    ],
    props: [
      PanelResourceLogic, [
        'editResource',
      ],
    ]
  },
  actions: () => ({
    getForm: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    change: (field) => ({ field }),
    changeChannel : (parent, key, value, index) => ({parent ,key, value, index }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    addChannel: (index) => ({ index }),
    removeChannel: (index) =>({ index }),
    reset: () => ({}),
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.object,{
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.addChannel]: (state, payload) => AddChannel(state),
      [actions.removeChannel]: (state, payload) => Object.assign({}, state, state.channels.splice(payload.index,1)),
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.changeChannel]:(state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.reset]: () => DEFAULT_FORM,
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.response]: () => false,
      [actions.setValueProvisioned]: () => false,
      [actions.error]: () => true,
      [actions.reset]: () => false
    }],
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submit]: workers.submit,
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  workers: {
    * getForm () {
      const { changeForm } = this.actions
      const resource = yield this.get('editResource')
      let setDefaultValues = { ...DEFAULT_FORM }

      if(resource.id !== 0) {
        try {
          const request = yield call(axios.get, `${API_BASE_URL}/sdn_wifi_access_point/${resource.id}`)
          const { data } = request

          setDefaultValues = CreateForm(setDefaultValues, data)
        } catch (er) {
          console.log(er)
          if (er.response.data) {
            // map WS return errors to form format
            // put the errors on each field and changed them to invalid
            yield put(changeForm(newForm))
          }
        }
      }
      const validForm = Check.checkValidation(setDefaultValues, VALIDATIONS).form
      yield put(changeForm(validForm))
    },
    * submit () {
      const {
        error,
        setForm,
        changeEdition,
        closePanel,
        fetchResources,
        reset,
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const resource = yield this.get('editResource')
      console.log(form)
      const newSDNWifi = {
          'name': null,
          'sdn_wifi_access_point_data': {
            'channels': [
            ],
          },
        location: {...resource.location}
      }

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
        yield put(changeEdition(null))
        yield put(reset())
      } else if (!validation.invalid && dirty) {
        // Transform object and remove uneeded state values
        let params = mapValues(form, ({ value }) => value)
        newSDNWifi.name = params.name
        form.channels.forEach(channel => {
          newSDNWifi.sdn_wifi_access_point_data.channels.push(
            {
              'bandwidth': channel.bandwidth.value,
              'number': channel.number.value,
              'tx_power': channel.txPower.value
            }
          )
        })
        try {
          yield call(axios.post, `${API_BASE_URL}/sdn_wifi_access_point`, newSDNWifi)
          yield put(fetchResources())
          yield put(closePanel())
          yield put(reset())
        } catch (er) {
          console.log(er)
          yield put(error([]))
        }
      }
    },
  }

})

