/**
 * Navbar Container Logic
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import { giveUserRole } from './utils'

/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'Navbar'],

  connect: {
    props: [
      AppLogic, [
        'keycloak'
      ]
    ]
  },

  actions: () => ({
    modalChangeStatus:() => ({ }),
    logout: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    modalStatus: [false, PropTypes.boolean,{
      [actions.modalChangeStatus]: (state, payload) => !state,
    }]
  }),

  selectors: ({ selectors }) => ({
    userName: [
      () => [selectors.keycloak],
      (keycloak) =>{ return keycloak.tokenParsed.name },
      PropTypes.string
    ],
    userRole: [
      () => [selectors.keycloak],
      (keycloak) =>{ return giveUserRole(keycloak.tokenParsed.realm_access) },
      PropTypes.any
    ],
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.logout]:workers.logout,
  }),

  start: function * () {

  },

  workers: {
    * logout(){
      const { modalChangeStatus } = this.actions
      yield put(modalChangeStatus())
      const keycloak = yield this.get('keycloak')
      keycloak.logout()
    },
  }
})

