/**
 * Checkbox Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'element-react'

export default ({ children, ...props }) => (
  <CheckboxContainer {...props}>
    {props.title}
  </CheckboxContainer>
)

const CheckboxContainer = styled(Checkbox)`

`
