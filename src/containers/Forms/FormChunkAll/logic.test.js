/**
<<<<<<< HEAD:src/containers/Forms/formSDKActions/logic.test.js
 * formSDKActions Logic Tests
=======
 * FormChunkAll Logic Tests
>>>>>>> 4fc8fe91fef6c7c0c3ee07916d225d3649f34083:src/containers/Forms/FormChunkAll/logic.test.js
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { resetKeaCache } from 'kea'
import { getStore } from 'utils'

//import {  } from './utils'

beforeEach(() => {
  resetKeaCache()
})

const store = getStore()
const logic = require('./logic').default

test('starts from a clear state', () => {
})

test('app props correct', () => {
<<<<<<< HEAD:src/containers/Forms/formSDKActions/logic.test.js
  expect(logic.path).toEqual(['scenes', 'containers', 'formSDKActions'])
=======
  expect(logic.path).toEqual(['scenes', 'containers', 'FormChunkAll'])
>>>>>>> 4fc8fe91fef6c7c0c3ee07916d225d3649f34083:src/containers/Forms/FormChunkAll/logic.test.js
})

// Write more tests here
