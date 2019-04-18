/**
 * FormTitle Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
  <Title>{props.title}</Title>
  <Border />
  </Wrapper>
)

const Wrapper = styled.div`
`

const Title = styled.p`
  margin-left: 8px;
  color: #EFF2F7;
  font-family: ${({ theme }) => theme.fontDin };
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 0.5px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`
const Border = styled.p`
  border-bottom: 1px solid rgba(239,242,247,0.1);
`
