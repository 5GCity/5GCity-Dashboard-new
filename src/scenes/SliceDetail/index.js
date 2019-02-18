/**
 * SliceDetail Scene
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Theme } from 'globalStyles';

/* Components */
import HeaderNav from 'components/HeaderNav'
import PanelRight from 'components/PanelRight'
import { NodeMarkerIcon, BackIcon } from 'components/Icons'

/* Containers */
import SliceMap from 'containers/SliceMap'

const infoMarkerContainer = (rightPanelInfo) => {
  const info = rightPanelInfo.location.resources
  return(
 <PanelInfo>
  {info.computes &&
  <Title>Computing</Title>
  }
  {info.computes && info.computes.map((el, i) =>
    <TypeMarker
      className={ i ===  info.computes.length -1 && 'noBorder'}
      key={el.id}>
        <Name>{el.name}</Name>
        <Id>{el.id}</Id>
    </TypeMarker>
  )}
  {info.networks &&
  <Title>Network</Title>
  }
  {info.networks && info.networks.map((el, i) =>
      <TypeMarker
        className={ i === info.networks.length -1 && 'noBorder'}
        key={el.id}>
        <Name>{el.name}</Name>
        <Id>{el.id}</Id>
      </TypeMarker>
   )}
    {info.sdnWifi &&
  <Title>Wifi</Title>
  }
  {info.sdnWifi && info.sdnWifi.map((el, i) =>
    <TypeMarker
      className={ i ===  info.sdnWifi.length -1 && 'noBorder'}
      key={el.id}>
      <Name>{el.name}</Name>
      <Id>{el.id}</Id>
      <Id>DHCPD: {el.dhcpd}</Id>
      <Id>DNS: {el.dns}</Id>
      <Id>Channel: {el.channel}</Id>
    </TypeMarker>
  )}
</PanelInfo>
  )
}

class SliceDetail extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  clickMarker = (marker) => {
    const { infoMarker, panelAction } = this.actions
    panelAction()
    infoMarker(marker)
  }

  render () {

    const { slice, rightPanelInfo, panel  } = this.props
    const { panelAction } = this.actions
    return (
      <Wrapper>
      {slice &&
      <React.Fragment>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={slice.name}
        /> {/* leftContent={headerItems} */}
        <PanelRight
          show={panel}
          closeNav={() => panelAction()}
          headerIcon={<NodeMarkerIcon height={30} width={30} />}
          container={rightPanelInfo && infoMarkerContainer(rightPanelInfo)}
          action={(item) => console.log(item)}
        />
        <SliceMap
          markers={slice.markers}
          onClick={(marker) =>{ this.clickMarker(marker)}}
        />

      </React.Fragment>
      }
      </Wrapper>
    )
  }
}


export default withRouter(Logic(SliceDetail))

const Wrapper = styled.div`
  height: 100%;
  > div:last-child {
    height: calc(100% - 80px) !important;
  }
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
