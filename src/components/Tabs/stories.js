/**
 * Tabs Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles';

import Tabs, { Pane } from './index'

const bStyle = {
  padding:'30px',
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};


const example1 = () => (
  <div style={bStyle}>
    <Tabs activeName='2' onTabClick={(tab) => console.log(tab.props.name)}>
      <Pane label='Current usage' name='1'>Current usage</Pane>
      <Pane label='Allocation' name='2'>Allocation</Pane>
    </Tabs>
</div>
)

storiesOf('Tabs', module)
  .add('primary', example1)