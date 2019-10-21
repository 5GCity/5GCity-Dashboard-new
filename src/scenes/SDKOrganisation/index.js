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
    return (
      <Wrapper>
        <ModalCreateOrganisation />
        <PageTitle
          title={'My Repository - Organisation'}
          buttonTitle={'Add new organisation'}
          type={'primary'}
          svg={<PlusIcon />}
          buttonFunction={() => modalOpen()}
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

