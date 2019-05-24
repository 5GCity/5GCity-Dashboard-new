/**
 * Main APP Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
// import axios from 'axios'
import PropTypes from 'prop-types'
import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { setAuthorizationInterceptor } from 'interceptors'
import Keycloak from 'keycloak-js'
import { giveUserRole } from './utils'

const { localStorage } = window

const NUM_LOADING = 1

export default kea({
  path: () => ['scenes', 'app'],

  actions: () => ({
    checkLoggedUser: () => ({}),
    decreaseLoading: () => ({ }),
    setKeycloak: (keycloak)=> ({ keycloak})
  }),

  reducers: ({ actions }) => ({
    loading: [NUM_LOADING, PropTypes.number,{
      [actions.decreaseLoading]: (state, payload) => state > 0 ? state - 1 : 0
    }],
    keycloak: [null, PropTypes.any,{
      [actions.setKeycloak]: (state, payload) => payload.keycloak
    }]
  }),

  selectors: ({ selectors }) => ({
    userName: [
      () => [selectors.keycloak],
      (keycloak) =>keycloak && keycloak.tokenParsed.name,
      PropTypes.string
    ],
    userRole: [
      () => [selectors.keycloak],
      (keycloak) =>keycloak && giveUserRole(keycloak.tokenParsed.realm_access),
      PropTypes.any
    ],
  }),

  start: function * () {
    console.log(`[5GCity-CORE] 🚀 Booting up `, 'cornflowerblue')

    const { checkLoggedUser } = this.actions

    yield(put(checkLoggedUser()))
  },

  takeEvery: ({ actions, workers }) => ({
    [actions.checkLoggedUser]: workers.checkLoggedUser,
  }),

  takeLatest: ({ actions, workers }) => ({
  }),

  workers: {

    /**
     * Checking if user is logged in on the app
     */
    * checkLoggedUser () {
      const { decreaseLoading, setKeycloak } = this.actions
      const keycloakInit = () => {
        return new Promise((resolve, reject) => {
          const keycloak = Keycloak('/keycloak.json')
          keycloak.init({onLoad: 'login-required'})
            .success(function(authenticated) {
                localStorage.setItem('keycloak', JSON.stringify(keycloak))
              resolve(keycloak)
            })
            .error(function(error) {
                reject(error)
            })
        })
      }

      // initialize the auth service object
      const keycloak = yield call(keycloakInit)
      yield put(setKeycloak(keycloak))
      yield call(setAuthorizationInterceptor, keycloak.token)
      yield put(decreaseLoading())
    }
  }
})
