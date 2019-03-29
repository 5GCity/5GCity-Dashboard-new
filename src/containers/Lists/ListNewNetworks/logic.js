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

export default kea({
  path: () => ['scenes', 'containers', 'ListNewNetworks'],

  actions: () => ({
    fetchNetworksServices: () => ({ }),
    setNetworksServices: (networkService) => ({ networkService }),
    setSelectNetwork: (network) => ({ network }),
    runInstance: () => ({ }),
    actionModal: () => ({ }),
    actionModalError: () => ({ }),
    loading: () => ({ }),

    submit: true,
    submitSuccess: true,
    submitFailure: true,
  }),

  reducers: ({ actions }) => ({
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state
    }],
    modalVisibled: [false, PropTypes.bool,{
      [actions.actionModal]: (state, payload) => !state,
      [actions.setSelectNetwork]: (state, payload) => true,
    }],
    modalError: [false, PropTypes.bool,{
      [actions.actionModalError]: (state, payload) => !state,
    }],
    selectNetwork: [null, PropTypes.string,{
      [actions.setSelectNetwork]: (state, payload) => payload.network
    }],
    networkServices: [[], PropTypes.array,{
      [actions.fetchNetworksServices]: (state, payload) => null,
      [actions.setNetworksServices]: (state, payload) => payload.networkService
    }],
    isSubmitting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false,
      [actions.submitFailure]: () => false,
    }],
  }),

  start: function * () {
    const { fetchNetworksServices } = this.actions
    yield put(fetchNetworksServices())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchNetworksServices]: workers.fetchNetworksServicesWorker,
  }),

  workers: {
    * fetchNetworksServicesWorker () {
      const { setNetworksServices } = this.actions
      try {
        let responseResult = yield call(axios.get,`${API_BASE_URL}/slicemanagerapi/network_service`)
        const { data } = responseResult
        yield put(setNetworksServices(data))

      } catch(error){
        console.error(`Error ${error}`)
      }
    },
  }

})

