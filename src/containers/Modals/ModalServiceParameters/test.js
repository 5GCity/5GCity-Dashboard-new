/**
 * ModalServiceParameters Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ModalServiceParameters from './index'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { getStore } from 'utils'

const store = getStore()

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ModalServiceParameters />
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
