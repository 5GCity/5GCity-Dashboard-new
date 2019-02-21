/**
 * Form Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Form from './index'

const FormTest = () => (
  <Form>
  </Form>
)

storiesOf('Form', module)
  .add('Default', FormTest)
