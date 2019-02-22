import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const { number, string, array, object, func, oneOfType } = PropTypes;

export default ({ children, ...props }) => (
  <Circle {...props}>{children}</Circle>
)

const Circle = styled.circle``

Circle.propTypes= {
  className: string.isRequired,
  width: number,
  height: number,
  cx: number.isRequired,
  cy: number.isRequired,
  fill: string.isRequired,
  r: number.isRequired,
  data: oneOfType([array, object]),
  enter: func,
  leave: func,
  click: func,
  out: func,
  over: func,
  down: func,
  up: func,
}
