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


export default kea({
  path: () => ['scenes', 'containers', 'ListSlices'],

  connect: {
    props: [
      NavBarLogic, [
        'userRole'
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
    }]
  }),

    start: function * () {
    const { fetchSlices } = this.actions


    yield put(fetchSlices())
  },

  stop: function * () {
    const { reset } = this.actions


    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchSlices]: workers.fetchSlices,
    [actions.deleteSlice]: workers.deleteSlice,
  }),




  workers: {

  * fetchSlices () {
    const { setSlices } = this.actions

    try {
      let responseResult = yield call(axios.get,`${API_BASE_URL}/slicemanagerapi/slic3`)
      const { data } = responseResult
      data.map(el => el.status = "Approved")

      yield put(setSlices(data))

    } catch(error){
      console.error(`Error ${error}`)
    }
  },

  * deleteSlice () {
    const { fetchSlices, isLoading, openModal, closeModal } = this.actions
    const sliceSelect = yield this.get('sliceSelect')
   yield put(openModal())
    try {
      yield put(isLoading())
      yield call(axios.delete,`${API_BASE_URL}/slicemanagerapi/slic3/${sliceSelect.id}`)

    /*if(sliceSelect.chunks.openstackVlans.length > 0){
        for (const openstack of sliceSelect.chunks.openstackVlans) {
          console.log('apagou openstack_vlan')
          yield call(axios.delete,`${API_BASE_URL}/slicemanagerapi/openstack_vlan/${openstack.id}`)
        }
      }
      for (const openstack of sliceSelect.chunks.openstackProjects) {
        console.log('apagou openstack_project')
      yield call(axios.delete,`${API_BASE_URL}/slicemanagerapi/openstack_project/${openstack.id}`)
      } */

      yield put(fetchSlices())


    } catch(error){
      console.error(`Error ${error}`)
    }
    yield put(isLoading())
    yield put(closeModal())
  }
  }

})

