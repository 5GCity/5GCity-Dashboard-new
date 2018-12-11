/**
 * Navbar Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Navbar from './index'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { getStore } from 'kea'
import { MemoryRouter } from 'react-router-dom'

const store = getStore()

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
       </MemoryRouter>
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
