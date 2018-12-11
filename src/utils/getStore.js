/**
 * Gets the current store
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import { resetKeaCache, keaReducer } from 'kea'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

export default function () {
  resetKeaCache()

  const reducers = combineReducers({
    scenes: keaReducer('scenes')
  })

  const sagaMiddleware = createSagaMiddleware()
  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware)
  )(createStore)

  const store = finalCreateStore(reducers)

  return store
}
