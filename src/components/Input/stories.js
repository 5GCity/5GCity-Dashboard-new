/**
 * Input Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'

import Input from './index'

const bStyle = {
  padding:30,
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};


const example = () => (
  <div style={bStyle}>
  <Input />
  </div>
)

const exampleMoreIcon = () => (
  <div style={bStyle}>
  <Input icon={'edit'}/>
  </div>
)

const exampleSearch  = () => (
  <div style={bStyle}>
  <Input icon={'search'} placeholder={'Start typing to search...'} />
  </div>
)

storiesOf('Input', module)
  .add('default', example)
  .add('default + icon', exampleMoreIcon)
  .add('input + search', exampleSearch)
  