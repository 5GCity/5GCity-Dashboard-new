/**
 * Formchunkall Container
 * Please write a description
 *
 */

import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import Select from 'components/Select'
import Form from 'components/Form'
import Input from 'components/Input'

class FormChunkAll extends Component {
  render () {
    const { form, chunkInfo } = this.props
    const { change } = this.actions
    return (
      <Form labelPosition={'top'}>
        { form && chunkInfo && chunkInfo.map((chunk, index) =>
          <React.Fragment key={chunk.chunkId}>
            <Title>{chunk.ranName}</Title>
            <Id>{chunk.ranInfrastructureId}</Id>
            <Form.Item
              label={'Name'}
              required
              status={!form.name.array[index].valid}
            >
              <Input
                value={form.name.array[index].value}
                onChange={value => change('name', value, index)}
              />
              <Form.Error>{form.name.array[index].message}</Form.Error>
            </Form.Item>
            <Form.Item
              label={'plmnId'}
              required
              status={!form.plmnId.array[index].valid}
            >
              <Select
                type={'default'}
                options={chunk.plmnids}
                value={null}
                onChange={value => change('plmnId', value, index)}
              />
              <Form.Error>{form.plmnId.array[index].message}</Form.Error>
            </Form.Item>
            <Form.Item
              label={'ssid'}
              required
              status={!form.ssid.array[index].valid}
            >
              <Input
                value={form.ssid.array[index].value}
                onChange={value => change('ssid', value, index)}
              />
              <Form.Error>{form.ssid.array[index].message}</Form.Error>
            </Form.Item>
            {chunkInfo.length - 1 !== index &&
              <Border />
            }
          </React.Fragment>
        )}
      </Form>
    )
  }
}

export default Logic(FormChunkAll)

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`

const Id = styled.p`
  text-align: center;
  color: #bfcbd9;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
`

const Border = styled.p`
  border-bottom: 1px solid rgba(239,242,247,0.1);
`
