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

const { localStorage } = window

const NUM_LOADING = 1

export default kea({
  path: () => ['scenes', 'app'],

  actions: () => ({
    checkLoggedUser: () => ({}),
    decreaseLoading: () => ({ }),
    setUserName: (userName) => ({userName}),
    setUserRole: (userRole) => ({userRole}),
    logout: () => ({ }),
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

  start: function * () {
    console.log(`[5GCity-CORE] 🚀 Booting up `, 'cornflowerblue')

    const {
      checkLoggedUser
    } = this.actions

    yield(put(checkLoggedUser()))
  },

  takeEvery: ({ actions, workers }) => ({
    [actions.checkLoggedUser]: workers.checkLoggedUser,
    [actions.setUserRole]: workers.checkUserRole,
  }),

  takeLatest: ({ actions, workers }) => ({
  }),

  workers: {

    * checkUserRole () {
      const { setUserRole } = this.actions
      console.log(setUserRole)
      yield put()
    },

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
