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
import { API_SLICE_MANAGEMENT } from 'config'
import { CreateAllPins, GetSelectComputes,
  GetSelectNetworks, GetSelectRadioPhys, GETAllChunkIds } from './utils'
import * as Check from 'validations'

/* Logic */
import AppLogic from 'containers/App/logic'

const FORM_SLICE = {
  nameSlice: {
    value: null
  }
}

const FORM_CHUNK = {
  assignedQuota: {
    value: null
  },
  name: {
    value: null
  }
}
const VALIDATIONS = {
  nameSlice: [
    Check.isRequired
  ],
  assignedQuota: [
    Check.isRequired
  ],
  name: [
    Check.isRequired
  ]
}

export default kea({
  path: () => ['scenes', 'SliceNew'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ]
  },

  actions: () => ({
    getListResources: () => ({ }),
    setListResources: (resources) => ({ resources }),
    modalNewSliceStatus: () => ({ }),
    modalStatus: () => ({ }),
    actionPanel: () => ({ }),
    loading: () => ({ }),
    errorfetch: () => ({ }),
    // Obter resources do pin

    createSlice: () => ({ }),

    selectLocation: (resources) => ({ resources }),
    setSelectPin: (pin) => ({ pin }),
    changeNetwork: (selectPin, networkSelectIndex, field, value) => ({ selectPin, networkSelectIndex, field, value }),
    changeComputes: (selectPin, computeSelectIndex, field, value) => ({ selectPin, computeSelectIndex, field, value }),
    changeWifi: (selectPin, physIndex, field, value) => ({ selectPin, physIndex, field, value }),
    updateMarker: () => ({ }),
    change: (value) => ({ value }),
    resetSliceName: () => ({ }),
    showError: (error) => ({ error }),
    reset: () => ({ }),
    setValue: (field) => ({ field }),
    setForm: (form) => ({ form }),
    setSelectSlice: (slice) => ({ slice }),

    setFormChunk: (boxes) => ({ boxes }),
    modalChunketeStatus: () => ({}),
    changeValue: (field) => ({ field }),
    setBoxesInfo: (boxes) => ({ boxes }),
    setChunketes: (form) => ({ form }),
    setChunkete: (chunkete) => ({ chunkete }),
    verifySlice: () => ({})
  }),

  reducers: ({ actions }) => ({
    loading: [false, PropTypes.boolean, {
      [actions.loading]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false
    }],
    modalNewSlice: [false, PropTypes.boolean, {
      [actions.modalNewSliceStatus]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false
    }],
    visiblePanel: [false, PropTypes.boolean, {
      [actions.actionPanel]: (state, payload) => !state,
      [actions.selectLocation]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false
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
      [actions.changeWifi]: (state, payload) => {
        const { selectPin, physIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.wifi[physIndex][field] = value
        return clone
      },
      [actions.changeLTE]: (state, payload) => {
        const { selectPin, physIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.lte[physIndex][field] = value
        return clone
      },
    }],
    sliceName: [null, PropTypes.string, {
      [actions.change]: (state, payload) => payload.value,
      [actions.resetSliceName]: (state, payload) => null,
      [actions.modalNewSliceStatus]: (state, payload) => null
    }],
    selectPin: [0, PropTypes.number, {
      [actions.setSelectPin]: (state, payload) => payload.pin
    }],
    modalError: [false, PropTypes.boolean, {
      [actions.errorfetch]: (state, payload) => true,
      [actions.modalStatus]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false
    }],
    error: [null, PropTypes.string, {
      [actions.showError]: (state, payload) => payload.error
    }],
    formSlice: [FORM_SLICE, PropTypes.object, {
      [actions.setValue]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setForm]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.reset]: () => FORM_SLICE
    }],
    formChunkete: [FORM_CHUNK, PropTypes.object, {
      [actions.changeValue]: (state, payload) => Check.setAndCheckValidation(state, payload, VALIDATIONS),
      [actions.setChunketes]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,
      [actions.reset]: () => FORM_CHUNK
    }],
    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false
    }],
    selectSlice: [{ computes: [], networks: [], radioPhys:[] }, PropTypes.object, {
      [actions.setSelectSlice]: (state, payload) => payload.slice
    }],
    modalChunkete: [false, PropTypes.boolean, {
      [actions.modalChunketeStatus]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false
    }],
    boxes: [[], PropTypes.any, {
      [actions.setBoxesInfo]: (state, payload) => payload.boxes
    }]
  }),

  selectors: ({ selectors }) => ({
    locations: [
      () => [selectors.pinsResources],
      (pinsResources) => (
        pinsResources && pinsResources.map(marker => [marker.location.longitude, marker.location.latitude])
      ),
      PropTypes.array
    ]
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
    [actions.verifySlice]: workers.verifySlice,
    [actions.updateMarker]: workers.updateMarker,
    [actions.selectLocation]: workers.selectLocation,
    [actions.setFormChunk]: workers.setFormChunk,
    [actions.createSlice]: workers.createSlice,
    [actions.setChunkete]: workers.setChunkete
  }),

  workers: {
    * selectLocation (action) {
      const { setSelectPin, setSelectSlice } = this.actions
      const pinsResources = yield this.get('pinsResources')
      const pinIndex =
        pinsResources.findIndex(
          marker => JSON.stringify(marker) === JSON.stringify(action.payload.resources)
        )
      const selectPin = pinsResources[pinIndex]
      yield put(setSelectPin(pinIndex))
      yield put(setSelectSlice(selectPin.location.resources))
    },

    * updateMarker () {
      const pinsResources = yield this.get('pinsResources')
      const pinIndex = yield this.get('selectPin')
      const { actionPanel } = this.actions
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

      if (!found && resources.boxes) {
        resources.boxes.forEach(box => {
          box.phys.forEach(phy => {
            if (phy.ischecked) {
              found = true
            }
          })
        })
      }

      if (found) {
        pinsResources[pinIndex].color = '#1e90ff'
      } else {
        pinsResources[pinIndex].color = null
      }
      yield put(actionPanel())
    },

    * getListResources () {
      const { setListResources, addLoadingPage, removeLoadingPage } = this.actions

      // add Loading
      yield put(addLoadingPage())
      try {
        const responseComputes = yield call(axios.get, `${API_SLICE_MANAGEMENT}/compute`)
        const responseNetworks = yield call(axios.get, `${API_SLICE_MANAGEMENT}/physical_network`)
        const responseRadioPhys = yield call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure/configuredRadioPhys`)

        const listResources = {computes: [], networks: [], radioPhys: [] }

        responseComputes && responseComputes.data.map(el => listResources.computes.push(el))

        responseNetworks && responseNetworks.data.map(el => listResources.networks.push(el))

        responseRadioPhys && responseRadioPhys.data[0].map(el => listResources.radioPhys.push(el))

        yield put(removeLoadingPage())
        yield (put(setListResources(listResources)))
      } catch (error) {
        yield put(removeLoadingPage())
      }
    },

    * verifySlice () {
      const pinsResources = yield this.get('pinsResources')
      const { modalStatus, showError, setBoxesInfo,
        setFormChunk, modalNewSliceStatus } = this.actions

      const findSlice = pinsResources.find(pin => pin.color === '#1e90ff')

      // All Computes Select
      const selectComputes = GetSelectComputes(pinsResources)
      // All Boxes
      const selectBoxes = GetSelectRadioPhys(pinsResources)

      if (!findSlice || !selectComputes) {
        yield put(modalStatus())
        yield put(showError('Select a Compute'))
      } else if (selectBoxes) {
        yield put(setBoxesInfo(selectBoxes))
        yield put(setFormChunk(selectBoxes))
      } else {
        yield put(modalNewSliceStatus())
      }
    },

    * setFormChunk (action) {
      const boxes = action.payload.boxes
      const { setChunketes, modalChunketeStatus } = this.actions
      yield put(modalChunketeStatus())
      const formChunk = {
        assignedQuota: {
          array: []
        },
        name: {
          array: []
        }
      }
      const newValue = {value: null}
      boxes.forEach(box => {
        formChunk.assignedQuota.array.push(newValue)
        formChunk.name.array.push(newValue)
      })
      yield put(setChunketes(formChunk))
    },

    * createSlice () {
      const pinsResources = yield this.get('pinsResources')
      const { modalStatus, loading, errorfetch, reset,
          modalNewSliceStatus, showError,
          getListResources } = this.actions
      const formSlice = yield this.get('formSlice')
      const formChunk = yield this.get('formChunkete')
      const resourcesLocations = []

      const validation = Check.checkValidation(formSlice, VALIDATIONS)

      if (validation.invalid) {
        yield put(modalStatus())
        yield put(showError('Input Slice name'))
      }

      // All Computes Select
      const selectComputes = GetSelectComputes(pinsResources)
      // All Networks Select
      const selectNetworks = GetSelectNetworks(pinsResources)
      // All Boxes
      const selectBoxes = GetSelectRadioPhys(pinsResources)
         /*
         * 1º Create OpenStack
         * 2º Create Vlan
         * 3º Create Chunkete Chunk
         * 4º Create Chunks
         */
      try {
        yield put(loading())
        let createSlice = false
        if (selectComputes) {
          for (let compute of selectComputes) {
            let indexCompute = 0
                // 1º Open stack
            let currentDate = new Date()
            const dataCompute = {
              compute_id: compute.id,
              description: compute.computeDescription,
              availability_zone: compute.availabilityZone,
              name: compute.computeName,
              username: `Test_${currentDate.valueOf()}`,
              requirements: {
                cpus: {
                  'required': compute.cpus
                },
                ram: {
                  'required': compute.ram,
                  'units': compute.ramUnits || compute.computeData.ram.units
                },
                storage: {
                  'required': compute.storage,
                  'units': compute.storageUnits || compute.computeData.storage.units
                }
              }
            }
            const { data } = yield call(axios.post, `${API_SLICE_MANAGEMENT}/openstack_project`, dataCompute)
            const findLocation = resourcesLocations.find(location => location === compute.location)
            if(findLocation) {
              findLocation.chunkIds.push({index: indexCompute++, idChunk: data.id, nameChunk: data.name})
            } else {
              resourcesLocations.push({location: {...compute.location},  chunkIds: [{index: indexCompute++, idChunk: data.id, nameChunk: data.name}]})
            }
            createSlice = true
          }
        }
        if (selectNetworks) {
          for (let network of selectNetworks) {
            const openStackLocation = resourcesLocations.find(resource => resource.location.latitude === network.location.latitude && resource.location.longitude === network.location.longitude )
            console.log(openStackLocation, network)
            // 2º vlans
            const dataNetwork = {
              cidr: network.cidr,
              int_cidr: network.int_cidr,
              openstack_project_id: openStackLocation.chunkIds[0].idChunk,
              physical_network_id: network.id,
              name: network.networkName,
              requirements: {
                bandwidth: {
                  required: network.bandwidth,
                  units: network.bandwidthUnits || network.networkData.bandwidth.units
                }
              },
            }
            const { data } = yield call(axios.post, `${API_SLICE_MANAGEMENT}/openstack_vlan`, dataNetwork)
            openStackLocation.chunkIds.push(data.id)
            vlansIds.push(data.id)
            createSlice = true
          }
        }
        if (selectBoxes) {
          let ran = null
          const ids = []
          for (let boxes of selectBoxes) {
            ran = boxes.ranId
            boxes.boxes.forEach(box =>
                  ids.push({id: box.id})
                )
          }
          const newChunkete = {
            assignedQuota: formChunk.assignedQuota.value,
            name: formChunk.name.value,
            topology: {
              linkList: [],
              physicalInterfaceList: ids
            }
          }

              // 3º Create Chunkete Chunk
          const response = yield call(axios.post, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${ran}/chunkete_chunk`, newChunkete)
          chunkIds.push(response.data.id)
          createSlice = true
        }
        if (createSlice) {
          const chunkIds = GETAllChunkIds(resourcesLocations)
          const dataChunk = {
            chunkIds: chunkIds,
            name: formSlice.nameSlice.value
          }
        // 4º Chunks
          const responseCreateSlice = yield call(axios.post, `${API_SLICE_MANAGEMENT}/slic3`, dataChunk)

          if (responseCreateSlice.status === 200) {
            yield put(loading())
            yield put(modalNewSliceStatus())
            yield put(reset())
            yield call(this.props.history.push, `/slices`)
          }
        }
      } catch (error) {
        yield put(loading())
        yield put(modalNewSliceStatus())
        yield put(modalStatus())
        yield put(errorfetch())
        yield put(showError(error.response.data.message))
        yield put(getListResources())
      }
    },

    * setChunkete () {
      const { modalChunketeStatus, modalNewSliceStatus } = this.actions

      const formChunk = yield this.get('formChunkete')

      const validation = Check.checkValidation(formChunk, VALIDATIONS)
      if (!validation.invalid) {
        yield put(modalChunketeStatus())
        yield put(modalNewSliceStatus())
      }
    }
  }
})
