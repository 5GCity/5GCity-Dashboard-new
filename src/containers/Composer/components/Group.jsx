import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Declare PropTypes
const { number, string, array, object, func, oneOfType } = PropTypes;

export default ({ children, ...props }) => (
  <Group {...props}>{children}</Group>
)
const Group = styled.g``

Group.propTypes= {
  classeName: string.isRequired,
  x: number,
  y: number,
  data: oneOfType([array, object]),
  enter: func,
  leave: func,
  click: func,
  out: func,
  over: func,
}
