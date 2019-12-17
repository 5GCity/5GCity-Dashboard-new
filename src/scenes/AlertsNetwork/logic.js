/**
 * Alerts Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import { API_ALERTS, API_SLICE_MANAGEMENT } from 'config'
import axios from 'axios'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { getTodayDateParams, convertDateToUnix } from './utils'

/* Logic */
import AppLogic from 'containers/App/logic'


export default kea({
  path: () => ['scenes', 'AlertsNetwork'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ]
    ],
    props: [
      AppLogic, [
        'keycloak'
      ]
    ]
  },

  actions: () => ({
    fecthAlertNetwork: () => ({ }),
    setAlert: (alerts) => ({ alerts }),
    setErroFecth: () => ({ }),
    setNetworkTitle: (name) => ({ name }),

    changeDate: (date) => ({ date }),
    changeStatus: (status) => ({ status }),

    setReact: (network) => ({ network }),
    confirmReact : (internalId) => ({ internalId }),

    setNoData: () => ({ }),
    removeNoData: () => ({ }),

    actionModalError: () => ({ }),
    setError: (message) => ({message}),

    reset: () => ({ })
  }),

  reducers: ({ actions }) => ({
    alerts: [null, PropTypes.array, {
      [actions.fecthAlertNetwork]: (state, payload) => null,
      [actions.setAlert]: (state, payload) => payload.alerts,
      [actions.setNoData]: () => null,
      [actions.reset]: () => null
    }],
    networkTitle: [null, PropTypes.string,{
      [actions.setNetworkTitle]: (state, payload) => payload.name,
      [actions.reset]: () => null
    }],
    errorFecth: [false, PropTypes.bool, {
      [actions.setErroFecth]: (state, payload) => !state,
      [actions.reset]: () => false
    }],
    dateRange: [getTodayDateParams(), PropTypes.objectOf.date, {
      [actions.changeDate]: (state, payload) => payload.date
    }],
    SelectStauts: [null, PropTypes.bool, {
      [actions.changeStatus]: (state, payload) => payload.status
    }],
    modalError: [false, PropTypes.bool, {
      [actions.actionModalError]: (state, payload) => !state,
      [actions.setError]: (state, payload) => true
    }],
    modalErrorMessage: [null, PropTypes.string, {
      [actions.setError]: (state, payload) => payload.message
    }],
  }),

  start: function * () {
    const { fecthAlertNetwork } = this.actions
    yield put(fecthAlertNetwork())
  },

  stop: function * () {
    const { reset } = this.actions
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fecthAlertNetwork]: workers.fecthAlertNetwork,
    [actions.changeDate]: workers.fecthAlertNetwork,
    [actions.changeStatus]: workers.fecthAlertNetwork,
    [actions.setReact]: workers.verifyReactWorker,
    [actions.confirmReact]: workers.reactWorker
  }),

  workers: {
    * fecthAlertNetwork() {
      const { setAlert, setErroFecth, addLoadingPage, removeLoadingPage, setNoData, setNetworkTitle } = this.actions
      const dateRange = yield this.get('dateRange')
      const SelectStauts = yield this.get('SelectStauts')
      yield put(addLoadingPage())
      const { match } = this.props
      const nsi_id = match.params.idNetworkInstance
      const params = {
        nsi_id,
        start: convertDateToUnix(dateRange[0]),
        end: convertDateToUnix(dateRange[1]) ,
        reacted: SelectStauts
      }
      try {
        let responseResult = yield call(axios.get, `${API_ALERTS}/alert`, { params } )
        const { data } = responseResult
        if (!isEmpty(data)) {
          yield put(setAlert(data))
          yield put(setNetworkTitle(data[0].service))
        } else {
          yield put(setNoData())
        }
        yield put(removeLoadingPage())
      } catch (er) {
        if (er.response) {
          console.log({...er})
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (er.response.status === 401) {
            const keycloak = yield this.get('keycloak')
            keycloak.logout()
          } else if (er.response.status === 404) {
            console.log(404)
            yield put(setErroFecth())
          }else if (er.response.status === 502) {
            yield put(setErroFecth())
          }
        } else if (er.request) {
          // The request was made but no response was received
          // `er.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          yield put(setErroFecth())
        } else {
          // Something happened in setting up the request that triggered an er
          yield put(setErroFecth())
        }
        yield put(removeLoadingPage())
      }
    },

    * verifyReactWorker (action) {
      const { confirmReact, addLoadingPage, removeLoadingPage, setError } = this.actions
      const nsId = action.payload.network.nsiId
      const alertName = action.payload.network.alertname
      const internalId = action.payload.network.internalId
      const body = {
        'alert_name': alertName
      }
      yield put(addLoadingPage())
      try {
        let responseResult = yield call(axios.post,`${API_SLICE_MANAGEMENT}/network_service_instance/${nsId}/reaction`, body)
        const { status } = responseResult
        if(status === 200) {
          yield put(confirmReact(internalId))
        }
      } catch (e) {
        yield put(removeLoadingPage())
        switch (e) {
          case 418:
            yield put(setError(e.data.response))
            break;
            case 404:
            yield put(setError('The network service do not exist'))
            break;
            case 504:
            yield put(setError('Time out the request take to long'))
            break;
          default:
              yield put(setError('Internal server Error'))
            break;
        }

      }
    },

    * reactWorker (action) {
      const { fecthAlertNetwork, removeLoadingPage, setError } = this.actions
      const internalId = action.payload.internalId
      try {
        const params = {
          "reacted": true
        }
        let responseResult = yield call(axios.put, `${API_ALERTS}/alert/${internalId}`, params )
        const { status } = responseResult
        if(status === 200) {
          yield put(fecthAlertNetwork())
        }
      } catch (e) {
        console.log(e)
        yield put(setError('Internal server error'))
      }
      yield put(removeLoadingPage())
    }
  }
})

