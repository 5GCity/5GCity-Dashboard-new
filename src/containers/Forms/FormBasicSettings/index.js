/**
 * Formbasicsettings Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Layout } from 'element-react'


/* Component */
import FormTitle from 'components/FormTitle'
import Input from 'components/Input'
import Form from 'components/Form'
import Select from 'components/Select'
import Button from 'components/Button'
import { DeleteIcon, PlusIcon } from 'components/Icons'
import { LICENSE_TYPE } from './utils'


class FormBasicSettings extends Component {
  render () {
    const { dataForm, setValue, removeParameter, addParameter, setValueParameters } = this.props
    const {
      service_name,
      service_designer,
      service_version,
      service_license_url,
      service_license_type,
      service_parameter } = dataForm

    return (
      <Wrapper>
        <FormTitle title={'general info'} />
          <Form
            labelPosition={'top'}
          >
            <Form.Item label={'Name'} required={true} status={!service_name.valid}>
              <Input
                value={service_name.value}
                onChange={value => setValue({service_name: value})}
              />
              <Form.Error>{service_name.message}</Form.Error>
            </Form.Item>
            <Form.Item label={'Designer'} required={true} status={!service_designer.valid}>
              <Input
                value={service_designer.value}
                onChange={value => setValue({service_designer: value})}
              />
              <Form.Error>{service_designer.message}</Form.Error>
            </Form.Item>
            <Form.Item label={'Version'} required={true} status={!service_version.valid}>
              <Input
                value={service_version.value}
                onChange={value => setValue({service_version: value})}
              />
              <Form.Error>{service_version.message}</Form.Error>
            </Form.Item>
            <SubTitle>License</SubTitle>
            <Form.Item label={'Type'} required={true} status={!service_license_type.valid}>
            <Select
              placeholder={'License Type'}
              type={'default'}
              options={LICENSE_TYPE}
              onChange={value => setValue({service_license_type: value})}
              selectOption={service_license_type.value}
            />
            <Form.Error>{service_license_type.message}</Form.Error>
            </Form.Item>
            <Form.Item label={'URL'} required={true} status={!service_license_url.valid}>
              <Input
                value={service_license_url.value}
                onChange={value => setValue({service_license_url: value})}
              />
              <Form.Error>{service_license_url.message}</Form.Error>
            </Form.Item>
            <SubTitle>Parameter</SubTitle>
            {service_parameter.array.map((parameter, index) =>
                <Form.Item
                  key={index}
                  label={`parameter ${index + 1}`}
                >
                <Layout.Row gutter="4">
                <Layout.Col span="16">
                    <Input
                      value={parameter.value}
                      onChange ={ value => setValueParameters('service_parameter', value, index)}
                    />
                </Layout.Col>
                <Layout.Col span="8">
                    <Button
                      text={'Remove'}
                      svg={<DeleteIcon />}
                      type={'danger'}
                      onClick={() => removeParameter(index)}
                    />
                </Layout.Col>
                </Layout.Row>
                </Form.Item>
                )}
                <Button
                  text={'Add Parameter'}
                  svg={<PlusIcon />}
                  type={'primary'}
                  onClick={() => addParameter()}
                />
          </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormBasicSettings)

const Wrapper = styled.div`

`

const SubTitle = styled.p`
  color: #EFF2F7;
  font-family: d-din,sans-serif;
  font-size: 16px;
`