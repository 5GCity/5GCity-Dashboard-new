/**
 * Infomanagementview Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Theme } from 'globalStyles'

/* Containers */
import SliceMap from 'containers/SliceMap'
import PanelRight from 'components/PanelRight'
import { NodeMarkerIcon, BackIcon } from 'components/Icons'

/* Components */
import HeaderNav from 'components/HeaderNav'

const infoMarkerContainer = (rightPanelInfo) => {
  const { computes, networks, sdnWifi } = rightPanelInfo
  return(
  <PanelInfo>
  {computes &&
  <Title>Computing</Title>
  }
  {computes && computes.map((el, i) =>
    <TypeMarker
      className={ i ===  rightPanelInfo.computes.length -1 && 'noBorder'}
      key={el.id}>
        <Name>{el.name}</Name>
        <Id>{el.id}</Id>
    </TypeMarker>
  )}
  {networks &&
  <Title>Network</Title>
  }
  {networks && networks.map((el, i) =>
      <TypeMarker
        className={ i === networks.length -1 && 'noBorder'}
        key={el.id}>
        <Name>{el.name}</Name>
        <Id>{el.id}</Id>
      </TypeMarker>
   )}
    {sdnWifi &&
  <Title>Wifi</Title>
  }
  {sdnWifi && sdnWifi.map((el, i) =>
    <TypeMarker
      className={ i ===  sdnWifi.length -1 && 'noBorder'}
      key={el.id}>
      <Name>{el.name}</Name>
      <Id>{el.id}</Id>
      <Id>Bandwidth: {el.bandwidth} Mbps</Id>
      <Id>Channel Number: {el.number}</Id>
      <Id>TX Power: {el.txPower} dBm</Id>
    </TypeMarker>
  )}
  </PanelInfo>
  )
}

class InfoManagementView extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { panelAction, infoMarker } = this.actions
    const { pinsResources, panel, rightPanelInfo } = this.props
    return (
      <Wrapper>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Infrastructure Management'}
        />
        <PanelRight
          show={panel}
          closeNav={() => panelAction()}
          headerIcon={<NodeMarkerIcon height={30} width={30} />}
          container={ rightPanelInfo && infoMarkerContainer(rightPanelInfo) }
          action={(item) => console.log(item)}
        />
        {pinsResources &&
          <SliceMap
            markers={pinsResources}
            markerColor={'#1e90ff'}
            onClick={(marker) => infoMarker(marker.location.resources) }
          />
        }
      </Wrapper>
    )
  }
}

export default withRouter(Logic(InfoManagementView))

const Wrapper = styled.div`
  height: calc(100% - 80px) !important;
`
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
