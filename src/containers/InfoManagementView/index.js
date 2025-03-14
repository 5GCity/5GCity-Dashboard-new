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

/* Containers */
import SliceMap from 'containers/SliceMap'
import PanelSliceDetails from 'containers/Panel/PanelSliceDetails'

/* Components */
import HeaderNav from 'components/HeaderNav'
import { BackIcon } from 'components/Icons'

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
        <PanelSliceDetails
          show={panel}
          data={rightPanelInfo && rightPanelInfo}
          close={panelAction}
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
