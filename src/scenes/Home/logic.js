/**
 * Home Logic
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */

import { kea } from 'kea'

// import { put } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
// import { } from 'config'
// import { } from 'utils'
// import { } from './utils'

// import PropTypes from 'prop-types'
// import * as Check from 'validations'

import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'home'],

  connect: {
    actions: [
      AppLogic, [
      ]
    ]
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
