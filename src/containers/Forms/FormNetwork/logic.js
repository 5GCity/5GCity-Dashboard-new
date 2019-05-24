/**
 * formNetwork Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'

import PropTypes from 'prop-types'
import * as Check from 'validations'
import axios from 'axios'
import { API_BASE_URL } from 'config'
import mapValues from 'lodash/mapValues'

/* Logic */
import PanelResourceLogic from 'containers/Panel/PanelResource/logic'
import InfraManagementLogic from 'containers/InfraManagement/logic'

const DEFAULT_FORM = {
  name: {
    value: null,
  },
  bandwidth: {
    value: null
  },
  floatingIps:{
    value: null
  },
  provisionedTags:{
    array: []
  },
  tagRangeInit:{
    value: null
  },
  tagRangeEnd:{
    value: null
  },
}

const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  bandwidth: [
    Check.isRequired,
    Check.isNumber,
  ],
  floatingIps: [
    Check.isRequired,
    Check.isNumber,
  ],
  provisionedTags: [
    Check.isNumber,
  ],
  tagRangeInit: [
    Check.isRequired,
    Check.isNumber,
  ],
  tagRangeEnd: [
    Check.isRequired,
    Check.isNumber,
  ],
}

export default kea({
  path: () => ['scenes', 'containers', 'FormNetwork'],

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
        'editResource'
      ],
    ]
  },

  actions: () => ({
    getForm: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    setValueProvisioned: (key, value, index) => ({ key, value, index }),
    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    addProvisionedTags: () => ({}),
    removeProvisionedTags: (index) =>({ index }),
    reset: () => ({}),
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.object,{
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.setValueProvisioned]:(state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addProvisionedTags]: (state, payload) => {
        return Object.assign({}, state, state.provisionedTags.array.push({value:null, valid: false}))
      },
      [actions.removeProvisionedTags]: (state, payload) => Object.assign({}, state, state.provisionedTags.array.splice(payload.index,1)),
      [actions.changeForm]: (state, payload) => payload.form,
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

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submit]: workers.submit,
  }),

  workers: {
    * getForm () {
      const { changeForm } = this.actions
      const resource = yield this.get('editResource')
      let setDefaultValues = { ...DEFAULT_FORM }

      if(resource.id !== 0) {
        try {
          const request = yield call(axios.get, `${API_BASE_URL}/physical_network/${resource.id}`)
          const { data } = request
          setDefaultValues.name.value = data.name
          setDefaultValues.bandwidth.value =  data.physicalNetworkData.quota.bandwidth.total
          setDefaultValues.floatingIps.value =  data.physicalNetworkData.quota.floatingIps.total
          setDefaultValues.provisionedTags.array =  data.physicalNetworkData.quota.provisionedTags || []
          setDefaultValues.tagRangeInit.value =  data.physicalNetworkData.quota.tagRange.init
          setDefaultValues.tagRangeEnd.value =  data.physicalNetworkData.quota.tagRange.end
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
        reset,
        fetchResources,
        closePanel,
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const resource = yield this.get('editResource')
      const newPhysicalNetwork = {
        name: null,
        physical_network_data:{
          quota:{
            bandwidth: {
              provisioned: 0,
              total: null,
              units:'MB/s'
            },
            floating_ips: {
              provisioned: 0,
              total: null,
            },
            provisioned_tags: [],
            tag_range: {
              end: null,
              init: null
            }
          }
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
        newPhysicalNetwork.name = params.name
        newPhysicalNetwork.physical_network_data.quota.bandwidth.total = params.bandwidth
        newPhysicalNetwork.physical_network_data.quota.floating_ips.total = params.floatingIps
        form.provisionedTags.array.forEach(tag =>
        newPhysicalNetwork.physical_network_data.quota.provisioned_tags.push(tag.value)
        )
        newPhysicalNetwork.physical_network_data.quota.tag_range.end = params.tagRangeEnd
        newPhysicalNetwork.physical_network_data.quota.tag_range.init = params.tagRangeInit
        try {
          yield call(axios.post, `${API_BASE_URL}/physical_network`, newPhysicalNetwork)
          yield put(fetchResources())
          yield put(closePanel())
          yield put(reset())
        } catch (er) {
          console.log(er)
          if (er.response.data) {
            // map WS return errors to form format
            // put the errors on each field and changed them to invalid
          }
          yield put(error([]))
        }
      }
    },
  }
})
