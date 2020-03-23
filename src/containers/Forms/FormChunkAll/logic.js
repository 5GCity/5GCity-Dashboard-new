/**
 * FormChunkAll Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'

import * as Check from 'validations'

import { SetForm, ChangeField, CreateForm, VALIDATIONS } from './utils'

/* Logic */
import ModalConfigurationSliceListLogic from 'containers/Modals/ModalConfigurationSliceList/logic'

export default kea({
  path: () => ['scenes', 'containers', 'FormChunkAll'],

  connect: {
    props: [
      ModalConfigurationSliceListLogic, [
        'chunkInfo'
      ]
    ],
    actions: [
      ModalConfigurationSliceListLogic, [
        'submit',
        'isLoading',
        'setErrorMessage',
        'fetchSlices',
        'actionModal'
      ]
    ]
  },

  actions: () => ({
    createForm: () => ({ }),
    setForm: (form) => ({ form }),
    change: (key, value, index) => ({ key, value, index }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    form: [null, PropTypes.object, {
      [actions.setForm]: (state, payload) => SetForm(payload.form),
      [actions.change]: (state, payload) => ChangeField(state, payload),

      [actions.reset]: () => null
    }],
    dirty: [false, PropTypes.bool, {
      [actions.change]: (state, payload) => true,

      [actions.reset]: () => false
    }]
  }),

  start: function * () {
    const { createForm } = this.actions
    yield put(createForm())
  },

  stop: function * () {
    const { reset } = this.actions
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.createForm]: workers.createForm,
    [actions.submit]: workers.submit
  }),

  workers: {
    * createForm () {
      const { setForm } = this.actions
      const chunkInfo = yield this.get('chunkInfo')
      yield put(setForm(CreateForm(chunkInfo)))
    },

    * submit () {
      const { fetchSlices, isLoading, actionModal, setErrorMessage } = this.actions
      const chunkInfo = yield this.get('chunkInfo')
      const form = yield this.get('form')
      const dirty = yield this.get('dirty')
      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)
      if (!validation.invalid && dirty) {
        for (let index = 0; index < chunkInfo.length; index++) {
          const chunk = chunkInfo[index]
          const params = {
            'name': form.name.array[index].value,
            'plmnId': form.plmnId.array[index].value,
            'slic3_id': chunk.sliceId,
            'ssid': form.ssid.array[index].value
          }
          try {
            yield put(isLoading())
            yield call(axios.post, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${chunk.ranInfrastructureId}/chunkete_chunk/${chunk.chunkId}/swam_service`, params)
            yield put(fetchSlices())
          } catch (error) {
            yield put(setErrorMessage(error.response.data.message || 'Internal error'))
          }
          yield put(isLoading())
          yield put(actionModal())
        }
      } else if (!validation.invalid && !dirty) {
        yield put(actionModal())
      } else {
        return false
      }
    }
  }
})
