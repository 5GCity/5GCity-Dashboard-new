/**
 * ListSDKOrganisation Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SDK, API_BASE_URL } from 'config'
import { FindUsers } from './utils'

import PropTypes from 'prop-types'

/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ListSDKOrganisation'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ],
    props: [
      AppLogic, [
        'keycloak',
        'userName'
      ]
    ]
  },

  actions: () => ({
    fetchSlices: () => ({ }),
    setSlices: (slices) => ({ slices }),
    setNoData: () => ({}),
    setErroFecth: () => ({}),
    modalDeleteOpen: (slice) => ({ slice }),
    modalDeleteClose: () => ({ }),
    modalInfoOpen: (slice) => ({ slice }),
    modalInfoClose: () => ({ }),
    deleteSlice: (sliceId) => ({ sliceId }),

    fetchUsers: () => ({ }),
    setUsers: (users) => ({ users }),
    setDefaultUsers: (users) => ({users}),

    setNewUsers: (newUsers) => ({ newUsers }) ,
    actionUsers:( organizationId ) => ({ organizationId }),
    addNewUsers:( organizationId, users ) => ({ organizationId, users }),
    removeUsers:( organizationId, users ) => ({ organizationId, users }),

    reset: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    slices: [null, PropTypes.array, {
      [actions.fetchFunctions]: (state, payload) => null,
      [actions.setSlices]: (state, payload) => payload.slices,
      [actions.reset]: () => []
    }],
    usersList:[null, PropTypes.array, {
      [actions.fetchFunctions]: (state, payload) => null,
      [actions.setUsers]: (state, payload) => payload.users,
      [actions.reset]: () => null
    }],
    usersSelect:[null, PropTypes.array, {
      [actions.setNewUsers]: (state, payload) => payload.newUsers,
      [actions.reset]: () => null
    }],
    usersDefaultAPI:[null, PropTypes.array, {
      [actions.modalInfoOpen]: (state, payload) => payload.slice.users,
      [actions.reset]: () => null
    }],
    errorFecth: [false, PropTypes.bool, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false
    }],
    noData: [false, PropTypes.bol, {
      [actions.fetchSlices]: () => false,
      [actions.setNoData]: () => true,
      [actions.reset]: () => false,
    }],
    modalDeleteStatus: [false, PropTypes.bool, {
      [actions.modalDeleteClose]: () => false,
      [actions.modalDeleteOpen]: () => true,
      [actions.reset]: () => false
    }],
    modalInfoStatus: [false, PropTypes.bool, {
      [actions.modalInfoClose]: () => false,
      [actions.modalInfoOpen]: () => true,
      [actions.reset]: () => false
    }],
    selectSlice: [null, PropTypes.object, {
      [actions.modalDeleteOpen]: (state, payload) => payload.slice,
      [actions.modalInfoOpen]: (state, payload) => payload.slice,
      [actions.modalInfoClose]: () => null,
      [actions.modalDeleteClose]: () => null,
      [actions.reset]: () => null
    }],
  }),

  selectors: ({ selectors }) => ({
    users: [
      () => [selectors.usersList, selectors.userName],
      (usersList, userName) => {
        const userLogin = userName.toLowerCase() === 'admin admin' ? 'admin' : userName.toLowerCase()
        const array = []
        usersList &&
        usersList.forEach(user => {
          if(userLogin === user.username){
            array.push({value: user.username, label:`${user.attributes.tenantLabel[0]}-${user.username}`, isFixed: true})
          } else {
            array.push({value: user.username, label:`${user.attributes.tenantLabel[0]}-${user.username}`, isFixed: false})
          }
        })
        return array
      },
      PropTypes.array
    ],
    usersView : [
      () => [selectors.userName],
      (userName) => userName.toLowerCase() === 'admin admin' ? true : false,
      PropTypes.bool
    ]
  }),

  start: function * () {
    const { fetchSlices, fetchUsers, setNewUsers } = this.actions

    const userName = yield this.get('userName')
    const userLogin = userName.toLowerCase() === 'admin admin' ? 'admin' : userName.toLowerCase()

    yield put(fetchSlices())
    yield put(fetchUsers())
    yield put(setNewUsers([userLogin]))

  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchSlices]: workers.fetchSlices,
    [actions.fetchUsers]: workers.fetchUsers,
    [actions.deleteSlice]: workers.deleteSlice,
    [actions.actionUsers]: workers.actionUsers,
    [actions.addNewUsers]: workers.addNewUsers,
    [actions.removeUsers]: workers.removeUsers,
  }),

  workers: {
    * fetchUsers () {
      const { setUsers } = this.actions
      try {
        let responseResult = yield call(axios.get, `${API_BASE_URL}/auth/admin/realms/5gcity/users`)
        const { data } = responseResult
        if (data.length > 0) {
          yield put(setUsers(data))
        } else {
          yield put(setUsers([]))
        }
      } catch (error) {
        yield put(setUsers([]))
      }
    },

    * fetchSlices () {
      const { setSlices, addLoadingPage, removeLoadingPage, setNoData, setErroFecth } = this.actions
      //add loading
      yield put(addLoadingPage())
      try {
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/sliceManagement/slices`)
        const { data } = responseResult
        if (data.length > 0) {
          yield put(setSlices(data))
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

    *deleteSlice (action) {
      const { fetchSlices, modalDeleteClose, setMessageError, actionModalError } = this.actions
      const id = action.payload.sliceId
      try {
        yield call(axios.delete, `${API_SDK}/sdk/sliceManagement/slices/${id}`)

        yield put(modalDeleteClose())
        yield put(fetchSlices())
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
        yield put(modalDeleteClose())
        yield put(actionModalError())
      }
    },

    * actionUsers (action) {
      const { removeUsers, addNewUsers }= this.actions
      const id = action.payload.organizationId
      const usersSelect = yield this.get('usersSelect')
      const usersDefaultAPI = yield this.get('usersDefaultAPI')
      const data = FindUsers(usersDefaultAPI, usersSelect)
      if(data.add.length > 0){
        yield put(addNewUsers(id, data.add))
      }
      if (data.remove.length > 0) {
        yield put(removeUsers(id, data.remove))
      }
    },

    * addNewUsers (action) {
      const { fetchSlices, modalInfoClose } = this.actions
      const id = action.payload.organizationId
      const newUsers = action.payload.users
      try {
        for (let index = 0; index < newUsers.length; index++) {
          const newUser = newUsers[index]
          yield call(axios.put, `${API_SDK}/sdk/sliceManagement/slices/${id}/users/${newUser.value}`)
        }
        yield put(modalInfoClose())
        yield put(fetchSlices())
      } catch (error) {
        yield put(modalInfoClose())
      }
    },

    * removeUsers (action) {
      const { fetchSlices, modalInfoClose } = this.actions
      const id = action.payload.organizationId
      const newUsers = action.payload.users
      try {
        for (let index = 0; index < newUsers.length; index++) {
          const newUser = newUsers[index]
          yield call(axios.delete, `${API_SDK}/sdk/sliceManagement/slices/${id}/users/${newUser}`)
        }
        yield put(modalInfoClose())
        yield put(fetchSlices())
      } catch (error) {
        yield put(modalInfoClose())
      }
    },
  }
})

