/**
 * Brand Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Brand from './index'

const State1 = () => (
  <Brand />
)

storiesOf('Brand', module)
  .add('primary', State1)