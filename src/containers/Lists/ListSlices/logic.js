/**
 * ListSlices Container Logic
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */

import { kea } from "kea";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import { API_SLICE_MANAGEMENT } from "config";
import PropTypes from "prop-types";

/* Logic */
import NavBarLogic from "containers/Navbar/logic";
import AppLogic from "containers/App/logic";

export default kea({
  path: () => ["scenes", "containers", "ListSlices"],

  connect: {
    props: [NavBarLogic, ["userRole"], AppLogic, ["keycloak"]],
    actions: [AppLogic, ["addLoadingPage", "removeLoadingPage"]]
  },

  actions: () => ({
    // Core
    // toogleLoading = (area) => ({ area }),

    // Slices actions
    fetchSlices: () => ({}),
    setSlices: slices => ({ slices }),
    sliceInfo: slice => ({ slice }),
    sliceConfig: slice => ({ slice }),
    deleteSlice: () => ({}),
    isLoading: () => ({}),
    actionModal: () => ({}),
    setErroFecth: () => ({}),
    setNoData: () => ({}),
    removeNoData: () => ({}),
    closeModalAction: () => ({}),
    setErrorMessage: messageError => ({ messageError }),
    configAction: () => ({}),

    reset: () => ({})
  }),

  reducers: ({ actions }) => ({
    slices: [
      [],
      PropTypes.array,
      {
        [actions.fetchSlices]: (state, payload) => null,
        [actions.setSlices]: (state, payload) => payload.slices,

        [actions.reset]: () => []
      }
    ],
    loading: [
      false,
      PropTypes.boolean,
      {
        [actions.isLoading]: (state, payload) => !state,

        [actions.reset]: () => false
      }
    ],
    sliceSelect: [
      null,
      PropTypes.object,
      {
        [actions.sliceInfo]: (state, payload) => payload.slice,
        [actions.sliceConfig]: (state, payload) => payload.slice,

        [actions.reset]: () => null
      }
    ],
    modalVisibled: [
      false,
      PropTypes.bool,
      {
        [actions.actionModal]: (state, payload) => !state,
        [actions.sliceInfo]: (state, payload) => !state,
        [actions.reset]: () => false
      }
    ],
    noData: [
      false,
      PropTypes.bol,
      {
        [actions.setNoData]: () => true,
        [actions.removeNoData]: () => false
      }
    ],
    errorFecth: [
      false,
      PropTypes.bol,
      {
        [actions.setErroFecth]: () => true,

        [actions.reset]: () => false
      }
    ],
    modalErrorStatus: [
      false,
      PropTypes.bool,
      {
        [actions.closeModalAction]: (state, payload) => !state,
        [actions.setErrorMessage]: (state, payload) => !state,

        [actions.reset]: () => false
      }
    ],
    errorMessage: [
      null,
      PropTypes.any,
      {
        [actions.setErrorMessage]: (state, payload) => payload.messageError,

        [actions.reset]: () => false
      }
    ],
    loadingConfig: [
      false,
      PropTypes.bool,
      {
        [actions.configAction]: (state, payload) => !state,

        [actions.reset]: () => false
      }
    ]
  }),

  start: function*() {
    const { fetchSlices } = this.actions;

    yield put(fetchSlices());
  },

  stop: function*() {
    const { reset, removeLoadingPage, removeNoData } = this.actions;

    // remove loading page
    yield put(removeLoadingPage());
    yield put(removeNoData());
    yield put(reset());
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.fetchSlices]: workers.fetchSlices,
    [actions.deleteSlice]: workers.deleteSlice
  }),

  workers: {
    *fetchSlices() {
      const {
        setSlices,
        addLoadingPage,
        removeLoadingPage,
        setErroFecth,
        setNoData
      } = this.actions;
      // Loading
      yield put(addLoadingPage());
      try {
        let responseResult = yield call(
          axios.get,
          `${API_SLICE_MANAGEMENT}/slic3`
        );
        const { data } = responseResult;
        data.map(el => (el.status = "Approved"));
        if (data.length > 0) {
          yield put(setSlices(data));
        } else {
          yield put(setNoData());
        }
        yield put(removeLoadingPage());
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            const keycloak = yield this.get("keycloak");
            keycloak.logout();
          } else if (error.response.status === 404) {
            console.log(404);
            yield put(setErroFecth());
          } else {
            yield put(setErroFecth());
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          yield put(setErroFecth());
        }
        yield put(removeLoadingPage());
      }
    },

    *deleteSlice() {
      const {
        fetchSlices,
        isLoading,
        actionModal,
        setErrorMessage
      } = this.actions;
      const sliceSelect = yield this.get("sliceSelect");
      try {
        yield put(isLoading());
        yield call(
          axios.delete,
          `${API_SLICE_MANAGEMENT}/slic3/${sliceSelect.id}`
        );
        if (sliceSelect.chunks.chunketeChunks.length > 0) {
          for (const chunkete of sliceSelect.chunks.chunketeChunks) {
            yield call(
              axios.delete,
              `${API_SLICE_MANAGEMENT}/ran_infrastructure/${chunkete.ranInfrastructureId}/chunkete_chunk/${chunkete.ranControllerId}`
            );
          }
        }
        if (sliceSelect.chunks.openstackVlans.length > 0) {
          for (const vlan of sliceSelect.chunks.openstackVlans) {
            yield call(
              axios.delete,
              `${API_SLICE_MANAGEMENT}/openstack_vlan/${vlan.id}`
            );
          }
        }
        for (const openstack of sliceSelect.chunks.openstackProjects) {
          yield call(
            axios.delete,
            `${API_SLICE_MANAGEMENT}/openstack_project/${openstack.id}`
          );
        }

        yield put(fetchSlices());
      } catch (error) {
        yield put(
          setErrorMessage(error.response.data.message || "Internal error")
        );
      }
      yield put(isLoading());
      yield put(actionModal());
    }
  }
});
