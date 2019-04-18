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
import { getResult, changeName } from './utils'

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
    actionModalDelete: () => ({ }),
    actionModalClone: () => ({ }),
    selectService: (service, type) => ({ service, type }),
  }),

  reducers: ({ actions }) => ({
    services:[[], PropTypes.array, {
      [actions.fetchServices]: (state, payload) => null,
      [actions.setServices]: (state, payload) => payload.services,
      [actions.reset]: () => [],
    }],
    modalVisibledDelete: [false, PropTypes.bool, {
      [actions.actionModalDelete]: (state, payload) => !state,
      [actions.selectService] : (state, payload) => payload.type === 'delete' && !state,
    }],
    modalVisibledClone: [false, PropTypes.bool, {
      [actions.actionModalClone]: (state, payload) => !state,
      [actions.selectService] : (state, payload) => payload.type === 'clone' && !state,
    }],
    service: [null, PropTypes.object, {
      [actions.selectService]: (state, payload) => payload.service,
    }],
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
    [actions.deleteService]: workers.deleteService,
    [actions.cloneService]: workers.cloneService,
  }),

  selectors: ({ selectors }) => ({
    serviceList: [
      () => [selectors.services],
      (services) => (
        getResult(services)
      ),
      PropTypes.array
    ],
  }),

  workers: {
    * fetchServices () {
      const { setServices } = this.actions
      try {
        let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/composer/services`)
        const { data } = responseResult

        yield put(setServices(data))

      } catch(error){
        console.error(`Error ${error}`)
      }
    },

    * deleteService (action) {
      const { fetchServices, actionModalDelete } = this.actions
      const id = action.payload.service
      try {
        yield call(axios.delete,`${API_BASE_SDK}/sdk/composer/services/${id}`)

        yield put(fetchServices())
      } catch(error){
        console.error(`Error ${error}`)
      }
      yield put(actionModalDelete())
    },

    * cloneService (action) {
      const service = action.payload.service
      const { actionModalClone,fetchServices } = this.actions
      const services = yield this.get('services')
      try {
        const copyService = changeName(service,services)
        yield call(axios.post,`${API_BASE_SDK}/sdk/composer/services`, copyService)
        yield put(fetchServices())
      } catch(error){
        console.log(error)
      }
      yield put(actionModalClone())
    },
  }

})

