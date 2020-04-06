/**
 * SliceDetail Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import axios from 'axios'
import { put, call } from 'redux-saga/effects'
import { API_SLICE_MANAGEMENT } from 'config'
import {
  createSlice,
  CreateSliceChunk,
  CreateAllLinks
} from './utils'

import PropTypes from 'prop-types'

/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'SliceDetail'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ]
  },

  actions: () => ({
    fetchSlice: () => ({ }),
    setSlice: (resources) => ({resources}),
    setSliceChunk: (resources) => ({resources}),
    infoMarker: (marker) => ({marker}),
    panelAction: () => ({ }),
    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    slice: [null, PropTypes.any, {
      [actions.fetchSlice]: (state, payload) => null,
      [actions.setSlice]: (state, payload) => CreateAllLinks(payload.resources),
      [actions.setSliceChunk]: (state, payload) => CreateAllLinks(payload.resources)
    }],
    rightPanelInfo: [ null, PropTypes.object, {
      [actions.infoMarker]: (state, payload) => payload.marker.location.resources
    }],
    panel: [false, PropTypes.bool, {
      [actions.panelAction]: (state, payload) => !state,
      [actions.reset]: () => false,
      [actions.infoMarker]: (state, payload) => !state
    }]
  }),

  selectors: ({ selectors }) => ({
    location: [
      () => [selectors.slice],
      (slice) => {
        const array = []
        slice && slice.markers.length > 0 && slice.markers.forEach(marker => array.push([marker.location.longitude, marker.location.latitude]))
        return array
      },
      PropTypes.array
    ]
  }),

  start: function * () {
    const { fetchSlice } = this.actions
    yield put(fetchSlice())
  },

  stop: function * () {
    const { reset } = this.actions
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchSlice]: workers.fetchSlice
  }),

  workers: {

    * fetchSlice () {
      const {
        setSlice,
        addLoadingPage,
        removeLoadingPage,
        setSliceChunk
      } = this.actions

      // add Loading page
      yield put(addLoadingPage())
      try {
        const listResources = {chunk: [], slice: [], boxes: []}
        const selectSlice = this.props.match.params.id
        const responseResultChunk = yield call(axios.get, `${API_SLICE_MANAGEMENT}/slic3/${selectSlice}/chunks`)
        const chunkResponse = responseResultChunk.data
        const responseResultSlice = yield call(axios.get, `${API_SLICE_MANAGEMENT}/slic3/${selectSlice}`)
        const sliceResponse = responseResultSlice.data
        const arrayOfBoxes = []
        if (sliceResponse.chunks.chunketeChunks.length > 0) {
          for (let i = 0; i < sliceResponse.chunks.chunketeChunks.length; i++) {
            let ran = sliceResponse.chunks.chunketeChunks[i]
            const responseResultRanTopolgy = yield call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${ran.ranInfrastructureId}/chunkete_topology`)
            const { boxes } = responseResultRanTopolgy.data
            arrayOfBoxes.push(...boxes)
          }
          listResources.chunk = chunkResponse
          listResources.slice = sliceResponse
          listResources.boxes = arrayOfBoxes
          yield put(setSliceChunk(CreateSliceChunk(listResources)))
        } else {
          yield put(setSlice(createSlice(chunkResponse)))
        }

        yield put(removeLoadingPage())
      } catch (error) {
        console.error(`Error ${error}`)
        yield put(removeLoadingPage())
      }
    }
  }

})
