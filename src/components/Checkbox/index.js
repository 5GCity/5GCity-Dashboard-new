/**
 * Checkbox Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'element-react'

export default ({ children, ...props }) => (
  <Checkbox {...props}>Checkbox</Checkbox>
)

const Wrapper = styled.div``
