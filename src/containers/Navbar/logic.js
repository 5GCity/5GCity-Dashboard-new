/**
 * Navbar Container Logic
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import AppLogic from 'containers/App/logic'
import { giveUserRole } from './utils'

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
    setMsgLogout: () => ({ }),
    closeModal:() => ({ }),
    logout: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    showModal: [false, PropTypes.boolean,{
      [actions.setMsgLogout]: (state, payload) => true,
      [actions.closeModal]: (state, payload) => false
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
    [actions.logout]:workers.logout
  }),

  start: function * () {

  },

  workers: {
    * logout(){
      const { closeModal } = this.actions
      yield put(closeModal())
      const keycloak = yield this.get('keycloak')
      console.log(keycloak)
      keycloak.logout()        
    }
  }
})

