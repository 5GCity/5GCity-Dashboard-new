/**
 * ListNetworks Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_URL } from 'config'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from 'utils'
//import { } from './utils'

import PropTypes from 'prop-types'
//import * as Check from 'validations'


export default kea({
  path: () => ['scenes', 'containers', 'ListNetworks'],

  actions: () => ({
    fetchNetworksServices: () => ({}),
    setNetworksServices: (networks) => ({networks})
  }),

  reducers: ({ actions }) => ({
    networksServices:[[], PropTypes.array,{
      [actions.fetchNetworksServices]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networks
    }]
  }),

  start: function * () { 
    const { fetchNetworksServices } = this.actions


    yield put(fetchNetworksServices())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchNetworksServices]: workers.fetchNetworks
  }),

  workers: {
    * fetchNetworks () {
      const { setNetworksServices } = this.actions

      try {
        let responseResult = yield call(axios.get,`${API_BASE_URL}/slicemanagerapi/network_service`)
        const { data } = responseResult
        console.log(data)
        yield put(setNetworksServices(data))

      } catch(error){
        console.error(`Error ${error}`)
      }
},
  }

})

