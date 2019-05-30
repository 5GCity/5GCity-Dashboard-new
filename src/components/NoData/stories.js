/**
 * NoData Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import NoData from './index'

const State1 = () => (
  <NoData
    message={'Click on the “Add new service” button to add your first service!'}
    title={'You don’t have any services yet...'}
  />
)

storiesOf('NoData', module)
  .add('primary', State1)
