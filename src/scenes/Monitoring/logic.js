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
import { transformMeasurement } from './utils'

export default kea({
  path: () => ['scenes', 'Monitoring'],

  actions: () => ({
    fetchMeasurementCPU: () => ({ }),
    setCPU: (CPU) => ({ CPU }),
    fetchMeasurementRAM: () => ({ }),
    setRAM: (RAM) => ({ RAM }),
    fetchMeasurementDISK: () => ({ }),
    setDISK: (DISK) => ({ DISK }),
    fetchMeasurementTX: () => ({ }),
    setTX: (TX) => ({ TX }),
    fetchMeasurementRX: () => ({ }),
    setRX: (RX) => ({ RX }),
    setValue: (date) => ({ date }),
    refreshAction: () => ({ })
  }),

  reducers: ({ actions }) => ({
    CPU: [{max: 0, data: [{value: 0, date: null}]}, PropTypes.bject, {
      [actions.setCPU]: (state, payload) => payload.CPU
    }],
    RAM: [{max: 0, data: [{value: 0, date: null}]}, PropTypes.object, {
      [actions.setRAM]: (state, payload) => payload.RAM
    }],
    DISK: [{max: 0, data: [{value: 0, date: null}]}, PropTypes.object, {
      [actions.setDISK]: (state, payload) => payload.DISK
    }],
    TX: [{max: 0, data: [{value: 0, date: null}]}, PropTypes.object, {
      [actions.setTX]: (state, payload) => payload.TX
    }],
    RX: [{max: 0, data: [{value: 0, date: null}]}, PropTypes.object, {
      [actions.setRX]: (state, payload) => payload.RX
    }],
    date: [ moment().startOf('day').utc().unix(), PropTypes.any, {
      [actions.setValue]: (state, payload) => moment(payload.date).startOf('day').utc().unix()
    }]

  }),

  start: function * () {
    const { fetchMeasurementCPU,
      fetchMeasurementRAM,
      fetchMeasurementDISK,
      fetchMeasurementTX,
      fetchMeasurementRX
    } = this.actions

    yield put(fetchMeasurementCPU())
    yield put(fetchMeasurementRAM())
    yield put(fetchMeasurementDISK())
    yield put(fetchMeasurementTX())
    yield put(fetchMeasurementRX())
  },

  stop: function * () {
    const { setCPU,
      setRAM,
      setDISK,
      setTX,
      setRX } = this.actions

    yield put(setCPU({max: 0, data: [{value: 0, date: null}]}))
    yield put(setRAM({max: 0, data: [{value: 0, date: null}]}))
    yield put(setDISK({max: 0, data: [{value: 0, date: null}]}))
    yield put(setTX({max: 0, data: [{value: 0, date: null}]}))
    yield put(setRX({max: 0, data: [{value: 0, date: null}]}))
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchMeasurementCPU]: [workers.fetchMeasurementCPU],
    [actions.fetchMeasurementRAM]: workers.fetchMeasurementRAM,
    [actions.fetchMeasurementDISK]: workers.fetchMeasurementDISK,
    [actions.fetchMeasurementTX]: workers.fetchMeasurementTX,
    [actions.fetchMeasurementRX]: workers.fetchMeasurementRX,
    [actions.setValue]: [workers.fetchMeasurementCPU, workers.fetchMeasurementRAM, workers.fetchMeasurementDISK, workers.fetchMeasurementRX, workers.fetchMeasurementTX],
    [actions.refreshAction]: [workers.fetchMeasurementCPU, workers.fetchMeasurementRAM, workers.fetchMeasurementDISK, workers.fetchMeasurementRX, workers.fetchMeasurementTX]
  }),

  workers: {
    * fetchMeasurementCPU () {
      const dateTime = yield this.get('date')
      const startDate = moment(new Date(dateTime * 1000)).utc().unix() * 1000
      const endDate = moment(new Date(dateTime * 1000)).endOf('day').utc().unix() * 1000
      const { setCPU } = this.actions

      try {
        const id = this.props.match.params.id
        const type = this.props.match.params.type
        const responseCPU = yield call(axios.get, `https://5gcity-dashboard.i2cat.net/monitoring/monitoring/api/measurements?start=${startDate}&end=${endDate}&metric=CPU&${type}=${id}&limit=2000`)
        const { data } = responseCPU

        yield put(setCPU(transformMeasurement(data)))
      } catch (error) {
        console.error(`Error ${error}`)
      }
    },
    * fetchMeasurementRAM () {
      const dateTime = yield this.get('date')
      const startDate = moment(new Date(dateTime * 1000)).utc().unix() * 1000
      const endDate = moment(new Date(dateTime * 1000)).endOf('day').utc().unix() * 1000
      const { setRAM } = this.actions

      try {
        const id = this.props.match.params.id
        const type = this.props.match.params.type
        const responseRAM = yield call(axios.get, `https://5gcity-dashboard.i2cat.net/monitoring/monitoring/api/measurements?start=${startDate}&end=${endDate}&metric=RAM&${type}=${id}&limit=2000`)
        const { data } = responseRAM

        yield put(setRAM(transformMeasurement(data)))
      } catch (error) {
        console.error(`Error ${error}`)
      }
    },
    * fetchMeasurementDISK () {
      const dateTime = yield this.get('date')
      const startDate = moment(new Date(dateTime * 1000)).utc().unix() * 1000
      const endDate = moment(new Date(dateTime * 1000)).endOf('day').utc().unix() * 1000
      const { setDISK } = this.actions

      try {
        const id = this.props.match.params.id
        const type = this.props.match.params.type
        const responseDISK = yield call(axios.get, `https://5gcity-dashboard.i2cat.net/monitoring/monitoring/api/measurements?start=${startDate}&end=${endDate}&metric=DISK&${type}=${id}&limit=2000`)
        const { data } = responseDISK

        yield put(setDISK(transformMeasurement(data)))
      } catch (error) {
        console.error(`Error ${error}`)
      }
    },
    * fetchMeasurementTX () {
      const dateTime = yield this.get('date')
      const startDate = moment(new Date(dateTime * 1000)).utc().unix() * 1000
      const endDate = moment(new Date(dateTime * 1000)).endOf('day').utc().unix() * 1000
      const { setTX } = this.actions

      try {
        const id = this.props.match.params.id
        const type = this.props.match.params.type
        const responseTX = yield call(axios.get, `https://5gcity-dashboard.i2cat.net/monitoring/monitoring/api/measurements?start=${startDate}&end=${endDate}&metric=TX&${type}=${id}&limit=2000`)
        const { data } = responseTX

        yield put(setTX(transformMeasurement(data)))
      } catch (error) {
        console.error(`Error ${error}`)
      }
    },
    * fetchMeasurementRX () {
      const dateTime = yield this.get('date')
      const startDate = moment(new Date(dateTime * 1000)).utc().unix() * 1000
      const endDate = moment(new Date(dateTime * 1000)).endOf('day').utc().unix() * 1000
      const { setRX } = this.actions

      try {
        const id = this.props.match.params.id
        const type = this.props.match.params.type
        const responseRX = yield call(axios.get, `https://5gcity-dashboard.i2cat.net/monitoring/monitoring/api/measurements?start=${startDate}&end=${endDate}&metric=RX&${type}=${id}&limit=2000`)
        const { data } = responseRX

        yield put(setRX(transformMeasurement(data)))
      } catch (error) {
        console.error(`Error ${error}`)
      }
    }
  }

})
