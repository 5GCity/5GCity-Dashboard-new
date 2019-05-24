/**
 * InfoManagementView Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import axios from 'axios'
import { put , call } from 'redux-saga/effects'
import { API_BASE_URL } from 'config'
import PropTypes from 'prop-types'
import { CreateAllPins } from './utils'


export default kea({
  path: () => ['scenes', 'containers', 'InfoManagementView'],

  actions: () => ({
    loading: () => ({ }),
    fetchResources: () => ({ }),
    panelAction: () => ({ }),
    setListResources: (resources) => ({ resources }),
    infoMarker: (marker) => ({ marker }),
    reset: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    pinsResources: [null, PropTypes.any, {
      [actions.setListResources]: (state, payload) => CreateAllPins(payload.resources),
      [actions.addToListResources]: (state, payload) => payload.resources,
      [actions.reset]: () => null,
    }],
    panel: [false, PropTypes.bool,{
      [actions.panelAction]:(state, payload) => !state,
      [actions.infoMarker]: (state, payload) => !state,
      [actions.reset]: () => false,
    }],
    rightPanelInfo: [null, PropTypes.object, {
      [actions.infoMarker]: (state, payload) => payload.marker,
      [actions.reset]: () => null,
    }],
    loading: [false, PropTypes.bool, {
      [actions.loading]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
  }),

  selectors: ({ selectors }) => ({
    locations: [
      () => [selectors.pinsResources],
      (pinsResources) => (
        pinsResources && pinsResources.map(marker => [marker.location.longitude, marker.location.latitude])
      ),
      PropTypes.array
    ],
  }),

  start: function * () {
    const { fetchResources } = this.actions
    yield put(fetchResources())
  },

  stop: function * () {
    const { reset } = this.actions
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchResources]: workers.getListResources,
  }),

  workers: {
    *getListResources () {
      const { setListResources, loading } = this.actions
      yield put(loading())
      try{
        const responseComputes = yield call(axios.get , `${API_BASE_URL}/compute`)
        const responseNetworks = yield call(axios.get , `${API_BASE_URL}/physical_network`)
        const responseSdnWifi = yield call(axios.get , `${API_BASE_URL}/sdn_wifi_access_point`)

        const listResources = {computes:[], networks:[], sdnWifi:[]}

        if(responseComputes) {
          responseComputes.data.map(el => listResources.computes.push(el))
        }
        if(responseNetworks) {
          responseNetworks.data.map(el => listResources.networks.push(el))
        }
        if(responseSdnWifi) {
          responseSdnWifi.data.map(el => listResources.sdnWifi.push(el))
        }

        yield(put(setListResources(listResources)))
        yield put(loading())
      }
      catch (error) {
        console.log(error)
        yield(put(setListResources(null)))
        yield put(loading())
      }
    },
  }

})

