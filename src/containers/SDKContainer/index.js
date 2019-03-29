/**
 * Sdk Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import Logic from './logic'

/* Component */
import HeaderNav  from 'components/HeaderNav'
import Tabs  from 'components/Tabs'
import { BackIcon } from 'components/Icons'
import { withRouter } from 'react-router-dom'

/* Container */
import ComposerMain from 'containers/ComposerMain'

class SDKContainer extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    return (
      <Wrapper>
        <HeaderNav
          name={'New Service'}
          buttonBack={<BackIcon />}
          navigateBack={ () => this.navigateToBack() }
        >
        </HeaderNav>
          <Tabs activeName="composer">
            <Wrapper
              name="composer"
              label="Composer"
              closable={false}
            >
              <ComposerMain />
            </Wrapper>
            <Wrapper
              name="basicSettings"
              label="Basic settings"
              closable={false}
              disabled={true}
            >
              page 2
              </Wrapper>
          </Tabs>
      </Wrapper>
    )
  }
}

export default withRouter(Logic(SDKContainer))

const Wrapper = styled.div`
  height: calc(100vh - 136px) !important;
`
