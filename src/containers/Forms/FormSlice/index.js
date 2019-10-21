import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Checkbox } from 'element-react'

/* Components */
import Select from 'components/Select'
import Form from 'components/Form'
import Input from 'components/Input'

class FormSlice extends Component {
  render () {
    const { form } = this.props
    const { changeComputes, changeSDN, changeNetworks } = this.actions
    const { computes, networks, sdnWifi } = form
    return (
      <Form labelWidth='120' labelPosition={'top'}>
        <Form.Item>
          {computes &&
          <TitlePanel>Computing</TitlePanel>
        }
          {computes && computes.map((compute, i) =>
            <React.Fragment key={i}>
              <Checkbox.Group
                value={compute.ischecked === false ? [] : [compute.name]}
                onChange={value => changeComputes('ischecked', value.length > 0, i)}
          >
                <Checkbox key={compute.id} label={compute.name}>
                  <Name>{compute.name}</Name>
                  <Id>{compute.id}</Id>
                </Checkbox>
              </Checkbox.Group>
              {compute.ischecked &&
              <FormContainer key={i}>
                <Form.Item label='Name'>
                  <Input type='text' value={compute.computeName} onChange={value => changeComputes('computeName', value, i)} />
                </Form.Item>
                <Form.Item label='Description'>
                  <Input type='text' value={compute.computeDescription} onChange={value => changeComputes('computeDescription', value, i)} />
                </Form.Item>
                <Form.Item label='CPUs'>
                  <Input type='text' value={compute.cpus} onChange={value => changeComputes('cpus', value, i)} />
                </Form.Item>
                <Id>CPU Total: {compute.computeData.cpus.total} cores </Id>
                <Id>CPU Provisioned: {compute.computeData.cpus.provisioned} cores </Id>
                <Form.Item label='RAM'>
                  <Input type='text' value={compute.ram} onChange={value => changeComputes('ram', value, i)} />
                </Form.Item>
                <Id>RAM Total: {compute.computeData.ram.total} {compute.computeData.ram.units} </Id>
                <Id>RAM Provisioned: {compute.computeData.ram.provisioned} {compute.computeData.ram.units} </Id>
                <Form.Item label='Storage'>
                  <Input type='text' value={compute.storage} onChange={value => changeComputes('storage', value, i)} />
                </Form.Item>
                <Id>Storage Total: {compute.computeData.storage.total} {compute.computeData.storage.units} </Id>
                <Id>Storage Provisioned: {compute.computeData.storage.provisioned} {compute.computeData.storage.units} </Id>
              </FormContainer>}
            </React.Fragment>)}
        </Form.Item>

        <React.Fragment>
          {networks && <TitlePanel>Network</TitlePanel>}
          {networks && networks.map((network, i) =>
            <React.Fragment key={i}>
              <Form.Item>
                <Checkbox.Group value={network.ischecked === false ? [] : [network.name]} onChange={value => changeNetworks('ischecked', value.length > 0, i)}>
                  <Checkbox key={network.id} label={network.name}>
                    <Name>{network.name}</Name>
                    <Id>{network.id}</Id>
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              {network.ischecked &&
              <FormContainer key={i}>
                <Form.Item label='Name'>
                  <Input type='text' value={network.networkName} onChange={value => changeNetworks('networkName', value, i)} />
                </Form.Item>
                <Form.Item label='INIT CIDR'>
                  <Input type='text' value={network.int_cidr} onChange={value => changeNetworks('int_cidr', value, i)} />
                </Form.Item>
                <Form.Item label='CIDR'>
                  <Input type='text' value={network.cidr} onChange={value => changeNetworks('cidr', value, i)} />
                </Form.Item>
                <Form.Item label='Bandwidth'>
                  <Input type='text' value={network.bandwidth} onChange={value => changeNetworks('bandwidth', value, i)} />
                </Form.Item>
                <Id>Bandwidth Total: {network.networkData.bandwidth.total} {network.networkData.bandwidth.units}</Id>
                <Id>Bandwidth Provisioned: {network.networkData.bandwidth.provisioned} {network.networkData.bandwidth.units}</Id>
                <Form.Item label="Floating IP's">
                  <Input type='text' value={network.floatingIps} onChange={value => changeNetworks('floatingIps', value, i)} />
                </Form.Item>
                <Id>Floating IP's Total: {network.networkData.floatingIps.total} {network.networkData.floatingIps.units}</Id>
                <Id>Floating IP's Provisioned: {network.networkData.floatingIps.provisioned} {network.networkData.floatingIps.units}</Id>
                <Form.Item label='Tag'>
                  <Input type='text' value={network.tag} onChange={value => changeNetworks('tag', value, i)} />
                </Form.Item>
                <Id>
              Tag Range: {network.networkData.tagRange.init} - {network.networkData.tagRange.end}
                </Id>
                {network.networkData.provisionedTags && <Id>
              Provisioned Tags: {network.networkData.provisionedTags.map((tag, i) => <Tag key={i}>
                {tag} {i < network.networkData.provisionedTags.length - 1 ? ',' : ''}
              </Tag>)}
                </Id>}

              </FormContainer>}
            </React.Fragment>)}
          {sdnWifi && <TitlePanel>Wifi</TitlePanel>}
          {sdnWifi && sdnWifi.map((wifi, i) =>
            <React.Fragment key={i}>
              <Form.Item>
                <Checkbox.Group value={wifi.ischecked === false ? [] : [wifi.name]} onChange={value => changeSDN('ischecked', value.length > 0, i)}>
                  <Checkbox label={wifi.name}>
                    <Name>{wifi.name}</Name>
                    <Id>{wifi.id}</Id>
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              {wifi.ischecked &&
              <FormContainer key={i}>
                <Form.Item label='Name'>
                  <Input type='text' value={wifi.sdnWifiName} onChange={value => changeSDN('sdnWifiName', value, i)} />
                </Form.Item>
                <Form.Item label='DNS IP'>
                  <Input type='text' value={wifi.dns} onChange={value => changeSDN('dns', value, i)} />
                </Form.Item>
                <Form.Item label='DHCPD IP'>
                  <Input type='text' value={wifi.dhcpd} onChange={value => changeSDN('dhcpd', value, i)} />
                </Form.Item>
                <Form.Item label='Channel'>
                  <Select placeholder={'Select Channel'} type={'default'} options={wifi.channelOptions} onChange={value => changeSDN('channel', value, i)} selectOption={wifi.channel} />
                </Form.Item>
              </FormContainer>
        }
            </React.Fragment>)}
        </React.Fragment>
      </Form>
    )
  }
}

export default Logic(FormSlice)

export const FormContainer = styled.div`
  margin-left: 5px;
`

export const TitlePanel = styled.h5`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 32px 0 24px 0;
  font-size: 20px;
  line-height: 20px;
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

export const Tag = styled.span`

`
