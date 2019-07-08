/**
 * ComposerForm Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ComposerForm from './index'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { getStore } from 'kea'
const store = getStore()

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ComposerForm />
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
