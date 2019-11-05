/**
 * Modalcreateorganisation Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'

/* Components */
import { CheckIcon, CloseIcon } from 'components/Icons'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Form from 'components/Form'
import Input from 'components/Input'

class ModalCreateOrganisation extends Component {
  render () {
    const { form,  modalStatusOrganisation } = this.props
    const { change, submitNewOrganisation, modalClose } = this.actions
    const { sliceDescription, sliceId } = form
    return (
    <Modal
      size={'tiny'}
      showClose
      onCancel={() => modalClose()}
      title={'Add new organisation'}
      visible={modalStatusOrganisation}
    >
      <Form labelPosition={'top'}>
      <Modal.Body>
      <Form.Item
              label={'Organisation name'}
              required
              status={!sliceId.valid}
            >
              <Input
                value={sliceId.value}
                onChange={value => change({sliceId: value})}
            />
              <Form.Error>{sliceId.message}</Form.Error>
            </Form.Item>
            <Form.Item
              label={'Organisation description'}
              required
              status={!sliceDescription.valid}
            >
              <Input
                value={sliceDescription.value}
                onChange={value => change({sliceDescription: value})}
              />
              <Form.Error>{sliceDescription.message}</Form.Error>
            </Form.Item>
      </Modal.Body>
      <Modal.Footer>
        <Button
          text={'Yes'}
          svg={<CheckIcon />}
          type={'primary'}
          onClick={() => submitNewOrganisation()}
        />
        <Button
          text={'No'}
          svg={<CloseIcon />}
          type={'secondary'}
          onClick={() => modalClose()}
        />
      </Modal.Footer>
      </Form>
    </Modal>
    )
  }
}

export default Logic(ModalCreateOrganisation)

