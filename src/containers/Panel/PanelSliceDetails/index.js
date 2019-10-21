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

/* Container */
import PanelComputesView from 'containers/Panel/PanelComputesView'
import PanelNetworksView from 'containers/Panel/PanelNetworksView'
import PanelRANsView from 'containers/Panel/PanelRANsView'
import PanelWifisView from 'containers/Panel/PanelWifisView'
import PanelLTEsView from 'containers/Panel/PanelLTEsView'


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
            <PanelComputesView computes={data.computes} />
            <PanelNetworksView networks={data.networks} />
            <PanelRANsView rans={data.rans} />
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

export default Logic(PanelSliceDetails)

const PanelInfo = styled.div`
.noBorder {
  border-bottom: none;
}
`

const Container = styled.div`
  overflow-y: auto;
  margin: 0 0 0 20px;
  height: calc(100% - 90px) !important;
  `

