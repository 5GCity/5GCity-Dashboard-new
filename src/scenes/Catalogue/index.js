/**
 * Catalogue Scene
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

class Catalogue extends Component {
  render () {
    return (
      <Wrapper>
        <NavBar />
        <PageTitleOrganization
          title={'Network service catalogue'}
        />

        <ListNewNetworks />
      </Wrapper>
    )
  }
}

export default Logic(Catalogue)

const Wrapper = styled.div`
  margin-left: 120px;
  padding: 0 24px;
`
