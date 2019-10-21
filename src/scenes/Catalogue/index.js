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
import PageTitle from 'components/PageTitle'

/* Containers */
import NavBar from 'containers/Navbar'
import ListNewNetworks from 'containers/Lists/ListNewNetworks'

class Catalogue extends Component {
  render () {
    return (
      <Wrapper>
        <NavBar />
        <PageTitle
          title={'Network Service Catalogue'}
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
