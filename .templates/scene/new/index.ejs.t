---
to: src/scenes/<%=name%>/index.js
---
/**
 * <%=name%> Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

class <%=name%> extends Component {
  render () {
    return (
      <Wrapper>
        <%=name%>
      </Wrapper>
    )
  }
}


export default Logic(<%=name%>)

const Wrapper = styled.div`

`
