/**
 * SDKManagement Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Containers */
import NavBar from 'containers/Navbar'
import ListSDKOrganisation from 'containers/Lists/ListSDKOrganisation'
import ModalCreateOrganisation from 'containers/Modals/ModalCreateOrganisation'

/* Components */
import PageTitle from 'components/PageTitle'
import { PlusIcon } from 'components/Icons'



class SDKOrganisation extends Component {
  render () {
    const { modalOpen }= this.actions
    const { user } = this.props
    return (
      <Wrapper>
        <ModalCreateOrganisation />
        <PageTitle
          title={'My repositories'}
          buttonTitle={ user && 'Add new repository'}
          type={user && 'primary'}
          svg={user && <PlusIcon />}
          buttonFunction={() => user && modalOpen()}
        />
        <NavBar />
        <ListSDKOrganisation />
      </Wrapper>
    )
  }
}

export default Logic(SDKOrganisation)

const Wrapper = styled.div`
  margin-left: 120px;
  padding: 0 24px;
`

