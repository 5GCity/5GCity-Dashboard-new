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
import PageTitle from 'components/PageTitle'
import Select from 'components/Select'

/* Containers */
import NavBar from 'containers/Navbar'
import ListNewNetworks from 'containers/Lists/ListNewNetworks'

class NetworkNew extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { organizationsList, selectOrganization } = this.props
    const { changeOrganization } = this.actions
    return (
      <Wrapper>
        <NavBar />
        <PageTitle
          title={'Add new network service'}
        />
        <ContainerFilters>
          <Select
            type={'default'}
            options={organizationsList}
            selectOption={selectOrganization}
            onChange={value => changeOrganization(value)}
          />
        </ContainerFilters>
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

const ContainerFilters = styled.div`
  display:flex;
  justify-content: flex-end;
  border-bottom : 1px solid rgba(137,151,159,0.2);
  padding: 16px 0px;
`
