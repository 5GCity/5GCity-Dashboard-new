/**
 * SDKOrganisation Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'

import { put, call } from 'redux-saga/effects'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from 'utils'
//import { } from './utils'

import ModalCreateOrganisationLogic from 'containers/Modals/ModalCreateOrganisation/logic'


export default kea({
  path: () => ['scenes', 'SDKOrganisation'],

  connect: {
    actions: [
      ModalCreateOrganisationLogic, [
        'modalOpen',
      ],
    ],
  },

  actions: () => ({

  }),

  reducers: ({ actions }) => ({
  
  }),

  start: function * () {

  },

  takeLatest: ({ actions, workers }) => ({
  }),


  workers: {
   
  }

})

