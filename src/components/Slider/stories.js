/**
 * Slider Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'

import Slider from './index'

const bStyle = {
  padding: '30px',
  backgroundColor: Theme.bodyBackground,
  height: '100%'
}

const example = () => (
  <div style={bStyle}>
    <Slider />
  </div>
)

const exampleMultiplePoints = () => (
  <div style={bStyle}>
    <Slider step='10' showStops />
  </div>
)

storiesOf('Slider', module)
  .add('default', example)
  .add('default + Mutiple points', exampleMultiplePoints)
