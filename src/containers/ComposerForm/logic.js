/**
 * ComposerForm Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'

import PropTypes from 'prop-types'
import {
  STEPS,
  NextStep,
  PrevStep,
  ShowActions,
  ActiveStep,
  InvalidStep,
  SuccessStep
} from './utils'

/* Logic */
import SDKContainerLogic from 'containers/SDKContainer/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ComposerForm'],

  connect: {
    actions: [
      SDKContainerLogic, [
        'changeActiveTab',
        'changeSaveStatus',
        'setMonitoring',
        'setActiveTab'
      ]
    ],
    props: [
      SDKContainerLogic, [
        'VNFServices'
      ]
    ]
  },

  actions: () => ({
    submit: () => ({ }),
    response: (response) => ({ response }),
    error: (error) => ({ error }),

    nextButton: () => ({ }),
    doneButton: () => ({ }),

    nextStep: () => ({ }),
    prevStep: () => ({ }),

    setSteps: (steps) => ({ steps }),
    activeStep: (id) => ({ id }),
    invalidStep: (id) => ({ id }),
    successStep: (id) => ({ id }),

    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    steps: [STEPS(), PropTypes.object, {
      [actions.nextStep]: (state, payload) => NextStep(state),
      [actions.prevStep]: (state, payload) => PrevStep(state),
      [actions.setSteps]: (state, payload) => payload.steps,
      [actions.activeStep]: (state, payload) => ActiveStep(state, payload.id),
      [actions.invalidStep]: (state, payload) => InvalidStep(state, payload.id),
      [actions.successStep]: (state, payload) => SuccessStep(state, payload.id),
      [actions.reset]: () => STEPS
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: workers.submit,
    [actions.setActiveTab]: workers.verifyData
  }),

  workers: {
    * verifyData (action) {
      const { setSteps } = this.actions
      const tab = action.payload.tab.props.name
      const vnfs = yield this.get('VNFServices')
      const steps = yield this.get('steps')
      if (tab === 'basicSettings' && vnfs) {
        yield put(setSteps(ShowActions(vnfs, steps)))
      }
    },

    * submit () {
      const {
        changeActiveTab,
        changeSaveStatus
      } = this.actions
      yield put(changeActiveTab('composer'))
      yield put(changeSaveStatus(false))
    }
  }

})
