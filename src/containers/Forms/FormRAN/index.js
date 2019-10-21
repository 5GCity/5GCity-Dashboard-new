/**
 * FormRAN Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Form from 'components/Form'
import Input from 'components/Input'

class FormRAN extends Component {
  render () {
    const { form } = this.props
    const { name, url, username, password } = form
    const { change } = this.actions
    return (
      <Wrapper>
        <Title>RAN</Title>
        <Form labelPosition={'top'} labelWidth='100'>
          <Form.Item
            label='Name'
            required
            status={!name.valid}
          >
            <Input
              value={name.value}
              onChange={value => change({name: value})}
          />
            <Form.Error>{name.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Controller Url'
            required
            status={!url.valid}
          >
            <Input
              value={url.value}
              onChange={value => change({url: value})}
          />
            <Form.Error>{url.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Username'
            required
            status={!username.valid}
          >
            <Input
              value={username.value}
              onChange={value => change({username: value})}
          />
            <Form.Error>{password.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Password'
            required
            status={!password.valid}
          >
            <Input
              value={password.value}
              onChange={value => change({password: value})}
          />
            <Form.Error>{password.message}</Form.Error>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormRAN)

const Wrapper = styled.div`

`
const Title = styled.h5`
  color:${({theme}) => theme.primaryColor};
  font-family:${({theme}) => theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 16px;
`
