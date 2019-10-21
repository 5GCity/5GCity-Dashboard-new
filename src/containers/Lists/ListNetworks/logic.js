/**
 * ListNetworks Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'

/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListNetworks'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ],
    props: [
      AppLogic, [
        'keycloak'
      ]
    ]
  },

  actions: () => ({
    fetchNetworksServicesInstance: () => ({ }),
    setNetworksServices: (networks) => ({ networks }),
    actionModal: (networkSelect) => ({ networkSelect }),
    actionModalDelete: (networkSelect) => ({ networkSelect }),
    loading: () => ({ }),
    deleteNetwork: (id) => ({ id }),
    setNoData: () => ({}),
    removeNoData: () => ({}),
    reset: () => ({ }),
    setErroFecth: () => ({})
  }),

  reducers: ({ actions }) => ({
    networkServicesInstance: [null, PropTypes.array, {
      [actions.fetchNetworksServicesInstance]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networks
    }],
    modalInfo: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    modalDelete: [false, PropTypes.bool, {
      [actions.actionModalDelete]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    networkSelect: [null, PropTypes.object, {
      [actions.actionModal]: (state, payload) => payload.networkSelect,
      [actions.actionModalDelete]: (state, payload) => payload.networkSelect,
      [actions.reset]: () => null
    }],
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    networkId: [null, PropTypes.any, {
      [actions.deleteNetwork]: (state, payload) => payload.id,
      [actions.reset]: () => null
    }],
    noData: [false, PropTypes.bool, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { fetchNetworksServicesInstance, reset } = this.actions
    yield put(reset())
    yield put(fetchNetworksServicesInstance())
  },

  stop: function * () {
    const { removeNoData, removeLoadingPage } = this.actions

    yield put(removeNoData())
    yield put(removeLoadingPage())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchNetworksServicesInstance]: workers.fetchNetworks,
    [actions.deleteNetwork]: workers.deleteNetworkService
  }),

  workers: {
    * fetchNetworks () {
      const { setNetworksServices, addLoadingPage, removeLoadingPage, setNoData, setErroFecth } = this.actions
      yield put(addLoadingPage())
      try {
        let responseResult = yield call(axios.get, `${API_SLICE_MANAGEMENT}/network_service_instance`)
        const { data } = responseResult
        if (data.length > 0) {
          yield put(setNetworksServices(data))
        } else {
          yield put(setNoData())
        }
        yield put(removeLoadingPage())
      } catch (er) {
        if (er.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (er.response.status === 401) {
            const keycloak = yield this.get('keycloak')
            keycloak.logout()
          } else if (er.response.status === 404) {
            console.log(404)
            yield put(setErroFecth())
          }
        } else if (er.request) {
          // The request was made but no response was received
          // `er.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          yield put(setErroFecth())
        } else {
          // Something happened in setting up the request that triggered an er
          yield put(setErroFecth())
        }
        yield put(removeLoadingPage())
      }
    },
    * deleteNetworkService () {
      const networkId = yield this.get('networkId')
      const networkServices = yield this.get('networkServicesInstance')
      const { actionModalDelete, setNetworksServices } = this.actions
      networkServices.splice(networkServices.findIndex((i) => {
        return i.id === networkId
      }), 1)

      yield put(setNetworksServices(networkServices))
      yield put(actionModalDelete(null))
      try {
        // yield put(loading())
        yield call(axios.delete, `${API_SLICE_MANAGEMENT}/network_service_instance/${networkId}`)
      } catch (error) {
        console.error(`Error ${error}`)
        // yield put(closeModal())
        // yield put(loading())
      }
    }
  }

})
