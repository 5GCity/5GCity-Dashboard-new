/**
 * Brand Component
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Logo } from 'components/Icons'

export default ({ children, ...props }) => (
  <Wrapper {...props}><Logo /></Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height: 88px;
  background-color: #FFFFFF;
  box-shadow: inset 0 -1px 0 0 rgba(137,151,159,0.15);
`
