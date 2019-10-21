/**
 * RoundButton Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'

import RoundButton from './index'

const bStyle = {
  padding: 30,
  backgroundColor: Theme.bodyBackground,
  height: '100%'
}

const exampleOne = () => (
  <div style={bStyle}>
    <RoundButton color={'#fff'} />
  </div>
)

storiesOf('RoundButton', module)
  .add('primary', exampleOne)
