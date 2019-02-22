/**
 * Composer Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { nodeData, findLinkById, addNode } from './utils'

import PropTypes from 'prop-types'

export default kea({
  path: () => ['scenes', 'containers', 'Composer'],

  actions: () => ({
    fetchData: () => ({ }),
    setData: (resources) => ({ resources }),
    createNode: (node) => ({ node }),
    removeNode: (node) => ({ node }),
  }),

  reducers: ({ actions }) => ({
    d3Data: [null, PropTypes.any, {
      [actions.fetchData]: () =>  null,
      [actions.setData]: (state, payload) => payload.resources,
      [actions.removeNode]: (state, payload) => payload.node,
    }],
    createNewResource:[{}, PropTypes.object, {
      [actions.createNode]: (state, payload) => payload.node,
    }]
  }),


  start: function * () {
    const { fetchData } = this.actions

    yield put(fetchData())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.createNode]: workers.createNode,
  }),

  takeEvery: ({ actions, workers }) => ({
    [actions.fetchData]: workers.fetchData,
  }),
  workers: {

    *fetchData() {
      const { setData } = this.actions

      try {
        const dummyData = {
          nodes:[
        {
          id: "teste1",
          type: "VNF",
          x: 219,
          y: 82,
          extra_info: {
            version: "1.0.0",
            name: "Traffic Filtering",
            sub_name: "Vendor OSS"
          }
        },
        {
          id: "teste2",
          type: "start",
          x: 57,
          y: 125
        },
        {
          id: "teste3",
          type: "stop",
          x: 623,
          y: 676,
        },
        {
          id: "teste4",
          type: "VNF",
          x: 396,
          y: 81,
          extra_info: {
            version: "2.0.1",
            name: "Video Processing",
            sub_name: "Vendor: OSS"
          }
        },
        {
          id: "teste5",
          type: "VNF",
          x: 395,
          y: 267,
          extra_info: {
            version: "1.0.1",
            name: "Video Analysis",
            sub_name: "Vendor: NEC"
          },
          circleColor: "#CDB5D3",
          circleTextColor: "#A900B8",
          circleText: "MEC",
        },
        {
          id: "teste6",
          type: "VNF",
          x: 394,
          y: 435,
          extra_info: {
            version: "1.0.1",
            name: "Video distribution",
            sub_name: "Vendor: OSS"
          }
        },
        {
          id: "teste7",
          type: "VNF",
          x: 393,
          y: 632,
          extra_info: {
            version: "1.0.1",
            name: "Traffic Filtering",
            sub_name: "Vendor: OSS"
          }
        }
        ],
          links:[
          {
            id: "link1",
            source: "teste2",
            target: "teste1",
            sourcePosition: "right",
            targetPosition: "left",
            confirm: true
          },
          {
            id: "link2",
            source: "teste1",
            target: "teste4",
            sourcePosition: "right",
            targetPosition: "left",
            confirm: false
          },
          {
            id: "link3",
            source: "teste4",
            target: "teste5",
            sourcePosition: "bottom",
            targetPosition: "top",
            confirm: false
          },
          {
            id: "link4",
            source: "teste5",
            target: "teste6",
            sourcePosition: "bottom",
            targetPosition: "top",
            confirm: false
          },
          {
            id: "link5",
            source: "teste6",
            target: "teste7",
            sourcePosition: "bottom",
            targetPosition: "top",
            confirm: false
          },
          {
            id: "link6",
            source: "teste3",
            target: "teste7",
            sourcePosition: "left",
            targetPosition: "right",
            confirm: true
          },
        ]
        };
         const nodes = yield call(nodeData, dummyData)
        yield put(setData(findLinkById(dummyData.links, nodes)))
      } catch(error) {
        console.log(error)
      }
    },

    *createNode() {
     const d3Data = yield this.get('d3Data')
     const createNewResource = yield this.get('createNewResource')
     const { setData } = this.actions

     try{
    /*   const responseComputes = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/compute`)
        const responseNetworks = yield call(axios.get , `${API_BASE_URL}/slicemanagerapi/physical_network`)
    */

        d3Data.nodes.push(addNode(createNewResource))
        yield put(setData(d3Data))

      }
      catch (error) {
        console.log(error)
      }
    },

  }
})


