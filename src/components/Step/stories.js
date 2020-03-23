/**
 * Steps Component Stories
 * Please write a description or remove this line
 *
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Step from './index'
import { action } from '@storybook/addon-actions'

const State1 = () => (
  <Step>
    <Step step={1} description={'General info'} active={false} validation={null} />
    <Step step={2} description={'Configuration Success'} active={false} validation={'success'} />
    <Step step={3} description={'Configuration Danger'} active={false} validation={'danger'} />
    <Step step={4} description={'Configuration Warning'} active={false} validation={'warning'} />
    <Step step={5} description={'Configuration Active'} active validation={null} />
    <Step step={6} description={'Configuration Active'} disabled validation={null} />
  </Step>
)

storiesOf('Steps', module)
  .add('default', State1)
