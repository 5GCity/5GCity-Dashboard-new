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
import { API_BASE_URL } from 'config'
import mapValues from 'lodash/mapValues'

/* Logic */
import PanelResourceLogic from 'containers/Panel/PanelResource/logic'
import InfraManagementLogic from 'containers/InfraManagement/logic'

const DEFAULT_FORM = {
  name: {
    value: null,
  },
  cpu: {
    value: null,
  },
  ram:{
    value: null,
  },
  storage:{
    value: null,
  },
}

const VALIDATIONS = {
  name: [
    Check.isRequired,
  ],
  cpu: [
    Check.isRequired,
    Check.isNumber,
  ],
  ram: [
    Check.isRequired,
    Check.isNumber,
  ],
  storage: [
    Check.isRequired,
    Check.isNumber,
  ],
}

export default kea({
  path: () => ['scenes', 'containers', 'FormCompute'],

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
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    reset: () => ({}),
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.object,{
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM,
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.setValueParameters]: () => true,
      [actions.response]: () => false,
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
          const request = yield call(axios.get, `${API_BASE_URL}/compute/${resource.id}`)
          const { data } = request

          setDefaultValues.name.value = data.name
          setDefaultValues.cpu.value =  data.computeData.quota.cpus.total
          setDefaultValues.ram.value =  data.computeData.quota.ram.total
          setDefaultValues.storage.value =  data.computeData.quota.storage.total
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
        reset,
        fetchResources,
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const resource = yield this.get('editResource')

      const newCompute = {
        name: null,
        compute_data:{
          quota:{
            cpus: {
              provisioned: 0,
              total: null
            },
            ram: {
              provisioned: 0,
              total: null,
              units: 'MB'
            },
            storage: {
              provisioned: 0,
              total: null,
              units: 'GB'
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
        newCompute.name = params.name
        newCompute.compute_data.quota.cpus.total = params.cpu
        newCompute.compute_data.quota.ram.total = params.ram
        newCompute.compute_data.quota.storage.total = params.storage
        try {
          yield call(axios.post, `${API_BASE_URL}/compute`, newCompute)
          yield put(fetchResources())
          yield put(closePanel())
          yield put(reset())
        } catch (er) {
          console.log(er)
          if (er.response.data) {
            // map WS return errors to form format
            // put the errors on each field and changed them to invalid
            yield put(changeForm(newForm))
          }
          yield put(error([]))
        }
      }
    },
  }

})

