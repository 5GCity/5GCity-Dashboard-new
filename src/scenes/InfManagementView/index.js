/**
 * InfoManagement Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Containers */
import InfraManagementView from 'containers/InfraManagementView'

class InfManagementView extends Component {
  render () {
    return (
      <Wrapper>
        <InfraManagementView />
      </Wrapper>
    )
  }
}


export default Logic(InfManagementView)

const Wrapper = styled.div`
  height: 100%;
`
