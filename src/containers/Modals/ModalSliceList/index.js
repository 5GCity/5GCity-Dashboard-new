/**
 * Modalslicelist Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'

/* Component */
import Modal from 'components/Modal'
import { CheckIcon, CloseIcon } from 'components/Icons'
import Button from 'components/Button'

export default class ModalSliceList extends Component {
  render () {
    const { status, slice, loading, actionModal, deleteSlice } = this.props
    return (
      <Modal
        size={'tiny'}
        showClose
        onCancel={() => props.actionModal()}
        title='Confirmation'
        visible={status}
      >
        <Modal.Body>
         {slice &&
          <Title>
            Are you sure you want to delete slice {slice.name} ?
          </Title>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button
            text={'Yes'}
            svg={<CheckIcon />}
            type={'primary'}
            loading={loading}
            onClick={() => deleteSlice()}
          />
          <Button
            text={'No'}
            svg={<CloseIcon />}
            type={'secondary'}
            onClick={() => actionModal()}
          />
        </Modal.Footer>
      </Modal>
    )
  }
}

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
