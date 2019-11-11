/**
 * Panelwifisview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

export default class PanelWifisView extends Component {
  render () {
    const { wifis }= this.props
    return (
     <Wrapper>
       {wifis && wifis.map((wifi, i) =>
        <Fragment key={wifi.id}>
          <Title>Wifi</Title>
          <Name>Box name: {wifi.name}</Name>
          <TypeMarker
            key={i}
            className={i === wifis.length - 1 && 'noBorder'}
          >
            <Id>{wifi.id}</Id>
            {wifi.physical.map(physical =>
            <Fragment key={physical.id}>
              <Name>Name: {physical.name}</Name>
                <Id>Channel Bandwidth: {physical.config.channelBandwidth}</Id>
                <Id>Channel number: {physical.config.channelNumber}</Id>
                <Id>Tx Power: {physical.config.txPower}</Id>
            </Fragment>
            )}
          </TypeMarker>
        </Fragment>
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
