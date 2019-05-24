/**
 * PanelError Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  position: absolute;
  width: 392px;
  right: 0;
  z-index: 1;
  bottom: 0;
  top: 80px;
  overflow: scroll;
  padding-top: 12px;
  background-color: ${({theme}) => theme.bodyBackground} ;
  display: ${({show}) => show ? 'initial' : 'none'};
  box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.5);
`
