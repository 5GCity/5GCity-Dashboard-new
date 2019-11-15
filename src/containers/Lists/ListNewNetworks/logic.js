/**
 * ListNewNetworks Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import axios from 'axios'
import { API_BASE_URL } from 'config'

/* Logic */
import AppLogic from 'containers/App/logic'
import NetworkServiceLogic from 'scenes/NetworkNew/logic'
import CatalogueLogic from 'scenes/Catalogue/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListNewNetworks'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage',
      ],
      NetworkServiceLogic, [
        'changeOrganization',
        'setOrganizations'
      ],
      CatalogueLogic, [
        'changeCatalogueOrganization',
        'setCatalogueOrganizations'
      ]
    ],
    props: [
      AppLogic, [
        'keycloak'
      ],
      NetworkServiceLogic, [
        'selectOrganization'
      ],
      CatalogueLogic, [
        'selectCatalogueOrganization'
      ]
    ]
  },

  actions: () => ({
    setNetworksServices: (networkService) => ({ networkService }),
    setSelectNetwork: (network) => ({ network }),
    runInstance: () => ({ }),
    actionModal: () => ({ }),
    actionModalError: () => ({ }),
    loading: () => ({ }),
    setErroFecth: () => ({ }),
    setNoData: () => ({ }),
    removeNoData: () => ({ }),
    submit: () => ({ })
  }),

  reducers: ({ actions }) => ({
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state
    }],
    modalVisibled: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.setSelectNetwork]: (state, payload) => true
    }],
    modalError: [false, PropTypes.bool, {
      [actions.actionModalError]: (state, payload) => !state
    }],
    selectNetwork: [null, PropTypes.any, {
      [actions.setSelectNetwork]: (state, payload) => payload.network
    }],
    networkServices: [null, PropTypes.array, {
      [actions.fetchNetworksServices]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networkService
    }],
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { setOrganizations } = this.actions

    yield put(setOrganizations())
  },

  stop: function * () {
    const { removeLoadingPage, removeNoData } = this.actions

    yield put(removeNoData())
    yield put(removeLoadingPage())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.setOrganizations]: workers.fetchNetworksServicesWorker,
    [actions.changeOrganization]: workers.fetchNetworksServicesWorker,
    [actions.changeCatalogueOrganization]: workers.fetchNetworksServices,
    [actions.setCatalogueOrganizations]: workers.fetchNetworksServices
  }),

  workers: {
    * fetchNetworksServicesWorker () {
      const { setNetworksServices, addLoadingPage, removeLoadingPage, setErroFecth, setNoData, removeNoData } = this.actions
      const organization = yield this.get('selectOrganization')
      yield put(addLoadingPage())
      yield put(removeNoData())
      try {
        if(organization === 'all'){
            let responseResult = yield call(axios.get, `${API_BASE_URL}/gw/appcat/nsd/v1/ns_descriptors`)
            const { data } = responseResult
          yield put(setNetworksServices(data))
        } else {
        let responseResult = yield call(axios.get, `${API_BASE_URL}/gw/appcat/nsd/v1/ns_descriptors?project=${organization}`)
        const { data } = responseResult

        if (data.length > 0) {
          yield put(setNetworksServices(data))
        } else {
          yield put(setNetworksServices(null))
          yield put(setNoData())
        }
      }
      yield put(removeLoadingPage())
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            const keycloak = yield this.get('keycloak')
            keycloak.logout()
          } else if (error.response.status === 404) {
            console.log(404)
            yield put(setErroFecth())
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          yield put(setErroFecth())
        } else {
          // Something happened in setting up the request that triggered an Error
          yield put(setErroFecth())
        }
        yield put(removeLoadingPage())
      }
    },
    * fetchNetworksServices () {
      const { setNetworksServices, addLoadingPage, removeLoadingPage, setErroFecth, setNoData, removeNoData } = this.actions
      const organization = yield this.get('selectCatalogueOrganization')
      yield put(addLoadingPage())
      yield put(removeNoData())
      try {
        if(organization === 'all'){
            let responseResult = yield call(axios.get, `${API_BASE_URL}/gw/appcat/nsd/v1/ns_descriptors`)
            const { data } = responseResult
          yield put(setNetworksServices(data))
        } else {
        let responseResult = yield call(axios.get, `${API_BASE_URL}/gw/appcat/nsd/v1/ns_descriptors?project=${organization}`)
        const { data } = responseResult

        if (data.length > 0) {
          yield put(setNetworksServices(data))
        } else {
          yield put(setNetworksServices(null))
          yield put(setNoData())
        }
      }
      yield put(removeLoadingPage())
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            const keycloak = yield this.get('keycloak')
            keycloak.logout()
          } else if (error.response.status === 404) {
            console.log(404)
            yield put(setErroFecth())
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          yield put(setErroFecth())
        } else {
          // Something happened in setting up the request that triggered an Error
          yield put(setErroFecth())
        }
        yield put(removeLoadingPage())
      }
    }
  }

})
