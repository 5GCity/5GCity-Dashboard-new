/**
 * Function Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import { STEPS } from './utils'


export default kea({
  path: () => ['scenes', 'containers', 'Function'],

  actions: () => ({
    fetchFunction: () => ({}),
    setFunction: (id) => ({ id }),

    nextStep: () => ({}),
    prevStep: () => ({}),
    changeStep: (number) => ({ number }),

    activeStep: () => ({}),

    setButtonLogin: (status) => ({ status }),

    ChangepreviousBtn: (status) => ({ status }),

    reset : () => ({ }),
  }),

  reducers: ({ actions }) => ({
    currentStep: [1 ,PropTypes.number, {
      [actions.changeStep]: (state, payload) =>payload.number,
      [actions.reset]: () => 1,
    }],
    buttonSubmit: [false, PropTypes.bool, {
      [actions.setButtonLogin]: (state, payload) => payload.status,
      [actions.reset]: () => false,
    }],
    steps: [STEPS, PropTypes.array, {
      [actions.activeStep]: (state, payload) => null,
    }],
    previousButton: [true, PropTypes.bool, {
      [actions.ChangepreviousBtn]: (state, payload) => payload.status,
      [actions.reset]: () => true,
    }]
  }),

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.nextStep]: workers.nextStep,
    [actions.prevStep]: workers.prevStep,
  }),

  workers: {
    *nextStep() {
      const { changeStep, setButtonLogin, ChangepreviousBtn } = this.actions
      const currentStep = yield this.get('currentStep')
      const stepLength = STEPS.length
      let newStep = currentStep
      if(currentStep < stepLength){
        yield(put(changeStep(newStep++)))
        yield(put(ChangepreviousBtn(false)))
      }
      if(currentStep === stepLength) {
        // add Button submit
        yield(put(setButtonLogin(true)))
      }

      yield(put(changeStep(newStep)))
    },
    *prevStep() {
        const { changeStep, setButtonLogin, ChangepreviousBtn } = this.actions
        const currentStep = yield this.get('currentStep')
        const stepLength = STEPS.length
        let newStep = currentStep
        if(currentStep <= stepLength){
          yield(put(changeStep(newStep--)))
        }
        if(currentStep !== stepLength) {
          // remove Button submit
          yield(put(setButtonLogin(false)))
        }
        if (newStep === 1) {
          yield(put(ChangepreviousBtn(true)))
        }

        yield(put(changeStep(newStep)))
      },
  }
})

