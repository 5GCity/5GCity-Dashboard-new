/**
 * sdk Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { API_SDK } from 'config'
import PropTypes from 'prop-types'
import { NEW_SERVICE, addNode, transformToD3Object, removeLink, removeNode, createNewLink,
  transformToJSON, changeNode, Organizations } from './utils'
import { Message } from 'element-react'

const DEFAULT_D3 = {nodes: [], links: []}

export default kea({
  path: () => ['scenes', 'containers', 'SDKContainer'],

  actions: () => ({
    startFunctions: () => ({ }),
    fetchServiceId: () => ({ }),
    setServiceInfo: (service) => ({ service }),

    setActiveTab: (tab) => ({ tab }),
    changeActiveTab: (tab) => ({ tab }),

    publishComposer: () => ({ }),
    saveComposer: () => ({ }),

    fetchServices: () => ({ }),
    setServices: (services) => ({ services }),

    createNode: (node) => ({ node }),
    setData: (resources) => ({ resources }),
    removeNode: (node) => ({ node }),
    modalAction: (link) => ({ link }),
    getServiceId: (id) => ({ id }),
    removeLink: (selectlink) => ({ selectlink }),
    createLink: (source, target) => ({ source, target }),
    configParams: (node) => ({ node }),
    changeConfigParams: (node) => ({ node }),
    changePublishStatus: (status) => ({ status }),
    activeLoadingPublish: () => ({ }),
    activeLoadingSave: () => ({ }),
    changeSaveStatus: (status) => ({ status }),
    actionModalPublish: () => ({ }),
    changeStatusPanel: () => ({ }),
    setErrors: (errors) => ({ errors }),
    setService: (id) => ({ id }),

    fetchAllFunctions: () => ({ }),
    setAllFunctions: (functions) => ({ functions }),

    fetchOrganizations: () => ({ }),
    setOrganizations: (organizations) => ({ organizations }),

    resetService: () => ({ }),
    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    serviceInfo: [null, PropTypes.object, {
      [actions.setServiceInfo]: (state, payload) => payload.service,
      [actions.resetService]: () => null,

      [actions.reset]: () => null
    }],
    activeTab: ['composer', PropTypes.string, {
      [actions.setActiveTab]: (state, payload) => payload.tab.props.name,
      [actions.changeActiveTab]: (state, payload) => payload.tab,

      [actions.reset]: () => 'composer'
    }],
    services: [[], PropTypes.array, {
      [actions.fetchServices]: (state, payload) => [],
      [actions.setServices]: (state, payload) => payload.services
    }],
    d3Data: [DEFAULT_D3, PropTypes.object, {
      [actions.fetchServiceId]: () => DEFAULT_D3,
      [actions.setData]: (state, payload) => payload.resources,

      [actions.reset]: () => DEFAULT_D3
    }],
    createNewResource: [{}, PropTypes.object, {
      [actions.createNode]: (state, payload) => payload.node
    }],
    modalStatus: [false, PropTypes.bool, {
      [actions.modalAction]: (state, payload) => !state
    }],
    modalData: [null, PropTypes.any, {
      [actions.modalAction]: (state, payload) => payload.link
    }],
    modalConfigStatus: [false, PropTypes.bool, {
      [actions.configParams]: (state, payload) => !state,
      [actions.changeConfigParams]: (state, payload) => !state
    }],
    modalNodeConfigData: [ null, PropTypes.object, {
      [actions.configParams]: (state, payload) => payload.node
    }],
    idService: [0, PropTypes.any, {
      [actions.setService]: (state, payload) => payload.id
    }],
    isPublishLoading: [false, PropTypes.bool, {
      [actions.activeLoadingPublish]: (state, payload) => !state
    }],
    isPublish: [true, PropTypes.bool, {
      [actions.changePublishStatus]: (state, payload) => false,
      [actions.changeConfigParams]: (state, payload) => false
    }],
    isSaved: [true, PropTypes.bool, {
      [actions.changePublishStatus]: (state, payload) => false,
      [actions.changeConfigParams]: (state, payload) => false,
      [actions.createNode]: () => false,
      [actions.removeLink]: () => false,
      [actions.removeNode]: () => false,
      [actions.changeSaveStatus]: (state, payload) => payload.status
    }],
    isSaveLoading: [false, PropTypes.bool, {
      [actions.activeLoadingSave]: (state, payload) => !state
    }],
    modalPublishStatus: [false, PropTypes.bool, {
      [actions.actionModalPublish]: (state, payload) => !state,
      [actions.publishComposer]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    errorsMessages: [null, PropTypes.array, {
      [actions.setErrors]: (state, payload) => payload.errors,
      [actions.reset]: () => null
    }],
    panelError: [false, PropTypes.bool, {
      [actions.changeStatusPanel]: () => false,
      [actions.setErrors]: () => true,
      [actions.reset]: () => false
    }],
    allFunctions: [[], PropTypes.array, {
      [actions.fetchAllFunctions]: (state, payload) => [],
      [actions.setAllFunctions]: (state, payload) => payload.functions
    }],
    organizationsList: [[], PropTypes.array, {
      [actions.fetchOrganizations]: (state, payload) => null,
      [actions.setOrganizations]: (state, payload) => Organizations(payload.organizations)
    }]
  }),

  start: function * () {
    const { fetchOrganizations, changePublishStatus } = this.actions
    yield put(changePublishStatus('secondary'))
    yield put(fetchOrganizations())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.createNode]: workers.createNode,
    [actions.removeLink]: workers.removeLink,
    [actions.removeNode]: workers.removeNode,
    [actions.createLink]: workers.createLink,
    [actions.saveComposer]: workers.saveComposer,
    [actions.fetchServiceId]: workers.fetchServiceId,
    [actions.changeConfigParams]: workers.changeConfigParams,
    [actions.fetchOrganizations]: workers.fetchOrganizations,
    [actions.fetchAllFunctions]: workers.fetchAllFunctions
  }),

  workers: {
    * fetchOrganizations () {
      const { setOrganizations, fetchAllFunctions } = this.actions
      try {
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/sliceManagement/slices`)
        const { data } = responseResult
        yield put(setOrganizations(data))
        yield put(fetchAllFunctions())
      } catch (error) {
        yield put(setOrganizations(null))
        console.error(`Error ${error}`)
      }
    },

    * fetchAllFunctions () {
      const { setAllFunctions, fetchServiceId } = this.actions
      const organizationsList = yield this.get('organizationsList')
      const array = []
      for (let index = 0; index < organizationsList.length; index++) {
        const organization = organizationsList[index]
        let responseResult = yield call(axios.get, `${API_SDK}/sdk/functions/?sliceId=${organization.value}`)
        const { data } = responseResult
        array.push(...data)
      }
      yield put(setAllFunctions(array))
      yield put(fetchServiceId())
    },

    * fetchServiceId () {
      const { setServiceInfo, setData, changeSaveStatus, resetService } = this.actions
      const serviceId = yield this.get('idService')
      const catalogue = yield this.get('allFunctions')
      yield put(resetService())
      try {
        if (serviceId > 0) {
          let responseResult = yield call(axios.get, `${API_SDK}/sdk/services/${serviceId}`)
          const { data } = responseResult
          const d3Data = transformToD3Object(data, catalogue)
          yield put(setData(d3Data))
          yield put(setServiceInfo(data))
          yield put(changeSaveStatus(true))
        } else {
          yield put(setData({nodes: [], links: []}))
          yield put(setServiceInfo(NEW_SERVICE))
        }
      } catch (error) {
        Message({
          showClose: false,
          message: 'Ivalid service',
          type: 'error'
        })
      }
    },

    * saveComposer () {
      const { activeLoadingSave, changeSaveStatus, setService, setErrors } = this.actions
      yield put(activeLoadingSave())
      let typeRequest = null
      const service = yield this.get('serviceInfo')
      const serviceId = yield this.get('idService')
      const d3Data = yield this.get('d3Data')
      const objectFinal = transformToJSON(service, d3Data)
      const { errors, invalid, composer } = objectFinal
      if (!invalid) {
        try {
          let responseResult
          if (serviceId > 0) {
            composer.id = serviceId
            responseResult = yield call(axios.put, `${API_SDK}/sdk/services/`, composer)
            typeRequest = 'put'
          } else {
            responseResult = yield call(axios.post, `${API_SDK}/sdk/services/`, composer)
            typeRequest = 'post'
          }
          const { data } = responseResult
          if (typeRequest === 'post') {
            yield put(setService(data))
          }
          yield put(changeSaveStatus(true))
          yield put(activeLoadingSave())
          Message({
            showClose: false,
            message: 'Service Save',
            type: 'success'
          })
        } catch (error) {
          switch (error.response.status) {
            case 400:
              const message = error.response.data.error || error.response.data
              Message({
                showClose: false,
                message: message,
                type: 'error'
              })
              break
            case 403:
              Message({
                showClose: false,
                message: error.response.data,
                type: 'error'
              })
              break
            case 409:
              Message({
                showClose: false,
                message: error.response.data,
                type: 'error'
              })
              break
            default:
              Message({
                showClose: false,
                message: 'Cannot save',
                type: 'error'
              })
              break
          }

          yield put(changeSaveStatus(false))
          yield put(activeLoadingSave())
        }
      } else {
        yield put(setErrors(errors))
        yield put(changeSaveStatus(false))
        yield put(activeLoadingSave())
      }
    },

    * createNode (action) {
      const d3Data = yield this.get('d3Data')
      const createNewResource = action.payload.node
      const { setData } = this.actions
      try {
        const node = addNode(createNewResource)
        d3Data.nodes = [...d3Data.nodes, {...node}]
        const newData = {nodes: d3Data.nodes, links: d3Data.links}
        yield put(setData(newData))
      } catch (error) {

      }
    },

    * removeLink (action) {
      const selectlink = action.payload.selectlink
      const d3Data = yield this.get('d3Data')
      const { setData } = this.actions

      const newd3Data = removeLink(selectlink, d3Data)
      const newData = Object.assign({}, newd3Data)

      yield put(setData(newData))
    },

    * removeNode (action) {
      const selectNode = action.payload.node
      const d3Data = yield this.get('d3Data')
      const { setData } = this.actions
      const {newd3Data} = removeNode(selectNode, d3Data)
      const newData = Object.assign({}, newd3Data)
      yield put(setData(newData))
    },

    * createLink (action) {
      const source = action.payload.source
      const target = action.payload.target
      const d3Data = yield this.get('d3Data')
      const { setData, modalAction } = this.actions

      const {newd3Data, newLink} = createNewLink(source, target, d3Data)
      const newData = Object.assign({}, newd3Data)
      yield put(setData(newData))
      yield put(modalAction(newLink))
    },

    * changeConfigParams (action) {
      const { setData } = this.actions
      const d3Data = yield this.get('d3Data')
      const node = action.payload.node
      const newData = changeNode(node, d3Data)
      yield put(setData(newData))
    }
  }
})
