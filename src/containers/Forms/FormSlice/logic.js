/**
 * FormSlice Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
// import { } from 'config'
// import { } from 'utils'
// import { } from './utils'

import PropTypes from 'prop-types'

export default kea({
  path: () => ['scenes', 'containers', 'FormSlice'],

  actions: () => ({
    getResourcesLocation: () => ({ }),
    setResources: (setResources) => ({ setResources }),
    changeComputes: (key, value, index) => ({ key, value, index }),
    changeNetworks: (key, value, index) => ({ key, value, index }),
    changeSDN: (key, value, index) => ({ key, value, index })
  }),

  reducers: ({ actions }) => ({
    form: [{computes: [], networks: [], sdnWifi: []}, PropTypes.object, {
      [actions.setResources]: (state, payload) => payload.setResources,
      [actions.changeComputes]: (state, payload) => {
        const { key, value, index } = payload
        const clone = { ...state }
        clone.computes[index][key] = value
        return clone
      },
      [actions.changeNetworks]: (state, payload) => {
        const { key, value, index } = payload
        const clone = { ...state }
        clone.networks[index][key] = value
        return clone
      },
      [actions.changeSDN]: (state, payload) => {
        const { key, value, index } = payload
        const clone = { ...state }
        clone.sdnWifi[index][key] = value
        return clone
      }
    }]
  }),

  start: function * () {
    const { getResourcesLocation } = this.actions

    yield put(getResourcesLocation())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getResourcesLocation]: workers.getResourcesLocation
  }),

  workers: {
    * getResourcesLocation () {
      let id = 0
      console.log(this.props)
      const { setResources } = this.actions
      const selectSlice = this.props.selectSlice
      selectSlice.location.resources.sdnWifi.forEach(wifi => {
        const channelsOptions = []
        wifi.sdnWifiData.forEach(channel =>
          channelsOptions.push({
            id: id++,
            name: channel.number,
            value: channel.number
          })
      )
        wifi.channelOptions = channelsOptions
      })
      console.log(selectSlice.location.resources)
      yield put(setResources(selectSlice.location.resources))
    }
  }

})
