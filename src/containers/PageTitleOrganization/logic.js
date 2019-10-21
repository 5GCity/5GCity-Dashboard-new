/**
 * PageTitleOrganization Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SDK } from 'config'
import { Organizations } from './utils'

import PropTypes from 'prop-types'
//import * as Check from 'validations'


export default kea({
  path: () => ['scenes', 'containers', 'PageTitleOrganization'],

  actions: () => ({
    fetchOrganization: () => ({}),
    setOrganizations: (organization) => ({ organization }),
    changeOrganization: (value) => ({ value }),
    setLoading: (loading) => ({ loading }),

    reset : () => ({ })
  }),

  reducers: ({ actions }) => ({
    organizations: [null, PropTypes.array, {
     [actions.setOrganizations]: (state, payload) => Organizations(payload.organization)
    }],
    selectOrganization: [null, PropTypes.string, {
      [actions.setOrganizations]: (state, payload) => payload.organization ? Organizations(payload.organization)[0].value : null,
      [actions.changeOrganization]: (state, payload) => payload.value,
    }],
    loading: [false, PropTypes.bool, {
      [actions.setLoading]: (state, payload) => payload.loading,
    }]
  }),

  start: function * () {
    const { fetchOrganization } = this.actions

    yield put(fetchOrganization())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchOrganization]: workers.fetchOrganization
  }),

  workers: {
    * fetchOrganization() {
      const { setOrganizations, setLoading } = this.actions
      // add Loading
      yield put(setLoading(true))
      try {
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/sliceManagement/slices`)
        const { data } = responseResult
        if (data.length > 0) {
          yield put(setOrganizations(data))
          yield put(setLoading(false))
        } else {
          yield put(setOrganizations(null))
          yield put(setLoading(false))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

})

