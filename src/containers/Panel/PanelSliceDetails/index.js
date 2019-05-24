/**
 * Panelslicedetails Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

/* Components */
import PanelRight from 'components/PanelRight'

class PanelSliceDetails extends Component {
  render () {
    const { show, data, close } = this.props
    return (
      <PanelRight
      show={show}
      close={close}
      >
        <Container>
          {data &&
          <PanelInfo>
            {data.computes &&
            <Title>Computing</Title>
            }
            {data.computes && data.computes.map((el, i) =>
              <TypeMarker
                className={ i ===  data.computes.length -1 && 'noBorder'}
                key={el.id}>
                  <Name>{el.name}</Name>
                  <Id>{el.id}</Id>
                  <Id>CPU Total: {el.computeData.cpus.total} cores </Id>
                  <Id>CPU Provisioned: {el.computeData.cpus.provisioned} cores </Id>
                  <Id>RAM Total: {el.computeData.ram.total} {el.computeData.ram.units} </Id>
                  <Id>RAM Provisioned: {el.computeData.ram.provisioned} {el.computeData.ram.units} </Id>
                  <Id>DISK Total: {el.computeData.storage.total} {el.computeData.storage.units} </Id>
                  <Id>DISK Provisioned: {el.computeData.storage.provisioned} {el.computeData.storage.units} </Id>
              </TypeMarker>
            )}
            {data.networks &&
            <Title>Network</Title>
            }
            {data.networks && data.networks.map((network, i) =>
                <TypeMarker
                  className={ i === data.networks.length -1 && 'noBorder'}
                  key={network.id}>
                  <Name>{network.name}</Name>
                  <Id>{network.id}</Id>
                  <Id>Bandwith: {network.networkData.quota.bandwidth.total} {network.networkData.quota.bandwidth.units}</Id>
                  <Id>Bandwith Provisioned: {network.networkData.quota.bandwidth.provisioned} {network.networkData.quota.bandwidth.units}</Id>
                  <Id>Floating Ip's: {network.networkData.quota.floatingIps.total}</Id>
                  <Id>Floating Ip's Provisioned: {network.networkData.quota.floatingIps.provisioned}</Id>
                  {network.networkData.quota.provisionedTags &&
                    <Id>
                      Provisioned Tags: {network.networkData.quota.provisionedTags.map((tag, i) =>
                      <Tag key={i}>
                        {tag} {i < network.networkData.quota.provisionedTags.length - 1 ? ',' : ''}
                      </Tag>
                      )
                    }
                    </Id>
                  }
                  <Id>Tag Range: {network.networkData.quota.tagRange.init}-{network.networkData.quota.tagRange.end}</Id>
                </TypeMarker>
            )}
            {data.sdnWifi &&
              <Title>Wifi</Title>
            }
            {data.sdnWifi && data.sdnWifi.map((el, i) =>
              <TypeMarker
                className={ i ===  data.sdnWifi.length -1 && 'noBorder'}
                key={el.id}>
                <Name>{el.name}</Name>
                <Id>{el.id}</Id>
                {el.sdnData && el.sdnData.channels.map((channel,i) =>
                <Channel key={i}>
                  <SubTitle>Channel {i+1}</SubTitle>
                  <Id>Bandwidth: {channel.bandwidth}</Id>
                  <Id>Number: {channel.number}</Id>
                  <Id>Tx Power: {channel.txPower}</Id>
                </Channel>
                )}
              </TypeMarker>
            )}
          </PanelInfo>
        }
        </Container>
      </PanelRight>
    )
  }
}

export default Logic(PanelSliceDetails)

const PanelInfo = styled.div`
.noBorder {
  border-bottom: none;
}
`
const Title = styled.h5`
  color: ${Theme.primaryColor};
  font-family: ${Theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
`

const TypeMarker = styled.div`
  border-bottom: 1px solid rgba(239,242,247,0.1);
  `

const Name = styled.p`
  margin: 12px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${Theme.fontFamily};
`

const Id = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${Theme.fontFamily};
  color: #89979F;
`
const Container = styled.div`
  overflow-y: auto;
  margin: 0 0 0 20px;
  height: calc(100% - 90px) !important;
  `
const Tag = styled.span`

`
const SubTitle = styled.h6`
  font-weight: bold;
  color: #EFF2F7;
`
const Channel = styled.div`
  margin-top: 20px;
`

