/**
 * SliceDetail Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import axios from 'axios'
import { put , call } from 'redux-saga/effects'
import { API_BASE_URL } from 'config'
import { createSlice } from './utils'

import PropTypes from 'prop-types'

export default kea({
  path: () => ['scenes', 'SliceDetail'],

  actions: () => ({
    fetchSlice: () => ({ }),
    setSlice: (resources) => ({resources}),
    infoMarker: (marker) => ({marker}),
    panelAction: () => ({ }),
    reset: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    slice: [null, PropTypes.any, {
      [actions.fetchSlice]: (state, payload) => null,
      [actions.setSlice]: (state, payload) => createSlice(payload.resources)
    }],
    rightPanelInfo: [ null, PropTypes.object, {
      [actions.infoMarker]: (state, payload) => payload.marker.location.resources,
    }],
    panel: [false, PropTypes.bool,{
      [actions.panelAction]:(state, payload) => !state,
      [actions.reset]: () => false,
      [actions.infoMarker]: (state, payload) => !state,
    }]
  }),


  selectors: ({ selectors }) => ({
    location: [
      () => [selectors.slice],
      (slice) =>  {
        const array = []
        slice && slice.markers.length > 0 && array.push([slice.markers[0].location.longitude, slice.markers[0].location.latitude])
        return array
      },
      PropTypes.array
    ],
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

      const { setSlice } = this.actions
       try {
        const selectSlice = this.props.match.params.id
        const responseResult = yield call(axios.get,`${API_BASE_URL}/slic3/${selectSlice}/chunks`)
        const { data } = responseResult

        yield put(setSlice(data))

      }catch(error){
        console.error(`Error ${error}`)
      }
    }
  }

})

