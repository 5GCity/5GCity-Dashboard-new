/**
 * Modalnewnetwork Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import Logic from './logic'
import { Layout } from 'element-react'
import { withRouter } from 'react-router-dom'

/* Components */
import Select from 'components/Select'
import Button from 'components/Button'
import Input from 'components/Input'
import Form from 'components/Form'
import { DeleteIcon, PlusIcon } from 'components/Icons'

class NewNetworkForm extends Component {
  render () {
    const { form, listSlices } = this.props
    const { change, addPort, setValuePorts, removePort } = this.actions
    const { nameInstance, description, ports, slice_id } = form
    return (
      <Layout.Row>
        {listSlices &&
        <Form
          labelPosition={'top'}
        >
          <Layout.Col>
            <Form.Item
              label={'Name of Instance'}
              required
              status={!nameInstance.valid}
          >
              <Input
                value={nameInstance.value}
                onChange={value => change({nameInstance: value})}
            />
              <Form.Error>{nameInstance.message}</Form.Error>
            </Form.Item>
          </Layout.Col>
          <Layout.Col>
            <Form.Item
              label={'Description'}
              required
              status={!description.valid}
          >
              <Input
                value={description.value}
                onChange={value => change({description: value})}
            />
              <Form.Error>{description.message}</Form.Error>
            </Form.Item>
          </Layout.Col>
          <Layout.Col>
            { ports.array.map((port, index) =>
              <Form.Item
                key={index}
                label={`Ports ${index + 1}`}
                prop={ports[index]}
                required
                status={!port.valid}
            >
                <Layout.Row gutter='12'>
                  <Layout.Col span='18'>
                    <Input
                      value={port.value}
                      onChange={value => setValuePorts('ports', value, index)}
                    />
                    <Form.Error>{port.message}</Form.Error>
                  </Layout.Col>
                  <Layout.Col span='6'>
                    <Button
                      text={'Remove'}
                      svg={<DeleteIcon />}
                      type={'danger'}
                      onClick={() => removePort(index)}
                    />
                  </Layout.Col>
                </Layout.Row>
              </Form.Item>
            )}

            <AddButton
              text={'Add Port'}
              svg={<PlusIcon />}
              type={'primary'}
              onClick={() => addPort()}
            />
          </Layout.Col>
          <Form.Item label={'Select Slice'}>
            <Select
              placeholder={'Select Slice'}
              options={listSlices}
              value={slice_id.value}
              onChange={value => change({slice_id: value})}
              required
              status={!slice_id.valid}
            />
            <Form.Error>{slice_id.message}</Form.Error>
          </Form.Item>
        </Form>
      }
      </Layout.Row>
    )
  }
}

export default withRouter(Logic(NewNetworkForm))

const AddButton = styled(Button)`
  margin-bottom: 20px;
`
