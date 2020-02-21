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
import { giveUserRole, AdminVerification } from './utils'

const { localStorage } = window

const NUM_LOADING = 1

export default kea({
  path: () => ['scenes', 'app'],

  actions: () => ({
    checkLoggedUser: () => ({}),
    decreaseLoading: () => ({}),
    setKeycloak: (keycloak) => ({ keycloak }),
    addLoadingPage: () => ({}),
    removeLoadingPage: () => ({})
  }),

  reducers: ({ actions }) => ({
    loading: [NUM_LOADING, PropTypes.number, {
      [actions.decreaseLoading]: (state, payload) => state > 0 ? state - 1 : 0
    }],
    keycloak: [null, PropTypes.any, {
      [actions.setKeycloak]: (state, payload) => payload.keycloak
    }],
    loadingPage: [false, PropTypes.bool, {
      [actions.addLoadingPage]: () => true,
      [actions.removeLoadingPage]: () => false
    }]
  }),

  selectors: ({ selectors }) => ({
    userName: [
      () => [selectors.keycloak],
      (keycloak) => keycloak && keycloak.tokenParsed.name,
      PropTypes.string
    ],
    userRole: [
      () => [selectors.keycloak],
      (keycloak) => keycloak && giveUserRole(keycloak.tokenParsed.realm_access),
      PropTypes.any
    ],
    userLabel: [
      () => [selectors.keycloak],
      (keycloak) => keycloak && AdminVerification(keycloak.tokenParsed),
      PropTypes.string
    ]
  }),

  start: function * () {
    console.log(`[5GCity-CORE] 🚀 Booting up `, 'cornflowerblue')

    const { checkLoggedUser } = this.actions

    yield (put(checkLoggedUser()))
  },

  takeEvery: ({ actions, workers }) => ({
    [actions.checkLoggedUser]: workers.checkLoggedUser
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
            .success(function (authenticated) {
              authenticated && localStorage.setItem('keycloak', JSON.stringify(keycloak))
              !authenticated && keycloak.login()
              resolve(keycloak)
            })
            .error(function (error) {
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
