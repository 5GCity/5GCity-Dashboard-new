/**
 * Formsdnwifi Container
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
import Button from 'components/Button'

class FormSDNWifi extends Component {
  render () {
    const { form } = this.props
    const { name, channels } = form
    const { change, addChannel, removeChannel, changeChannel} = this.actions
    return (
      <Wrapper>
        <Title>Wifi</Title>
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
          {channels.map((channel, index) =>
          <React.Fragment key={index}>
            <SubTitle>Channel {index+1}</SubTitle>
            <Form.Item
              label='Bandwidth'
              required={true}
              status={!channel.bandwidth.valid}
            >
            <Input
              value={channel.bandwidth.value}
              onChange={value => changeChannel('channels','bandwidth', value, index)}
            />
            <Form.Error>{channel.bandwidth.message}</Form.Error>
            </Form.Item>

            <Form.Item
              label="Number"
              required={true}
              status={!channel.number.valid}
            >
            <Input
              value={channel.number.value}
              onChange={value => changeChannel('channels','number', value, index)}
            />
            <Form.Error>{channel.number.message}</Form.Error>
            </Form.Item>

            <Form.Item
              label="TX Power"
              required={true}
              status={!channel.txPower.valid}
            >
            <Input
              value={channel.txPower.value}
              onChange={value => changeChannel('channels','txPower', value, index)}
            />
           <Form.Error>{channel.txPower.message}</Form.Error>
            </Form.Item>
            <RemoveChannel
            text={`Remove Channel ${index+1}`}
            width={220}
            type={'danger'}
            disabled={channels.length < 2}
            onClick={() => removeChannel(index)}
          />
          </React.Fragment>
          )}
          <AddChannel
            text={'Add Channel'}
            width={220}
            type={'primary'}
            onClick={() => addChannel()}
          />
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormSDNWifi)

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
const SubTitle = styled.h5`
  color:${({theme}) => theme.secondaryColor};
  font-family:${({theme}) => theme.fontFamily};
  font-size: 14px;
  line-height: 14px;
  font-weight: normal;
`
const AddChannel = styled(Button)`
  margin-top: 0;
  margin-left: 0px !important;
  margin-bottom: 10px;
`
const RemoveChannel = styled(Button)`
margin-top: 0px;
margin-bottom: 10px;
`
