/**
 * Monitoring Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'Monitoring'],

  connect: {
  actions: [AppLogic, ['addLoadingPage', 'removeLoadingPage']]
  },

  actions: () => ({
    setLoading: () => ({}),
  }),

  reducers: ({ actions }) => ({

  }),

  start: function * () {
    const { setLoading }= this.actions
    yield put(setLoading())
  },



  takeLatest: ({ actions, workers }) => ({
   [actions.setLoading]: [workers.loading]
  }),

  workers: {
    * loading () {
      const { addLoadingPage, removeLoadingPage } = this.actions
      yield put(addLoadingPage())
      yield delay(4000)
      yield put(removeLoadingPage())
  }
  }
})
