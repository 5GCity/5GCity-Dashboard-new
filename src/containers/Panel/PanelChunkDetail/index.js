/**
 * PanelChunkDetail Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

/* Components */
import PanelRight from 'components/PanelRight'

class PanelChunkDetail extends Component {
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
            {data.computes && data.computes.map((compute, i) =>
              <TypeMarker
                className={i === data.computes.length - 1 && 'noBorder'}
                key={compute.id}>
                <Name>{compute.name}</Name>
                <Id>{compute.id}</Id>
                <Id>CPU: {compute.computeData.cpus.required} cores </Id>
                <Id>RAM: {compute.computeData.ram.required} {compute.computeData.ram.units} </Id>
                <Id>DISK: {compute.computeData.storage.required} {compute.computeData.storage.units} </Id>
              </TypeMarker>
            )}
            {data.networks &&
            <Title>Network</Title>
            }
            {data.networks && data.networks.map((network, i) =>
              <TypeMarker
                className={i === data.networks.length - 1 && 'noBorder'}
                key={network.id}>
                <Name>{network.name}</Name>
                <Id>Id: {network.id}</Id>
                <Id>Tag: {network.tag}</Id>
                <Id>CIDR: {network.cidr}</Id>
              </TypeMarker>
            )}
            {console.log(data)}
            {data.boxes &&
              <Title>Access Networks</Title>
            }
            {data.boxes && data.boxes.map((box, i) =>
              <TypeMarker
                className={i === data.boxes.length - 1 && 'noBorder'}
                key={i}>
                <Name>{box.name}</Name>
                <Id>{box.info}</Id>
                {box.physical && box.physical.map((phys, i) =>
                  <Channel key={i}>
                    <SubTitle>Name: {phys.phyName}</SubTitle>
                    <Id>Id: {phys.phyId}</Id>
                    <Id>Type: {phys.phyType}</Id>
                    {phys.phyConfig &&
                    <React.Fragment>
                      <Id>Bandwidth: {phys.phyConfig.channelBandwidth}</Id>
                      <Id>Number: {phys.phyConfig.channelNumber}</Id>
                      <Id>Tx Power: {phys.phyConfig.txPower}</Id>
                    </React.Fragment>
                  }
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

export default Logic(PanelChunkDetail)

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

const SubTitle = styled.h6`
  font-weight: bold;
  color: #EFF2F7;
`
const Channel = styled.div`
  margin-top: 20px;
  margin-left: 10px;
`
