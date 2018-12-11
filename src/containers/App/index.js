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



class App extends Component {

  render () {
    const { loading } = this.props

    if (loading) {
      return null
    }
    
    return (
      <Main>
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
  flex-direction: column;
`
