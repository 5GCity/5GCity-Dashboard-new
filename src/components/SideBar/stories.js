/**
 * SideBar Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import SideBar from './index'

const State1 = () => (
  <SideBar />
)

storiesOf('SideBar', module)
  .add('primary', State1)