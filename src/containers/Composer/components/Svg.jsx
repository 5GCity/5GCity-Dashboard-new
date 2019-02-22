import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Declare PropTypes
const { number, string, func } = PropTypes;

export default ({ children, ...props }) => (
  <SVG {...props}>{children}</SVG>
)
const SVG = styled.svg`
`

SVG.propTypes= {
  id: string.isRequired,
  witdh: number,
  height: number,
  mousemove: func,
}
