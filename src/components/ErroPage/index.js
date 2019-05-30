/**
 * ErroPage Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { ErrorIcon } from 'components/Icons'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    <SVG><ErrorIcon/></SVG>
    <Title>Sorry, an error occurred</Title>
    <Message>We couldn't retrieve data at the moment. Please refresh and try again...</Message>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  margin-top: 150px;
`
const SVG = styled.div`
  text-align: center;
`
const Title = styled.h1`
  color: #EFF2F7;
  font-family: ${({theme}) => theme.fontDin};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.6px;
  text-align: center;
`
const Message = styled.h2`
  color: ${({theme}) => theme.secondaryColor};
  font-family: ${({theme}) => theme.fontFamily};
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  text-align: center;
`
