/**
 * PanelResource Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_URL } from 'config'

import PropTypes from 'prop-types'
//import * as Check from 'validations'

/* Logic */
import InfraManagementLogic from 'containers/InfraManagement/logic'

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
    ],
    props: [
      InfraManagementLogic, [
        'markerSelect',
        'modalInfo',
      ]
    ]
  },

  actions: () => ({
    changeEdition: (resource) =>  ({ resource }),
    submit: () => ({}),
    reset: () => ({}),
    closePanel: () => ({}),
    deleteItem:(item) => ({ item }),
  }),

  reducers: ({ actions }) => ({
    edition: [false, PropTypes.bool, {
      [actions.changeEdition]: (state, payload) => !state,
      [actions.closePanel]: () => false,
      [actions.reset]: () => false,
    }],
    editResource: [null, PropTypes.object, {
      [actions.changeEdition]: (state, payload) => payload.resource,
      [actions.closePanel]: () => null,
      [actions.reset]: () => null,
    }],
    panelStatus: [false, PropTypes.bool, {
      [actions.closePanel]: () => false,
      [actions.getInfoMarker]: () => true,
      [actions.reset]: () => false,
    }],
  }),


  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.submitModal]: workers.deleteResource
  }),

  workers: {
    *deleteResource () {
      const { fetchResources, reset, changeModalStatus } = this.actions
      const { type, id } = yield this.get('modalInfo')
      try{
        switch (type) {
          case 'compute':
              yield call(axios.delete , `${API_BASE_URL}/compute/${id}`)
            break
          case 'network':
              yield call(axios.delete , `${API_BASE_URL}/physical_network/${id}`)
            break
          case 'wifi':
              yield call(axios.delete , `${API_BASE_URL}/sdn_wifi_access_point/${id}`)
            break
          default:
            break;
        }

        yield(put(fetchResources()))
        yield(put(changeModalStatus(null)))
        yield(put(reset()))
      }
      catch (error) {
        console.log(error)
        yield(put(changeModalStatus(null)))
      }
    },
  }

})

