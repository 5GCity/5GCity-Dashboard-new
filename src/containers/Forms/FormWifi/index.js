/**
 * FormWifi Container
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

class FormWifi extends Component {
  render () {
    const { form, editResource } = this.props
    const { channelBandwidth, channelNumber, txPower } = form
    const { change } = this.actions
    return (
      <Wrapper>
        <Title>{editResource.phy.name}</Title>
        <Form labelPosition={'top'} labelWidth='100'>
          <Form.Item
            label='channelBandwidth'
            required
            status={!channelBandwidth.valid}
          >
            <Input
              value={channelBandwidth.value}
              onChange={value => change({channelBandwidth: value})}
          />
            <Form.Error>{channelBandwidth.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='channelNumber'
            required
            status={!channelNumber.valid}
          >
            <Input
              value={channelNumber.value}
              onChange={value => change({channelNumber: value})}
          />
            <Form.Error>{channelNumber.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='txPower'
            required
            status={!txPower.valid}
          >
            <Input
              value={txPower.value}
              onChange={value => change({txPower: value})}
          />
            <Form.Error>{txPower.message}</Form.Error>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormWifi)

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
