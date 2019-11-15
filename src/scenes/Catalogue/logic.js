/**
 * Catalogue Container Logic
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
  path: () => ['scenes', 'Catalogue'],

  /*
  connect: {
    props: [
      Logic, [
        'prop1'
      ]
    ],
    actions: [
      Logic, [
        'action as newActionName'
      ],
    ]
  },
  */

  actions: () => ({
    fetchOrganizations : () => ({}),
    setCatalogueOrganizations: (organizations) => ({ organizations }),
    changeCatalogueOrganization : (organization) => ({organization}),
  }),

  reducers: ({ actions }) => ({
    organizationsList: [null, PropTypes.array, {
      [actions.fetchOrganizations] : (state, payload) => null,
      [actions.setCatalogueOrganizations]: (state, payload) => Organizations(payload.organizations)
    }],
    selectCatalogueOrganization: ['all', PropTypes.string, {
      [actions.changeCatalogueOrganization]: (state, payload) => payload.organization
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
      const { setCatalogueOrganizations } = this.actions
      try {
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/sliceManagement/slices`)
        const { data } = responseResult
        yield put(setCatalogueOrganizations(data))
      } catch (error) {
        yield put(setCatalogueOrganizations(null))
        console.error(`Error ${error}`)
      }
    },
  }

})
