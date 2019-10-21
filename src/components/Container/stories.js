/**
 * Container Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Container from './index'

const State1 = () => (
  <Container />
)

storiesOf('Container', module)
  .add('primary', State1)
