/**
 * ModalCreateOrganisation Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { API_SDK } from 'config'
import axios from 'axios'

import PropTypes from 'prop-types'
import * as Check from 'validations'
import { mapValues } from 'lodash'

import ListSDKOrganisationLogic from 'containers/Lists/ListSDKOrganisation/logic'

const DEFAULT_FORM = {
  sliceDescription: {
    value: null
  },
  sliceId: {
    value: null
  },
}

const VALIDATIONS = {
  sliceDescription: [
    Check.isRequired
  ],
  sliceId: [
    Check.isRequired
  ]
}


export default kea({
  path: () => ['scenes', 'containers', 'ModalCreateOrganisation'],

  connect: {
    actions: [
      ListSDKOrganisationLogic, [
        'fetchSlices',
      ],
    ],
  },

  actions: () => ({
    change: (field) => ({ field }),
    submitNewOrganisation: () => ({ }),
    modalOpen: () => ({ }),
    modalClose: () => ({ }),

    reset: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.reset]: () => DEFAULT_FORM
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.reset]: () => false
    }],
    modalStatusOrganisation: [false, PropTypes.bool, {
      [actions.modalOpen]: () => true,
      [actions.modalClose]: () => false,
      [actions.reset]: () => false
    }]
  }),

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.submitNewOrganisation]: workers.submitNewOrganisation
  }),

  workers: {
    * submitNewOrganisation () {
      const { modalClose, reset, fetchSlices } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')

      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)

      if (dirty && validation.invalid) {
        return false
      } else if (!dirty && validation.invalid) {
        yield put(setForm(validation.form))
        return false
      } else if (!validation.invalid && !dirty) {
        yield put(reset())
      } else if (!validation.invalid && dirty) {
        // Transform object and remove uneeded state values
        let params = mapValues(form, ({ value }) => value)
        params.sliceId = params.sliceId.split(' ').join('-')
        try {
          yield call(axios.post, `${API_SDK}/sdk/sliceManagement/slices`, params)
          yield put(modalClose())
          yield put(fetchSlices())
          yield put(reset())
        } catch (error) {
          // Something happened in setting up the request that triggered an Error
          yield put(modalClose())
          yield put(reset())
        }
      }
    },
  }
})

