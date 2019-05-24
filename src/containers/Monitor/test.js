/**
 * Monitor Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Monitor from './index'
import { Provider } from 'react-redux'
import { getStore } from 'kea'
import 'jest-styled-components'

const store = getStore()

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Monitor
        dataKey={'1'}
        />
      </Provider>)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
