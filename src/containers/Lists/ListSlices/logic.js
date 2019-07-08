/**
 * ListSlices Container Logic
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */



import { kea } from 'kea'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { API_BASE_URL } from 'config'
import PropTypes from 'prop-types'

/* Logic */
import NavBarLogic from 'containers/Navbar/logic'
import AppLogic from 'containers/App/logic'


export default kea({
  path: () => ['scenes', 'containers', 'ListSlices'],

  connect: {
    props: [
      NavBarLogic, [
        'userRole',
      ],
      AppLogic, [
        'keycloak',
      ]
    ],
    actions :[
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage',
      ]
    ]
  },

  actions: () => ({
    //Core
    //toogleLoading = (area) => ({ area }),

    // Slices actions
    fetchSlices: () => ({}),
    setSlices: (slices) => ({slices}),
    sliceInfo: (slice) => ({slice}),
    deleteSlice: () => ({ }),
    isLoading: () => ({ }),
    actionModal: () => ({ }),
    reset: () => ({ }),
    setErroFecth: () =>({}),
    setNoData: () =>({}),
    removeNoData: () => ({}),
  }),

  reducers: ({ actions }) => ({
    slices: [[], PropTypes.array, {
      [actions.fetchSlices]: (state, payload) => null,
      [actions.setSlices]: (state, payload) => payload.slices,
      [actions.reset]: () => [],
    }],
    loading:[false, PropTypes.boolean,{
      [actions.isLoading]: (state, payload) => !state,
      [actions.reset]: () => false,
    }],
    sliceSelect: [null, PropTypes.object, {
      [actions.sliceInfo]: (state, payload) => payload.slice,
      [actions.reset]: () => null,
    }],
    modalVisibled: [false, PropTypes.bool,{
      [actions.actionModal]: (state, payload) => !state,
      [actions.sliceInfo]: (state, payload) => !state,
      [actions.reset]: () => false,
    }],
    noData: [false, PropTypes.bol, {
      [actions.setNoData]: () => true,
      [actions.removeNoData]: () => false,
    }],
    errorFecth: [false, PropTypes.bol, {
      [actions.setErroFecth]: () => true,
      [actions.reset]: () => false,
    }],
  }),

    start: function * () {
    const { fetchSlices } = this.actions


    yield put(fetchSlices())
  },

  stop: function * () {
    const { reset, removeLoadingPage, removeNoData } = this.actions

    // remove loading page
    yield put(removeLoadingPage())
    yield put(removeNoData())
    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchSlices]: workers.fetchSlices,
    [actions.deleteSlice]: workers.deleteSlice,
  }),




  workers: {

  * fetchSlices () {
    const { setSlices, addLoadingPage, removeLoadingPage, setErroFecth, setNoData } = this.actions
    // Loading
    yield put(addLoadingPage())
    try {
      let responseResult = yield call(axios.get,`${API_BASE_URL}/slic3`)
      const { data } = responseResult
      data.map(el => el.status = "Approved")
      if(data.length > 0){
        yield put(setSlices(data))
      } else {
        yield put(setNoData())
      }
      yield put(removeLoadingPage())

    } catch(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          const keycloak = yield this.get('keycloak')
          keycloak.logout()
        } else if (error.response.status === 404) {
          console.log(404)
          yield put(setErroFecth())
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        yield put(setErroFecth())
      } else {
        // Something happened in setting up the request that triggered an Error
        yield put(setErroFecth())
      }
      yield put(removeLoadingPage())
    }
  },

  * deleteSlice () {
    const { fetchSlices, isLoading, actionModal } = this.actions
    const sliceSelect = yield this.get('sliceSelect')
    try {
      yield put(isLoading())
      yield call(axios.delete,`${API_BASE_URL}/slic3/${sliceSelect.id}`)
    if(sliceSelect.chunks.virtualWifiAccessPoints.length > 0){
      for (const virtualWifi of sliceSelect.chunks.virtualWifiAccessPoints) {
      console.log('delete virtual_Wifi')
      yield call(axios.delete,`${API_BASE_URL}/virtual_wifi_access_point/${virtualWifi.id}`)
      }
    }
    if(sliceSelect.chunks.openstackVlans.length > 0){
        for (const vlan of sliceSelect.chunks.openstackVlans) {
          console.log('delete openstack_vlan')
          yield call(axios.delete,`${API_BASE_URL}/openstack_vlan/${vlan.id}`)
        }
      }
      for (const openstack of sliceSelect.chunks.openstackProjects) {
        console.log('delete openstack_project')
      yield call(axios.delete,`${API_BASE_URL}/openstack_project/${openstack.id}`)
      }

      yield put(fetchSlices())


    } catch(error){
      console.error(error.response.status)
    }
    yield put(isLoading())
    yield put(actionModal())
  }
  }

})

