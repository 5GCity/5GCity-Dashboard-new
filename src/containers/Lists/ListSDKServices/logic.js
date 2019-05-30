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

/*Logic*/
import AppLogic from 'containers/App/logic'


export default kea({
  path: () => ['scenes', 'containers', 'ListSDKServices'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage',
      ]
    ],
    props: [
      AppLogic, [
        'keycloak',
      ]
    ]
  },

  actions: () => ({
    fetchServices: () => ({ }),
    setServices: (services) => ({ services }),
    reset: () => ({ }),
    deleteService: (service) => ({ service }),
    cloneService: (service) => ({ service }),
    actionModalDelete: () => ({ }),
    actionModalClone: () => ({ }),
    selectService: (service, type) => ({ service, type }),
    setNoData: () => ({}),
    removeNoData: () => ({}),
    setErroFecth: () =>({}),
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
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false,
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false,
    }],
  }),

  start: function * () {
    const { fetchServices } = this.actions

    yield put(fetchServices())
  },

  stop: function * () {
    const { reset, removeNoData, removeLoadingPage } = this.actions

    yield put(removeNoData())
    yield put(reset())
    yield put(removeLoadingPage())
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
      const { setServices, addLoadingPage, removeLoadingPage, setNoData, setErroFecth } = this.actions

      //
      yield put(addLoadingPage())
      try {
        let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/composer/services`)
        const { data } = responseResult
        if(data.length > 0){
          yield put(setServices(data))
        } else {
          yield put(setNoData())
        }
        yield put(removeLoadingPage())
      } catch(err){
        console.log(err.response)
        if(err.response === undefined) { yield put(setErroFecth()) }
        if (err.response.status === 401) {
          const keycloak = yield this.get('keycloak')
          keycloak.logout()
        }
        yield put(removeLoadingPage())
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

