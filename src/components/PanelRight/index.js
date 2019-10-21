/**
 * Sidebar Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    <RightNav>
      {props.close &&
      <CloseContainer onClick={() => props.close()}>&times;</CloseContainer>
    }
      {children}
    </RightNav>
  </Wrapper>
)

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  z-index: 5;
  width: 100%;
  display: ${(props) => props.show ? 'initial' : 'none'};
  background-color: ${({ backgroundColor }) => backgroundColor || rgba('#37474F', 0.7)}; //theme.bodyBackground
`

const RightNav = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  height: 100%;
  width: 268px;
  background: ${() => rgba('#37474F', 0.98)}; //theme.bodyBackground
  position: fixed;
  right: 0px;
`
const CloseContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  text-align: center;
  left: -31px;
  height: 32px;
  font-size: 20px;
  width: 32px;
  color: #89979F;
  background-color: #37474F;
  box-shadow: inset -1px 0 0 0 rgba(0,0,0,0.15), 0 0 50px 0 rgba(0,0,0,0.2);
  cursor: pointer;
`
