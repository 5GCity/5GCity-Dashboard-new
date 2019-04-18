/**
 * Modalcreatelinkcomposer Container
 * Please write a description
 *
 * @author Guilerme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Layout, Form } from 'element-react'

/* Components */
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import Modal from 'components/Modal'

class ModalCreateLinkComposer extends Component {
  render () {
    const { visibled, modalAction, title, newService, form } = this.props
    const { setValue, createLink, setValuePorts, removePort, addPort } = this.actions
    return (
      <Modal
        size={'small'}
        title={title}
        visible={visibled}
        onCancel={modalAction}
      >
        {newService.source && newService.target &&
        <Form
          labelPosition={'top'}
        >
        <Modal.Body>
          <Layout.Row gutter="20">
            <Layout.Col span="12">
              <Title>{newService.source.name}</Title>
              {newService.source.type !== 'bridge' &&
                <Form.Item label={'Connection name'}>
                  <Input
                    value={form.name_connection_source}
                    onChange={value => setValue('name_connection_source', value)}
                  />
                </Form.Item>
              }
                {newService.source.options &&
                <Form.Item label={'Connection Point'}>
                  <Select
                    selectOption={form.options_select_source || null}
                    placeholder={'Select Point'}
                    options={newService.source.options}
                    onChange={value => setValue('options_select_source', value)}
                  />
                </Form.Item>
                }
                {newService.source.type === 'external' && form.required_ports.map((port, index) =>
                <Form.Item
                  key={index}
                  label={`Port ${index + 1}`}
                >
                <Layout.Row gutter="2">
                <Layout.Col span="16">
                    <Input
                      value ={port}
                      onChange ={ value => setValuePorts('required_ports', value, index) }
                    />
                </Layout.Col>
                <Layout.Col span="8">
                    <Button
                      text={'Remove'}
                      icon={'delete'}
                      type={'danger'}
                      onClick={() => removePort(index)}
                    />
                </Layout.Col>
                </Layout.Row>
                </Form.Item>
                )}
                {newService.source.type === 'external' &&
                  <Button
                    text={'Add Port'}
                    icon={'plus'}
                    type={'primary'}
                    onClick={() => addPort()}
                  />
                }
            </Layout.Col>
            <Layout.Col span="12">
              <Title>{newService.target.name}</Title>
              {newService.target.type !== 'vs' && newService.target.type !== 'bridge'  &&
                <Form.Item label={'Connection name'}>
                  <Input
                    value={form.name_connection_target}
                    onChange={value => setValue('name_connection_target', value)}
                  />
                </Form.Item>
              }
                {newService.target.options &&
                <Form.Item label={'Connection Point'}>
                  <Select
                    selectOption={form.options_select_target || null}
                    placeholder={'Select Point'}
                    options={newService.target.options}
                    onChange={value => setValue('options_select_target', value)}
                  />
                </Form.Item>
                }
                {newService.target.type === 'external' && form.required_ports.map((port, index) =>
                 <Form.Item
                  key={`${index}`}
                  label={`Port ${index + 1}`}
                >
                <Layout.Row gutter="2">
                <Layout.Col span="16">
                    <Input
                      value={port}
                      onChange={ value => setValuePorts('required_ports', value, index) }
                    />
                  </Layout.Col>
                  <Layout.Col span="8">
                    <Button
                      text={'Remove'}
                      icon={'delete'}
                      type={'danger'}
                      onClick={() => removePort(index)}
                    />
                  </Layout.Col>
                  </Layout.Row>
                </Form.Item>
                )}
                {newService.target.type === 'external' &&
                  <Button
                    text={'Add Port'}
                    icon={'plus'}
                    type={'primary'}
                    onClick={() => addPort()}
                  />
                }
            </Layout.Col>
          </Layout.Row>
          <Layout.Row gutter="20">
            <Layout.Col span="24">
              <Form.Item label={'Link Name'}>
                  <Input
                    value={form.link_name}
                    onChange={value => setValue('link_name', value)}
                  />
              </Form.Item>
            </Layout.Col>
          </Layout.Row>
        </Modal.Body>
        </Form>
        }
       <Modal.Footer>
        <Button
            text={'Yes'}
            icon={'check'}
            type={'primary'}
            onClick={() => createLink(form)}
          />
          <Button
            text={'No'}
            icon={'close'}
            type={'secondary'}
            onClick={modalAction}
          />
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Logic(ModalCreateLinkComposer)

const Title = styled.h2`
  text-align: center;
  color: white;
`
