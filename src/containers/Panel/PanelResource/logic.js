/**
 * PanelResource Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SLICE_MANAGEMENT } from 'config'

import PropTypes from 'prop-types'

/* Logic */
import InfraManagementLogic from 'containers/InfraManagement/logic'
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'PanelResource'],

  connect: {
    actions: [
      InfraManagementLogic, [
        'getInfoMarker',
        'fetchResources',
        'changeModalStatus',
        'submitModal'
      ],
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ],
    props: [
      InfraManagementLogic, [
        'markerSelect',
        'modalInfo'
      ]
    ]
  },

  actions: () => ({
    changeEdition: (resource) => ({ resource }),
    reset: () => ({}),
    closePanel: () => ({}),
    deleteItem: (item) => ({ item }),

    submit: () => ({})
  }),

  reducers: ({ actions }) => ({
    edition: [false, PropTypes.bool, {
      [actions.changeEdition]: (state, payload) => !state,
      [actions.closePanel]: () => false,

      [actions.reset]: () => false
    }],
    editResource: [null, PropTypes.object, {
      [actions.changeEdition]: (state, payload) => payload.resource,
      [actions.closePanel]: () => null,

      [actions.reset]: () => null
    }],
    panelStatus: [false, PropTypes.bool, {
      [actions.closePanel]: () => false,
      [actions.getInfoMarker]: () => true,

      [actions.reset]: () => false
    }]
  }),

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.submitModal]: workers.deleteResource
  }),

  workers: {
    * deleteResource () {
      const { fetchResources, reset, changeModalStatus } = this.actions
      const { type, id } = yield this.get('modalInfo')
      try {
        switch (type) {
          case 'compute':
            yield call(axios.delete, `${API_SLICE_MANAGEMENT}/compute/${id}`)
            yield (put(fetchResources()))
            yield (put(changeModalStatus(null)))
            yield (put(reset()))
            break
          case 'network':
            yield call(axios.delete, `${API_SLICE_MANAGEMENT}/physical_network/${id}`)
            yield (put(fetchResources()))
            yield (put(changeModalStatus(null)))
            yield (put(reset()))
            break
          case 'ran':
            yield call(axios.delete, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${id}`)
            yield (put(fetchResources()))
            yield (put(changeModalStatus(null)))
            yield (put(reset()))
            break
          default:
            break
        }

      } catch (error) {
        console.log(error)
        yield (put(changeModalStatus({message: error.response.data.message || 'Internal Error'})))
      }
    }
  }

})
