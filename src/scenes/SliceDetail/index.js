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
import { Theme } from 'globalStyles'

/* Components */
import HeaderNav from 'components/HeaderNav'

import { BackIcon } from 'components/Icons'

/* Containers */
import SliceMap from 'containers/SliceMap'
import PanelChunkDetail from 'containers/Panel/PanelChunkDetail'

class SliceDetail extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { slice, rightPanelInfo, panel, location } = this.props
    const { panelAction , infoMarker } = this.actions
    return (
      <Wrapper>
      {slice &&
      <React.Fragment>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={slice.name}
        />
        <PanelChunkDetail
          show={panel}
          data={rightPanelInfo && rightPanelInfo}
          close={panelAction}
        />
        <SliceMap
          location={location}
          markers={slice.markers}
          markerColor={Theme.primaryColor}
          onClick={(marker) => infoMarker(marker)}
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
