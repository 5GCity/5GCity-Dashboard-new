/**
 * PanelChunkDetail Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

/* Components */
import PanelRight from 'components/PanelRight'

/* Containers */
import PanelLTEsView from 'containers/Panel/PanelLTEsView'
import PanelWifisView from 'containers/Panel/PanelWifisView'

export default class PanelChunkDetail extends Component {
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
            {data.wifi &&
              <PanelWifisView wifis={data.wifi} />
            }
            {data.LTE &&
              <PanelLTEsView ltes={data.LTE} />
            }
          </PanelInfo>
        }
        </Container>
      </PanelRight>
    )
  }
}

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
