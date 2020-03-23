/**
 * FormSDKActionsRules Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import {
  DEFAULT_FORM,
  ValidationForm,
  AddActionRule,
  RemoveActionRule,
  SetFormActionsRules,
  AddCondition,
  RemoveCondition,
  ValidationFormCondition,
  ChangeActions,
  ValidationActionRules,
  SetActionsRulesService
} from './utils'

import PropTypes from 'prop-types'

/* Logic */
import SDKContainerLogic from 'containers/SDKContainer/logic'
import ComposerFormLogic from 'containers/ComposerForm/logic'

export default kea({
  path: () => ['scenes', 'containers', 'FormSDKActionsRules'],

  connect: {
    actions: [
      ComposerFormLogic, [
        'nextButton',
        'doneButton',
        'submit'
      ],
      SDKContainerLogic, [
        'setServiceInfo'
      ]
    ],
    props: [
      SDKContainerLogic, [
        'serviceInfo'
      ]
    ]
  },

  actions: () => ({
    startActionsRules: () => ({ }),

    setForm: (form) => ({ form }),

    change: (field, index) => ({ field, index }),
    changeActions: (value, parentIndex) => ({ value, parentIndex }),
    changeCondition: (field, parentIndex, childIndex) => ({field, parentIndex, childIndex}),
    addActionRule: () => ({ }),
    removeActionRule: (index) => ({ index }),
    addCondition: (parentIndex) => ({ parentIndex }),
    removeCondition: (parentIndex, childIndex) => ({ parentIndex, childIndex }),

    setActions: (actionsOptions, index) => ({ actionsOptions, index }),
    setActionsOptions: (options) => ({ options }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    formActionsRules: [DEFAULT_FORM(), PropTypes.array, {
      [actions.change]: (state, payload) => ValidationForm(state, payload),
      [actions.changeActions]: (state, payload) => ChangeActions(state, payload),
      [actions.addActionRule]: (state, payload) => AddActionRule(state),
      [actions.removeActionRule]: (state, payload) => RemoveActionRule(state, payload.index),
      [actions.addCondition]: (state, payload) => AddCondition(state, payload.parentIndex),
      [actions.removeCondition]: (state, payload) => RemoveCondition(state, payload.parentIndex, payload.childIndex),
      [actions.changeCondition]: (state, payload) => ValidationFormCondition(state, payload),
      [actions.setForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM()
    }],
    actionsOptions: [[], PropTypes.array, {
      [actions.setActionsOptions]: (state, payload) => payload.options
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.changeActions]: () => true,
      [actions.addActionRule]: () => true,
      [actions.removeActionRule]: () => true,
      [actions.addCondition]: () => true,
      [actions.removeCondition]: () => true,
      [actions.changeCondition]: () => true,

      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { startActionsRules } = this.actions

    yield put(startActionsRules())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.startActionsRules]: workers.createForm,
    [actions.doneButton]: workers.verifyForm
  }),

  workers: {
    * createForm () {
      try {
        const { setForm, setActionsOptions } = this.actions
        const service = yield this.get('serviceInfo')
        const { form, actionsOptions } = SetFormActionsRules(service)
        yield put(setActionsOptions(actionsOptions))
        yield put(setForm(form))
      } catch (e) {
        console.log(e)
      }
    },
    * verifyForm () {
      const { setServiceInfo, submit } = this.actions
      const service = yield this.get('serviceInfo')
      const dirty = yield this.get('dirty')
      const form = yield this.get('formActionsRules')
      // Check validations
      const isInvalid = ValidationActionRules(form)
      if (!dirty && isInvalid) {
        return false
      } else if (isInvalid && dirty) {
        return false
      } else {
        const newService = SetActionsRulesService(service, form)
        yield put(setServiceInfo(newService))
        yield put(submit())
      }
    }

  }

})
