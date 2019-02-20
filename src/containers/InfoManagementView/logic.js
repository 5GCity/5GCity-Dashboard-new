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
import { createAllPins } from './utils'


export default kea({
  path: () => ['scenes', 'containers', 'InfoManagementView'],

  actions: () => ({
    fetchResources: () => ({ }),
    panelAction: () => ({ }),
    setListResources: (resources) => ({ resources }),
    infoMarker: (marker) => ({ marker }),
  }),

  reducers: ({ actions }) => ({
    pinsResources: [null, PropTypes.any, {
      [actions.setListResources]: (state, payload) => createAllPins(payload.resources),
    }],
    panel: [false, PropTypes.bool,{
      [actions.panelAction]:(state, payload) => !state,
      [actions.infoMarker]: (state, payload) => !state,
    }],
    rightPanelInfo: [null, PropTypes.object, {
      [actions.infoMarker]: (state, payload) => payload.marker,
    }],
  }),

  start: function * () {
    const { fetchResources } = this.actions
    yield put(fetchResources())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchResources]: workers.getListResources,
  }),

  workers: {
    *getListResources(){
      const { setListResources } = this.actions

      try{
        const responseComputes = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/compute`)
        const responseNetworks = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/physical_network`)
        const responseSdnWifi = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/sdn_wifi_access_point`)

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
      }
      catch (error) {
        console.log(error)
      }
    },
  }

})

