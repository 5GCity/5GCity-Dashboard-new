/**
 * Formnetwork Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Layout } from 'element-react'
import { NAMES } from './utils'

/* Component */
import Form from 'components/Form'
import Input from 'components/Input'
import Button from 'components/Button'
import Select from 'components/Select'
import { PlusIcon, DeleteIcon } from 'components/Icons'

class FormNetwork extends Component {
  render () {
    const { form } = this.props
    const { name, bandwidth, floatingIps, provisionedTags, tagRangeInit, tagRangeEnd} = form
    const { addProvisionedTags, removeProvisionedTags, setValueProvisioned, change } = this.actions
    return (
      <Wrapper>
        <Title>Network</Title>
          <Form labelPosition={'top'} labelWidth="100">
          <Form.Item
            label={'Name'}
            required={true}
            status={!name.valid}
          >
            <Select
              placeholder={'Select Name'}
              type={'default'}
              options={NAMES}
              onChange={value => change({name: value})}
              selectOption={name.value}
            />
            <Form.Error>{name.message}</Form.Error>
            </Form.Item>
          <Form.Item
            label='Bandwidth'
            required={true}
            status={!bandwidth.valid}
          >
          <Input
            value={bandwidth.value}
            onChange={value => change({bandwidth: value})}
            append={'MB/s'}
          />
          <Form.Error>{bandwidth.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label="Floating IP's"
            required={true}
            status={!floatingIps.valid}
          >
          <Input
            value={floatingIps.value}
            onChange={value => change({floatingIps: value})}
          />
          <Form.Error>{floatingIps.message}</Form.Error>
          </Form.Item>

          <SubTitle>Provisioned Tags</SubTitle>
          {provisionedTags.array.map((proTags, index) =>
              <Form.Item
                key={index}
                label={`Provisioned Tags ${index + 1}`}
                status={!proTags.valid}
              >
              <Layout.Row gutter="6">
              <Layout.Col span="12">
                  <Input
                    value={proTags.value}
                    onChange ={ value => setValueProvisioned('provisionedTags', value, index)}
                  />
                  <Form.Error>{proTags.message}</Form.Error>
              </Layout.Col>
              <Layout.Col span="6">
                  <Button
                    text={'Remove'}
                    type={'danger'}
                    svg={<DeleteIcon />}
                    onClick={() => removeProvisionedTags(index)}
                  />
              </Layout.Col>
              </Layout.Row>
              </Form.Item>
              )}
              <AddMore
                text={'Add Parameter'}
                svg={<PlusIcon />}
                type={'primary'}
                onClick={() => addProvisionedTags()}
              />

          <Form.Item
            label="Tag Range Init"
            required={true}
            status={!tagRangeInit.valid}
          >
          <Input
            value={tagRangeInit.value}
            onChange={value => change({tagRangeInit: value})}
          />
          <Form.Error>{tagRangeInit.message}</Form.Error>
          </Form.Item>

          <Form.Item
            label="Tag Range End"
            required={true}
            status={!tagRangeEnd.valid}
          >
          <Input
            value={tagRangeEnd.value}
            onChange={value => change({tagRangeEnd: value})}
          />
          <Form.Error>{tagRangeEnd.message}</Form.Error>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }
}

export default Logic(FormNetwork)

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
const SubTitle = styled.h5`
  color:${({theme}) => theme.secondaryColor};
  font-family:${({theme}) => theme.fontFamily};
  font-size: 14px;
  line-height: 14px;
  font-weight: normal;
`
const AddMore = styled(Button)`
  margin-top: 0px;
  margin-bottom: 10px;
`
