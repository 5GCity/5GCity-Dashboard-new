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
import PropTypes from 'prop-types'


export default kea({
  path: () => ['scenes', 'containers', 'ListNetworks'],

  actions: () => ({
    fetchNetworksServicesInstance: () => ({ }),
    setNetworksServices: (networks) => ({ networks }),
    actionModal: (networkSelect) => ({ networkSelect }),
    loadingList: () => ({ }),
    loading: () => ({ }),
    deleteNetwork: (id) => ({ id }),
  }),

  reducers: ({ actions }) => ({
    networkServicesInstance:[[], PropTypes.array,{
      [actions.fetchNetworksServicesInstance]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networks
    }],
    modalVisibled: [false, PropTypes.bool,{
      [actions.actionModal]: (state, payload) => !state,
    }],
    networkSelect: [null , PropTypes.object,{
      [actions.actionModal]: (state, payload) => payload.networkSelect,
    }],
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state
    }],
    loadingList: [false, PropTypes.bool, {
      [actions.loadingList]: (state, payload) => !state
    }],
    networkId : [null, PropTypes.object,{
      [actions.deleteNetwork]: (state, payload) => payload.id
    }]
  }),

  start: function * () {
    const { fetchNetworksServicesInstance } = this.actions

    yield put(fetchNetworksServicesInstance())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchNetworksServicesInstance]: workers.fetchNetworks,
    [actions.deleteNetwork]: workers.deleteNetworkService,
  }),

  workers: {
    * fetchNetworks () {
      const { setNetworksServices, loadingList } = this.actions
      yield put(loadingList())
      try {

        let responseResult = yield call(axios.get,`${API_BASE_URL}/slicemanagerapi/network_service_instance`)
        const { data } = responseResult

        yield put(setNetworksServices(data))
        yield put(loadingList())

      } catch(error){
        console.error(`Error ${error}`)
        yield put(loadingList())
      }
    },
    * deleteNetworkService () {
      const networkId = yield this.get('networkId')
      console.log(networkId)
      try {
        //yield put(loading())
        yield call(axios.delete,`${API_BASE_URL}/slicemanagerapi/network_service_instance/${networkId}`)

        // put(loading())
        //yield put(closeModal())
      } catch(error){
        console.error(`Error ${error}`)
        //yield put(closeModal())
        //yield put(loading())
      }
    },
  }

})

