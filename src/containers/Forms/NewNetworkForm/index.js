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
import Checkbox from 'components/Checkbox'
import { DeleteIcon, PlusIcon } from 'components/Icons'

class NewNetworkForm extends Component {
  render () {
    const { form, listSlices, computeOptions } = this.props
    const { change, addPort, setValuePorts, removePort } = this.actions
    const {
      nameInstance,
      description,
      ports,
      sliceId,
      trusted,
      computeSelect
    } = form
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
          <Form.Item
            label='Trusted'
          >
            <Checkbox
              checked={trusted.value}
              onChange={value => change({trusted: value})}
            />
          </Form.Item>
          <Form.Item label={'Select Slice'}>
            <Select
              placeholder={'Select Slice'}
              options={listSlices}
              value={sliceId.value}
              onChange={value => change({sliceId: value})}
              required
              status={!sliceId.valid}
            />
            <Form.Error>{sliceId.message}</Form.Error>
          </Form.Item>
          <Form.Item label={'Select Compute'}>
            <Select
              disabled={computeOptions.disabled}
              placeholder={'Select Compute'}
              options={computeOptions.options}
              value={computeSelect.value}
              onChange={value => change({computeSelect: value})}
              required
              status={!computeSelect.valid}
            />
            <Form.Error>{computeSelect.message}</Form.Error>
          </Form.Item>
          <Layout.Col>
            { ports.array.map((port, index) =>
              <Form.Item
                key={index}
                label={`Port ${index + 1}`}
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
