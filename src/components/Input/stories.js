/**
 * Input Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Input from './index'


const example = () => (
  <Input />
)

const exampleMoreIcon = () => (
  <Input icon={'edit'}/>
)

const exampleSearch  = () => (
  <Input icon={'search'} placeholder={'Start typing to search...'} />
)

storiesOf('Input', module)
  .add('default', example)
  .add('default + icon', exampleMoreIcon)
  .add('input + search', exampleSearch)
