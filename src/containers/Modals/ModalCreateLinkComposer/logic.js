/**
 * ModalCreateLinkComposer Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import { createFormFunction, changeLinkProperties } from './utils'

import PropTypes from 'prop-types'
//import * as Check from 'validations'

/* Logic */
import ComposerMainLogic from 'containers/SDKContainer/logic'

const DEFAULT_FORM = {
  link_name: null,
  name_connection_source:null,
  options_select_source: null,
  name_connection_target:null,
  options_select_target: null,
  required_ports: [],
}

const propTypes = {
  link_name: PropTypes.string,
  name_connection_source: PropTypes.string,
  name_connection_target: PropTypes.string,
  options_select_source: PropTypes.any,
  options_select_target: PropTypes.any,
  required_ports: PropTypes.any,
}

export default kea({
  path: () => ['scenes', 'containers', 'ModalCreateLinkComposer'],

  connect: {
    actions: [
      ComposerMainLogic,[
        'createLink',
        'setData',
        'modalAction',
      ]
    ],
    props: [
      ComposerMainLogic,[
        'modalData',
        'd3Data',
      ]
    ]
  },

  actions: () => ({
    setValue: (key, value) => ({ key, value }),
    setValues: (values) => ({ values }),
    setValuePorts: (key, value, index) => ({ key, value, index }),
    addPort: (index) => ({ index }),
    removePort: (index) => ({ index }),
    createLink: (form) => ({ form }),
    getForm: () => ({ }),
    setForm : ( form ) => ({ form }),

    submit: true,
    submitSuccess: true,
    submitFailure: true,
  }),

  reducers: ({ actions }) => ({
    form:[DEFAULT_FORM, PropTypes.shape(propTypes),{
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, { [payload.key]: payload.value })
      },
      [actions.setValues]: (state, payload) => {
        return Object.assign({}, state, payload.values)
      },
      [actions.setValuePorts]:(state, payload) => {
        return Object.assign({}, state, state.required_ports[payload.index]= payload.value)
      },
      [actions.addPort]: (state, payload) => {
        return Object.assign({}, state, state.required_ports.push(null))
      },
      [actions.removePort]: (state, payload) => {
        return Object.assign({}, state, state.required_ports.splice(payload.index, 1))
      },

      [actions.setForm]: (state, payload) => payload.form,
      [actions.submitSuccess]: () => DEFAULT_FORM,
    }],
  }),

  selectors: ({ selectors }) => ({
    newService: [
      () => [selectors.modalData],
      (modalData) => {
        const newService = {}
         if(modalData) {
          const { source, target } = modalData
          if(source && target) {
            newService.source = createFormFunction(modalData, 'source')
            newService.target = createFormFunction(modalData, 'target')
          }
        }
        newService.service_name = modalData.link_name
        return newService
      },
      PropTypes.object
    ],
  }),

  start: function * () {
    const { getForm } = this.actions

    yield put(getForm())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.createLink]: workers.createLink,
    [actions.getForm]: workers.getForm
  }),

  workers: {
    * createLink (action) {
      const linkSelect = yield this.get('modalData')
      const d3Data = yield this.get('d3Data')
      const { setData, modalAction } = this.actions
      const newInfo = action.payload.form
      const newData = changeLinkProperties(linkSelect, d3Data, newInfo)

      yield put(setData(newData))
      yield put(modalAction(null))
    },
    * getForm () {
      const formSelect = yield this.get('modalData')
      const { setForm } = this.actions
      const setDefaultValues = {...DEFAULT_FORM}
      if('link_name' in formSelect) {
        setDefaultValues.link_name = formSelect.target.type === 'vs' ? formSelect.target.virtual_switch_name : formSelect.link_name
        setDefaultValues.name_connection_source = formSelect.connection_name_source
        setDefaultValues.options_select_source = formSelect.connection_point_source_selected
        setDefaultValues.name_connection_target = formSelect.connection_name_target
        setDefaultValues.options_select_target = formSelect.connection_point_target_selected
        setDefaultValues.required_ports = formSelect.required_ports || []
      }
      yield put(setForm(setDefaultValues))
    }
  }

})

