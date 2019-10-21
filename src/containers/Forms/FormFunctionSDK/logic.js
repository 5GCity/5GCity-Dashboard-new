/**
 * FormFunctionSDK Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SDK } from 'config'
import { AddParameter, GetJsonFunction,
  DEFAULT_FORM, TransformInForm, DEFAULT_FORM_NEW } from './utils'
import { mapValues } from 'lodash'
import { Message } from 'element-react'

import PropTypes from 'prop-types'
import * as Check from 'validations'

/* Logic */
import FunctionLogic from 'containers/Function/logic'
import AppLogic from 'containers/App/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'

const VALIDATIONS = {
  functionName: [
    Check.isRequired
  ],
  functionSliceId: [
    Check.isRequired
  ],
  functionOwner: [
    Check.isRequired
  ],
  functionVendor: [
    Check.isRequired
  ],
  functionVersion: [
    Check.isRequired
  ],
  functionVNFId: [
    Check.isRequired
  ],
  functionDescription: [
    Check.isRequired
  ],
  functionInstExp: [
    Check.isRequired
  ],
  functionFlavourExp: [
    Check.isRequired
  ],
  functionMaxInst: [
    Check.isRequired
  ],
  functionMinInst: [
    Check.isRequired
  ],
  functionAccessLevel: [
    Check.isRequired
  ],
  functionvisibility: [
    Check.isRequired
  ]
}

export default kea({
  path: () => ['scenes', 'containers', 'FormFunctionSDK'],

  connect: {
    actions: [
      FunctionLogic, [
        'nextStep',
        'prevStep'
      ],
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ],
    props: [
      FunctionLogic, [
        'currentStep',
        'previousButton',
        'buttonSubmit'
      ],
      PageTitleOrganizationLogic, [
        'organizations'
      ]
    ]
  },

  actions: () => ({
    getFunction: () => ({}),

    change: (field) => ({ field }),
    setForm: (form) => ({ form }),

    changeParameters: (key, value, index) => ({ key, value, index }),
    addParameter: () => ({ }),
    removeParameter: (index) => ({ index }),
    submit: () => ({ }),

    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    form: [DEFAULT_FORM, PropTypes.object, {
      [actions.change]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.changeParameters]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.addParameter]: (state, payload) => AddParameter(state),
      [actions.removeParameter]: (state, payload) =>
        Object.assign({}, state, state.functionParameters.array.splice(payload.index, 1)),
      [actions.reset]: () => DEFAULT_FORM
    }],

    dirty: [false, PropTypes.bool, {
      [actions.change]: () => true,
      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { getFunction } = this.actions

    yield put(getFunction())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getFunction]: workers.getFunction,
    [actions.submit]: workers.submit
  }),

  workers: {
    * getFunction () {
      const { setForm } = this.actions
      const functionId = Number(this.props.match.params.id)
      try {
        if (functionId > 0) {
          let responseResult = yield call(axios.get, `${API_SDK}/sdk/functions/${functionId}`)
          const { data } = responseResult
          const form = TransformInForm(data)
          const validForm = Check.checkValidation(form, VALIDATIONS).form
          yield put(setForm(validForm))
        } else {
          yield put(setForm(DEFAULT_FORM_NEW))
        }
      } catch (error) {
        console.error(`Error ${error}`)
      }
    },
    * submit () {
      const {
        removeLoadingPage,
        addLoadingPage
      } = this.actions
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      const idFunction = Number(this.props.match.params.id)

      // Add loading page
      yield put(addLoadingPage())

      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)

      if (dirty && validation.invalid) {
        yield put(removeLoadingPage())
        return false
      } else if (!dirty && validation.invalid) {
        yield put(removeLoadingPage())
        return false
      } else if (!validation.invalid && !dirty) {
        yield call(this.props.history.push, `/sdk/functions`)
      } else if (!validation.invalid && dirty) {
        // Transform object and remove uneeded state values
        let params = mapValues(form, ({ value }) => value)
        const newFunction = GetJsonFunction(params, form)
        try {
          if (idFunction > 0) {
            newFunction.id = idFunction
            yield call(axios.put, `${API_SDK}/sdk/functions/`, newFunction)
            yield call(this.props.history.push, `/sdk/functions`)
          } else {
            yield call(axios.post, `${API_SDK}/sdk/functions/`, newFunction)
            yield call(this.props.history.push, `/sdk/functions`)
          }
          yield put(removeLoadingPage())
        } catch (error) {
          yield put(removeLoadingPage())
          switch (error.response.status) {
            case 400:
              Message({
                showClose: false,
                message: error.response.data,
                type: 'error'
              })
              break

            default:
              Message({
                showClose: false,
                message: 'Cannot Create Function',
                type: 'error'
              })
              break
          }
        }
      }
    }
  }

})
