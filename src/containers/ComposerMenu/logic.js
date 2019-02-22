/**
 * ComposerMenu Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */

import { kea } from 'kea'
//import { put } from 'redux-saga/effects'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from './utils'

//import PropTypes from 'prop-types'
//import * as Check from 'validations'

/* Logic */
import Composer from 'containers/Composer/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ComposerMenu'],

  connect: {
    props: [

    ],
    actions: [
      Composer, [
        'createNode'
      ]
    ]
  },

  actions: () => ({
    setResource: (catalogue) => ({ catalogue }),
  }),

  reducers: ({ actions }) => ({

  }),

  takeLatest: ({ actions, workers }) => ({

  }),

  workers: {

  }

})

