/**
 * ModalNetwork Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
//import { put } from 'redux-saga/effects'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from 'utils'
//import { } from './utils'

//import PropTypes from 'prop-types'
//import * as Check from 'validations'

/* Logic */
import ListNetworks from 'containers/Lists/ListNetworks/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ModalNetwork'],

  connect: {
    props: [
      ListNetworks, [
        'modalVisibled',
        'networkSelect'
      ]
    ],
    actions: [
      ListNetworks, [
        'actionModal'
      ],
    ]
  },

  actions: () => ({

  }),

  reducers: ({ actions }) => ({

  }),

  takeLatest: ({ actions, workers }) => ({

  }),

  workers: {

  }

})

