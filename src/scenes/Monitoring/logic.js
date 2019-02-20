/**
 * Monitoring Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import moment from 'moment'
import axios from 'axios'
import PropTypes from 'prop-types'
//import * as Check from 'validations'
//import { delay } from 'redux-saga'
//import { } from 'config'
//import { } from 'utils'
//import { } from './utils'


export default kea({
  path: () => ['scenes', 'Monitoring'],

  /*
  connect: {
    props: [
      Logic, [
        'prop1'
      ]
    ],
    actions: [
      Logic, [
        'action as newActionName'
      ],
    ]
  },
  */

  actions: () => ({
    fetchMeasurementCPU: () => ({ }),
    setCPU: (CPU) => ({ CPU }),
  }),

  reducers: ({ actions }) => ({
    CPU: [null, PropTypes.bject, {
      [actions.setCPU]: (state, payload) => payload.CPU,
    }],
    RAM: [null, PropTypes.object, {
      [actions.setRAM]: (state, payload) => payload.RAM,
    }],
    DISK: [null, PropTypes.object, {
      [actions.setDISK]: (state, payload) => payload.DISK,
    }],
    TX: [null, PropTypes.object, {
      [actions.setTX]: (state, payload) => payload.TX,
    }],
    RX: [null, PropTypes.object, {
      [actions.setRX]: (state, payload) => payload.RX,
    }],
    date: [ moment().unix() * 1000, PropTypes.number,{

    }]

  }),

  start: function * () {
      const { fetchMeasurementCPU } = this.actions
      // yield put(fetchMeasurementCPU())

  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchMeasurementCPU]: workers.fetchMeasurementCPU
  }),


  workers: {
    * fetchMeasurementCPU () {
      const date = yield this.get('date')
      const { setCPU } = this.actions

       try {
        const id = this.props.match.params.id
        const type = this.props.match.params.type
        const responseCPU = yield call(axios.get,`https://5gcity-dashboard.i2cat.net/monitoring/monitoring/api/measurements?start=${date}&metric=CPU&${type}=${id}`)
        const { data } = responseCPU

        yield put(setCPU(data))
      }catch(error){
        console.error(`Error ${error}`)
      }
    }
  }

})

