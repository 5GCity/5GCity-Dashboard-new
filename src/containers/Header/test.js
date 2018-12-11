/**
 * Header Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Header from './index'
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
          <Header />
        </Provider>
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
