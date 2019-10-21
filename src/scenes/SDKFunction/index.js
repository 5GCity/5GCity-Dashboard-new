/**
 * SDKFunction Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Container */
import Function from 'containers/Function'

class SDKFunction extends Component {
  render () {
    return (
      <Wrapper>
        <Function />
      </Wrapper>
    )
  }
}

export default Logic(SDKFunction)

const Wrapper = styled.div`

`
