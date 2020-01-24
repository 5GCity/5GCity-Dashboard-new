/**
 * ModalCreateLinkComposer Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import { createFormFunction, changeLinkProperties, createForm } from './utils'

import PropTypes from 'prop-types'
import * as Check from 'validations'

/* Logic */
import ComposerMainLogic from 'containers/SDKContainer/logic'

export const DEFAULT_FORM = {
  link_name: {
    value: null
  },
  name_connection_source: {
    value: null
  },
  options_select_source: {
    value: null
  },
  name_connection_target: {
    value: null
  },
  options_select_target: {
    value: null
  },
  required_ports: {
    array: []
  }
}

const VALIDATIONS = {
  link_name: [
    Check.isRequired
  ],
  name_connection_source: [
    Check.isRequired
  ],
  options_select_source: [
    Check.isRequired
  ],
  name_connection_target: [
    Check.isRequired
  ],
  options_select_target: [
    Check.isRequired
  ],
  required_ports: [
    Check.isRequired,
    Check.isNumber
  ]
}

export default kea({
  path: () => ['scenes', 'containers', 'ModalCreateLinkComposer'],

  connect: {
    actions: [
      ComposerMainLogic, [
        'createLink',
        'setData',
        'modalAction',
        'changeSaveStatus'
      ]
    ],
    props: [
      ComposerMainLogic, [
        'modalData',
        'd3Data'
      ]
    ]
  },

  actions: () => ({
    change: (field) => ({ field }),
    setValuePorts: (key, value, index) => ({ key, value, index }),
    addPort: (index) => ({ index }),
    removePort: (index) => ({ index }),
    createLink: (form) => ({ form }),
    getForm: () => ({ }),
    setForm: (form) => ({ form }),
    changeForm: (form) => ({ form }),

    submit: () => ({ }),
    error: (error) => ({ error }),
    reset: () => true
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.any, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setValuePorts]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addPort]: (state, payload) => {
        return Object.assign({}, state, state.required_ports.array.push({value: null, valid: false}))
      },
      [actions.removePort]: (state, payload) => {
        return Object.assign({}, state, state.required_ports.array.splice(payload.index, 1))
      },
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.changeForm]: (state, payload) => payload.form,
      [actions.reset]: () => DEFAULT_FORM,
      [actions.modalAction]: (state, payload) => state
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.setValuePorts]: () => true,
      [actions.addPort]: () => true,
      [actions.removePort]: () => true,
      [actions.error]: () => true,
      [actions.reset]: () => false
    }],

    submiting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.error]: () => false,
      [actions.reset]: () => false
    }]
  }),

  selectors: ({ selectors }) => ({
    newService: [
      () => [selectors.modalData],
      (modalData) => {
        const newService = {}
        if (modalData) {
          const { source, target } = modalData
          if (source && target) {
            newService.source = createFormFunction(modalData, 'source')
            newService.target = createFormFunction(modalData, 'target')
          }
        }
        newService.service_name = modalData.link_name
        return newService
      },
      PropTypes.object
    ]
  }),

  start: function * () {
    const { getForm } = this.actions
    yield put(getForm())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: workers.submit,
    [actions.getForm]: workers.getForm
  }),

  workers: {
    * getForm () {
      const linkSelect = yield this.get('modalData')
      const { changeForm } = this.actions
      const setDefaultValues = { ...DEFAULT_FORM }
      setDefaultValues.link_name.value = linkSelect.target.type === 'vs' ? linkSelect.target.virtual_switch_name : linkSelect.link_name
      setDefaultValues.name_connection_source.value = linkSelect.connection_name_source
      setDefaultValues.options_select_source.value = linkSelect.connection_point_source_selected
      setDefaultValues.name_connection_target.value = linkSelect.connection_name_target
      setDefaultValues.options_select_target.value = linkSelect.connection_point_target_selected
      setDefaultValues.required_ports.array = linkSelect.required_ports || []

      const validForm = Check.checkValidation(setDefaultValues, VALIDATIONS).form
      yield put(changeForm(validForm))
    },

    * submit () {
      const {
        error,
        setForm,
        setData,
        modalAction,
        changeSaveStatus,
        reset
      } = this.actions
      const getForm = yield this.get('form')
      const dirty = yield this.get('dirty')
      const linkSelect = yield this.get('modalData')
      const d3Data = yield this.get('d3Data')
      // Check validations
      const form = createForm(linkSelect, getForm)
      const validation = Check.checkValidation(form, VALIDATIONS)
      if (dirty && validation.invalid) {
        yield put(error([]))
        return false
      } else if (!dirty && validation.invalid) {
        yield put(setForm(validation.form))
        yield put(error([]))
        return false
      } else if (!validation.invalid && !dirty) {
        yield put(modalAction(null))
        yield put(reset())
      } else if (!validation.invalid && dirty) {
        const newData = changeLinkProperties(linkSelect, d3Data, form)
        yield put(setData(newData))
        yield put(changeSaveStatus(false))
        yield put(modalAction(null))
        yield put(reset())
      }
    }
  }

})
