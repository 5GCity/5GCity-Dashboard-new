/**
 * Modalconfigparameters Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Modal from 'components/Modal'
import Input from 'components/Input'
import Button from 'components/Button'
import Form from 'components/Form'

class ModalConfigParameters extends Component {
  render () {
    const { visibled, modalAction, title, data, form } = this.props
    const { setValue, submitForm } = this.actions
    return (
      <Modal
        size={'small'}
        title={title}
        visible={visibled}
        onCancel={modalAction}
      >
        <Form
          labelPosition={'top'}
        >
        <Modal.Body>
        {data.extra_info.parameter.map((param, index) =>
          <Form.Item
            key={index}
            label={param}
          >
            <Input
              value={form.mapping_expression[index]}
              onChange ={ value => setValue('mapping_expression', value, index) }
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
            onClick={modalAction}
          />
        </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default Logic(ModalConfigParameters)

const Wrapper = styled.div`

`
