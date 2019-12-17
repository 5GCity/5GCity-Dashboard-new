/**
 * ListAlerts Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'

import PropTypes from 'prop-types'


export default kea({
  path: () => ['scenes', 'containers', 'ListAlerts'],


  actions: () => ({
    actionModal : (network) => ({ network }),
    reset : () => ({})
  }),

  reducers: ({ actions }) => ({
    modalInfo: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    networkInfo: [null, PropTypes.object, {
      [actions.actionModal]: (state, payload) => payload.network,
      [actions.reset]: () => null
    }],
  }),

  start: function * () {

  },

  takeLatest: ({ actions, workers }) => ({

  }),

  workers: {
  }

})

