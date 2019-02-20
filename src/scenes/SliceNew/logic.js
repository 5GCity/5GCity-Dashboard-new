/**
 * SliceNew Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axios from 'axios'
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'config'
import { createAllPins } from './utils'

export default kea({
  path: () => ['scenes', 'SliceNew'],

  actions: () => ({
    getListResources: () => ({ }),
    setListResources: (resources) => ({ resources }),
    modalNewSliceStatus: () => ({ }),
    modalStatus: () => ({ }),
    closePanel: () => ({ }),
    openPanel: (marker) => ({ marker }),
    resetResource: () => ({ }),
    resetCard: () => ({ }),
    removeResources: () => ({ }),
    isLoading: () => ({ }),
    errorfetch: () => ({ }),
    //Obter resources do pin
    createSlice: () => ({ }),
    setSelectPin: (pin) => ({ pin }),
    changeNetwork: (selectPin, networkSelectIndex, field, value ) => ({ selectPin, networkSelectIndex, field, value }),
    changeComputes: (selectPin, computeSelectIndex, field, value ) => ({ selectPin, computeSelectIndex, field, value }),
    changeSDN: (selectPin, sdnSelectIndex, field, value ) => ({ selectPin, sdnSelectIndex, field, value }),
    updateMarker: () => ({  }),
    change: (value) => ({ value }),
    resetSliceName: () => ({ })
   }),

  reducers: ({ actions }) => ({
    loading:[false, PropTypes.boolean,{
      [actions.isLoading]: (state, payload) => !state,
    }],
    modalNewSlice: [false, PropTypes.boolean,{
      [actions.modalNewSliceStatus]: (state, payload) => !state,
    }],
    visiblePanel: [false, PropTypes.boolean,{
      [actions.openPanel]: (state, payload) => true,
      [actions.closePanel]: (state, payload) => false,
    }],
    pinsResources: [null, PropTypes.any, {
      [actions.setListResources]: (state, payload) => createAllPins(payload.resources),
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
      [actions.changeSDN]: (state, payload) => {
        const { selectPin, sdnSelectIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.sdnWifi[sdnSelectIndex][field] = value
        return clone
      }
    }],
    sliceName: [null, PropTypes.string,{
      [actions.change]: (state, payload) => payload.value,
      [actions.resetSliceName]: (state, payload) => null,
      [actions.modalNewSliceStatus]: (state, payload) => null,
    }],
    selectPin: [0, PropTypes.number,{
      [actions.setSelectPin]: (state, payload) => payload.pin
    }],
    modalError: [false ,PropTypes.boolean,{
      [actions.errorfetch]: (state, payload) => true,
      [actions.modalStatus]: (state, payload) => !state,
    }]
  }),


  start: function * () {
    const { getListResources } = this.actions
    yield put(getListResources())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.getListResources]: workers.getListResources,
    [actions.createSlice]: workers.createSlice,
    [actions.updateMarker]: workers.updateMarker,
    [actions.openPanel]: workers.openPanel
  }),


  workers: {
    *openPanel (action){
      const { setSelectPin } = this.actions
      const pinsResources = yield this.get('pinsResources')
      const pinIndex =
        pinsResources.findIndex(
          marker => JSON.stringify(marker) === JSON.stringify(action.payload.marker)
        )
      yield put(setSelectPin(pinIndex))
    },

    *updateMarker (){
      const pinsResources = yield this.get('pinsResources')
      const pinIndex = yield this.get('selectPin')
      const { closePanel, errorfetch } = this.actions
      const resources = pinsResources[pinIndex].location.resources
      let found = false

      if (resources.computes) {
        found = resources.computes.find((compute) => compute.ischecked)
        resources.computesCount++
      }

      if (!found && resources.networks) {
        found = resources.networks.find((network) => network.ischecked)
         resources.networksCount++
      }

      if(!found && resources.sdnWifi){
        found = resources.sdnWifi.find((sdn) => sdn.ischecked)
        resources.sdnWifiCount++
      }

      if(found) {
        pinsResources[pinIndex].color = '#1e90ff'
      }

      const existCompute = resources.computes && resources.computes.find((sdn) => sdn.ischecked)
      const existNetwork = resources.networks && resources.networks.find((sdn) => sdn.ischecked)
      const existSdn = resources.sdnWifi && resources.sdnWifi.find((sdn) => sdn.ischecked)

      if (existSdn && existNetwork && existCompute) {
        yield put(closePanel())
      } else if (existNetwork && existCompute) {
        yield put(closePanel())
      } else if (existCompute && !existNetwork && !existSdn) {
        yield put(closePanel())
      } else if(!existSdn && !existNetwork && !existCompute){
        yield put(closePanel())
      } else {
        yield put(errorfetch())
      }
    },

    *getListResources(){
      const { setListResources } = this.actions
      try{
        const responseComputes = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/compute`)
        const responseNetworks = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/physical_network`)
        const responseSdnWifi = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/sdn_wifi_access_point`)

        const listResources = {computes:[], networks:[], sdnWifi:[]}

        if(responseComputes) {
          responseComputes.data.map(el => listResources.computes.push(el))
        }
        if(responseNetworks) {
          responseNetworks.data.map(el => listResources.networks.push(el))
        }
        if(responseSdnWifi) {
          responseSdnWifi.data.map(el => listResources.sdnWifi.push(el))
        }
        console.log("Resposta")
        yield(put(setListResources(listResources)))
      }
      catch (error) {
        console.log(error)
      }
    },

    *createSlice(){
        const pinsResources = yield this.get('pinsResources'),
          chunk_ids = [], vlans_ids = [],
        { modalStatus, isLoading, errorfetch, resetSliceName, modalNewSliceStatus } = this.actions
        /*
         * 1º Create OpenStack
         * 2º Create Vlan
         * 3º Virtual Create Wifi Access Point
         * 4º Create Chunks
         */
        const sliceName = yield this.get('sliceName')
        try{
          yield put(isLoading())
          let createSlice = false
          for (let pin of pinsResources) {
            if(pin.location.resources.computes){
              for (let compute of pin.location.resources.computes) {
                if(compute.ischecked){
                  // 1º Open stack
                  let currentDate = new Date()
                  const dataCompute = {
                    "compute_id": compute.id,
                    "description": `Test_${currentDate.valueOf()}`,
                    "name": `Test_${currentDate.valueOf()}`,
                    "username": `Test_${currentDate.valueOf()}`
                  }
                  const response = yield call(axios.post, `${API_BASE_URL}/slicemanagerapi/openstack_project`, dataCompute)
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
                    "cidr": network.cidr,
                    "openstack_project_id": chunk_ids[0],
                    "physical_network_id": network.id,
                  }
                  const response = yield call(axios.post, `${API_BASE_URL}/slicemanagerapi/openstack_vlan`, dataNetwork)
                  chunk_ids.push(response.data.id)
                  vlans_ids.push(response.data.id)
                  createSlice =true
                }
              }
            }
            if(pin.location.resources.sdnWifi){
              for (let sdnWifi of pin.location.resources.sdnWifi) {
                if(sdnWifi.ischecked){
                  // 3º Virtual Wifi Access Point
                  const dataSdnWifi = {
                    channel: sdnWifi.channel,
                    dhcpd_ip: sdnWifi.dhcpd,
                    dns_ip: sdnWifi.dns,
                    name: sdnWifi.sdnWifiName,
                    openstack_vlan_id: vlans_ids[0],
                    sdn_wifi_access_point_id: sdnWifi.id,
                  }
                  const response = yield call(axios.post, `${API_BASE_URL}/slicemanagerapi/virtual_wifi_access_point`, dataSdnWifi)
                  chunk_ids.push(response.data.id)
                  createSlice =true
                }
              }
            }
          }
        if(createSlice){
        const dataChunk = {
        chunk_ids:chunk_ids,
        name: sliceName
        }
        // 4º Chunks
        const responseCreateSlice = yield call(axios.post, `${API_BASE_URL}/slicemanagerapi/slic3`, dataChunk)

        if(responseCreateSlice.status===200){
          yield put(isLoading())
          yield put(modalStatus())
          yield put(resetSliceName())
          yield call(this.props.history.push, `/slices`)
        }
      }
      }
      catch (error) {
        yield put(isLoading())
        yield put(modalNewSliceStatus())
        yield put(modalStatus())
        yield put(errorfetch())
        console.log(error)
      }

    }
  }
})

