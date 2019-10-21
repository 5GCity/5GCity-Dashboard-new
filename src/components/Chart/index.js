/**
 * Chart Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { ComposedChart } from 'recharts'

export default ({ children, ...props }) => (
  <Wrapper {...props} />
)

const Wrapper = styled(ComposedChart)`
`
