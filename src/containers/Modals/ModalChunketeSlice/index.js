/**
 * Modalchunketeslice Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Modal from 'components/Modal'
import Button from 'components/Button'
import Input from 'components/Input'
import { CheckIcon } from 'components/Icons'
import Form from 'components/Form'

class ModalChunketeSlice extends Component {
  render () {
    const {
      modalStatus,
      status,
      loading,
      setChunkete,
      chunketes,
      change
     } = this.props
    return (
      <Modal
        size={'tiny'}
        showClose
        onCancel={modalStatus}
        visible={status}
        title='Confirmation'
      >
        <Form>
          <Modal.Body>
            <Form.Item
              label={'Assigned Quota'}
              required
              status={!chunketes.assignedQuota.valid}
          >
              <Input
                value={chunketes.assignedQuota.value}
                onChange={value => change({assignedQuota: value})}
            />
              <Form.Error>{chunketes.assignedQuota.message}</Form.Error>
            </Form.Item>
            <Form.Item
              label={'Name'}
              required
              status={!chunketes.name.valid}
          >
              <Input
                value={chunketes.name.value}
                onChange={value => change({name: value})}
            />
              <Form.Error>{chunketes.name.message}</Form.Error>
            </Form.Item>
          </Modal.Body>
          <Modal.Footer>
            <ContainerButton>
              <Button
                text={'Submit Chunkete'}
                svg={<CheckIcon />}
                type={'primary'}
                onClick={setChunkete}
                loading={loading}
              />
            </ContainerButton>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default Logic(ModalChunketeSlice)

export const ContainerButton = styled.div`
`
