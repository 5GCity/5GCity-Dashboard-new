/**
 * RoundButton Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished';

export default ({ children, icon, ...props }) => (
  <RoundButton>
    <IconContent>{icon}</IconContent>
  </RoundButton>
)

const RoundButton = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({size}) => size ? `
  height: ${size}px;
  width: ${size}px;
  `:`
  height: 32px;
  width: 32px;
`}
  border-radius: 24px;
  background-color: #89979F;

  &:hover{
    background-color: ${darken(0.2,'#89979F')};
  }

`
const IconContent = styled.i`
`

