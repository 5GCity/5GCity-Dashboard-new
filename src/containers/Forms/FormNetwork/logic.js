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
import { API_SLICE_MANAGEMENT } from 'config'
import mapValues from 'lodash/mapValues'

/* Logic */
import PanelResourceLogic from 'containers/Panel/PanelResource/logic'
import InfraManagementLogic from 'containers/InfraManagement/logic'
import AppLogic from 'containers/App/logic'

const DEFAULT_FORM = {
  name: {
    value: null
  },
  /* cidr: {
    value: null,
  },
  gwIp: {
    value: null,
  }, */
  bandwidth: {
    value: null
  },
  bandwidthUnit: {
    value: 'MB/s'
  },
  /* floatingIps: {
    value: null
  }, */
  provisionedTags: {
    array: []
  },
  tagRangeInit: {
    value: null
  },
  tagRangeEnd: {
    value: null
  }
}

const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  /* cidr: [
    Check.isRequired
  ],
  gwIp: [
    Check.isRequired
  ], */
  bandwidth: [
    Check.isRequired,
    Check.isNumber
  ],
  neutronPhyNetName: [
    Check.isRequired,
  ],
  bandwidthUnit: [

  ],
  /* floatingIps: [
    Check.isRequired,
    Check.isNumber
  ], */
  provisionedTags: [
    Check.isNumber
  ],
  tagRangeInit: [
    Check.isRequired,
    Check.isNumber
  ],
  tagRangeEnd: [
    Check.isRequired,
    Check.isNumber
  ]
}

export default kea({
  path: () => ['scenes', 'containers', 'FormNetwork'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ],
      PanelResourceLogic, [
        'submit',
        'closePanel',
        'changeEdition'
      ],
      InfraManagementLogic, [
        'fetchResources',
        'changeModalErrorStatus'
      ]
    ],
    props: [
      PanelResourceLogic, [
        'editResource'
      ]
    ]
  },

  actions: () => ({
    getForm: () => ({}),
    response: (response) => ({ response }),
    setValueProvisioned: (key, value, index) => ({ key, value, index }),
    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    addProvisionedTags: () => ({}),
    removeProvisionedTags: (index) => ({ index }),
    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.setValueProvisioned]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addProvisionedTags]: (state, payload) => {
        return Object.assign({}, state, state.provisionedTags.array.push({value: null, valid: false}))
      },
      [actions.removeProvisionedTags]: (state, payload) => Object.assign({}, state, state.provisionedTags.array.splice(payload.index, 1)),
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => {
        const form = { ...DEFAULT_FORM }
        form.provisionedTags.array = []
        return form
      }
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.response]: () => false,
      [actions.setValueProvisioned]: () => false,
      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  stop: function * () {
    const { reset, removeLoadingPage } = this.actions

    yield put(removeLoadingPage())
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submit]: workers.submit
  }),

  workers: {
    * getForm () {
      const { changeForm } = this.actions
      const resource = yield this.get('editResource')
      let setDefaultValues = { ...DEFAULT_FORM }

      if (resource.id !== 0) {
        try {
          const request = yield call(axios.get, `${API_SLICE_MANAGEMENT}/physical_network/${resource.id}`)
          const { data } = request
          setDefaultValues.name.value = data.name
          setDefaultValues.bandwidth.value = data.physicalNetworkData.quota.bandwidth.total
          /* setDefaultValues.floatingIps.value = data.physicalNetworkData.quota.floatingIps.total */
          setDefaultValues.provisionedTags.array = data.physicalNetworkData.quota.provisionedTags || []
          setDefaultValues.tagRangeInit.value = data.physicalNetworkData.quota.tagRange.init
          setDefaultValues.tagRangeEnd.value = data.physicalNetworkData.quota.tagRange.end
        } catch (er) {
          console.log(er)
          if (er.response.data) {
            // map WS return errors to form format
            // put the errors on each field and changed them to invalid
            yield put(changeForm())
          }
        }
      }
      const validForm = Check.checkValidation(setDefaultValues, VALIDATIONS).form
      yield put(changeForm(validForm))
    },
    * submit () {
      const {
        setForm,
        changeEdition,
        reset,
        fetchResources,
        closePanel,
        changeModalErrorStatus,
        removeLoadingPage,
        addLoadingPage
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const resource = yield this.get('editResource')

      // Add Loading
      yield put(addLoadingPage())

      const newPhysicalNetwork = {
        name: null,
        /* cidr: null,
        gw_ip: null, */
        physical_network_data: {
          quota: {
            bandwidth: {
              provisioned: 0,
              total: null,
              units: 'MB/s'
            },
            /* floating_ips: {
              provisioned: 0,
              total: null
            }, */
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
        return false
      } else if (!dirty && validation.invalid) {
        yield put(setForm(validation.form))
        return false
      } else if (!validation.invalid && !dirty) {
        yield put(changeEdition(null))
        yield put(reset())
      } else if (!validation.invalid && dirty) {
        // Transform object and remove uneeded state values
        let params = mapValues(form, ({ value }) => value)
        newPhysicalNetwork.name = params.name
        /* newPhysicalNetwork.cidr = params.cidr
        newPhysicalNetwork.gw_ip = params.gwIp */
        newPhysicalNetwork.physical_network_data.quota.bandwidth.total = params.bandwidth
        newPhysicalNetwork.physical_network_data.quota.bandwidth.units = params.bandwidthUnit
        /* newPhysicalNetwork.physical_network_data.quota.floating_ips.total = params.floatingIps */
        form.provisionedTags.array.forEach(tag =>
        newPhysicalNetwork.physical_network_data.quota.provisioned_tags.push(tag.value)
        )
        newPhysicalNetwork.physical_network_data.quota.tag_range.end = params.tagRangeEnd
        newPhysicalNetwork.physical_network_data.quota.tag_range.init = params.tagRangeInit
        try {
          yield call(axios.post, `${API_SLICE_MANAGEMENT}/physical_network`, newPhysicalNetwork)
          yield put(removeLoadingPage())
          yield put(fetchResources())
          yield put(closePanel())
          yield put(reset())
        } catch (error) {
          yield put(removeLoadingPage())
          if (error.request.status === 500) {
            yield put(changeModalErrorStatus({message: 'Internal Error'}))
            yield put(closePanel())
          } else if (error.request.status === 404) {
            yield put(changeModalErrorStatus({message: 'Url Not Found'}))
            yield put(closePanel())
          } else if (error.request.status === 418) {
            yield put(changeModalErrorStatus(error.response.data))
            yield put(closePanel())
          } else {
            // Something happened in setting up the request that triggered an Error
            yield put(closePanel())
          }
          yield put(reset())
        }
      }
    }
  }
})
