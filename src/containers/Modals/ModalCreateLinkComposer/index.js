/**
 * Modalcreatelinkcomposer Container
 * Please write a description
 *
 * @author Guilerme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Layout } from 'element-react'

/* Components */
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Form from 'components/Form'
import { DeleteIcon, PlusIcon, CheckIcon, CloseIcon } from 'components/Icons'
class ModalCreateLinkComposer extends Component {
  render () {
    const { visibled, title, newService, form } = this.props
    const { change, setValuePorts, removePort, addPort, submit, modalAction } = this.actions
    const {
      name_connection_source,
      name_connection_target,
      options_select_source,
      options_select_target,
      required_ports,
      link_name
    } = form
    return (
      <Modal
        size={'small'}
        title={title}
        visible={visibled}
        onCancel={() => modalAction(null)}
        closeOnClickModal={false}
      >
        {newService.source && newService.target &&
        <Form
          labelPosition={'top'}
        >
          <Modal.Body>
            <Layout.Row gutter='20'>
              <Layout.Col span='12'>
                <Title>{newService.source.name}</Title>
                {newService.source.type !== 'bridge' &&
                <Form.Item
                  label={'Connection name'}
                  required
                  status={!name_connection_source.valid}
                >
                  <Input
                    value={name_connection_source.value}
                    onChange={value => change({name_connection_source: value})}
                  />
                  <Form.Error>{name_connection_source.message}</Form.Error>
                </Form.Item>
              }
                {newService.source.options &&
                <Form.Item
                  label={'Connection Point'}
                  required
                  status={!options_select_source.valid}
                >
                  <Select
                    selectOption={options_select_source.value}
                    placeholder={'Select Point'}
                    options={newService.source.options}
                    onChange={value => change({options_select_source: value})}
                  />
                  <Form.Error>{options_select_source.message}</Form.Error>
                </Form.Item>
                }
                {newService.source.type === 'external' && required_ports.array.map((port, index) =>
                  <Form.Item
                    key={index}
                    label={`Port ${index + 1}`}
                    required
                    status={!port.valid}
                >
                    <Layout.Row gutter='2'>
                      <Layout.Col span='16'>
                        <Input
                          value={port.value}
                          onChange={value => setValuePorts('required_ports', value, index)}
                    />
                      </Layout.Col>
                      <Layout.Col span='8'>
                        <Button
                          text={'Remove'}
                          svg={<DeleteIcon />}
                          type={'danger'}
                          onClick={() => removePort(index)}
                    />
                      </Layout.Col>
                    </Layout.Row>
                    <Form.Error>{required_ports.array[index].message}</Form.Error>
                  </Form.Item>
                )}
                {newService.source.type === 'external' &&
                <Button
                  text={'Add Port'}
                  svg={<PlusIcon />}
                  type={'primary'}
                  onClick={() => addPort()}
                  />
                }
              </Layout.Col>
              <Layout.Col span='12'>
                <Title>{newService.target.name}</Title>
                {newService.target.type !== 'vs' && newService.target.type !== 'bridge' &&
                <Form.Item
                  label={'Connection name'}
                  required
                  status={!name_connection_target.valid}
                >
                  <Input
                    value={name_connection_target.value}
                    onChange={value => change({name_connection_target: value})}
                  />
                  <Form.Error>{name_connection_target.message}</Form.Error>
                </Form.Item>
              }
                {newService.target.options &&
                <Form.Item
                  label={'Connection Point'}
                  required
                  status={!options_select_target.valid}
                >
                  <Select
                    selectOption={options_select_target.value}
                    placeholder={'Select Point'}
                    options={newService.target.options}
                    onChange={value => change({options_select_target: value})}
                  />
                  <Form.Error>{options_select_target.message}</Form.Error>
                </Form.Item>
                }
                {newService.target.type === 'external' && required_ports.array.map((port, index) =>
                  <Form.Item
                    key={`${index}`}
                    label={`Port ${index + 1}`}
                    required
                    status={!port.valid}
                >
                    <Layout.Row gutter='2'>
                      <Layout.Col span='16'>
                        <Input
                          value={port.value}
                          onChange={value => setValuePorts('required_ports', value, index)}
                    />
                      </Layout.Col>
                      <Layout.Col span='8'>
                        <Button
                          text={'Remove'}
                          svg={<DeleteIcon />}
                          type={'danger'}
                          onClick={() => removePort(index)}
                    />
                      </Layout.Col>
                    </Layout.Row>
                    <Form.Error>{port.message}</Form.Error>
                  </Form.Item>
                )}
                {newService.target.type === 'external' &&
                <Button
                  text={'Add Port'}
                  svg={<PlusIcon />}
                  type={'primary'}
                  onClick={() => addPort()}
                  />
                }
              </Layout.Col>
            </Layout.Row>
            <Layout.Row gutter='20'>
              <Layout.Col span='24'>
                <Form.Item
                  label={'Link Name'}
                  required
                  status={!link_name.valid}
              >
                  <Input
                    value={link_name.value}
                    onChange={value => change({link_name: value})}
                  />
                  <Form.Error>{link_name.message}</Form.Error>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
          </Modal.Body>
        </Form>
        }
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
            onClick={() => modalAction(null)}
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
