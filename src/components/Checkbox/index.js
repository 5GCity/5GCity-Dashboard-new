/**
 * Checkbox Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'element-react'
import { rgba } from 'polished'

export default ({ children, ...props }) => (
  <CheckboxContainer {...props}>
    {props.title}
  </CheckboxContainer>
)


