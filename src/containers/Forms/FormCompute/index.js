/**
 * Formcompute Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import Form from 'components/Form'
import Input from 'components/Input'

class FormCompute extends Component {
  render () {
    const { form } = this.props
    const { change } = this.actions
    const { name, cpu, ram, storage } = form
    return (
      <Wrapper>
        <Title>Computing</Title>
          <Form labelPosition={'top'} labelWidth="100">
          <Form.Item
            label='Name'
            required={true}
            status={!name.valid}
          >
          <Input
            value={name.value}
            onChange={value => change({name: value})}
          />
          <Form.Error>{name.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Number of available CPUs'
            required={true}
            status={!cpu.valid}
          >
          <Input
            value={cpu.value}
            onChange={value => change({cpu: value})}
          />
          <Form.Error>{cpu.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label="Available RAM"
            required={true}
            status={!ram.valid}
          >
          <Input
            value={ram.value}
            onChange={value => change({ram: value})}
            append={'MB/s'}
          />
          <Form.Error>{ram.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label="Avaible Storage"
            required={true}
            status={!storage.valid}
          >
          <Input
            value={storage.value}
            onChange={value => change({storage: value})}
            append={'GB'}
          />
          <Form.Error>{storage.message}</Form.Error>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormCompute)

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
