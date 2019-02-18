/**
 * InputMask Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import InputMask from './index'

const State1 = () => (
  <InputMask
  placeholder="Enter a IP"
  mask={[/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.',/\d/,'/',/\d/, /\d/]} />
)

storiesOf('InputMask', module)
  .add('default', State1)
