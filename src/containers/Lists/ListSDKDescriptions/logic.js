/**
 * ListSDKDescriptions Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SDK } from 'config'
import { Message } from 'element-react'

import PropTypes from 'prop-types'

/* Logic */
import AppLogic from 'containers/App/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'


export default kea({
  path: () => ['scenes', 'containers', 'ListSDKDescriptions'],

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
        'userName'
      ],
      PageTitleOrganizationLogic, [
        'selectOrganization'
      ]
    ]
  },

  actions: () => ({
    fetchDescriptions: () => ({ }),
    setDescriptions: (descriptions) => ({ descriptions }),
    actionDescription: (type, id) => ({ type, id }),
    selectDescription: (description, type) => ({ description, type }),
    deleteDescription: (id) => ({ id }),
    unPublishDescription: (id) => ({ id }),
    publishDescription: (id) => ({ id }),


    setNoData: () => ({ }),
    setErroFecth: () => ({ }),

    actionModal: () => ({ }),

    reset: () => ({}),
  }),

  reducers: ({ actions }) => ({
    descriptions: [null, PropTypes.array, {
      [actions.fetchDescriptions]: (state, payload) => null,
      [actions.setDescriptions]: (state, payload) => payload.descriptions,

      [actions.reset]: () => []
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.fetchDescriptions]: () => false,

      [actions.reset]: () => false
    }],
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false,
      [actions.fetchDescriptions]: () => false,
      [actions.setDescriptions]: () => false,
      [actions.reset]: () => false
    }],

    modalVisibled: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.selectDescription]: (state, payload) => !state,
    }],

    descriptionSelect: [null, PropTypes.object, {
      [actions.selectDescription]: (state, payload) => payload
    }],
  }),

  selectors: ({ selectors }) => ({
    usersView : [
      () => [selectors.userName],
      (userName) => userName.toLowerCase() === 'admin admin' ? true : false,
      PropTypes.bool
    ]
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
    [actions.changeOrganization]: workers.fetchDescriptions,
    [actions.setOrganizations]: workers.fetchDescriptions,
    [actions.fetchDescriptions]: workers.fetchDescriptions,
    [actions.actionDescription]: workers.actionDescription,
    [actions.publishDescription]: workers.publishDescription,
    [actions.unPublishDescription]: workers.unPublishDescription,
    [actions.deleteDescription]: workers.deleteDescription,
  }),

  workers: {
    * fetchDescriptions () {
      const { setDescriptions, addLoadingPage, removeLoadingPage, setNoData, setErroFecth } = this.actions
      const selectOrganization = yield this.get('selectOrganization')
      yield put(addLoadingPage())
      try {
        if(selectOrganization){
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/service_descriptor/?sliceId=${selectOrganization}`)
        const { data } = responseResult
        if (data.length > 0) {
          yield put(setDescriptions(data))
        } else {
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

    * deleteDescription (action) {
      const { fetchDescriptions, actionModal, setMessageError, actionModalError } = this.actions
      const id = action.payload.id
      try {
        yield call(axios.delete, `${API_SDK}/sdk/service_descriptor/${id}`)
        yield put(actionModal())
        yield put(fetchDescriptions())
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

    * publishDescription (action) {
      const { fetchDescriptions, actionModal, setMessageError, actionModalError } = this.actions
      const id = action.payload.id
      try {
        const data = yield call(axios.post, `${API_SDK}/sdk/service_descriptor/${id}/publish`)
        const { status } = data
        if (status === 202) {
          Message({
            showClose: false,
            message: 'Description Publish',
            type: 'success'
          })
          yield put(actionModal())
          yield put(fetchDescriptions())
        }
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
        yield put(actionModalPublish())
        yield put(actionModalError())
      }
    },

    * unPublishDescription (action) {
      const { fetchDescriptions, actionModal, setMessageError, actionModalError } = this.actions
      const id = action.payload.id
      try {
        const data = yield call(axios.post, `${API_SDK}/sdk/service_descriptor/${id}/unpublish`)
        const { status } = data
        if (status === 202) {
          Message({
            showClose: false,
            message: 'Description Unpublish',
            type: 'success'
          })
          yield put(actionModal())
          yield put(fetchDescriptions())
        }
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
        yield put(actionModalPublish())
        yield put(actionModalError())
      }
    },

    * actionDescription (action) {
      const { deleteDescription, publishDescription, unPublishDescription }= this.actions
      const id = action.payload.id
      const type = action.payload.type

      switch (type) {
        case 'delete':
          yield put(deleteDescription(id))
          break;
          case 'publish':
          yield put(publishDescription(id))
          break;
          case 'unPublish':
          yield put(unPublishDescription(id))
          break;

        default:
          break;
      }

    }
  }
})

