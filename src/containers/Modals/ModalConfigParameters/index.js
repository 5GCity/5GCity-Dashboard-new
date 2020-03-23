/**
 * Modalconfigparameters Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'

/* Component */
import Modal from 'components/Modal'
import Input from 'components/Input'
import Button from 'components/Button'
import Form from 'components/Form'
import { CheckIcon, CloseIcon } from 'components/Icons'

class ModalConfigParameters extends Component {
  render () {
    const { visibled, title, modalNodeConfigData, form } = this.props
    const { change, submit, configParams } = this.actions
    return (
      <Modal
        size={'small'}
        title={title}
        visible={visibled}
        onCancel={() => configParams(null)}
        closeOnClickModal={false}
      >
        <Form
          labelPosition={'top'}
        >
          <Modal.Body>
            {form.mapping_expression && form.mapping_expression.array.map((map, index) =>
              <Form.Item
                key={index}
                label={modalNodeConfigData.extra_info.parameter[index]}
                required
                status={!map.valid}
            >
                <Input
                  value={map.value}
                  onChange={value => change('mapping_expression', value, index)}
              />
                <Form.Error>{map.message}</Form.Error>
              </Form.Item>
          )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              text={'Yes'}
              svg={<CheckIcon />}
              type={'primary'}
              onClick={() => submit()}
          />
            <Button
              text={'No'}
              svg={<CloseIcon />}
              type={'secondary'}
              onClick={() => configParams(null)}
          />
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default Logic(ModalConfigParameters)
