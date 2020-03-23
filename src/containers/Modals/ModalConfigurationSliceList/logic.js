/**
 * ModalConfigurationSliceList Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'
import { VerifyChunks } from './utils'

/* Logic */
import ListSlicesLogic from 'containers/Lists/ListSlices/logic'

export default kea({
  path: () => ['scenes', 'containers', 'ModalConfigurationSliceList'],

  connect: {
    props: [
      ListSlicesLogic, [
        'sliceSelect'
      ]
    ],
    actions: [
      ListSlicesLogic, [
        'fetchSlices',
        'sliceConfig',
        'setErrorMessage',
        'configAction'
      ]
    ]
  },

  actions: () => ({
    submit: () => ({}),
    setChunkInfo: (info) => ({ info }),
    actionModal: () => ({}),
    isLoading: () => ({ }),
    setType: (type) => ({ type }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    formType: [null, PropTypes.string, {
      [actions.setType]: (state, payload) => payload.type
    }],
    chunkInfo: [null, PropTypes.array, {
      [actions.setChunkInfo]: (state, payload) => payload.info,
      [actions.submitSuccess]: () => null,

      [actions.reset]: () => null
    }],
    modalStatus: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.setChunkInfo]: () => true,
      [actions.reset]: () => false
    }],
    loading: [false, PropTypes.bool, {
      [actions.isLoading]: (state, payload) => !state,
      [actions.reset]: () => false
    }]
  }),

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.sliceConfig]: workers.modalAction
  }),

  workers: {
    * modalAction () {
      const {
        setChunkInfo,
        configAction,
        setType
      } = this.actions
      const sliceSelect = yield this.get('sliceSelect')
      const array = []
      yield put(configAction())
      const type = VerifyChunks(sliceSelect.chunks.chunketeChunks)
      for (let index = 0; index < sliceSelect.chunks.chunketeChunks.length; index++) {
        const chunk = sliceSelect.chunks.chunketeChunks[index]
        array.push({
          chunketeName: chunk.name,
          ranInfrastructureId: chunk.ranInfrastructureId,
          chunkId: chunk.id,
          sliceId: sliceSelect.id
        })
        const { data } = yield call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${chunk.ranInfrastructureId}`)
        array[index].ranName = data.name
        array[index].plmnids = []
        data.ranInfrastructureData.quota.availablePlmnids.forEach((element, i) => {
          array[index].plmnids.push({id: i, value: element, name: element})
        })
      }
      yield put(setChunkInfo(array))
      yield put(configAction())
      yield put(setType(type))
    }
  }

})
