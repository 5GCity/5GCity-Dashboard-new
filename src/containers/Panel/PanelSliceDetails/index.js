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
                  <Id>CPU: 6 cores </Id>
                  <Id>RAM: 6 GB </Id>
                  <Id>DISK: 250GB </Id>
              </TypeMarker>
            )}
            {data.networks &&
            <Title>Network</Title>
            }
            {data.networks && data.networks.map((el, i) =>
                <TypeMarker
                  className={ i === data.networks.length -1 && 'noBorder'}
                  key={el.id}>
                  <Name>{el.name}</Name>
                  <Id>{el.id}</Id>
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
                <Id>DHCPD: {el.dhcpd}</Id>
                <Id>DNS: {el.dns}</Id>
                <Id>Channel: {el.channel}</Id>
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
  max-height: calc(100vh - 200px);
  `
