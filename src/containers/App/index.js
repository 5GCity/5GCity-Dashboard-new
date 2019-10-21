/**
 * Main APP Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import Logic from './logic'
import Routes from 'routes'

import { Switch, Route, withRouter } from 'react-router'

/* Components */
import Loading from 'components/Loading'

class App extends Component {
  render () {
    const { loading, loadingPage } = this.props

    if (loading) {
      return null
    }

    return (
      <Main>
        <Loading fullscreen loading={loadingPage} />
        <RouteContainer>
          <Switch>
            {Routes.map((route) =>
              <Route
                exact
                key={route.key}
                path={route.path}
                component={route.component}
                />
              )}
          </Switch>
        </RouteContainer>
      </Main>
    )
  }
}

export default withRouter(Logic(App))

const Main = styled.main``

const RouteContainer = styled.div`
  display: flex;
  height: 100%;
  witdh: 100wh;
  flex-direction: column;
`
