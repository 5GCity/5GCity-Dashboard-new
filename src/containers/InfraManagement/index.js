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
import Loading from 'components/Loading'
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
);


class InfraManagement extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render() {
    const { addResource, getInfoMarker, changeModalStatus, submitModal } = this.actions
    const { pinsResources, loading, locations, modalStatus, modalInfo } = this.props
    return (
      <Wrapper>
        <ModalDeleteResource
          changeModalStatus={changeModalStatus}
          submitModal={submitModal}
          modalStatus={modalStatus}
          modalInfo={modalInfo}
        />

        <Loading loading={loading}>
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
              mapClick={({ lngLat }) => addResource(lngLat)}
              onClick={(marker) => getInfoMarker(marker)}
            />
          }
        </Loading>
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
