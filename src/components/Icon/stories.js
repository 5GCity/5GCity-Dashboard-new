/**
 * Icon Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles';

import Icon from './index'

const bStyle = {
  padding:'30px',
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};


const exampleOne = () => (
  <div style={bStyle}>
    <Icon icon={'test'}/>
  </div>
)

const exampleTwo = () => (
  <div style={bStyle}>
    <Icon small icon={'edit'}/>
  </div>
)

storiesOf('Icon', module)
  .add('default', exampleOne)
  .add('small',exampleTwo)