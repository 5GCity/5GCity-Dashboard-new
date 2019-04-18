/**
 * ComposerForm Logic Tests
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
  expect(logic.path).toEqual(['scenes', 'containers', 'ComposerForm'])
})

// Write more tests here
