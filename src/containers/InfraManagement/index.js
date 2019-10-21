/**
 * Inframanagement Container
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

/* Component */
import HeaderNav from 'components/HeaderNav'
import { BackIcon, CheckIcon, CloseIcon } from 'components/Icons'
import Modal from 'components/Modal'
import Button from 'components/Button'

/* Container */
import PanelResource from 'containers/Panel/PanelResource'

const ModalDeleteResource = (props) => (
  <Modal
    size={'small'}
    title={'Confirmation'}
    visible={props.modalStatus}
    onCancel={() => props.changeModalStatus(null)}
    closeOnClickModal={false}
  >
    {props.modalInfo &&
      <Modal.Body>
        <Message>
          Are you sure you want to delete resource {props.modalInfo.type} with name {props.modalInfo.name} ?
      </Message>
      </Modal.Body>
    }
    <Modal.Footer>
      <Button text={'Yes'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => props.submitModal()}
      />
      <Button
        text={'No'}
        svg={<CloseIcon />}
        type={'secondary'}
        onClick={() => props.changeModalStatus(null)}
      />
    </Modal.Footer>
  </Modal>
)

class InfraManagement extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { getInfoMarker, changeModalStatus, submitModal, changeModalErrorStatus, addResource } = this.actions
    const { pinsResources, locations, modalStatus, modalInfo, modalErrorStatus, modalErrorData, linksResources } = this.props
    let statusMarker = true
    return (
      <Wrapper>
        <ModalDeleteResource
          changeModalStatus={changeModalStatus}
          submitModal={submitModal}
          modalStatus={modalStatus}
          modalInfo={modalInfo}
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
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Infrastructure Management'}
        />
        <PanelResource />
        {pinsResources &&
          <SliceMap
            location={locations}
            markers={pinsResources}
            mapClick={({ lngLat }) => statusMarker && addResource(lngLat)}
            markerClick={(marker) => getInfoMarker(marker)}
            links={linksResources}
          />
        }
      </Wrapper>
    )
  }
}

export default withRouter(Logic(InfraManagement))

const Wrapper = styled.div`
  height: calc(100% - 80px) !important;
`
const Message = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
