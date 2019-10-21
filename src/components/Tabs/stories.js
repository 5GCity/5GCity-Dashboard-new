/**
 * Tabs Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tab from './index'

const example1 = () => (
  <Tab activeName='1' onTabClick={action('Click Tab')}>
    <Tab.Pane name='1' label='Tab 1'>Page 1</Tab.Pane>
    <Tab.Pane name='2' label='Tab 2'>Page 2</Tab.Pane>
  </Tab>
)

storiesOf('Tabs', module)
  .add('primary', example1)
