/**
 * Checkbox Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Checkbox from './index'

const State1 = () => (
  <Checkbox />
)

storiesOf('Checkbox', module)
  .add('primary', State1)