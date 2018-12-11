// logic.test.js
import { resetKeaCache } from 'kea'
import { getStore } from 'kea'
import sagaPlugin from 'kea-saga'
import { AUTH_TOKEN_SLUG } from 'config'
import { cloneableGenerator } from 'redux-saga/utils';
export const Store = getStore({
  plugins: [ sagaPlugin ]
})

var localStorageMock = (function() {
  var store = {};

  return {
      getItem: function(key) {
          return store[key] || null;
      },
      setItem: function(key, value) {
          store[key] = value.toString();
      },
      clear: function() {
          store = {};
      }
  };

})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});


beforeEach(() => {
  resetKeaCache()
})

const logic = require('./logic').default

test('app props correct', () => {
  expect(logic.path).toEqual(['scenes', 'app'])
})

// Actions
test('setCurrentUser action', () => {
  const { setCurrentUser } = logic.actions
  expect(typeof setCurrentUser).toBe('function')
  expect(setCurrentUser.toString()).toBe('set current user (app)')
  expect(setCurrentUser({ id: 1, name: 'Hugo' }))
    .toEqual({ payload: { user: { id: 1, name: 'Hugo' } }, type: setCurrentUser.toString() })
})

// Reducers
test('user reducer', () => {
  const { setCurrentUser } = logic.actions
  const userReducer = logic.reducers.user
  expect(userReducer(undefined, setCurrentUser({ id: 1, name: 'Hugo' })))
    .toEqual({ id: 1, name: 'Hugo' })
})


test('loading reducer', () => {
  const { finished } = logic.actions
  const loadingReducer = logic.reducers.loading
  expect(loadingReducer(undefined, finished()))
    .toEqual(true)
})


// Workers
test('checkUserAuthentication worker', () => {
  const { getCurrentUser } = logic.actions

  // Test without token
  let generator = cloneableGenerator(logic.workers.checkUserAuthentication)()
  let next = generator.next()
  expect(next.value).toBeUndefined()

  // Test with token
  window.localStorage.setItem(AUTH_TOKEN_SLUG, 'testTokenYo')
  generator = cloneableGenerator(logic.workers.checkUserAuthentication)()
  next = generator.next()


  expect(next.value.PUT.action).toEqual(getCurrentUser())

})

test('logout worker', () => {
  let generator = cloneableGenerator(logic.workers.logout)()
  expect(generator.value).toBeUndefined()
})

