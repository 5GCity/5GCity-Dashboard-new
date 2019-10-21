/**
 * Modalcreateslice Container
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

class ModalCreateSlice extends Component {
  handleKeyPress (target) {
    if (target.charCode === 13) {
      target.preventDefault()
    }
  }

  render () {
    const {
      modalNewSliceStatus,
      modalNewSlice,
      formSlice,
      setValue,
      createSlice,
      loading } = this.props
    return (
      <Modal
        size={'tiny'}
        showClose
        onCancel={modalNewSliceStatus}
        visible={modalNewSlice}
        title='Confirmation'
      >
        <Form
          model={formSlice}>
          <Modal.Body>
            <Form.Item
              label='Slice name'
              labelPosition={'top'}
              required
              status={!formSlice.nameSlice.valid}
            >
              <Input
                onKeyPress={this.handleKeyPress}
                value={formSlice.nameSlice.value}
                onChange={value => setValue({nameSlice: value})}

              />
              <Form.Error>{formSlice.nameSlice.message}</Form.Error>
            </Form.Item>
          </Modal.Body>
          <Modal.Footer>
            <ContainerButton>
              <Button
                text={'Submit request'}
                svg={<CheckIcon />}
                type={'primary'}
                onClick={createSlice}
                loading={loading}
              />
            </ContainerButton>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default Logic(ModalCreateSlice)

export const ContainerButton = styled.div`
`
