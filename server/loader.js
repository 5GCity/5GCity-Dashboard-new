// Express requirements
import path from 'path'
import fs from 'fs'

// React requirements
import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { frontloadServerRender } from 'react-frontload'

// Our store, entrypoint, and manifest
import { Store } from '../src/store'
import App from '../src/containers/App'
import { Theme } from '../src/globalStyles'
import manifest from '../build/asset-manifest.json'

export default (req, res) => {
  const injectHTML = (data, { html, title, meta, styles, body, scripts, state }) => {
    data = data.replace('<html>', `<html ${html}>`)
    data = data.replace(/<title>.*?<\/title>/g, title)
    data = data.replace('</head>', `${meta} ${styles}</head>`)
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
    )
    data = data.replace('</body>', scripts.join('') + '</body>')

    return data
  }

  // Load in our HTML file from our build
  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, htmlData) => {
      // If there's an error... serve up something nasty
      if (err) {
        console.error('Read error', err)

        return res.status(404).end()
      }

      // Create a store (with a memory history) from our current url
      const context = {}
      const modules = []
      const sheet = new ServerStyleSheet()

      frontloadServerRender(() =>
        renderToString(
          sheet.collectStyles(
            <ThemeProvider theme={Theme}>
              <Provider store={Store}>
                <StaticRouter location={req.url} context={context}>
                  <App />
                </StaticRouter>
              </Provider>
            </ThemeProvider>
          )
        )
      ).then(routeMarkup => {
        if (context.url) {
          // If context has a url property, then we need to handle a redirection in Redux Router
          res.writeHead(302, {
            Location: context.url
          })

          res.end()
        } else {
          // Otherwise, we carry on...

          // Let's give ourself a function to load all our page-specific JS assets for code splitting
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k])

          // Let's format those assets into pretty <script> tags
          const extraChunks = extractAssets(manifest, modules).map(
            c => `<script type="text/javascript" src="/${c}"></script>`
          )

          // We need to tell Helmet to compute the right meta tags, title, and such

          const helmet = Helmet.renderStatic()
          const styleTags = sheet.getStyleTags()

          // Pass all this nonsense into our HTML formatting function above
          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            styles: styleTags,
            body: routeMarkup,
            scripts: extraChunks,
            state: JSON.stringify(Store.getState()).replace(/</g, '\\u003c')
          })

          // We have all the final HTML, let's send it to the user already!
          res.send(html)
        }
      })
    }
  )
}
