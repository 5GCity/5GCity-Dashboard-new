/**
 * infraManagementResource Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'

import { put, call } from 'redux-saga/effects'

import axios from 'axios'
import PropTypes from 'prop-types'
import mapValues from 'lodash/mapValues'
import * as Check from 'validations'

// Constants
const ENDPOINT = ``

const DEFAULT_VALUES = {
  fieldName: {
    value: ''
  },
}

const VALIDATIONS = {
  fieldName: [
    Check.isRequired
  ],
}


export default kea({
  path: () => ['scenes', 'infraManagementResource'],

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

    change: (field) => ({ field }),
    submit: () => ({}),
    response: (response) => ({ response }),
    error: (error) => ({ error }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),
    reset: () => true,

  }),

  reducers: ({ actions }) => ({

    form: [DEFAULT_VALUES, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_VALUES
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.response]: () => false,
      [actions.error]: () => true,
      [actions.reset]: () => false
    }],

    submiting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.error]: () => false,
      [actions.response]: () => false,
      [actions.reset]: () => false
    }],

    response: [null, PropTypes.any, {
      [actions.response]: (state, payload) => payload.response,
      [actions.reset]: () => null
    }],

    error: [null, PropTypes.any, {
      [actions.error]: (state, payload) => payload.error,
      [actions.reset]: () => null
    }],


  }),

  start: function * () {

  },

  takeLatest: ({ actions, workers }) => ({

    [actions.submit]: workers.submit,

  }),


  workers: {

    /**
     * Write something about your form submitons
     * @param {*} action
     */
    * submit (action) {
      const {
        error,
        response,
        setForm,
        changeForm,
        reset
      } = this.actions

      const form = yield this.get('form')
      const dirty = yield this.get('dirty')

      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)

      if (dirty && validation.invalid) {
        // try to scroll to first form field error

        yield put(error([]))
        return false
      }

      if (!dirty && validation.invalid) {
        // try to scroll to first form field error

        yield put(setForm(validation.form))
        yield put(error([]))
        return false
      }

      // Transform object and remove uneeded state values
      let params = mapValues(form, ({ value }) => value)

      try {
        const request = yield call(axios.post, ENDPOINT, params)
        yield put(response(request.data))
        yield put(reset())
      } catch (er) {
        if (er.response.data) {
          // map WS return errors to form format
          // put the errors on each field and changed them to invalid
          yield put(changeForm(newForm))
          // try to scroll to first form field error
          scrollToFirstFormError(newForm)
        }

        yield put(error([]))
      }
    },

  }

})

