/**
 * NetworkNew Scene
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */

/* Containers */
import NavBar from 'containers/Navbar'
import ListNewNetworks from 'containers/Lists/ListNewNetworks'
import PageTitleOrganization from 'containers/PageTitleOrganization'

class NetworkNew extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    return (
      <Wrapper>
        <NavBar />
                <PageTitleOrganization
          title={'Add new network service'}
        />
        <ListNewNetworks />
      </Wrapper>
    )
  }
}

export default Logic(NetworkNew)

const Wrapper = styled.div`
  margin-left: 120px;
  padding: 0 24px;
`
