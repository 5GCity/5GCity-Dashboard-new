/**
 * Panelnewslice Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Container */
// import FormNewSlice from 'containers/Forms/FormNewSlice'

/* Component */
import PanelRight from 'components/PanelRight'
import { BackIcon } from 'components/Icons'
import  Button from 'components/Button'
import Input from 'components/Input'
import { Form, Checkbox } from 'element-react'

class PanelNewSlice extends Component {

  onSubmit(e) {
    e.preventDefault();
  }


  render () {
    const { show, form, close, update } = this.props
    const { changeComputes, changeNetwork ,changeSDN }= this.actions
    return (
    <PanelRight
      show={show}
      close={close}
    >
    {form &&
    <Container>
       <Form
        model={form}
        labelWidth="120"
        labelPosition={'top'}
        key={form.id}>
        <Form.Item>
          {form.computes &&
            <TitlePanel>Computing</TitlePanel>
          }
          {form.computes && form.computes.map((compute,i) => {
            return (
              <Checkbox.Group
                value={compute.ischecked === false ? []: [compute.name]}
                onChange={(value) => changeComputes(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
                <Checkbox key={compute.id} label={compute.name}>
                  <Name>{compute.name}</Name>
                  <Id>{compute.id}</Id>
                  <Id>CPU: 6 cores </Id>
                  <Id>RAM: 6 GB </Id>
                  <Id>DISK: 250GB </Id>
                </Checkbox>
              </Checkbox.Group>
            )
          })}
      </Form.Item>

      <React.Fragment>
      {form.networks &&
        <TitlePanel>Network</TitlePanel>
      }
      {form.networks && form.networks.map((network,i) =>
        <React.Fragment>
          <Form.Item>
            <Checkbox.Group
              value={network.ischecked === false ? []: [network.name]}
              onChange={(value) => changeNetwork(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
              <Checkbox
                key={network.id}
                label={network.name}
              >
                <Name>{network.name}</Name>
                <Id>{network.id}</Id>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {network.ischecked &&
          <FormContainer key={i}>
          <Form.Item label="CIDR" >
            <Input
              type="text"
              value={network.cidr}
              onChange={(value) => changeNetwork(selectPin,i,'cidr',value)}
            />
            {/*<InputMask
            mask={[/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.',/\d/,'/',/\d/, /\d/]}
            type="text"
            value={networkinfo.cidr}
            onChange={(value) => changeNetwork(selectPin,i,'cidr',value)}
            /> */}
          </Form.Item>
          </FormContainer>
          }
        </React.Fragment>
      )}
        {form.sdnWifi &&
        <TitlePanel>Wifi</TitlePanel>
      }
      {form.sdnWifi && form.sdnWifi.map((sdnWifi,i) =>
        <React.Fragment>
          <Form.Item>
            <Checkbox.Group
              value={sdnWifi.ischecked === false ? []: [sdnWifi.name]}
              onChange={(value) => changeSDN(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
              <Checkbox label={sdnWifi.name}>
                <Name>{sdnWifi.name}</Name>
                <Id>{sdnWifi.id}</Id>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {sdnWifi.ischecked &&
          <FormContainer key={i}>
          <Form.Item label="Name" >
            <Input
              type="text"
              value={sdnWifi.sdnWifiName}
              onChange={(value) => changeSDN(selectPin,i,'sdnWifiName',value)}/>
          </Form.Item>
          <Form.Item label="DNS IP" >
            <Input
              type="text"
              value={sdnWifi.dns}
              onChange={(value) => changeSDN(selectPin,i,'dns',value)}/>
          </Form.Item>
          <Form.Item label="DHCPD IP" >
            <Input
              type="text"
              value={sdnWifi.dhcpd}
              onChange={(value) => changeSDN(selectPin,i,'dhcpd',value)}/>
          </Form.Item>
          <Form.Item label="Channel">
            <Input
              type="text"
              value={sdnWifi.channel}
              onChange={(value) => changeSDN(selectPin,i,'channel',value)}/>
          </Form.Item>
          </FormContainer>
          }
        </React.Fragment>
      )}
    </React.Fragment>
    </Form>
    </Container>
    }
    <Bottom>
      <BottomContainer>
        <Button
          size={'xxxlarge'}
          svg={<BackIcon />}
          text={'Update Card'}
          type={'primary'}
          onClick={update}
        />
      </BottomContainer>
    </Bottom>
    </PanelRight>
    )
  }
}

export default Logic(PanelNewSlice)

const Container = styled.div`
  overflow-y: auto;
  margin: 0 0 0 20px;
  max-height: calc(100vh - 200px);
  `

const Bottom = styled.div`
  background-color: rgba(255,255,255,0.05);
  height: 80px;
  width: 100%;
  position: absolute;
  bottom: 80px;
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const Name = styled.p`
  margin: 12px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${({ theme }) => theme.fontFamily};
`

export const Id = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: #89979F;
`

export const TitlePanel = styled.h5`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 32px 0 24px 0;
  font-size: 20px;
  line-height: 20px;
`

export const FormContainer = styled.div`
  margin-top: 20px;
  margin-left: 32px;
`
