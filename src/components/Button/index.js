/**
 * Button Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Button } from 'element-react'
import { darken, lighten } from 'polished'

export default ({ children, ...props }) => (
  <ButtonStyled {...props}>
    {props.svg &&
      <SvgContent>{props.svg}</SvgContent>
    }
    <Text>{children || props.text}</Text>
  </ButtonStyled>
)

const ButtonStyled = styled(Button)`
  padding: 4px 12px;
  border-radius: 24px;
  border: transparent;
  line-height: 15px;
  font-family: ${({ theme }) => theme.fontDin};
  font-weight: bold;
  font-size: 14px;
  float: ${({float}) => float};


  ${({ type, theme }) => type === 'primary' && `
    background-color: ${theme.primaryColor};

    &:hover {
      background-color: #628A34 !important;
    }
    &:active {
       background-color: ${({ theme }) => theme && darken(0.1, theme.primaryColor)};
    }
    &:focus {
       background-color: ${({ theme }) => theme && darken(0.1, theme.primaryColor)};
    }
    &:disabled {
      color: #fff;
      background-color: #8CC14E;
    }
  `}

  ${({ type, theme, outline }) => type === 'secondary' && !outline && `
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
        background-color: ${theme.secondaryColor};
      }
  `}

  ${({ type, theme, outline }) => type === 'secondary' && outline && `
    background-color: transparent;
    border: 1px solid ${theme.secondaryColor};
    color: ${theme.secondaryColor};

    &:hover {
      color: ${darken(0.1, theme.secondaryColor)};
      border: 1px solid ${darken(0.1, theme.secondaryColor)};
    }
    &:active {
      color: ${darken(0.1, theme.secondaryColor)};
      border: 1px solid ${darken(0.1, theme.secondaryColor)};
      }
    &:focus {
      color: ${darken(0.1, theme.secondaryColor)};
      border: 1px solid ${darken(0.1, theme.secondaryColor)};
      }
    &:disabled {
      background-color: ${lighten(0.1, theme.secondaryColor)};
    }
`}


${({ type, theme, outline }) => type === 'primary' && outline && `
  background-color: transparent;
  border: 1px solid ${theme.primaryColor};
  color: ${theme.primaryColor};

  &:hover {
    background-color: #628A34;
    color: white;
    border: 1px solid ${darken(0.1, theme.primaryColor)};
  }
  &:active {
    background-color: transparent;
    color: white;
    border: 1px solid ${darken(0.1, theme.primaryColor)};
    }
  &:focus {
    background-color: #628A34;
    color: white;
    border: 1px solid ${darken(0.1, theme.primaryColor)};
    }
  &:disabled {
    background-color: #485F4F;
  }
`}

${({ type, theme, outline }) => type === 'primary' && !outline && `
background-color: ${theme.primaryColor};
color: #fff;

&:hover {
  color: #fff;
  background-color: #525B60;
}
&:active {
  color: #fff;
  background-color:${darken(0.1, theme.primaryColor)};
  }
&:focus {
  color: #fff;
  background-color:${darken(0.1, theme.primaryColor)};
  }
&:disabled {
    color: #fff;
    background-color: ${theme.primaryColor};
  }
`}

  ${({ type, theme }) => type === 'danger' && `
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
  ${({width}) => width && `
    min-width: ${width}px;
  `}
  ${({height}) => height && `
    min-height: ${height}px;
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
  display: inline-flex;
  vertical-align: middle;
  margin-right: 8px;
  `

const Text = styled.span`
  vertical-align: middle;
`
