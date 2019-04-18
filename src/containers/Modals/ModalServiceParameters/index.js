/**
 * Modalserviceparameters Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'

/* Component */
import Modal from 'components/Modal'
import Form from 'components/Form'
import Input from 'components/Input'
import Button from 'components/Button'

class ModalServiceParameters extends Component {
  render () {
    const { status, action, title, service, form } = this.props
    const { setValue, submitForm } = this.actions
    return (
      <Modal
      size={'small'}
      title={title}
      visible={status}
      onCancel={action}
    >
      <Form
        labelPosition={'top'}
      >
      <Modal.Body>
      {service.parameter.map((param, index) =>
        <Form.Item
          key={index}
          label={param}
        >
          <Input
            value={form.parameters_values[index]}
            onChange ={ value => setValue('parameters_values', value, index) }
          />
        </Form.Item>
      )}
      </Modal.Body>
      <Modal.Footer>
      <Button
          text={'Yes'}
          icon={'check'}
          type={'primary'}
          onClick={() => submitForm(form)}
        />
        <Button
          text={'No'}
          icon={'close'}
          type={'secondary'}
          onClick={action}
        />
      </Modal.Footer>
      </Form>
    </Modal>
    )
  }
}

export default Logic(ModalServiceParameters)

