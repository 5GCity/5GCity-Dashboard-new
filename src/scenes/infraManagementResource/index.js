/**
 * infraManagementResource Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Container  */
import InfraManagement from 'containers/InfraManagement'

class infraManagementResource extends Component {
  render () {
    return (
      <Wrapper>
        <InfraManagement />
      </Wrapper>
    )
  }
}


export default Logic(infraManagementResource)

const Wrapper = styled.div`
  height: 100%;
`
