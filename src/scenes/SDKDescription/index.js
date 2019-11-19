/**
 * SDKDescription Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Container */
import ListSDKDescriptions from 'containers/Lists/ListSDKDescriptions'
import PageTitleOrganization from 'containers/PageTitleOrganization'
import NavBar from 'containers/Navbar'

class SDKDescription extends Component {
  render () {
    return (
      <Wrapper>
         <PageTitleOrganization
          title={'Create Descriptors'}
        />
        <NavBar />
        <ListSDKDescriptions />
      </Wrapper>
    )
  }
}


export default Logic(SDKDescription)

const Wrapper = styled.div`
  margin-left:120px;
  padding: 0 24px;
`
