import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { Theme } from '../src/globalStyles'
import { Store } from '../src/store'
import 'element-theme-default'
import '../src/globalStyles'
import { configureActions } from '@storybook/addon-actions'


injectGlobal`

  body {
    background: ${Theme.bodyBackground};
  }

  html, body, #root {
    padding: 10px;
    height: 100%;
  }
`

const req = require.context('../src/', true, /stories.js$/)


function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator((story) => (
  <ThemeProvider theme={Theme}>
    <Provider store={Store}>
      {story()}
    </Provider>
  </ThemeProvider>
))

// setOptions({
//   name: '5G CIty',
//   goFullScreen: false,
//   showLeftPanel: true,
//   showDownPanel: false,
//   showSearchBox: false,
//   downPanelInRight: true,
//   sortStoriesByKind: false
// })


configure(loadStories, module);

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
})
