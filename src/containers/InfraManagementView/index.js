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
import { BackIcon, CheckIcon } from 'components/Icons'
import Button from 'components/Button'
import Modal from 'components/Modal'

class InfraManagementView extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { panelAction, infoMarker, changeModalErrorStatus } = this.actions
    const { pinsResources, panel, rightPanelInfo, locations, linksResources,  modalErrorStatus, modalErrorData } = this.props
    return (
      <Wrapper>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Infrastructure Management Overview'}
        />
        <Modal
          size={'tiny'}
          title={'Error'}
          visible={modalErrorStatus}
          onCancel={() => changeModalErrorStatus(null)}
          closeOnClickModal={false}
        >
          <Modal.Body>
            <Message>
              {modalErrorData && modalErrorData.message}
            </Message>
          </Modal.Body>
          <Modal.Footer>
            <Button
              text={'ok'}
              svg={<CheckIcon />}
              type={'primary'}
              onClick={() => changeModalErrorStatus(null)}
          />
          </Modal.Footer>
        </Modal>
        <PanelSliceDetails
          show={panel}
          data={rightPanelInfo && rightPanelInfo}
          close={panelAction}
        />
        {pinsResources &&
          <SliceMap
            location={locations}
            markers={pinsResources}
            markerColor={'#1e90ff'}
            markerClick={(marker) => infoMarker(marker.location.resources) }
            links={linksResources}
          />
        }
      </Wrapper>
    )
  }
}

export default withRouter(Logic(InfraManagementView))

const Wrapper = styled.div`
  height: calc(100% - 80px) !important;
`

const Message = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
