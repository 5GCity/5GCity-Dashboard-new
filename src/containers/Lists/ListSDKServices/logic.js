/**
 * ListSDKServices Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { API_SDK } from 'config'
import { getResult, changeName } from './utils'

import PropTypes from 'prop-types'
// import * as Check from 'validations'



/* Logic */
import AppLogic from 'containers/App/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListSDKServices'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ],
      PageTitleOrganizationLogic, [
        'changeOrganization',
        'setOrganizations',
      ],
    ],
    props: [
      AppLogic, [
        'keycloak',
      ],
      PageTitleOrganizationLogic, [
        'selectOrganization'
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
    setErroFecth: () => ({}),
    setMessageError: (error) => ({error}),
    actionModalError: () => ({})
  }),

  reducers: ({ actions }) => ({
    services: [null, PropTypes.array, {
      [actions.fetchServices]: (state, payload) => null,
      [actions.setServices]: (state, payload) => payload.services,
      [actions.reset]: () => []
    }],
    modalVisibledDelete: [false, PropTypes.bool, {
      [actions.actionModalDelete]: (state, payload) => !state,
      [actions.selectService]: (state, payload) => payload.type === 'delete' && !state
    }],
    modalVisibledClone: [false, PropTypes.bool, {
      [actions.actionModalClone]: (state, payload) => !state,
      [actions.selectService]: (state, payload) => payload.type === 'clone' && !state
    }],
    service: [null, PropTypes.object, {
      [actions.selectService]: (state, payload) => payload.service
    }],
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.setServices]: () => false,
      [actions.removeNoData]: () => false,
      [actions.reset]: () => false
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false
    }],
    modalErrorVisibled: [ false, PropTypes.bool, {
      [actions.actionModalError]: (state, payload) => !state
    }],
    modalErrorMessage: [null, PropTypes.string, {
      [actions.setMessageError]: (state, payload) => payload.error,
      [actions.reset]: () => null
    }]
  }),

  stop: function * () {
    const { reset, removeNoData, removeLoadingPage } = this.actions

    yield put(removeNoData())
    yield put(reset())
    yield put(removeLoadingPage())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.changeOrganization]: workers.fetchServices,
    [actions.setOrganizations]: workers.fetchServices,
    [actions.deleteService]: workers.deleteService,
    [actions.cloneService]: workers.cloneService,
    [actions.fetchServices]: workers.fetchServices,

  }),

  selectors: ({ selectors }) => ({
    serviceList: [
      () => [selectors.services],
      (services) => (
        getResult(services)
      ),
      PropTypes.array
    ]
  }),

  workers: {
    * fetchServices () {
      const { setServices, addLoadingPage, removeLoadingPage, setNoData, setErroFecth } = this.actions
      const selectOrganization = yield this.get('selectOrganization')
      yield put(addLoadingPage())
      try {
        if(selectOrganization){
          let responseResult = yield call(axios.get, `${API_SDK}/sdk/services/?sliceId=${selectOrganization}`)
          const { data } = responseResult
          if (data.length > 0) {
            yield put(setServices(data))
          } else {
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

    * deleteService (action) {
      const { fetchServices, actionModalDelete, setMessageError, actionModalError } = this.actions
      const id = action.payload.service
      try {
        yield call(axios.delete, `${API_SDK}/sdk/services/${id}`)
        yield put(actionModalDelete())
        yield put(fetchServices())
      } catch (error) {
        switch (error.response.status) {
          case 400:
            yield put(setMessageError(error.response.data))
            break
          case 403:
            yield put(setMessageError(error.response.data))
            break
          default:
            yield put(setMessageError('Error'))
            break
        }
        yield put(actionModalDelete())
        yield put(actionModalError())
      }
    },

    * cloneService (action) {
      const service = action.payload.service
      const { actionModalClone, fetchServices, actionModalError, setMessageError } = this.actions
      const services = yield this.get('services')
      try {
        const copyService = changeName(service, services)
        yield call(axios.post, `${API_SDK}/sdk/services/`, copyService)
        yield put(fetchServices())
      } catch (error) {
        if (error.response.data) {
          yield put(setMessageError(error.response.data))
        } else {
          yield put(setMessageError('Error to clone Service'))
        }
        yield put(actionModalError())
      }
      yield put(actionModalClone())
    }
  }

})
