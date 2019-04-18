/**
 * ModalConfigParameters Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from 'utils'
//import { } from './utils'

import PropTypes from 'prop-types'
//import * as Check from 'validations'

/* Logic */
import ComposerMainLogic from 'containers/SDKContainer/logic'


const DEFAULT_FORM = {
  mapping_expression: [],
}

const propTypes = {
  mapping_expression: PropTypes.any,
}

export default kea({
  path: () => ['scenes', 'containers', 'ModalConfigParameters'],

  connect: {
    actions: [
      ComposerMainLogic,[
        'changeConfigParams',
      ]
    ],
  },

  actions: () => ({
    getForm: () => ({ }),
    setForm : ( form ) => ({ form }),
    setValue: (key, value, index) => ({ key, value, index }),
    setValues: (values) => ({ values }),
    submitForm: (form) => ({ form }),
    submitSuccess: () => ({ }),
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.any,{
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, state.mapping_expression[payload.index]= payload.value)
      },
      [actions.setValues]: (state, payload) => {
        return Object.assign({}, state, payload.values)
      },

      [actions.setForm]: (state, payload) => payload.form,
      [actions.submitSuccess]: () => DEFAULT_FORM,
    }],
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  stop: function * () {
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submitForm]: workers.submitForm,
  }),

  workers: {
    * getForm () {
      const { setForm } = this.actions
      const data = this.props.data
      const setDefaultValues = {...DEFAULT_FORM}
      setDefaultValues.mapping_expression = data.mapping_expression
      yield put(setForm(setDefaultValues))
    },
    * submitForm (action) {
      const { changeConfigParams, submitSuccess } = this.actions
      const newData = action.payload.form.mapping_expression
      const data = this.props.data
      data.mapping_expression = newData
      yield put(changeConfigParams(data))
      yield put(submitSuccess())
    }
  }

})

