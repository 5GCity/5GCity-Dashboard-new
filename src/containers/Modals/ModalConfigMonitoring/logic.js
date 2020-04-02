/**
 * ModalConfigMonitoring Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import {
  ValidationForm,
  AddMonitoring,
  RemoveMonitoring,
  SetMonitoringFunc,
  DisableMonitoring,
  GenerateNode,
  DEFAULT_FORM,
  VALIDATIONS,
  SetForm
} from './utils'

import PropTypes from 'prop-types'
import * as Check from 'validations'

/* Logic */
import ComposerMainLogic from 'containers/SDKContainer/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ModalConfigMonitoring'],

  connect: {
    actions: [
      ComposerMainLogic, [
        'changeNodeConfig',
        'configMonitoring'
      ]
    ],
    props: [
      ComposerMainLogic, [
        'modalNodeConfigData'
      ]
    ]
  },

  actions: () => ({
    getForm: () => ({ }),
    changeForm: (form) => ({ form }),

    change: (index, field) => ({ index, field }),
    changeFunc: (key, value, index) => ({ key, value, index }),
    setMonitoringOptions: (options) => ({ options }),

    addMonitoring: () => ({ }),
    removeMonitoring: (index) => ({ index }),

    submit: () => ({}),
    reset: () => true
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.array, {
      [actions.change]: (state, payload) => ValidationForm(state, payload),
      [actions.addMonitoring]: (state, payload) => AddMonitoring(state),
      [actions.changeFunc]: (state, payload) => ValidationForm(state, payload),
      [actions.removeMonitoring]: (state, payload) => RemoveMonitoring(state, payload.index),
      [actions.changeForm]: (state, payload) => payload.form
    }],
    monitoringFunc: [null, PropTypes.array, {
      [actions.setMonitoringOptions]: (state, payload) => payload.options,
      [actions.changeFunc]: (state, payload) => payload.key === 'functionAssociated' && DisableMonitoring(state, payload)
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.changeFunc]: () => true,
      [actions.reset]: () => false
    }],
    submiting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { getForm } = this.actions
    yield put(getForm())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeEvery: ({ actions, workers }) => ({
    [actions.getForm]: workers.getForm,
    [actions.submit]: workers.submit
  }),

  workers: {
    * getForm () {
      const { changeForm, setMonitoringOptions } = this.actions
      const node = yield this.get('modalNodeConfigData')
      const monitoringFunc = SetMonitoringFunc(node.extra_info)
      yield put(setMonitoringOptions(monitoringFunc))
      const form = SetForm(node)
      yield put(changeForm(form))
    },

    * submit () {
      const {
        changeNodeConfig
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const node = yield this.get('modalNodeConfigData')
      // Check validations
      let isInvalid = false
      form.forEach(monitoring => {
        if (isInvalid === false) {
          const validationForm = Check.checkValidation(monitoring, VALIDATIONS)
          isInvalid = validationForm.invalid
        }
        return isInvalid
      })
      if (!dirty && isInvalid) {
        return false
      } else if (!dirty && isInvalid) {
        return false
      } else if (isInvalid && dirty) {
        return false
      } else if (!isInvalid && dirty) {
        const newNode = GenerateNode(form, node)
        yield put(changeNodeConfig(newNode, 'monitoring'))
      }
    }
  }

})
