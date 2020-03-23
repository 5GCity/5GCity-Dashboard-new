/**
 * SliceNew Container Logic
 * Please write a description
 *
 */

import { kea } from 'kea'
import { put, call, all } from 'redux-saga/effects'
import axios from 'axios'
import PropTypes from 'prop-types'
import { API_SLICE_MANAGEMENT } from 'config'
import { CreateAllPins, GetSelectComputes, GetSelectRadioPhys, GETAllChunkIds, GetNetworks, FindComputeFOS } from './utils'
import * as Check from 'validations'

/* Logic */
import AppLogic from 'containers/App/logic'

const FORM_SLICE = {
  nameSlice: {
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
    changeNetwork: (field, value, id) => ({ field, value, id }),
    changeComputes: (selectPin, computeSelectIndex, field, value) => ({ selectPin, computeSelectIndex, field, value }),
    changeWifi: (selectPin, physIndex, field, value) => ({ selectPin, physIndex, field, value }),
    changeLTE: (selectPin, physIndex, field, value) => ({ selectPin, physIndex, field, value }),
    updateMarker: () => ({ }),
    change: (value) => ({ value }),
    resetSliceName: () => ({ }),
    showError: (error) => ({ error }),
    setValue: (field) => ({ field }),
    setForm: (form) => ({ form }),
    setSelectSlice: (slice) => ({ slice }),

    setFormChunk: (phys) => ({ phys }),
    modalChunketeStatus: () => ({}),
    changeChunkete: (key, value, index) => ({ key, value, index }),
    setRadioPhysInfo: (phys) => ({ phys }),
    setChunketes: (form) => ({ form }),
    setChunketesInfo: (info) => ({ info }),
    setChunkete: (chunkete) => ({ chunkete }),
    setNetwork: (networks) => ({ networks }),
    verifySlice: () => ({}),

    reset: () => ({})
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
        clone[selectPin].location.resources.LTE[physIndex][field] = value
        return clone
      }
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
    formChunkete: [null, PropTypes.object, {
      [actions.changeChunkete]: (state, payload) => Check.setAndCheckValidationArray(state, payload, VALIDATIONS),
      [actions.setChunketes]: (state, payload) => Check.checkValidation(payload.form, VALIDATIONS).form,

      [actions.reset]: () => null
    }],
    infoChunkete: [null, PropTypes.array, {
      [actions.setChunketesInfo]: (state, payload) => payload.info,

      [actions.reset]: () => null
    }],
    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false
    }],
    selectSlice: [null, PropTypes.object, {
      [actions.setSelectSlice]: (state, payload) => payload.slice
    }],
    modalChunkete: [false, PropTypes.boolean, {
      [actions.modalChunketeStatus]: (state, payload) => !state,
      [actions.reset]: (state, payload) => false
    }],
    boxes: [[], PropTypes.any, {
      [actions.setRadioPhysInfo]: (state, payload) => payload.phys
    }],
    networks: [null, PropTypes.array, {
      [actions.setNetwork]: (state, payload) => payload.networks,
      [actions.reset]: (state, payload) => null
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
    [actions.setChunkete]: workers.setChunkete,
    [actions.changeNetwork]: workers.changeNetwork
  }),

  workers: {
    * changeNetwork (action) {
      const networks = yield this.get('networks')
      const { setNetwork } = this.actions
      const { field, value, id } = action.payload
      const net = networks.find(item => item.ischecked === true)
      if (net && net.id !== id) {
        net.ischecked = false
      }
      const network = networks.find(item => item.id === action.payload.id)
      network[field] = value

      yield put(setNetwork([...networks]))
    },

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

      if (!found && resources.wifi) {
        resources.wifi.forEach(phy => {
          if (phy.ischecked) {
            found = true
          }
        })
      }

      if (!found && resources.LTE) {
        resources.LTE.forEach(phy => {
          if (phy.ischecked) {
            found = true
          }
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
      const { setListResources, addLoadingPage, removeLoadingPage, setNetwork, showError, modalStatus } = this.actions

      // add Loading
      yield put(addLoadingPage())
      try {
        const [responseComputes, responseNetworks, responseRadioPhys] = yield all([
          call(axios.get, `${API_SLICE_MANAGEMENT}/compute`),
          call(axios.get, `${API_SLICE_MANAGEMENT}/physical_network`),
          call(axios.get, `${API_SLICE_MANAGEMENT}/ran_infrastructure/configuredRadioPhys`)
        ])

        const listResources = { computes: [], networks: [], radioPhys: [] }

        responseComputes && responseComputes.data.map(el => listResources.computes.push(el))
        responseRadioPhys && responseRadioPhys.data[0] && responseRadioPhys.data[0].map(el => listResources.radioPhys.push(el))
        const networks = GetNetworks(responseNetworks.data)
        listResources.networks = networks && networks
        yield (put(setNetwork(networks)))
        yield (put(setListResources(listResources)))
        yield put(removeLoadingPage())
      } catch (error) {
        yield put(modalStatus())
        yield put(showError('Internal server error'))
        yield put(removeLoadingPage())
      }
    },

    * verifySlice () {
      const pinsResources = yield this.get('pinsResources')
      const networks = yield this.get('networks')
      const { modalStatus, showError, setRadioPhysInfo, modalNewSliceStatus, setFormChunk } = this.actions

      const findSlice = pinsResources.find(pin => pin.color === '#1e90ff')

      // All Computes Select
      const selectComputes = GetSelectComputes(pinsResources)
      // Network Select
      const selectNetworks = networks && networks.find(net => net.ischecked === true)
      // All Radio Phys
      const selectRadioPhys = GetSelectRadioPhys(pinsResources)

      if (!findSlice || !selectComputes) {
        yield put(modalStatus())
        yield put(showError('Select a compute'))
      } else if (!selectNetworks) {
        yield put(modalStatus())
        yield put(showError('Need one physical network selected'))
      } else if (selectRadioPhys.wifi.length > 0 || selectRadioPhys.lte.length > 0) {
        yield put(setRadioPhysInfo(selectRadioPhys))
        yield put(setFormChunk(selectRadioPhys))
        yield put(modalNewSliceStatus())
      } else {
        yield put(modalNewSliceStatus())
      }
    },

    * setFormChunk (action) {
      const phys = action.payload.phys
      const { setChunketes, modalChunketeStatus, setChunketesInfo } = this.actions
      yield put(modalChunketeStatus())
      const formChunk = {
        assignedQuota: {
          array: []
        },
        name: {
          array: []
        }
      }
      const infoChunk = []
      const ransIds = []
      phys.wifi && phys.wifi.forEach(wifi => {
        const findRan = ransIds.find(ranId => ranId === wifi.ranId)
        if (!findRan) {
          formChunk.assignedQuota.array.push({value: null, valid: false})
          formChunk.name.array.push({value: null, valid: false})
          ransIds.push(wifi.ranId)
          infoChunk.push({physName: [wifi.name], ranId: wifi.ranId, type: 'wifi', typeConfig: wifi.type, config: [{...wifi.config, type: wifi.type}], physIds: [wifi.id]})
        } else {
          const findChunk = infoChunk.find(chunk => chunk.ranId === findRan)
          findChunk.physName.push(wifi.name)
          findChunk.config.push({...wifi.config, type: wifi.type})
          findChunk.physIds.push(wifi.id)
        }
      })
      phys.lte && phys.lte.forEach(lte => {
        const findRan = ransIds.find(ranId => ranId === lte.ranId)
        if (!findRan) {
          formChunk.assignedQuota.array.push({value: null, valid: false})
          formChunk.name.array.push({value: null, valid: false})
          ransIds.push(lte.ranId)
          infoChunk.push({physName: [lte.name], ranId: lte.ranId, type: 'LTE', typeConfig: lte.type, config: [{...lte.config, type: lte.type}], physIds: [lte.id]})
        } else {
          const findChunk = infoChunk.find(chunk => chunk.ranId === findRan)
          findChunk.physName.push(lte.name)
          findChunk.config.push({...lte.config, type: lte.type})
          findChunk.physIds.push(lte.id)
        }
      })
      yield put(setChunketesInfo(infoChunk))
      yield put(setChunketes(formChunk))
    },

    * createSlice () {
      const pinsResources = yield this.get('pinsResources')
      const networks = yield this.get('networks')
      const { modalStatus, loading, errorfetch, reset,
          modalNewSliceStatus, showError,
          getListResources } = this.actions
      const formSlice = yield this.get('formSlice')
      const infoChunkete = yield this.get('infoChunkete')
      const openstackProjects = []

      const validation = Check.checkValidation(formSlice, VALIDATIONS)

      if (validation.invalid) {
        yield put(modalStatus())
        yield put(showError('Input Slice name'))
      }

      // All Computes Select
      const selectComputes = GetSelectComputes(pinsResources)
      // All Networks Select
      const selectNetworks = networks && networks.find(net => net.ischecked === true)
      // All RadioPhys
      const selectRadioPhys = infoChunkete
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
            openstackProjects.push({ idChunk: data.id, nameChunk: data.name, type: compute.type })

            createSlice = true
          }
        }
        if (selectNetworks) {
          const openStack = FindComputeFOS(openstackProjects)
            // 2º vlans
          const dataNetwork = {
            name: selectNetworks.nameNetwork,
            openstack_project_id: openStack,
            physical_network_id: selectNetworks.id,
            requirements: {
              bandwidth: {
                required: selectNetworks.bandwidth,
                units: selectNetworks.bandwidthUnits || selectNetworks.units
              }
            }
          }
          const { data } = yield call(axios.post, `${API_SLICE_MANAGEMENT}/openstack_vlan`, dataNetwork)
          openstackProjects.push({ idChunk: data.id, nameChunk: data.name })
          createSlice = true
        }
        if (selectRadioPhys) {
          for (let index = 0; index < selectRadioPhys.length; index++) {
            const phy = selectRadioPhys[index]
            // 3º Create Chunkete Chunk
            const newChunkete = {
              assignedQuota: 0,
              name: `${formSlice.nameSlice.value}_chunkete`,
              topology: {
                physicalInterfaceList: []
              }
            }
            for (let index = 0; index < phy.config.length; index++) {
              newChunkete.topology.physicalInterfaceList.push({config: phy.config[index], id: phy.physIds[index], name: phy.physName[index], type: phy.config[index].type})
            }
            const { data } = yield call(axios.post, `${API_SLICE_MANAGEMENT}/ran_infrastructure/${phy.ranId}/chunkete_chunk`, newChunkete)
            openstackProjects.push({ idChunk: data.id, nameChunk: data.name })
            createSlice = true
          }
        }
        if (createSlice) {
          const chunkIds = GETAllChunkIds(openstackProjects)
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
        yield put(showError(error.response.data.message || 'Internal Error'))
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
