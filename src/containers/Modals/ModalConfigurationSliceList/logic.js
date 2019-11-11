/**
 * ModalConfigurationSliceList Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { API_SLICE_MANAGEMENT } from 'config'
import PropTypes from 'prop-types'
import * as Check from 'validations'
import cloneDeep from 'lodash/cloneDeep'

/* Logic */
import ListSlicesLogic from 'containers/Lists/ListSlices/logic'

const DEFAULT_FORM = {
  name:{
    array:[]
  },
  plmnId:{
    array:[]
  },
  ssid:{
    array:[]
  }
}

const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  plmnId: [
    Check.isRequired
  ],
  ssid: [
    Check.isRequired
  ]
}


export default kea({
  path: () => ['scenes', 'containers', 'ModalConfigurationSliceList'],

  connect: {
    props: [
      ListSlicesLogic, [
        'sliceSelect',
      ],
    ],
    actions: [
      ListSlicesLogic, [
        'fetchSlices',
        'sliceConfig',
        'setErrorMessage',
        'configAction',
      ]
    ]
  },

  actions: () => ({
    setForm: (form) => ({ form }),
    submit: () => ({}),
    setChunkInfo: (info) => ({ info }),
    actionModal: () => ({}),
    isLoading: () => ({ }),
    change: (key, value, index) => ({ key, value, index }),

    reset: () => ({ })
  }),


  reducers: ({ actions }) => ({
    form: [null, PropTypes.any, {
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.change]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.submitSuccess]: () => cloneDeep(DEFAULT_FORM),

      [actions.reset]: () => cloneDeep(DEFAULT_FORM)
    }],
    chunkInfo: [null, PropTypes.array, {
      [actions.setChunkInfo]: (state, payload) => payload.info,
      [actions.submitSuccess]: () => null,

      [actions.reset]: () => null
    }],
    modalStatus: [false, PropTypes.bool, {
      [actions.actionModal]: (state, payload) => !state,
      [actions.reset]: () => false,
    }],
    loading: [false, PropTypes.bool, {
      [actions.isLoading]: (state, payload) => !state,
      [actions.reset]: () => false,
    }]
  }),

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: workers.configureSlice,
    [actions.sliceConfig]: workers.modalAction,
  }),


  workers: {
    * modalAction () {
      const { setChunkInfo, setForm, actionModal, configAction }= this.actions
      const sliceSelect = yield this.get('sliceSelect')
      const array = []
      yield put(configAction())
      console.log(sliceSelect)
      const newForm = cloneDeep(DEFAULT_FORM)
        for (let index = 0; index < sliceSelect.chunks.chunketeChunks.length; index++) {
          const chunk = sliceSelect.chunks.chunketeChunks[index]
          array.push({chunketeName: chunk.name, ranInfrastructureId: chunk.ranInfrastructureId, chunkId: chunk.id, sliceId : sliceSelect.id})
          newForm.name.array.push({value: null, valid: false})
          newForm.plmnId.array.push({value: null, valid: false})
          newForm.ssid.array.push({value: null, valid: false})
          const { data } = yield call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${chunk.ranInfrastructureId}`)
          array[index].ranName = data.name
          array[index].plmnids = []
          data.ranInfrastructureData.quota.availablePlmnids.forEach((element, i) => {
            array[index].plmnids.push({id: i ,value: element, name: element})
          })
        yield put(setForm(newForm))
        yield put(setChunkInfo(array))
        yield put(configAction())
        yield put(actionModal())
      }
    },

    * configureSlice () {
      const { fetchSlices, isLoading, actionModal, setErrorMessage } = this.actions
      const chunkInfo = yield this.get('chunkInfo')
      const form = yield this.get('form')
      // Check validations
      const validation = Check.checkValidation(form, VALIDATIONS)
         if (!validation.invalid) {
          for (let index = 0; index < chunkInfo.length; index++) {
            const chunk = chunkInfo[index]
              const params ={
                "name": form.name.array[index].value,
                "plmnId": form.plmnId.array[index].value,
                "slic3_id": chunk.sliceId,
                "ssid": form.ssid.array[index].value,
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
      }
    }
  }

})

