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

const exampleOne = () => (
  <Form labelPosition={'top'} labelWidth="100">
    <Form.Item label="Name" required={true} status={'warning'}>
      <Input value={''} ></Input>
    </Form.Item>
    <Form.Item label="Activity zone" required={true} status={'danger'}>
      <Input
        placeholder="Placeholder Input"
        append={"MB's"}
      />
      <Form.Error>Oops! Error message.</Form.Error>
    </Form.Item>
    <Form.Item label="Activity form" required={true} >
      <Input disabled={true} value={'Another Test'}></Input>
    </Form.Item>
  </Form>
)

storiesOf('Form', module)
  .add('Default', exampleOne)
