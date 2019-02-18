/**
 * Chart Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    <CartesianGrid strokeDasharray="0 0"/>
    <XAxis dataKey="name"/>
    <YAxis/>
    <Tooltip/>
    <Line type='monotone' dataKey='pv' stroke='#fff' />
    <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
  </Wrapper>
)

const Wrapper = styled(AreaChart)`
`

