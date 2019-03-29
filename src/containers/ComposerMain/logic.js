/**
 * ComposerMain Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import PropTypes from 'prop-types'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { API_BASE_SDK } from 'config'
import { addNode , transformToD3Object, removeLink, removeNode, createNewLink } from './utils'

const DEFAULT_D3 = {nodes:[], links:[]}

export default kea({
  path: () => ['scenes', 'containers', 'ComposerMain'],

  actions: () => ({
    fetchFunctions: () => ({ }),
    fetchServices: () => ({ }),
    fetchServiceId: () => ({ }),
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

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
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
    catalogueMenu: [[], PropTypes.array, {
      [actions.changeCatalogue]: (state, payload) => payload.catalogue,
    }],
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
    const { fetchFunctions } = this.actions

    yield put(fetchFunctions())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchFunctions]: workers.fetchFunctions,
    [actions.fetchServiceId]: workers.fetchServiceId,
    [actions.createNode]: workers.createNode,
    [actions.removeLink]: workers.removeLink,
    [actions.removeNode]: workers.removeNode,
    [actions.createLink]: workers.createLink,
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
      const { setData, changeCatalogue } = this.actions
      const catalogue = yield this.get('catalogue')
      const serviceId = this.props.match.params.id
        try {
          if(serviceId !== "0"){
            let responseResult = yield call(axios.get,`${API_BASE_SDK}/sdk/composer/services/${serviceId}`)
            const { data } = responseResult
            const {d3Data, newCatalogue} = transformToD3Object(data, catalogue)
            yield put(setData(d3Data))
            yield put(changeCatalogue(newCatalogue))
          } else {
            yield put(changeCatalogue(catalogue))
          }
        } catch(error){
          console.error(`Error ${error}`)
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
      console.log()
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
    }
  }

})

