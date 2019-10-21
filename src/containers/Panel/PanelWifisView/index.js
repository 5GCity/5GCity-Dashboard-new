/**
 * Panelwifisview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

export default class PanelWifisView extends Component {
  render () {
    const { wifis }= this.props
    console.log(wifis)
    return (
     <Wrapper>
        {wifis &&
        <Title>Wifi</Title>
        }
        <Name>Box name: {wifis.name}</Name>
        {wifis && wifis.physical.map((wifi, i) =>
        <TypeMarker
          className={i === wifis.physical.length - 1 && 'noBorder'}
          key={wifi.id}>
          <Name>Name: {wifi.name}</Name>
          <Id>{wifi.id}</Id>
          <Id>Channel Bandwidth: {wifi.config.channelBandwidth}</Id>
          <Id>Channel number: {wifi.config.channelNumber}</Id>
          <Id>Tx Power: {wifi.config.txPower}</Id>
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
