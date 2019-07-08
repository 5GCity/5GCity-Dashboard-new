/**
 * infraManagement Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_URL } from 'config'
import { AddResource, CreateAllPins } from './utils'

import PropTypes from 'prop-types'

/* Logic */
import AppLogic from 'containers/App/logic'

const DEFAULT_RESOURCE = {
  location:{
    longitude: null,
    latitude: null,
    resources:{
      computes:[],
      networks:[],
      rans:[]
    }
  }
}

export default kea({
  path: () => ['scenes', 'containers', 'infraManagement'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage',
      ]
    ],
  },

  actions: () => ({
    loading: () => ({}),
    fetchResources: () => ({}),
    addToListResources: (resources) => ({ resources }),
    setListResources: (resources) => ({ resources }),
    addResource: (location) => ({ location }),
    getInfoMarker: (marker) => ({ marker }),
    changeModalStatus: (info) => ({ info }),
    changeModalErrorStatus: (message) => ({ message }),
    getAllControllers: (controllers) => ({ controllers }),
    reset: () => ({ }),
    submitModal: () => ({ }),
    closePanelInfo: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    pinsResources: [null, PropTypes.array, {
      [actions.addToListResources]: (state, payload) => payload.resources,
      [actions.setListResources]: (state, payload) => CreateAllPins(payload.resources),
      [actions.reset]: () => [],
    }],
    markerSelect: [DEFAULT_RESOURCE, PropTypes.object, {
      [actions.getInfoMarker]: (state, payload) => payload.marker,
      [actions.reset]: () => DEFAULT_RESOURCE,
    }],
    modalStatus:[false, PropTypes.bool, {
      [actions.changeModalStatus]: (state,payload) => !state,
    }],
    modalInfo: [null, PropTypes.object, {
      [actions.changeModalStatus]: (state,payload) => payload.info,
    }],
    modalErrorStatus:[false, PropTypes.bool, {
      [actions.changeModalErrorStatus]: (state,payload) => !state,
    }],
    modalErrorData: [null, PropTypes.object, {
      [actions.changeModalErrorStatus]: (state,payload) => payload.message,
    }],
    addNewMarker: [true, PropTypes.bool, {
      [actions.getInfoMarker]: (state) => !state,
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
    const { reset, removeLoadingPage } = this.actions

    yield put(removeLoadingPage())
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchResources] : workers.fetchResources,
    [actions.addResource] : workers.addResource,
  }),

  workers: {
    *fetchResources (action) {
      const { setListResources, addLoadingPage, removeLoadingPage } = this.actions
      yield put(addLoadingPage())
      try{
        const responseComputes = yield call(axios.get , `${API_BASE_URL}/compute`)
        const responseNetworks = yield call(axios.get , `${API_BASE_URL}/physical_network`)
        const responseRAN = yield call(axios.get , `${API_BASE_URL}/ran_infrastructure`)

        const listResources = {computes:[], networks:[], rans:[]}

        responseComputes && responseComputes.data.map(el => listResources.computes.push(el))

        responseNetworks && responseNetworks.data.map(el => listResources.networks.push(el))

        responseRAN && responseRAN.data.map(el => listResources.rans.push(el))

        yield(put(setListResources(listResources)))
        yield put(removeLoadingPage())
      }
      catch (error) {
        console.log(error)
        yield(put(setListResources(null)))
        yield put(removeLoadingPage())
      }
    },

    *addResource (action) {
      const { addToListResources } = this.actions
      const location = action.payload.location
      const resources = yield this.get('pinsResources')

      yield put(addToListResources(AddResource(location, resources)))
    }
  }

})

