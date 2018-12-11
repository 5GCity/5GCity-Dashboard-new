/**
 * NavItem Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

import NavItem from './index'

const bStyle = {
  padding:30,
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};



const exampleOne = () => (
  <div style={bStyle}>
    <NavItem
      active={true}
      icon={'edit'}
      text={'Item 1'}
      disabled={false}
      href={''}
      onClick={() => console.log("ola")}
    />
    <NavItem
      active={true}
      icon={'view'}
      text={'Item 2'}
      disabled={false}
      href={''}
    />
  </div>
)

storiesOf('NavItem', module)
  .add('primary', exampleOne)