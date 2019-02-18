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
    panelAction: () => ({ })
  }),

  reducers: ({ actions }) => ({
    slice: [null, PropTypes.any, {
      [actions.fetchSlice]: (state, payload) => null, 
      [actions.setSlice]: (state, payload) => createSlice(payload.resources)
    }],
    rightPanelInfo: [ null, PropTypes.object, {
      [actions.infoMarker]: (state, payload) => payload.marker
    }],
    panel: [false, PropTypes.bool,{
      [actions.panelAction]:(state, payload) => !state
    }]
  }),

  start: function * () {
    const { fetchSlice } = this.actions
    yield put(fetchSlice())
    
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchSlice]: workers.fetchSlice
  }),


  workers: {
    
    * fetchSlice () {

      const { setSlice } = this.actions

       try {
        const selectSlice = this.props.match.params.id
        const responseResult = yield call(axios.get,`${API_BASE_URL}/slicemanagerapi/slic3/${selectSlice}/chunks`) 
        const { data } = responseResult 
        
        yield put(setSlice(data)) 

      }catch(error){
        console.error(`Error ${error}`)
      }
    }
  }

})

