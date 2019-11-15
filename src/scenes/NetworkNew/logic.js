/**
 * NetworkNew Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { API_SDK } from 'config'
import { put, call } from 'redux-saga/effects'
import { Organizations } from './utils'
import axios from 'axios'
import { PropTypes } from 'prop-types'

export default kea({
  path: () => ['scenes', 'NetworkNew'],

  actions: () => ({
    fetchOrganizations : () => ({}),
    setOrganizations: (organizations) => ({ organizations }),
    changeOrganization : (organization) => ({organization}),
  }),

  reducers: ({ actions }) => ({
    organizationsList: [null, PropTypes.array, {
      [actions.fetchOrganizations] : (state, payload) => null,
      [actions.setOrganizations]: (state, payload) => Organizations(payload.organizations)
    }],
    selectOrganization: ['all', PropTypes.string, {
      [actions.changeOrganization]: (state, payload) => payload.organization
    }],
  }),

  start: function * () {
    const { fetchOrganizations } = this.actions

    yield put(fetchOrganizations())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchOrganizations]: workers.fetchOrganizations,
  }),

  workers: {

    * fetchOrganizations () {
      const { setOrganizations } = this.actions
      try {
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/sliceManagement/slices`)
        const { data } = responseResult
        yield put(setOrganizations(data))
      } catch (error) {
        yield put(setOrganizations(null))
        console.error(`Error ${error}`)
      }
    },
  }

})
