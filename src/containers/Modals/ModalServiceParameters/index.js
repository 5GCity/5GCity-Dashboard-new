/**
 * Modalserviceparameters Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import { withRouter } from 'react-router-dom'

/* Component */
import Modal from 'components/Modal'
import Form from 'components/Form'
import Input from 'components/Input'
import Button from 'components/Button'
import { CheckIcon, CloseIcon } from 'components/Icons'

class ModalServiceParameters extends Component {
  render () {
    const { status, action, title, service, form, isPublishLoading } = this.props
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
            {service && service.parameters.map((param, index) =>
              <Form.Item
                key={index}
                label={param}
        >
                <Input
                  value={form.parameters_values[index]}
                  onChange={value => setValue('parameters_values', value, index)}
          />
              </Form.Item>
      )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              text={'Yes'}
              svg={<CheckIcon />}
              loading={isPublishLoading}
              type={'primary'}
              onClick={() => submitForm(form)}
        />
            <Button
              text={'No'}
              svg={<CloseIcon />}
              type={'secondary'}
              onClick={action}
        />
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default withRouter(Logic(ModalServiceParameters))
