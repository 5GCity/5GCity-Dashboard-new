/**
 * Panelnetworksview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

export default class PanelNetworksView extends Component {
  render () {
    const { networks }= this.props
    return (
      <Wrapper>
        {networks &&
        <Title>Network</Title>
        }
        {networks && networks.map((network, i) =>
          <TypeMarker
            className={i === networks.length - 1 && 'noBorder'}
            key={network.id}>
            <Name>{network.name}</Name>
            <Id>{network.id}</Id>
            <Id>Bandwith: {network.networkData.quota.bandwidth.total} {network.networkData.quota.bandwidth.units}</Id>
            <Id>Bandwith Provisioned: {network.networkData.quota.bandwidth.provisioned} {network.networkData.quota.bandwidth.units}</Id>
            <Id>Tag Range: {network.networkData.quota.tagRange.init}-{network.networkData.quota.tagRange.end}</Id>
          </TypeMarker>
        )}
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`

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
  font-size: 18px;
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
