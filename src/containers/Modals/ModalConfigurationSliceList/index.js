/**
 * Modalconfigurationslicelist Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Modal from 'components/Modal'
import { CheckIcon, CloseIcon } from 'components/Icons'
import Button from 'components/Button'
import Select from 'components/Select'
import Form from 'components/Form'
import Input from 'components/Input'

class ModalConfigurationSliceList extends Component {
  render () {
    const { chunkInfo, loading, modalStatus, form  }= this.props
    const { actionModal, submit, change }= this.actions
    return (
    <Modal
      size={'tiny'}
      showClose
      onCancel={() => actionModal()}
      title='Configuration'
      visible={modalStatus}
    >
      <Modal.Body>
      <Form labelPosition={'top'}>
      {chunkInfo && chunkInfo.map((chunk, index) =>
      <React.Fragment key={chunk.chunkId}>
      <Title>{chunk.ranName}</Title>
      <Id>{chunk.ranInfrastructureId}</Id>
        <Form.Item
          label={'Name'}
          required
          status={!form.name.array[index].valid}
        >
          <Input
            value={form.name.array[index].value}
            onChange={value => change('name', value, index)}
        />
          <Form.Error>{form.name.array[index].message}</Form.Error>
        </Form.Item>
        <Form.Item
          label={'plmnId'}
          required
          status={!form.plmnId.array[index].valid}
        >
          <Select
            type={'default'}
            options={chunk.plmnids}
            selectOption={null}
            onChange={value => change('plmnId', value, index)}
          />
          <Form.Error>{form.plmnId.array[index].message}</Form.Error>
        </Form.Item>
        <Form.Item
          label={'ssid'}
          required
          status={!form.ssid.array[index].valid}
        >
          <Input
            value={form.ssid.array[index].value}
            onChange={value => change('ssid', value, index)}
        />
          <Form.Error>{form.ssid.array[index].message}</Form.Error>
        </Form.Item>
        {chunkInfo.length -1 !== index &&
        <Border />
        }
      </React.Fragment>
      )}
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          text={'Yes'}
          svg={<CheckIcon />}
          type={'primary'}
          loading={loading}
          onClick={() => submit()}
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

export default Logic(ModalConfigurationSliceList)

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`

const Id = styled.p`
  text-align: center;
  color: #bfcbd9;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
`

const Border = styled.p`
  border-bottom: 1px solid rgba(239,242,247,0.1);
`
