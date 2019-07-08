/**
 * SliceNew Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'config'
import { CreateAllPins } from './utils'
import * as Check from 'validations'

/* Logic */
import AppLogic from 'containers/App/logic'

const FORM_SLICE = {
  nameSlice: {
    value: null,
  },
}
const VALIDATIONS = {
  nameSlice: [
    Check.isRequired
  ],
}

export default kea({
  path: () => ['scenes', 'SliceNew'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage',
      ]
    ],
  },

  actions: () => ({
    getListResources: () => ({ }),
    setListResources: (resources) => ({ resources }),
    modalNewSliceStatus: () => ({ }),
    modalStatus: () => ({ }),
    actionPanel: () => ({ }),
    loading: () => ({ }),
    errorfetch: () => ({ }),
    //Obter resources do pin
    createSlice: () => ({ }),
    selectLocation: (resources) => ({ resources }),
    setSelectPin: (pin) => ({ pin }),
    changeNetwork: (selectPin, networkSelectIndex, field, value ) => ({ selectPin, networkSelectIndex, field, value }),
    changeComputes: (selectPin, computeSelectIndex, field, value ) => ({ selectPin, computeSelectIndex, field, value }),
    changeBoxes: (selectPin ,boxIndex, physIndex, field, value ) => ({ selectPin ,boxIndex, physIndex, field, value }),
    changeRAN: (selectPin, ranIndex , field, value) =>({selectPin, ranIndex, field, value}),
    updateMarker: () => ({  }),
    change: (value) => ({ value }),
    resetSliceName: () => ({ }),
    showError: (error)  => ({ error }),
    reset: () => ({ }),
    setValue: (field) => ({ field }),
    setForm: (form) => ({ form }),
    setSelectSlice: (slice) => ({ slice }),
   }),

  reducers: ({ actions }) => ({
    loading:[false, PropTypes.boolean,{
      [actions.loading]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false,
    }],
    modalNewSlice: [false, PropTypes.boolean,{
      [actions.modalNewSliceStatus]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false,
    }],
    visiblePanel: [false, PropTypes.boolean,{
      [actions.actionPanel]: (state, payload) => !state,
      [actions.selectLocation]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false,
    }],
    pinsResources: [null, PropTypes.any, {
      [actions.setListResources]: (state, payload) => CreateAllPins(payload.resources),
      [actions.changeNetwork]: (state, payload) => {
        const { selectPin, networkSelectIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.networks[networkSelectIndex][field] = value
        return clone
      },
      [actions.changeComputes]: (state, payload) => {
        const { selectPin, computeSelectIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.computes[computeSelectIndex][field] = value
        return clone
      },
      [actions.changeBoxes]: (state, payload) => {
        const { selectPin, ranIndex, boxIndex, physIndex, field, value } = payload
        const clone = [...state]
        console.log(clone)
        //clone[selectPin].location.resources.rans[ranIndex].chunketeTopology.boxes[boxIndex].phys[physIndex][field] = value
        return clone
      },
      [actions.changeRAN]: (state, payload) => {
        const { selectPin, ranIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.rans[ranIndex][field] = value
        return clone
      }
    }],
    sliceName: [null, PropTypes.string, {
      [actions.change]: (state, payload) => payload.value,
      [actions.resetSliceName]: (state, payload) => null,
      [actions.modalNewSliceStatus]: (state, payload) => null,
    }],
    selectPin: [0, PropTypes.number, {
      [actions.setSelectPin]: (state, payload) => payload.pin
    }],
    modalError: [false ,PropTypes.boolean, {
      [actions.errorfetch]: (state, payload) => true,
      [actions.modalStatus]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false,
    }],
    error: [null, PropTypes.string, {
      [actions.showError]: (state, payload) => payload.error,
    }],
    formSlice:[FORM_SLICE, PropTypes.object,{
      [actions.setValue]: (state, payload) =>  Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) =>  Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.reset]: () => FORM_SLICE,
    }],
    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false
    }],
    selectSlice: [{computes:[], networks:[], sdnWifi:[]}, PropTypes.object, {
      [actions.setSelectSlice]: (state, payload) => payload.slice,
    }],
  }),

  selectors: ({ selectors }) => ({
    locations: [
      () => [selectors.pinsResources],
      (pinsResources) => (
        pinsResources && pinsResources.map(marker => [marker.location.longitude, marker.location.latitude])
      ),
      PropTypes.array
    ],
  }),

  start: function * () {
    const { getListResources } = this.actions

    yield put(getListResources())
  },

  stop: function * () {
    const { reset, removeLoadingPage } = this.actions

    yield put(removeLoadingPage())
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getListResources]: workers.getListResources,
    [actions.createSlice]: workers.createSlice,
    [actions.updateMarker]: workers.updateMarker,
    [actions.selectLocation]: workers.selectLocation,
  }),


  workers: {
    *selectLocation (action){
      const { setSelectPin, setSelectSlice } = this.actions
      const pinsResources = yield this.get('pinsResources')
      const pinIndex =
        pinsResources.findIndex(
          marker => JSON.stringify(marker) === JSON.stringify(action.payload.resources)
        )
        const selectPin = pinsResources[pinIndex]
        console.log(selectPin)
      yield put(setSelectPin(pinIndex))
      yield put(setSelectSlice(selectPin.location.resources))
    },

    *updateMarker (){
      const pinsResources = yield this.get('pinsResources')
      const pinIndex = yield this.get('selectPin')
      const { actionPanel, errorfetch, showError } = this.actions
      const resources = pinsResources[pinIndex].location.resources
      let found = false

      if (resources.computes) {
        found = resources.computes.find(compute => compute.ischecked)
        resources.computesCount++
      }

      if (!found && resources.networks) {
        found = resources.networks.find(network => network.ischecked)
         resources.networksCount++
      }

      if(!found && resources.rans){
        found = resources.rans.find((sdn) => sdn.ischecked)
        resources.sdnWifiCount++
      }

      if(found) {
        pinsResources[pinIndex].color = '#1e90ff'
      }

      const existCompute = resources.computes && resources.computes.find((sdn) => sdn.ischecked)
      const existNetwork = resources.networks && resources.networks.find((sdn) => sdn.ischecked)
      const existSdn = resources.sdnWifi && resources.rans.find((sdn) => sdn.ischecked)

      if (existSdn && existNetwork && existCompute) {
        yield put(actionPanel())
      } else if (existNetwork && existCompute) {
        yield put(actionPanel())
      } else if (!existSdn && !existNetwork && !existCompute){
        yield put(actionPanel())
      } else if (!existSdn && !existNetwork && existCompute){
        yield put(actionPanel())
      } else {
        if (existSdn && !existNetwork){
        yield put(showError('Slice needs a network'))
        } else if (existSdn && existNetwork && !existCompute) {
          yield put(showError('Slice needs a compute'))
        } else if (!existSdn && existNetwork && !existCompute) {
          yield put(showError('Slice needs a compute'))
        }
        pinsResources[pinIndex].color = null
        yield put(errorfetch())
      }
    },

    *getListResources(){
      const { setListResources, addLoadingPage, removeLoadingPage } = this.actions

      // add Loading
      yield put(addLoadingPage())
      try{
        const responseComputes = yield call(axios.get, `${API_BASE_URL}/compute`)
        const responseNetworks = yield call(axios.get, `${API_BASE_URL}/physical_network`)
        const responseRAN = yield call(axios.get, `${API_BASE_URL}/ran_infrastructure`)

        const listResources = {computes:[], networks:[], rans:[]}

        responseComputes && responseComputes.data.map(el => listResources.computes.push(el))

        responseNetworks && responseNetworks.data.map(el => listResources.networks.push(el))

        if(responseRAN) {
          for (let index = 0; index < responseRAN.data.length; index++) {
            const elementId = responseRAN.data[index].id;
            const responseChunketeTopology = yield call(axios.get, `${API_BASE_URL}/ran_infrastructure/${elementId}/chunkete_topology`)
            responseRAN.data.map(el => listResources.rans.push({...el, chunketeTopology: responseChunketeTopology.data || null }))
          }
        }

        yield put(removeLoadingPage())
        yield(put(setListResources(listResources)))
      }
      catch (error) {
        yield put(removeLoadingPage())
      }
    },

    *createSlice(){
        const pinsResources = yield this.get('pinsResources'),
          chunk_ids = [], vlans_ids = [],
        { modalStatus, loading, errorfetch, reset, modalNewSliceStatus, showError, getListResources } = this.actions
        const formSlice = yield this.get('formSlice')

        const findSlice = pinsResources.find(pin => pin.color === '#1e90ff')
        const validation = Check.checkValidation(formSlice, VALIDATIONS)

        if (validation.invalid){
          yield put(modalNewSliceStatus())
          yield put(modalStatus())
          yield put(showError('Input Slice name'))
        } else if (!findSlice) {
          yield put(modalNewSliceStatus())
          yield put(modalStatus())
          yield put(showError('Select a Compute'))
        } else {
        /*
         * 1º Create OpenStack
         * 2º Create Vlan
         * 3º Create Chunkete Chunk
         * 4º Create Chunks
         */
        yield put(showError('Slice needs a compute'))

        try{
          yield put(loading())
          let createSlice = false
          for (let pin of pinsResources) {
            if(pin.location.resources.computes){
              for (let compute of pin.location.resources.computes) {
                if(compute.ischecked){
                  // 1º Open stack
                  let currentDate = new Date()
                  const dataCompute = {
                    compute_id: compute.id,
                    description: compute.computeDescription,
                    name: compute.computeName,
                    username: `Test_${currentDate.valueOf()}`,
                    requirements: {
                      cpus: {
                        "required": compute.cpus
                      },
                      ram: {
                        "required": compute.ram,
                        "units": "MB"
                      },
                      storage: {
                        "required": compute.storage,
                        "units": "GB"
                      }
                    },
                  }
                  const response = yield call(axios.post, `${API_BASE_URL}/openstack_project`, dataCompute)
                  chunk_ids.push(response.data.id)
                  createSlice =true
                }
              }
            }
            if(pin.location.resources.networks){
              for (let network of pin.location.resources.networks) {
                if(network.ischecked){
                  // 2º vlans
                  const dataNetwork = {
                    cidr: network.cidr,
                    int_cidr: network.int_cidr,
                    openstack_project_id: chunk_ids[0],
                    physical_network_id: network.id,
                    name: network.networkName,
                    requirements: {
                      bandwidth: {
                        required: network.bandwidth,
                        units: 'MB/s'
                      },
                      floating_ips: {
                        required: network.floatingIps
                      }
                    },
                    tag: network.tag,
                  }
                  const response = yield call(axios.post, `${API_BASE_URL}/openstack_vlan`, dataNetwork)
                  chunk_ids.push(response.data.id)
                  vlans_ids.push(response.data.id)
                  createSlice =true
                }
              }
            }
            if(pin.location.resources.rans){
              for (let indexRAN = 0; indexRAN < pin.location.resources.rans.length; indexRAN++) {
                const ran = pin.location.resources.rans[indexRAN]
                const physicalList = []
                for (let indexBox = 0; indexBox < ran.chunketeTopology.boxes.length; indexBox++) {
                  const box = ran.chunketeTopology.boxes[indexBox]
                  for (let indexPhys = 0; indexPhys < box.phys.length; indexPhys++) {
                    const phy = box.phys[indexPhys]
                    if(phy.ischecked){
                      physicalList.push({id: phy.id})
                    }
                  }
                }
                const newChunkete = {
                  assignedQuota: ran.assignedQuota,
                  name: ran.chunketeName,
                  topology: {
                    linkList: [],
                    physicalInterfaceList: physicalList,
                  }
                }

                  // 3º Create Chunkete Chunk
                  const response = yield call(axios.post, `${API_BASE_URL}/ran_infrastructure/${ran.id}/chunkete_chunk`, newChunkete)
                  chunk_ids.push(response.data.id)
                  createSlice = true
                }
              }
            }
        if(createSlice){
        const dataChunk = {
        chunk_ids:chunk_ids,
        name: formSlice.nameSlice.value
        }
        // 4º Chunks
        const responseCreateSlice = yield call(axios.post, `${API_BASE_URL}/slic3`, dataChunk)

        if(responseCreateSlice.status===200){
          yield put(loading())
          yield put(modalStatus())
          yield put(reset())
          yield call(this.props.history.push, `/slices`)
        }
      }
      }
      catch (error) {
        yield put(loading())
        yield put(modalNewSliceStatus())
        yield put(modalStatus())
        yield put(errorfetch())
        yield put(showError(error.response.data.message))
        yield put(getListResources())
      }
    }
  }
}
})
