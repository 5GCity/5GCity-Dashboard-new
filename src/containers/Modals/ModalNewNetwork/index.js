/**
 * Modalnewnetwork Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

/* Components */
import Modal from 'components/Modal'
import Select from 'components/Select'
import Button from 'components/Button'
import Logic from './logic'
import Input from 'components/Input'
import { Form, Layout } from 'element-react'





class ModalNewNetwork extends Component {

  modalBody = () => {
    const { values } = this.props
    const { setValue, addPort, setValuePorts, removePort } = this.actions
    const { nameInstance, description, ports, slice_id } = values
    const { listSlices } = this.props
      return(
        <Layout.Row gutter="20">
          {listSlices &&
            <Form onSubmit={(e) => e.preventDefault()} labelPosition={'top'}>
             <Layout.Col>
              <Form.Item label={'Name of Instance'}>
                <Input
                  value={nameInstance}
                  onChange={value => setValue('nameInstance', value)}
                />
              </Form.Item>
              </Layout.Col>
              <Layout.Col>
              <Form.Item label={'Description'}>
                <Input
                  value={description}
                  onChange={value => setValue('description', value)}
                />
              </Form.Item>
              </Layout.Col>
              <Layout.Col>
              { ports.map((port, index) =>
                <Form.Item
                  key={index}
                  label={`Ports ${index}`}
                  prop={ports[index]}
                >
                <Layout.Col span="18">
                    <Input
                      value ={port}
                      onChange ={ value => setValuePorts('ports', value, index) }
                    />
                </Layout.Col>
                <Layout.Col span="6">
                    <Button
                      text={'Remove'}
                      icon={'delete'}
                      type={'danger'}
                      onClick={() => removePort(index)}
                    />
                    </Layout.Col>
                </Form.Item>
                )}

                <Button
                  text={'Add Port'}
                  icon={'plus'}
                  type={'primary'}
                  onClick={() => addPort()}
                />
              </Layout.Col>
              <Form.Item label={'Select Slice'}>
                <Select
                  placeholder={'Select Slice'}
                  options={listSlices}
                  value={slice_id}
                  onChange={value => setValue('slice_id', value)}
                />
              </Form.Item>
            </Form>
          }
        </Layout.Row>
      )
  }

  footerButton = () => {
    const { actionModal, submit } = this.actions
    const { loading, isSubmitting } = this.props
    return(
      <ContainerButton>
        <Button
          disabled={isSubmitting}
          onClick={submit}
          text={'Yes'}
          icon={'check'}
          type={'primary'}
          loading={loading}
        />
        <Button
          text={'No'}
          icon={'close'}
          type={'secondary'}
          onClick={actionModal}/>
      </ContainerButton>
    )
  }

  render () {
    const { actionModal } = this.actions
    const { modalVisibled } = this.props

    return (
      <Modal
        size={'tiny'}
        showClose={true}
        onCancel={actionModal}
        visible={modalVisibled}
        title="Confirmation"
        bodyContent={ this.modalBody() }
        footerContent={ this.footerButton() }
      />
    )
  }
}

export default withRouter(Logic(ModalNewNetwork))


const ContainerButton = styled.div`
`
