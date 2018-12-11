/**
 * NotFound Scene Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import NotFound from './index'
import 'jest-styled-components'

import { Store } from 'store'
import { Theme } from 'globalStyles'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={Theme}>
        <Provider store={Store}>
          <NotFound />
        </Provider>
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
