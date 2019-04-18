/**
 * PageTitle Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import { BackIcon } from 'components/Icons'


export default ({ children, ...props }) => (
  <Wrapper {...props}>
    { props.buttonBack &&
    <RightContainer>
      <ButtonIcon onClick={() => props.buttonBack()}><BackIcon /></ButtonIcon>
      <Title>{props.title}</Title>
    </RightContainer>
    }
    { !props.buttonBack &&
    <Title>{props.title}</Title>
    }
    { props.buttonTitle &&
      <ButtonPage {...props} onClick={props.buttonFunction} text={props.buttonTitle} />
    }
  </Wrapper>
)


const Wrapper = styled.div`
  display:flex;
  min-width: 1200px;
  justify-content: space-between;
  border-bottom : 1px solid rgba(137,151,159,0.2);
  padding:48px 0px 16px 0px;
`
const RightContainer = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontDin};
  text-transform: uppercase;
  font-size: 32px;
  color: #8CC14E;
  margin: 0;
`
const ButtonPage = styled(Button)`
  height: 32px;
`

const ButtonIcon = styled.i`
  cursor: pointer;
  margin-right: 36px;
`
