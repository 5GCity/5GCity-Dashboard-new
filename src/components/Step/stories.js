/**
 * Steps Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Step from './index'

const State1 = () => (
  <Step>
    <Step.item step={1} description={'General info'}>
      <h1>This is Step 1</h1>
    </Step.item>
    <Step.item step={2} description={'Configuration Properties'}>
      <h1>This is Step 2</h1>
    </Step.item>
  </Step>
)

storiesOf('Steps', module)
  .add('default', State1)