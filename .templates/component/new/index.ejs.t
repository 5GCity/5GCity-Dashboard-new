---
to: src/components/<%=name%>/index.js
---
/**
 * <%=name%> Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

export default ({ children, ...props }) => (
  <Wrapper {...props}><%=name%></Wrapper>
)

const Wrapper = styled.div``
