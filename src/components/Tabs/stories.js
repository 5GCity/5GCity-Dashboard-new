/**
 * Tabs Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Theme } from 'globalStyles'
import styled from 'styled-components'

import Tab from './index'

const bStyle = {
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};


const example1 = () => (
  <div style={bStyle}>
    <Tab activeName="1" onTabClick={action('Click Tab')}>
      <Wrapper name="1" label="Tab 1">Page 1</Wrapper>
      <Wrapper name="2" label="Tab 2">Page 2</Wrapper>
    </Tab>

</div>
)
const Wrapper = styled.p`
`

storiesOf('Tabs', module)
  .add('primary', example1)
