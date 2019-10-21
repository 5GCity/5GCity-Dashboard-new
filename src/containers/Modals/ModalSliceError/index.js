/**
 * Modalsliceerror Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'

/* Components */
import Input from 'components/Input'
import Form from 'components/Form'

/* Container */
import Modal from 'components/Modal'

class ModalSliceError extends Component {
  render () {
    return (
      <Modal
        footerContent={this.footerButton()}
      >
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Item label='Slice name' labelWidth='120'>
              <Input
                value={sliceName}
                onChange={(value) => change(value)} />
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Logic(ModalSliceError)
