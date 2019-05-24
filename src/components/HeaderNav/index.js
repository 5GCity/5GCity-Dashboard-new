/**
 * HeaderNav Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

/* Components */
import { BackIcon } from 'components/Icons'


export const HeaderNav = ({ children, buttonBack, leftContent, navigateBack, ...props }) => (
  <Wrapper {...props}>
    <Right>
      {buttonBack &&
        <BackButton onClick={() => navigateBack()} />
      }
      {props.name &&
        <Title>{props.name}</Title>
      }
    </Right>
    <Left>
      {children && children.props.children}
    </Left>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  display:flex;
  justify-content: space-between;

  ${({ type }) => type === 'transparent' ?`
    height: 56px;
    background-color: rgba(34,46,52,0.8);
  `:`
    height: 80px;
    background-color: #404F57;
    box-shadow: inset 0 1px 0 0 rgba(137,151,159,0.2), inset 0 -1px 0 0 rgba(137,151,159,0.2), 0 -5px 20px 0 rgba(0,0,0,0.5);
  `}
`
const Right = styled.div`
  display: flex;
  align-items: center;
`
const Left = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
`

const BackButton = styled(BackIcon)`
  margin: 32px 24px;
  cursor: pointer;
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.fontDin};
  color: white;
  font-size: 20px;
  font-weight: bold;
  line-height: 22px;
`
HeaderNav.Right = Right
HeaderNav.Left = Left

export default HeaderNav
