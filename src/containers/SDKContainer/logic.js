/**
 * sdk Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_SDK } from 'config'
import PropTypes from 'prop-types'
import { NEW_SERVICE } from './utils'
import { addNode , transformToD3Object, removeLink, removeNode, createNewLink,
  transformToJSON, changeNode } from './utils'
import { Message } from 'element-react'

const DEFAULT_D3 = {nodes:[], links:[]}

export default kea({
  path: () => ['scenes', 'containers', 'SDKContainer'],

  actions: () => ({
    fetchServiceId: () => ({ }),
    setServiceInfo: (service) => ({ service }),
    setActiveTab: (tab) => ({ tab }),
    changeActiveTab: (tab) => ({ tab }),
    publishComposer: () => ({ }),
    saveComposer: () => ({ }),
    fetchFunctions: () => ({ }),
    fetchServices: () => ({ }),
    setServices: (services) => ({ services }),
    setFunctions: (functions) => ({ functions }),
    createNode: (node) => ({ node }),
    changeCatalogue: (catalogue) => ({ catalogue }),
    setData: (resources) => ({ resources }),
    removeNode: (node) => ({ node }),
    modalAction: (link) => ({ link }),
    getServiceId: (id) => ({ id }),
    removeLink: (selectlink) => ({ selectlink }),
    createLink: (source, target) => ({ source, target }),
    configParams: (node) => ({ node }),
    changeConfigParams: (node) => ({ node }),
    changePublishStatus: (status) => ({ status }),
    activeLoading: () => ({ }),
    activeLoadingSave: () => ({ }),
    changeSaveStatus: (status) => ({ status }),
    actionModalPublish: () => ({ }),
    changeStatusPanel: () => ({ }),
    setErrors: (errors) => ({ errors }),
    setSerivce: (id) => ({ id }),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    serviceInfo: [NEW_SERVICE, PropTypes.object, {
      [actions.setServiceInfo]: (state, payload) => payload.service,

      [actions.reset]: () => NEW_SERVICE,
    }],
    activeTab: ['composer', PropTypes.string, {
      [actions.setActiveTab]: (state, payload) => payload.tab.props.name,
      [actions.changeActiveTab]: (state, payload) => payload.tab,

      [actions.reset]: () => 'composer',
    }],
    functions: [[], PropTypes.array, {
      [actions.fetchFunctions]: (state, payload) => [],
      [actions.setFunctions]: (state, payload) => payload.functions,
    }],
    services: [[], PropTypes.array, {
      [actions.fetchServices]: (state, payload) => [],
      [actions.setServices]: (state, payload) => payload.services,
    }],
     d3Data: [DEFAULT_D3, PropTypes.object, {
      [actions.fetchServiceId]: () =>  DEFAULT_D3,
      [actions.setData]: (state, payload) => payload.resources,

      [actions.reset]: () => DEFAULT_D3,
    }],
    createNewResource:[{}, PropTypes.object, {
      [actions.createNode]: (state, payload) => payload.node,
    }],
    modalStatus: [false, PropTypes.bool, {
      [actions.modalAction]: (state, payload) => !state,
    }],
    modalData: [null, PropTypes.any, {
      [actions.modalAction]: (state, payload) => payload.link,
    }],
    modalConfigStatus: [false, PropTypes.bool, {
      [actions.configParams]: (state, payload) => !state,
      [actions.changeConfigParams]: (state, payload) => !state,
    }],
    modalNodeConfigData: [ null, PropTypes.object,{
      [actions.configParams]: (state, payload) => payload.node,
    }],
    catalogueMenu: [[], PropTypes.array, {
      [actions.changeCatalogue]: (state, payload) => payload.catalogue,
      [actions.reset]: () => [],
    }],
    idService: [0, PropTypes.any, {
      [actions.setSerivce]: (state, payload) => payload.id,
    }],
    isPublishLoading: [false, PropTypes.bool, {
      [actions.activeLoading]: (state, payload) => !state,
    }],
    isPublishStatus: ['secondary', PropTypes.string, {
      [actions.changePublishStatus]: (state, payload) => payload.status,
    }],
    isSaved: [true ,PropTypes.bool, {
      [actions.changePublishStatus]: (state, payload) => false,
      [actions.changeConfigParams]: (state, payload) => false,
      [actions.createNode]: () => false,
      [actions.removeLink]: () => false,
      [actions.removeNode]: () => false,
      [actions.changeSaveStatus]: (state, payload) => payload.status,
    }],
    isSaveLoading: [false ,PropTypes.bool, {
      [actions.activeLoadingSave]: (state, payload) => !state,
    }],
    modalPublishStatus: [false, PropTypes.bool, {
      [actions.actionModalPublish]: (state,payload) => !state,
      [actions.publishComposer]: (state, payload) => !state,
    }],
    errorsMessages: [null, PropTypes.array, {
      [actions.setErrors]: (state, payload) => payload.errors,
      [actions.reset]: () => null,
    }],
    panelError: [false, PropTypes.bool, {
      [actions.changeStatusPanel]: () => false,
      [actions.setErrors]: () => true,
      [actions.reset]: () => false,
    }]
  }),

  selectors: ({ selectors }) => ({
    catalogue: [
      () => [selectors.functions,selectors.services],
      (functions, services) =>
        [ ...functions, ...services]
      ,
      PropTypes.array
    ],
  }),

  start: function * () {
    const { fetchFunctions, changePublishStatus } = this.actions
    yield put(changePublishStatus('secondary'))
    yield put(fetchFunctions())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchFunctions]: workers.fetchFunctions,
    [actions.createNode]: workers.createNode,
    [actions.removeLink]: workers.removeLink,
    [actions.removeNode]: workers.removeNode,
    [actions.createLink]: workers.createLink,
    [actions.saveComposer]: workers.saveComposer,
    [actions.fetchServiceId]: workers.fetchServiceId,
    [actions.changeConfigParams]: workers.changeConfigParams,
  }),

  workers: {
    * fetchFunctions () {
      const { setFunctions, fetchServiceId } = this.actions
       try {
         let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/composer/functions`)
         const { data } = responseResult
         yield put(setFunctions(data))
         yield put(fetchServiceId())
       } catch(error){
         console.error(`Error ${error}`)
       }
    },

    *fetchServiceId() {
      const { setServiceInfo, setData, changeCatalogue, changeSaveStatus } = this.actions
      const catalogue = yield this.get('catalogue')
      const serviceId = yield this.get('idService')
      try{
          if (serviceId > 0) {
            let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/composer/services/${serviceId}`)
            const { data } = responseResult
            yield put(setServiceInfo(data))
            const {d3Data, newCatalogue} = transformToD3Object(data, catalogue)
            yield put(setData(d3Data))
            yield put(changeCatalogue(newCatalogue))
            yield put(changeSaveStatus(true))
          } else {
            yield put(setData({nodes:[], links:[]}))
            yield put(changeCatalogue(catalogue))
            yield put(setServiceInfo(NEW_SERVICE))
          }
        } catch(error){
          console.error(`Error ${error}`)
        }
    },

    * saveComposer() {
      const { activeLoadingSave, changeSaveStatus, setSerivce, setErrors } = this.actions
      yield put(activeLoadingSave())
      let typeRequest = null
      const service = yield this.get('serviceInfo')
      const serviceId = yield this.get('idService')
      const d3Data = yield this.get('d3Data')
      const objectFinal = transformToJSON(service, d3Data)
      const { errors, invalid, composer } = objectFinal
      if(!invalid){
      try{
        let responseResult
        if(serviceId > 0) {
          composer.id = serviceId
          responseResult = yield call(axios.put,`${API_BASE_SDK}/sdk/composer/services/`, composer)
          typeRequest = 'put'
        } else {
          responseResult = yield call(axios.post,`${API_BASE_SDK}/sdk/composer/services/`, composer)
          typeRequest = 'post'
        }
        const { data } = responseResult
        if(typeRequest === 'post') {
          yield put(setSerivce(data))
        }
        yield put(changeSaveStatus(true))
        yield put(activeLoadingSave())
      }catch (error){
        Message({
          showClose: false,
          message: 'Cannot save',
          type: 'error'
        })
          yield put(changeSaveStatus(false))
          yield put(activeLoadingSave())
        }
      } else {
        yield put(setErrors(errors))
        yield put(changeSaveStatus(false))
        yield put(activeLoadingSave())
      }
    },

    * createNode(action) {
      const d3Data = yield this.get('d3Data')
      const catalogue = yield this.get('catalogue')
      const createNewResource = action.payload.node
      const { setData, changeCatalogue } = this.actions
      try{
        const { node, newCatalogue } = addNode(createNewResource, catalogue)
        d3Data.nodes = [...d3Data.nodes, {...node}]
        const newData = {nodes:d3Data.nodes, links: d3Data.links}

        yield put(changeCatalogue(newCatalogue))
        yield put(setData(newData))
       }
       catch (error) {
         console.log(error)
       }
    },

    *removeLink(action) {
      const selectlink = action.payload.selectlink
      const d3Data = yield this.get('d3Data')
      const { setData } = this.actions

      const newd3Data = removeLink(selectlink, d3Data)
      const newData = Object.assign({}, newd3Data)

      yield put(setData(newData))
    },

    * removeNode(action) {
      const selectNode = action.payload.node
      const d3Data = yield this.get('d3Data')
      const catalogue = yield this.get('catalogue')
      const { setData, changeCatalogue } = this.actions

      const {newd3Data, newCatalogue} = removeNode(selectNode, d3Data, catalogue)
      const newData = Object.assign({}, newd3Data)
      const newDataCatalogue = Object.assign([], newCatalogue)
      yield put(setData(newData))
      yield put(changeCatalogue(newDataCatalogue))
    },

    * createLink(action) {
      const source = action.payload.source
      const target = action.payload.target
      const d3Data = yield this.get('d3Data')
      const { setData, modalAction } = this.actions

      const {newd3Data , newLink} = createNewLink(source, target, d3Data)
      const newData = Object.assign({}, newd3Data)
      yield put(setData(newData))
      yield put(modalAction(newLink))
    },

    * changeConfigParams(action) {
      const { setData } = this.actions
      const d3Data = yield this.get('d3Data')
      const node = action.payload.node
      const newData = changeNode(node, d3Data)
      yield put(setData(newData))
    },
  },
})

