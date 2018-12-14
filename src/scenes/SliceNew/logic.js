/**
 * SliceNew Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'

import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'config'
import { createAllPins } from './utils';

export default kea({
  path: () => ['scenes', 'SliceNew'],

  actions: () => ({
    getListResources: () => ({ }),
    setListResources: (resources) => ({ resources }),
    closeModal: () => ({ }),
    openModal: () => ({ }),
    closePanel: () => ({ }),
    openPanel: (marker) => ({ marker }),
    resetResource: () => ({ }),
    resetCard: () => ({ }),
    removeResources: () => ({ }),
    isLoading: () => ({ }),
    isnLoading: () => ({ }),
    errorfetch: () => ({ }),
    //Obter resources do pin
    createSlice: () => ({ }),
    setSelectPin: (pin) => ({ pin }),
    changeNetwork: (selectPin, networkSelectIndex, field, value ) => ({ selectPin, networkSelectIndex, field, value }),
    changeComputes: (selectPin, computeSelectIndex, field, value ) => ({ selectPin, computeSelectIndex, field, value }),
    changeHotspot: (selectPin, hotspotSelectIndex, field, value ) => ({ selectPin, hotspotSelectIndex, field, value }),
    updateMarker: () => ({  }),
    change: (value) => ({ value }),
    resetSliceName: () => ({ })
   }),

  reducers: ({ actions }) => ({
    loading:[false, PropTypes.boolean,{
      [actions.isLoading]: (state, payload) => true,
      [actions.isnLoading]: (state, payload) => false,
    }],
    dialogVisible: [false, PropTypes.boolean,{
      [actions.openModal]: (state, payload) => true,
      [actions.closeModal]: (state, payload) => false,
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
      [actions.changeHotspot]: (state, payload) => {
        const { selectPin, hotspotSelectIndex, field, value } = payload
        const clone = [...state]
        clone[selectPin].location.resources.hotspots[hotspotSelectIndex][field] = value
        return clone
      }
    }],
    sliceName: [null, PropTypes.string,{
      [actions.change]: (state, payload) => payload.value,
      [actions.resetSliceName]: (state, payload) => null
    }],
    selectPin: [0, PropTypes.number,{
      [actions.setSelectPin]: (state, payload) => payload.pin
    }],
    error: [false ,PropTypes.boolean,{
      [actions.errorfetch]: (state, payload) => true,
      [actions.closeModal]: (state, payload) => false
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
      const pinIndex = pinsResources.findIndex(marker => 
        JSON.stringify(marker) === JSON.stringify(action.payload.marker)
      )
      yield put(setSelectPin(pinIndex))
    },

    *updateMarker (){
      const pinsResources = yield this.get('pinsResources')
      const pinIndex = yield this.get('selectPin')
      const { closePanel } = this.actions
      let found = false
      pinsResources[pinIndex].location.resources.computes && 
      pinsResources[pinIndex].location.resources.computes.foreach((compute) =>{
        if(compute.ischecked === true){
          return found = true
        }
      })
      pinsResources[pinIndex].location.resources.networks && 
      pinsResources[pinIndex].location.resources.networks.foreach((network) =>{
        if(network.ischecked === true){
          return found = true
        }
      })
      pinsResources[pinIndex].location.resources.hotspots && 
      pinsResources[pinIndex].location.resources.hotspots.foreach((hotspot) =>{
        if(hotspot.ischecked === true){
          return found = true
        }
      })
      if(found === true) { 
        pinsResources[pinIndex].color = '#1e90ff' 
      }
      else{ 
        pinsResources[pinIndex].color = null 
      }

      yield put(closePanel())
    },

    *getListResources(){
      const { setListResources } = this.actions

      try{      
        const responseComputes = yield call(axios.get ,`${API_BASE_URL}/slicemanagerapi/compute`)
        const responseNetworks = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/physical_network`)
        const listResources = {computes:[], networks:[]} 
        if(responseComputes){
          responseComputes.data.map(el => listResources.computes.push(el))
        }
        if(responseNetworks){
          responseNetworks.data.map(el => listResources.networks.push(el))          
        }
        yield(put(setListResources(listResources)))
      }
      catch (error) {
        console.log(error)
      } 
    },

    *createSlice(){
        const pinsResources = yield this.get('pinsResources'), 
        chunk_ids=[]
        const { 
          closeModal, 
          isLoading, 
          isnLoading, 
          errorfetch, 
          resetSliceName 
        } = this.actions
        /*
         * 1º Create OpenStack
         * 2º Create Vlan
         * 3º Create Chunks 
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
              let currentDate = new Date()
              const dataNetwork = {
                    "cidr": network.cidr,
                    "name": `Test_${currentDate.valueOf()}`,
                    "openstack_project_id": chunk_ids[0],
                    "physical_network_id": network.id,
                    "tag": network.tag
                }
                const response = yield call(axios.post, `${API_BASE_URL}/slicemanagerapi/openstack_vlan`, dataNetwork)
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
        // 3º Chunks
        const responseCreateSlice = yield call(axios.post, `${API_BASE_URL}/slicemanagerapi/slic3`, dataChunk)

        if(responseCreateSlice.status===200){
          yield put(isnLoading())
          yield put(closeModal())
          yield put(resetSliceName())
          yield call(this.props.history.push, `/slices`)
        } 
      }
      }
      catch (error) {
        yield put(isnLoading())
        yield put(closeModal())
        yield put(closeModal())
        yield put(errorfetch())
        console.log(error)        
      }
      
    }
  }
})

