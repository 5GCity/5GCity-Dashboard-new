/**
 * Button Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Button } from 'element-react'
import { darken } from 'polished'

export default ({ children, ...props }) => (
  <ButtonStyled {...props}>
    {props.svg &&
      <SvgContent>{props.svg}</SvgContent>
    }
    <Text>{children || props.text}</Text>
  </ButtonStyled>
)

const ButtonStyled = styled(Button)`
  border-radius: 24px;
  border: transparent;
  line-height: 15px;
  font-family: ${({ theme }) => theme.fontDin };
  font-weight: bold;
  font-size: 14px;
  float: ${({float}) => float};


  ${({ type, theme }) => type === 'primary' &&`
    background-color: ${theme.primaryColor};

    &:hover {
      background-color: #628A34;
    }
    &:active {
       background-color: ${darken(0.1,theme.primaryColor)};
    }
    &:focus {
       background-color: ${darken(0.1,theme.primaryColor)};
    }
    &:disabled {
      color: #fff;
      background-color: #8CC14E;
    }
  `}

  ${({ type, theme }) => type === 'secondary' &&`
    background-color: ${theme.secondaryColor};
    color: #fff;

    &:hover {
      color: #fff;
      background-color: #525B60;
    }
    &:active {
      color: #fff;
      background-color: ${darken(0.1, theme.secondaryColor)};
      }
    &:focus {
      color: #fff;
      background-color: ${darken(0.1, theme.secondaryColor)};
      }
    &:disabled {
        color: #fff;
        background-color: #89979F;
      }
  `}

  ${({ type, theme }) => type === 'danger' &&`
  background-color: ${theme.dangerColor};
  color: #fff;

  &:hover {
    color: #fff;
    background-color: #9D4949;
  }
  &:active {
    color: #fff;
    background-color: ${darken(0.1, theme.dangerColor)};
    }
  &:focus {
    color: #fff;
    background-color: ${darken(0.1, theme.dangerColor)};
    }
  &:disabled {
    color: #fff;
    background-color: #DD6C6C;
  }
`}


  ${({size}) => size === 'large' && `
     min-width: 125px;
     min-height: 48px
  `}
  ${({size}) => size === 'xxxlarge' && `
     min-width: 240px;
     min-height: 48px;
     font-size: 16px;
  `}
`


const SvgContent = styled.i`
  display: inline-block;
  vertical-align: sub;
  margin-right: 4px;
  `

const Text = styled.span`
`
