/**
 * DatePicker Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import DatePicker from './index'

const State1 = () => (
  <DatePicker
    value={Date.now()}
    placeholder="Pick a day"
    disabledDate={time=>time.getTime() > Date.now() - 8.64e7}
  />
)

storiesOf('DatePicker', module)
  .add('Default', State1)
