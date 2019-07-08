/**
 * ListSDKFunctions Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_SDK } from 'config'

import PropTypes from 'prop-types'

/*Logic*/
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListSDKFunctions'],

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
    fetchFunctions: () => ({ }),
    setFunctions: (functions) => ({ functions }),

    setNoData: () => ({}),
    setErroFecth: () =>({}),

    actionModalDelete: () => ({}),
    setMessageError: (error) => ({error}),

    selectFunc: (func, type) => ({ func, type }),

    deleteFunction: (id) => ({ id }),

    actionModalError: () => ({ }),

    reset: () => ({}),

    publishFunction: (id) => ({ id }),

    actionModalPublish: () => ({}),
  }),

  reducers: ({ actions }) => ({
    functions:[[], PropTypes.array, {
      [actions.fetchFunctions]: (state, payload) => null,
      [actions.setFunctions]: (state, payload) => payload.functions,
      [actions.reset]: () => [],
    }],
    functionSelect: [null, PropTypes.object, {
      [actions.selectFunc]: (state, payload) => payload.func,
    }],
    modalVisibledDelete: [false, PropTypes.bool, {
      [actions.actionModalDelete]: (state, payload) => !state,
      [actions.selectFunc] : (state, payload) => payload.type === 'delete' && !state,
    }],
    modalVisibledPublish: [false, PropTypes.bool, {
      [actions.actionModalPublish]: (state, payload) => !state,
      [actions.selectFunc] : (state, payload) => payload.type === 'publish' && !state,
    }],
    modalErrorMessage: [null, PropTypes.string ,{
      [actions.setMessageError]: (state, payload) => payload.error,
      [actions.reset]: () => null,
    }],
    modalErrorVisibled: [ false, PropTypes.bool ,{
      [actions.actionModalError]: (state, payload) => !state,
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false,
    }],
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false,
    }],
  }),


  start: function * () {
    const { fetchFunctions } = this.actions

    yield put(fetchFunctions())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchFunctions]: workers.fetchFunctions,
    [actions.deleteFunction]: workers.deleteFunction,
    [actions.publishFunction]: workers.publishFunction,
  }),

  workers: {
    * fetchFunctions () {
      const { setFunctions, addLoadingPage, removeLoadingPage, setNoData, setErroFecth } = this.actions
      //
      yield put(addLoadingPage())
      try {
        let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/functions/`)
        const { data } = responseResult
        if(data.length > 0){
          yield put(setFunctions(data))
        } else {
          yield put(setNoData())
        }
        yield put(removeLoadingPage())
      } catch(error){
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

    * deleteFunction (action) {
      const { fetchFunctions, actionModalDelete, setMessageError, actionModalError } = this.actions
      const id = action.payload.id
      try {
        yield call(axios.delete,`${API_BASE_SDK}/sdk/functions/${id}`)
        yield put(actionModalDelete())
        yield put(fetchFunctions())
      } catch(error){
        switch (error.response.status) {
          case 400:
            yield put(setMessageError(error.response.data))
          break;
          case 403:
            yield put(setMessageError(error.response.data))
          break;
          default:
            yield put(setMessageError('Error'))
          break;
        }
        yield put(actionModalDelete())
        yield put(actionModalError())
      }

    },
    * publishFunction (action) {
      const { fetchFunctions, actionModalPublish, setMessageError, actionModalError } = this.actions
      const id = action.payload.id
      try {
        yield call(axios.post,`${API_BASE_SDK}/sdk/functions/${id}/publish`)
        yield put(actionModalPublish())
        yield put(fetchFunctions())
      } catch(error){
        switch (error.response.status) {
          case 400:
            yield put(setMessageError(error.response.data))
          break;
          case 403:
            yield put(setMessageError(error.response.data))
          break;
          default:
            yield put(setMessageError('Error'))
          break;
        }
        yield put(actionModalPublish())
        yield put(actionModalError())
      }

    },
  }

})

