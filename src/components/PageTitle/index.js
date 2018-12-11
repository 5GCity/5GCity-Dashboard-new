/**
 * PageTitle Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
//import PropTypes from 'prop-types'

export default ({ children, title, buttonTitle, buttonFunction, ...props }) => (
  <Wrapper>
  <Title {...props}>{title}</Title>
  {buttonTitle &&
  <ButtonPage {...props} onClick={buttonFunction} description={buttonTitle} />
  }
  </Wrapper>
)


const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
  border-bottom : 1px solid rgba(137,151,159,0.2);
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.secondaryFont};
  padding:48px 0px 16px 0px;
  text-transform: uppercase;
  font-size: 32px;
  color: #8CC14E;
  margin: 0;
`
const ButtonPage = styled(Button)`
  height: 32px;
   margin:48px 0px 16px 0px;
`