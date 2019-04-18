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

const LICENSE_TYPE = [{
  id: 1,
  name: "Public",
  value: "PUBLIC"
 },{
  id: 2,
  name: "Private",
  value: "PRIVATE"
 }]

class FormBasicSettings extends Component {
  render () {
    const { dataForm, setValue, removeParameter, addParameter, setValueParameters } = this.props
    return (
      <Wrapper>
        <FormTitle title={'general info'} />
          <Form
            labelPosition={'top'}
          >
            <Form.Item label={'Name'}>
              <Input
                value={dataForm.service_name}
                onChange={value => setValue('service_name', value)}
              />
            </Form.Item>
            <Form.Item label={'Designer'}>
              <Input
                value={dataForm.service_designer}
                onChange={value => setValue('service_designer', value)}
              />
            </Form.Item>
            <Form.Item label={'Version'}>
              <Input
                value={dataForm.service_version}
                onChange={value => setValue('service_version', value)}
              />
            </Form.Item>
            <SubTitle>License</SubTitle>
            <Form.Item label={'Type'}>
            <Select
              placeholder={'License Type'}
              type={'default'}
              options={LICENSE_TYPE}
              onChange={value => setValue('service_license_type', value)}
              selectOption={dataForm.service_license_type || null}
            />
            </Form.Item>
            <Form.Item label={'URL'}>
              <Input
                value={dataForm.service_license_url}
                onChange={value => setValue('service_license_url', value)}
              />
            </Form.Item>
            <SubTitle>Parameter</SubTitle>
            {dataForm.service_parameter.map((parameter, index) =>
                <Form.Item
                  key={index}
                  label={`parameter ${index + 1}`}
                >
                <Layout.Row gutter="2">
                <Layout.Col span="16">
                    <Input
                      value={parameter}
                      onChange ={ value => setValueParameters('parameter', value, index) }
                    />
                </Layout.Col>
                <Layout.Col span="8">
                    <Button
                      text={'Remove'}
                      icon={'delete'}
                      type={'danger'}
                      onClick={() => removeParameter(index)}
                    />
                </Layout.Col>
                </Layout.Row>
                </Form.Item>
                )}
                <Button
                  text={'Add Parameter'}
                  icon={'plus'}
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
