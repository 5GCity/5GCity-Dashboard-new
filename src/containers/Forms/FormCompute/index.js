/**
 * Formcompute Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { UNITS, COMPUTE_TYPES } from './utils'
import { Layout } from 'element-react'

/* Components */
import Form from 'components/Form'
import Input from 'components/Input'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'

class FormCompute extends Component {
  render () {
    const { form } = this.props
    const { change } = this.actions
    const {
      name,
      cpu,
      ram,
      storage,
      availabilityZone,
      ramUnit,
      storageUnit,
      type,
      trusted
    } = form
    return (
      <Wrapper>
        <Title>Computing</Title>
        <Form labelPosition={'top'} labelWidth='100'>
          <Form.Item
            label='Name'
            required
            status={!name.valid}
          >
            <Input
              value={name.value}
              onChange={value => change({name: value})}
          />
            <Form.Error>{name.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Availability zone'
            required
            status={!availabilityZone.valid}
          >
            <Input
              value={availabilityZone.value}
              onChange={value => change({availabilityZone: value})}
          />
            <Form.Error>{availabilityZone.message}</Form.Error>
          </Form.Item>
          <Form.Item label={'Compute Type'} required status={!type.valid}>
            <Select
              type={'default'}
              placeholder='Compute Type'
              options={COMPUTE_TYPES}
              onChange={value => change({type: value})}
              value={type.value}
            />
            <Form.Error>{type.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Number of available CPUs'
            required
            status={!cpu.valid}
          >
            <Input
              value={cpu.value}
              onChange={value => change({cpu: value})}
          />
            <Form.Error>{cpu.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label='Trusted'
          >
            <Checkbox
              checked={trusted.value}
              onChange={value => change({trusted: value})}
            />
          </Form.Item>
          <Layout.Row gutter='4'>
            <Layout.Col span='16'>
              <Form.Item
                label='Available RAM'
                required
                status={!ram.valid}
              >
                <Input
                  value={ram.value}
                  onChange={value => change({ram: value})}
                />
                <Form.Error>{ram.message}</Form.Error>
              </Form.Item>
            </Layout.Col>
            <Layout.Col span='8'>
              <Form.Item label={'Unit'}>
                <Select
                  type={'default'}
                  placeholder='unit'
                  options={UNITS}
                  onChange={value => change({ramUnit: value})}
                  value={ramUnit.value}
                />
              </Form.Item>
            </Layout.Col>
          </Layout.Row>
          <Layout.Row gutter='4'>
            <Layout.Col span='16'>
              <Form.Item
                label='Avaible Storage'
                required
                status={!storage.valid}
              >
                <Input
                  value={storage.value}
                  onChange={value => change({storage: value})}
              />
                <Form.Error>{storage.message}</Form.Error>
              </Form.Item>
            </Layout.Col>
            <Layout.Col span='8'>
              <Form.Item label={'Unit'}>
                <Select
                  type={'default'}
                  placeholder='unit'
                  options={UNITS}
                  onChange={value => change({storageUnit: value})}
                  value={storageUnit.value}
                />
              </Form.Item>
            </Layout.Col>
          </Layout.Row>
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormCompute)

const Wrapper = styled.div`

`
const Title = styled.h5`
  color:${({theme}) => theme.primaryColor};
  font-family:${({theme}) => theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 16px;
`
