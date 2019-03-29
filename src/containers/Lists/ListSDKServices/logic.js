/**
 * ListSDKServices Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_SDK } from 'config'
import { getResult } from './utils'

import PropTypes from 'prop-types'
//import * as Check from 'validations'


export default kea({
  path: () => ['scenes', 'containers', 'ListSDKServices'],

  actions: () => ({
    fetchServices: () => ({ }),
    setServices: (services) => ({ services }),
    reset: () => ({ }),
    deleteService: (service) => ({ service }),
    cloneService: (service) => ({ service }),
  }),

  reducers: ({ actions }) => ({
    services:[[], PropTypes.array, {
      [actions.fetchServices]: (state, payload) => null,
      [actions.setServices]: (state, payload) => payload.services,
      [actions.reset]: () => [],
    }]
  }),

  start: function * () {
    const { fetchServices } = this.actions

    yield put(fetchServices())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchServices]: workers.fetchServices,
  }),

  workers: {
    * fetchServices () {
      const { setServices } = this.actions
      try {
        let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/composer/services`)
        const { data } = responseResult

        yield put(setServices(getResult(data)))

      } catch(error){
        console.error(`Error ${error}`)
      }
    },
  }

})

