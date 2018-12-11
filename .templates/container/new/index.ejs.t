---
to: src/containers/<%=name%>/index.js
---
/**
 * <%=Name%> Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { connect } from 'kea'
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

export default connect({
  props: [
    Logic, [

    ]
  ],

  actions: [
    Logic, [

    ]
  ]
})(<%=name%>)

const Wrapper = styled.div`

`
