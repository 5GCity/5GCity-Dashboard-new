/**
 * ComposerMenu Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */

import { kea } from 'kea'
import axios from 'axios'
import { API_SDK } from 'config'
import { put, call } from 'redux-saga/effects'
import { Organizations } from './utils'
import { PropTypes } from 'prop-types'

export default kea({
  path: () => ['scenes', 'containers', 'ComposerMenu'],

  actions: () => ({
    fetchFunctions: () => ({ }),
    setFunctions: (functions) => ({ functions }),

    fetchOrganizations : () => ({}),
    setOrganizations: (organizations) => ({ organizations }),
    changeOrganization : (organization) => ({organization}),

    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    functions: [[], PropTypes.array, {
      [actions.fetchFunctions]: (state, payload) => [],
      [actions.setFunctions]: (state, payload) => payload.functions
    }],
    selectOrganization: ['all', PropTypes.string, {
      [actions.changeOrganization]: (state, payload) => payload.organization
    }],
    organizationsList: [null, PropTypes.array, {
      [actions.fetchOrganizations] : (state, payload) => null,
      [actions.setOrganizations]: (state, payload) => Organizations(payload.organizations)
    }],
  }),

  start: function * () {
    const { fetchOrganizations } = this.actions
    yield put(fetchOrganizations())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchOrganizations]: workers.fetchOrganizations,
    [actions.fetchFunctions]: workers.fetchFunctions,
    [actions.changeOrganization]: workers.fetchFunctions,
  }),

  workers: {

    * fetchFunctions () {
      const { setFunctions } = this.actions
      const selectOrganization = yield this.get('selectOrganization')
      const organizationsList = yield this.get('organizationsList')
      if(selectOrganization === 'all'){
        const array = []
        for (let index = 1; index < organizationsList.length; index++) {
          const organization = organizationsList[index]
          let responseResult = yield call(axios.get, `${API_SDK}/sdk/functions/?sliceId=${organization.value}`)
          const { data } = responseResult
          array.push(...data)
        }
        yield put(setFunctions(array))
      }else {
        try {
          let responseResult = yield call(axios.get, `${API_SDK}/sdk/functions/?sliceId=${selectOrganization}`)
          const { data } = responseResult
          yield put(setFunctions(data))
        } catch (error) {
          console.error(`Error ${error}`)
        }
      }
    },

    * fetchOrganizations () {
      const { setOrganizations, fetchFunctions } = this.actions
      try {
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/sliceManagement/slices`)
        const { data } = responseResult
        yield put(setOrganizations(data))
        yield put(fetchFunctions())
      } catch (error) {
        yield put(setOrganizations(null))
        console.error(`Error ${error}`)
      }
    },
  }

})
