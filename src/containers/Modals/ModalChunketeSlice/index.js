/**
 * Modalchunketeslice Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'

/* Component */
import Modal from 'components/Modal'
import Button from 'components/Button'
import Input from 'components/Input'
import { CheckIcon } from 'components/Icons'
import Form from 'components/Form'


export default class ModalChunketeSlice extends Component {
  render () {
    const {
      modalStatus,
      status,
      loading,
      setChunkete,
      chunkForm,
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
        {chunketes &&
        <Form>
          <Modal.Body>
            {chunketes.map((chunk, index) =>
            <React.Fragment key={index}>
            <Title>{chunk.physName}</Title>
            <Form.Item
              label={'Assigned Quota'}
              required
              status={!chunkForm.assignedQuota.array[index].valid}
          >
              <Input
                value={chunkForm.assignedQuota.array[index].value}
                onChange={value => change('assignedQuota', value, index)}
            />
              <Form.Error>{chunkForm.assignedQuota.array[index].message}</Form.Error>
            </Form.Item>
            <Form.Item
              label={'Name'}
              required
              status={!chunkForm.name.array[index].valid}
          >
              <Input
                value={chunkForm.name.array[index].value}
                onChange={value => change('name', value, index)}
            />
              <Form.Error>{chunkForm.name.array[index].message}</Form.Error>
            </Form.Item>
            {chunketes.length -1 !== index &&
            <Border />
            }
            </React.Fragment>
            )}
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
        }
      </Modal>
    )
  }
}

export const ContainerButton = styled.div`

`

export const Title = styled.p`
  margin: 12px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${({ theme }) => theme.fontFamily};
`


const Border = styled.div`
  border-bottom: 1px solid rgba(239,242,247,0.1);
`
