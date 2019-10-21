/**
 * Switch Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'

import Switch from './index'

const bStyle = {
  padding: '30px',
  backgroundColor: Theme.bodyBackground,
  height: '100%'
}

const example = () => (
  <div style={bStyle}>
    <Switch title={'Show bandwidth'} name='test switch' onText='' offText='' onColor='#8CC14E' offColor='#89979F' />
    <Switch name='test switch' onText='' offText='' onColor='#8CC14E' offColor='#89979F' />
  </div>
)

storiesOf('Switch', module)
  .add('default', example)
