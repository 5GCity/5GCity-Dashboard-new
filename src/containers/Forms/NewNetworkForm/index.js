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
    const { values, listSlices } = this.props,
    { setValue, addPort, setValuePorts, removePort } = this.actions,
    { nameInstance, description, ports, slice_id } = values
    return (
      <Layout.Row gutter="20">
      {listSlices &&
        <Form
          labelPosition={'top'}
        >
          <Layout.Col>
          <Form.Item label={'Name of Instance'}>
            <Input
              value={nameInstance}
              onChange={value => setValue('nameInstance', value)}
            />
          </Form.Item>
          </Layout.Col>
          <Layout.Col>
          <Form.Item
            label={'Description'}
            required={true}
          >
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
              label={`Ports ${ index+1 }`}
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
                  svg={<DeleteIcon />}
                  type={'danger'}
                  onClick={() => removePort(index)}
                />
                </Layout.Col>
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
              value={slice_id}
              onChange={value => setValue('slice_id', value)}
            />
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
