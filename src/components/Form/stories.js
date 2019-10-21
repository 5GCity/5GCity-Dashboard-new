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
  <Form labelPosition={'top'} labelWidth='100'>
    <Form.Item label='Name' required status={'warning'}>
      <Input value={''} />
    </Form.Item>
    <Form.Item label='Activity zone' required status={'danger'}>
      <Input
        placeholder='Placeholder Input'
        append={"MB's"}
      />
      <Form.Error>Oops! Error message.</Form.Error>
    </Form.Item>
    <Form.Item label='Activity form' required >
      <Input disabled value={'Another Test'} />
    </Form.Item>
  </Form>
)

storiesOf('Form', module)
  .add('Default', exampleOne)
