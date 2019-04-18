/**
 * FormTitle Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import FormTitle from './index'

const State1 = () => (
  <FormTitle title={'genral info'} />
)

storiesOf('FormTitle', module)
  .add('primary', State1)
