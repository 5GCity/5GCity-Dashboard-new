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
import Select from 'components/Select'
import PageTitle from 'components/PageTitle'

/* Containers */
import NavBar from 'containers/Navbar'
import ListNewNetworks from 'containers/Lists/ListNewNetworks'

class Catalogue extends Component {
  render () {
    const { organizationsList, selectCatalogueOrganization } = this.props
    const { changeCatalogueOrganization } = this.actions
    return (
      <Wrapper>
        <NavBar />
        <PageTitle
          title={'Network service catalogue'}
        />
        <ContainerFilters>
          <Select
            type={'default'}
            options={organizationsList}
            selectOption={selectCatalogueOrganization}
            onChange={value => changeCatalogueOrganization(value)}
          />
        </ContainerFilters>
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

const ContainerFilters = styled.div`
  display:flex;
  justify-content: flex-end;
  border-bottom : 1px solid rgba(137,151,159,0.2);
  padding: 16px 0px;
`
