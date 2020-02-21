/**
 * SDKOrganisation Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'

// import { put } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
// import { } from 'config'
// import { } from 'utils'
// import { } from './utils'
import PropTypes from 'prop-types'

import ModalCreateOrganisationLogic from 'containers/Modals/ModalCreateOrganisation/logic'
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'SDKOrganisation'],

  connect: {
    actions: [ModalCreateOrganisationLogic, ['modalOpen']],
    props: [AppLogic, ['userRole']]
  },

  actions: () => ({}),

  reducers: ({ actions }) => ({}),

  selectors: ({ selectors }) => ({
    user: [
      () => [selectors.userRole],
      (userRole) => userRole !== 'Slice Requester',
      PropTypes.bool
    ]
  }),

  start: function * () {},

  takeLatest: ({ actions, workers }) => ({}),

  workers: {}
})
