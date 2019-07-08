/**
 * ModalConfigParameters Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import * as Check from 'validations'
import { setForm } from './utils'

/* Logic */
import ComposerMainLogic from 'containers/SDKContainer/logic'

const DEFAULT_FORM = {
  mapping_expression:{
    array: [ ]
  },
}

const VALIDATIONS = {
  mapping_expression: [
    Check.isRequired
  ],
}

export default kea({
  path: () => ['scenes', 'containers', 'ModalConfigParameters'],

  connect: {
    actions: [
      ComposerMainLogic,[
        'changeConfigParams',
        'changeSaveStatus',
        'configParams',
      ]
    ],
    props: [
      ComposerMainLogic,[
        'modalNodeConfigData'
      ]
    ]
  },

  actions: () => ({
    getForm: () => ({ }),
    change: (key, value, index) => ({ key, value, index }),
    setForm : ( form ) => ({ form }),
    changeForm: ( form ) => ({ form }),

    error: (error) => ({ error }),
    submit: () => ({}),
    reset: () => true,
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.any,{
      [actions.change]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM,
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
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submit]: workers.submit,
  }),

  workers: {
    * getForm () {
      const { changeForm } = this.actions
      const node = yield this.get('modalNodeConfigData')
      const setDefaultValues = { ...DEFAULT_FORM }
      setDefaultValues.mapping_expression.array = setForm(node)
      const validForm = Check.checkValidation(setDefaultValues, VALIDATIONS).form
      yield put(changeForm(validForm))
    },

    * submit () {
      const {
        error,
        setForm,
        changeSaveStatus,
        changeConfigParams,
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const node = yield this.get('modalNodeConfigData')
      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)

      if (dirty && validation.invalid) {
        yield put(error([]))
        return false
      } else if (!dirty && validation.invalid) {
        yield put(setForm(validation.form))
        yield put(error([]))
        return false
      } else if (!validation.invalid && !dirty) {
        const array = []
        validation.form.mapping_expression.array.forEach(element => {
          array.push(element.value)
        })
        node.mapping_expression = array
        yield put(changeConfigParams(node))
        yield put(changeSaveStatus(false))
      } else if (!validation.invalid && dirty) {
        const array = []
        validation.form.mapping_expression.array.forEach(element => {
          array.push(element.value)
        })
        node.mapping_expression = array
        yield put(changeConfigParams(node))
        yield put(changeSaveStatus(false))
      }
    },
  }

})

