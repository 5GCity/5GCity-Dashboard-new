/**
 * Modalconfigmonitoring Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import { ACTIONS_OPTIONS, MONITORING_TYPE } from './utils'

/* Component */
import Modal from 'components/Modal'
import Input from 'components/Input'
import Button from 'components/Button'
import Select from 'components/Select'
import Form from 'components/Form'
import { CheckIcon, CloseIcon, PlusIcon, DeleteIcon } from 'components/Icons'

class ModalConfigMonitoring extends Component {
  render () {
    const {
      visibled,
      title,
      modalNodeConfigData,
      form,
      monitoringFunc
    } = this.props
    const {
      change,
      changeFunc,
      configMonitoring,
      addMonitoring,
      removeMonitoring,
      submit
    } = this.actions
    return (
      <Modal
        size={'small'}
        title={title}
        visible={visibled}
        onCancel={() => configMonitoring(null)}
        closeOnClickModal={false}
      >
        <Form
          labelPosition={'top'}
        >
          <Modal.Body>
            {form.map((monitoring, i) =>
              <React.Fragment key={i}>
                <h1>Monitoring</h1>
                <Form.Item
                  label={'Name'}
                  required
                  status={!monitoring.name.valid}
                >
                  <Input
                    value={monitoring.name.value}
                    onChange={value => change(i, {name: value})}
                />
                  <Form.Error>{monitoring.name.message}</Form.Error>
                </Form.Item>
                <Form.Item
                  label={'Monitoring Type'}
                  required
                  status={!monitoring.actionType.valid}
            >
                  <Select
                    value={monitoring.actionType.value}
                    placeholder={'Select Action'}
                    options={ACTIONS_OPTIONS}
                    onChange={value => change(i, {actionType: value})}
                />
                  <Form.Error>{monitoring.actionType.message}</Form.Error>
                </Form.Item>
                <Form.Item
                  label={'VNF Monitoring'}
                  required
                  status={!monitoring.functionAssociated.valid}
                >
                  <Select
                    value={monitoring.functionAssociated.value}
                    placeholder={'Select Monitoring'}
                    options={monitoringFunc}
                    onChange={value => changeFunc('functionAssociated', value, i)}
                />
                  <Form.Error>{monitoring.functionAssociated.message}</Form.Error>
                </Form.Item>
                <Form.Item
                  label={'Monitoring parameters visibility'}
                  required
                  status={!monitoring.monitoringType.valid}
                >
                  <Select
                    value={monitoring.monitoringType.value}
                    placeholder={'Select Monitoring'}
                    options={MONITORING_TYPE}
                    onChange={value => change(i, { monitoringType: value })}
                />
                  <Form.Error>{monitoring.monitoringType.message}</Form.Error>
                </Form.Item>
                {form.length > 1 &&
                  <Button
                    text={'Remove monitoring'}
                    svg={<DeleteIcon />}
                    type={'danger'}
                    onClick={() => removeMonitoring(i)}
                  />
                }
              </React.Fragment>
            )}
            {modalNodeConfigData.extra_info.monitoringVNF.length > form.length &&
              <Button
                text={'Add more monitoring'}
                svg={<PlusIcon />}
                type={'primary'}
                onClick={() => addMonitoring()}
              />
            }

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
              onClick={() => configMonitoring(null)}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default Logic(ModalConfigMonitoring)
