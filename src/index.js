/**
 * Index where the application begins
 * Where we configure the Hot Reloading
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { SENTRY_URL, VERSION, BUILD_DATE } from 'config'
import { Provider } from 'react-redux'
import { Store } from './store'
import { AppContainer } from 'react-hot-loader'
import { ThemeProvider } from 'styled-components'
import { Theme } from './globalStyles'
import { BrowserRouter } from 'react-router-dom'
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

// Stylings
import 'element-theme-default'
import 'mapbox-gl/dist/mapbox-gl.css'
import './font/D-DIN.css'

// App Root
import App from './containers/App'

// Where the app is rendered
const app = document.getElementById('root')

// Version info for debugging
const logMessage = `%cCurrent Version: ${VERSION} built in ${BUILD_DATE}`
console.log(logMessage, 'color:green')

const localVersion = window.localStorage.getItem('version')
const localIsTheLast = VERSION === localVersion

if (!localIsTheLast) {
  window.localStorage.setItem('version', VERSION)
}

// User I18N
i18n.use(locale)

// Sentry
let Raven
const sentryConfig = {
  release: VERSION,
  environment: process.env.APP_ENV
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'development') {
  Raven = require('raven-js')
  Raven.config(SENTRY_URL, sentryConfig).install()
}

const render = Component => ReactDOM.hydrate(
  <ThemeProvider theme={Theme}>
    <Provider store={Store}>
      <AppContainer>
        <BrowserRouter >
          <Component />
        </BrowserRouter>
      </AppContainer>
    </Provider>
  </ThemeProvider>,
  app
)
/* istanbul ignore if */
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextRootContainer = require('./containers/App').default
    render(NextRootContainer)
  })
}

export default render(App)
export { Raven }
