/**
 * FormWifi Container Logic
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
import { formUtils } from 'utils'
import { mapValues } from 'lodash'

/* Logic */
import PanelResourceLogic from 'containers/Panel/PanelResource/logic'
import InfraManagementLogic from 'containers/InfraManagement/logic'
import AppLogic from 'containers/App/logic'

const DEFAULT_FORM = {
  channelBandwidth: {
    value: null
  },
  channelNumber: {
    value: null
  },
  txPower: {
    value: null
  }
}

const VALIDATIONS = {
  channelBandwidth: [
    Check.isRequired
  ],
  channelNumber: [
    Check.isRequired
  ],
  txPower: [
    Check.isRequired
  ]
}

export default kea({
  path: () => ['scenes', 'containers', 'FormWifi'],

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
    error: (error) => ({ error }),
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
      [actions.response]: () => false,
      [actions.reset]: () => false
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submit]: workers.submit
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

  workers: {
    * getForm () {
      const { changeForm } = this.actions
      const resource = yield this.get('editResource')
      let setDefaultValues = { ...DEFAULT_FORM }
      // fill form with values from api
      const fillForm = formUtils(setDefaultValues, resource.phy.config)
      const validForm = Check.checkValidation(fillForm, VALIDATIONS).form
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
        changeModalErrorStatus,
        removeLoadingPage,
        addLoadingPage
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const resource = yield this.get('editResource')
      // Add loading page
      yield put(addLoadingPage())

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
        try {
          yield call(axios.put, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${resource.ranId}/chunkete_topology/${resource.phy.id}/wirelessConfig`, params)
          yield put(removeLoadingPage())
          yield put(fetchResources())
          yield put(closePanel())
          yield put(reset())
        } catch (error) {
          yield put(removeLoadingPage())
          if (error.request.status === 500) {
            yield put(changeModalErrorStatus({message:error.response.data.message}))
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
        }
      }
    }
  }

})
