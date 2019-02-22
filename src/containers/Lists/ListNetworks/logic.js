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
    actionModalDelete: (networkSelect) => ({ networkSelect }),
    loading: () => ({ }),
    deleteNetwork: (id) => ({ id }),
    reset: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    networkServicesInstance:[[], PropTypes.array,{
      [actions.fetchNetworksServicesInstance]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networks
    }],
    modalInfo: [false, PropTypes.bool,{
      [actions.actionModal]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    modalDelete: [false, PropTypes.bool,{
      [actions.actionModalDelete]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    networkSelect: [null , PropTypes.object,{
      [actions.actionModal]: (state, payload) => payload.networkSelect,
      [actions.actionModalDelete]: (state, payload) => payload.networkSelect,
      [actions.reset]: () => null
    }],
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    loadingList: [false, PropTypes.bool, {
      [actions.loadingList]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    networkId : [null, PropTypes.object,{
      [actions.deleteNetwork]: (state, payload) => payload.id,
      [actions.reset]: () => null
    }]
  }),

  start: function * () {
    const { fetchNetworksServicesInstance, reset } = this.actions
    yield put(reset())
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
      const networkId = yield this.get('networkId'),
      networkServices = yield this.get('networkServicesInstance'),
      { actionModalDelete, setNetworksServices } = this.actions

      networkServices.splice(networkServices.findIndex((i) => {
        return i.id === networkId;
      }), 1)

      yield put(setNetworksServices(networkServices))
      yield put(actionModalDelete(null))
      try {
        //yield put(loading())
        yield call(axios.delete,`${API_BASE_URL}/slicemanagerapi/network_service_instance/${networkId}`)

      } catch(error){
        console.error(`Error ${error}`)
        //yield put(closeModal())
        //yield put(loading())
      }
    },
  }

})

