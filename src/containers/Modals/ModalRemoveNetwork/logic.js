/**
 * ModalRemove Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'

/* Logic */
import ListNetworksLogic from 'containers/Lists/ListNetworks/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ModalRemove'],

  connect: {
    actions: [
      ListNetworksLogic, [
        'deleteNetwork',
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

