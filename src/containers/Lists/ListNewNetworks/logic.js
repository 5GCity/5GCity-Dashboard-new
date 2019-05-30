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

/*Logic*/
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListNewNetworks'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage',
      ],
    ],
    props:[
      AppLogic, [
        'keycloak'
      ]
    ]
  },

  actions: () => ({
    fetchNetworksServices: () => ({ }),
    setNetworksServices: (networkService) => ({ networkService }),
    setSelectNetwork: (network) => ({ network }),
    runInstance: () => ({ }),
    actionModal: () => ({ }),
    actionModalError: () => ({ }),
    loading: () => ({ }),

    submit: () => ({}),
  }),

  reducers: ({ actions }) => ({
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state,
    }],
    modalVisibled: [false, PropTypes.bool,{
      [actions.actionModal]: (state, payload) => !state,
      [actions.setSelectNetwork]: (state, payload) => true,
    }],
    modalError: [false, PropTypes.bool,{
      [actions.actionModalError]: (state, payload) => !state,
    }],
    selectNetwork: [null, PropTypes.any,{
      [actions.setSelectNetwork]: (state, payload) => payload.network,
    }],
    networkServices: [[], PropTypes.array,{
      [actions.fetchNetworksServices]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networkService
    }],
  }),

  start: function * () {
    const { fetchNetworksServices } = this.actions
    yield put(fetchNetworksServices())
  },

  stop: function * () {
    const { removeLoadingPage } = this.actions

    yield put(removeLoadingPage())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchNetworksServices]: workers.fetchNetworksServicesWorker,
  }),

  workers: {
    * fetchNetworksServicesWorker () {
      const { setNetworksServices, addLoadingPage, removeLoadingPage } = this.actions
      yield put(addLoadingPage())
      try {
        let responseResult = yield call(axios.get,`${API_BASE_URL}/network_service`)
        const { data } = responseResult
        yield put(setNetworksServices(data))
        yield put(removeLoadingPage())

      } catch(error){
        console.error(`Error ${error}`)
        yield put(removeLoadingPage())
      }
    },
  }

})

