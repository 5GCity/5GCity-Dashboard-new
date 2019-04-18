/**
 * Form Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

/* Components */
import Input from 'components/Input'
import Form from './index'

const rules = {
  name: [
  { required: true, message: 'Please input Activity name', trigger: 'blur' }
]
}
const exampleOne = () => (
  <Form labelPosition={'top'} labelWidth="100" rules={rules} >
    <Form.Item label="Name">
      <Input value={'test'} ></Input>
    </Form.Item>
    <Form.Item label="Activity zone">
      <Input placeholder="Placeholder Input"></Input>
    </Form.Item>
    <Form.Item label="Activity form">
      <Input disabled={true} value={'Another Test'}></Input>
    </Form.Item>
  </Form>
)

storiesOf('Form', module)
  .add('Default', exampleOne)
