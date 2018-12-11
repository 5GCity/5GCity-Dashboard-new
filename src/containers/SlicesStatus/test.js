/**
 * SlicesStatus Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import SlicesStatus from './index'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { getStore } from 'kea'

const store = getStore()

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <SlicesStatus />
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
