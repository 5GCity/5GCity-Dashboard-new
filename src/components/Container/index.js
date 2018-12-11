/**
 * Container Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

export default ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
)

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
