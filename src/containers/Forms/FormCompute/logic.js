/**
 * FormCompute Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import * as Check from 'validations'
import axios from 'axios'
import { API_SLICE_MANAGEMENT } from 'config'
import mapValues from 'lodash/mapValues'
import { NewCompute } from './utils'

/* Logic */
import PanelResourceLogic from 'containers/Panel/PanelResource/logic'
import InfraManagementLogic from 'containers/InfraManagement/logic'
import AppLogic from 'containers/App/logic'

const DEFAULT_FORM = {
  name: {
    value: null
  },
  availabilityZone: {
    value: null
  },
  cpu: {
    value: null
  },
  ram: {
    value: null
  },
  ramUnit: {
    value: 'MB'
  },
  storage: {
    value: null
  },
  storageUnit: {
    value: 'GB'
  }
}

const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  availabilityZone: [
    Check.isRequired
  ],
  cpu: [
    Check.isRequired,
    Check.isNumber
  ],
  ram: [
    Check.isRequired,
    Check.isNumber
  ],
  ramUnit: [
  ],
  storage: [
    Check.isRequired,
    Check.isNumber
  ],
  storageUnit: [
  ],
}

export default kea({
  path: () => ['scenes', 'containers', 'FormCompute'],

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
    change: (field) => ({ field }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.setValueParameters]: () => true,
      [actions.response]: () => false,
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
          const request = yield call(axios.get, `${API_SLICE_MANAGEMENT}/compute/${resource.id}`)
          const { data } = request

          setDefaultValues.name.value = data.name
          setDefaultValues.cpu.value = data.computeData.quota.cpus.total
          setDefaultValues.ram.value = data.computeData.quota.ram.total
          setDefaultValues.storage.value = data.computeData.quota.storage.total
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
        closePanel,
        reset,
        fetchResources,
        changeModalErrorStatus,
        addLoadingPage,
        removeLoadingPage
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const resource = yield this.get('editResource')

      // add Loading
      yield put(addLoadingPage())
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
        const newCompute = NewCompute
        newCompute.location = { ...resource.location }
        newCompute.name = params.name
        newCompute.compute_data.availability_zone = params.availabilityZone
        newCompute.compute_data.quota.cpus.total = params.cpu
        newCompute.compute_data.quota.ram.total = params.ram
        newCompute.compute_data.quota.ram.units = params.ramUnit
        newCompute.compute_data.quota.storage.total = params.storage
        newCompute.compute_data.quota.storage.units = params.storageUnit
        try {
          yield call(axios.post, `${API_SLICE_MANAGEMENT}/compute`, newCompute)
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
          } else {
            yield put(closePanel())
          }
        }
      }
    }
  }

})
