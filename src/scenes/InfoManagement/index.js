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
import InfoManagementView from 'containers/InfoManagementView'

class InfoManagement extends Component {
  render () {
    return (
      <Wrapper>
        <InfoManagementView />
      </Wrapper>
    )
  }
}


export default Logic(InfoManagement)

const Wrapper = styled.div`
  height: 100%;
`
