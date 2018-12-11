import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { Theme } from '../src/globalStyles'
import { Store } from '../src/store'
//import { setOptions } from '@storybook/addon-options'
import 'element-theme-default'
import '../src/globalStyles'


injectGlobal`

  body {
    background: #fff;
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    /* padding: 50px;*/

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
