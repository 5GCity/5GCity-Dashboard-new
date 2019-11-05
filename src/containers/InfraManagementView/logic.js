/**
 * InfoManagementView Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'
import { CreateAllPins, CreateAllLinks } from './utils'

/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'InfoManagementView'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ]
  },

  actions: () => ({
    fetchResources: () => ({ }),
    panelAction: () => ({ }),
    setListResources: (resources) => ({ resources }),
    changeModalErrorStatus: (message) => ({ message }),
    setChunketeTopology: (rans) => ({ rans }),
    infoMarker: (marker) => ({ marker }),
    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    pinsResources: [null, PropTypes.any, {
      [actions.setListResources]: (state, payload) => CreateAllPins(payload.resources),
      [actions.addToListResources]: (state, payload) => payload.resources,
      [actions.reset]: () => null
    }],
    linksResources: [null, PropTypes.array, {
      [actions.setChunketeTopology]: (state, payload) => CreateAllLinks(payload.rans)
    }],
    panel: [false, PropTypes.bool, {
      [actions.panelAction]: (state, payload) => !state,
      [actions.infoMarker]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    rightPanelInfo: [null, PropTypes.object, {
      [actions.infoMarker]: (state, payload) => payload.marker,
      [actions.reset]: () => null
    }],
    modalErrorStatus: [false, PropTypes.bool, {
      [actions.changeModalErrorStatus]: (state, payload) => !state
    }],
    modalErrorData: [null, PropTypes.object, {
      [actions.changeModalErrorStatus]: (state, payload) => payload.message
    }],
  }),

  selectors: ({ selectors }) => ({
    locations: [
      () => [selectors.pinsResources],
      (pinsResources) => (
        pinsResources && pinsResources.map(marker => [marker.location.longitude, marker.location.latitude])
      ),
      PropTypes.array
    ]
  }),

  start: function * () {
    const { fetchResources } = this.actions

    yield put(fetchResources())
  },

  stop: function * () {
    const { reset, removeLoadingPage } = this.actions

    yield put(removeLoadingPage())
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchResources]: workers.getListResources
  }),

  workers: {
    * getListResources () {
      const { setListResources, addLoadingPage, removeLoadingPage, setChunketeTopology } = this.actions
      yield put(addLoadingPage())
      try {
        const responseComputes = yield call(axios.get, `${API_SLICE_MANAGEMENT}/compute`)
        const responseNetworks = yield call(axios.get, `${API_SLICE_MANAGEMENT}/physical_network`)
        const responseRAN = yield call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure`)

        const listResources = {computes: [], networks: [], rans: []}

        if (responseComputes) {
          responseComputes.data.map(el => listResources.computes.push(el))
        }
        if (responseNetworks) {
          responseNetworks.data.map(el => listResources.networks.push(el))
        }
        if (responseRAN) {
          for (let index = 0; index < responseRAN.data.length; index++) {
            const elementId = responseRAN.data[index].id
            const responseChunketeTopology = yield call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${elementId}/chunkete_topology`)
            responseRAN.data.map(el => listResources.rans.push({...el, chunketeTopology: responseChunketeTopology.data || null}))
          }
          yield (put(setChunketeTopology(listResources.rans)))
        }
        yield (put(setListResources(listResources)))
        yield put(removeLoadingPage())
      } catch (error) {
        console.log(error)
        yield (put(setListResources(null)))
        yield put(removeLoadingPage())
        yield put(changeModalErrorStatus({message: 'Internal server Error'}))
      }
    }
  }
})
