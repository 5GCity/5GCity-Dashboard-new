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
import { setCatalogue } from './utils'

/* Logic */
import AppLogic from 'containers/App/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListNewNetworks'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ],
      PageTitleOrganizationLogic, [
        'changeOrganization',
        'setOrganizations'
      ]
    ],
    props: [
      AppLogic, [
        'keycloak'
      ],
      PageTitleOrganizationLogic, [
        'selectOrganization'
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
    submit: () => ({ }),

    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    modalVisibled: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.setSelectNetwork]: (state, payload) => true,
      [actions.reset]: () => false
    }],
    modalError: [false, PropTypes.bool, {
      [actions.actionModalError]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    selectNetwork: [null, PropTypes.any, {
      [actions.setSelectNetwork]: (state, payload) => payload.network,
      [actions.reset]: () => null
    }],
    networkServices: [null, PropTypes.array, {
      [actions.fetchNetworksServices]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networkService,
      [actions.reset]: () => null
    }],
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false,
      [actions.reset]: () => false
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
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.changeOrganization]: workers.fetchNetworksWorker,
    [actions.setOrganizations]: workers.fetchNetworksWorker
  }),

  workers: {
    * fetchNetworksWorker () {
      const { setNetworksServices, addLoadingPage, removeLoadingPage, setErroFecth, setNoData, removeNoData } = this.actions
      const selectOrganization = yield this.get('selectOrganization')
      yield put(removeNoData())
      yield put(addLoadingPage())
      try {
        if (selectOrganization) {
          let responseResult = yield call(axios.get, `${API_BASE_URL}/gw/appcat/nsd/v1/ns_descriptors?project=${selectOrganization}&extraData=manoInfoIds`)
          const { data } = responseResult
          const catalogue = setCatalogue(data)
          if (catalogue.length > 0) {
          yield put(setNetworksServices(catalogue))
        } else {
          yield put(setNetworksServices(null))
          yield put(setNoData())
        }
        } else {
          yield put(setNoData())
        }
        yield put(removeLoadingPage())
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            const keycloak = yield this.get('keycloak')
            keycloak.logout()
          }
          console.error(error.response.status)
          yield put(setErroFecth())
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
