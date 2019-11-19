/**
 * NoData Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { NoDataIcon } from 'components/Icons'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    <SVG><NoDataIcon /></SVG>
    <Title>{props.title}</Title>
    <Message>{props.message}</Message>
  </Wrapper>
)

const Wrapper = styled.div`
top: 150px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    position: relative;
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
