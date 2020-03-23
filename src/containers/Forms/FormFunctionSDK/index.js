/**
 * Formfunctionsdk Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Layout } from 'element-react'
import { withRouter } from 'react-router'
import { PLACEHOLDER_CP, PLACEHOLDER_RP, PLACEHOLDER_SWIMAGE,
  PLACEHOLDER_MONITPARAMS, PLACEHOLDER_METADATA, VISIBILITY, ACCESS_LEVEL } from './utils'

/* Components */
import Form from 'components/Form'
import FormTitle from 'components/FormTitle'
import Input from 'components/Input'
import Button from 'components/Button'
import Select from 'components/Select'
import { PlusIcon, DeleteIcon, CheckIcon, LeftIcon, RightIcon } from 'components/Icons'

const GeneralInfoOne = props => (
  <FormContainer>
    <FormTitle title={'general info Part 1'} />
    <Form.Item label={'Name'} required status={!props.functionName.valid}>
      <Input value={props.functionName.value} onChange={value => props.change({functionName: value})} />
      <Form.Error>{props.functionName.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Repository name'} required status={!props.functionSliceId.valid}>
      <Select
        type={'default'}
        placeholder='Repository'
        options={props.organizations}
        onChange={value => props.change({functionSliceId: value})}
        value={props.functionSliceId.value}
      />
      <Form.Error>{props.functionSliceId.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Access Level'} required status={!props.functionAccessLevel.valid}>
      <Select
        type={'default'}
        placeholder='Access Level'
        options={ACCESS_LEVEL}
        onChange={value => props.change({functionAccessLevel: value})}
        value={props.functionAccessLevel.value}
      />
      <Form.Error>{props.functionAccessLevel.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Owner'} required status={!props.functionOwner.valid}>
      <Input value={props.functionOwner.value} onChange={value => props.change({functionOwner: value})} />
      <Form.Error>{props.functionOwner.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Vendor'} required status={!props.functionVendor.valid}>
      <Input value={props.functionVendor.value} onChange={value => props.change({functionVendor: value})} />
      <Form.Error>{props.functionVendor.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Version'} required status={!props.functionVersion.valid}>
      <Input value={props.functionVersion.value} onChange={value => props.change({functionVersion: value})} />
      <Form.Error>{props.functionVersion.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'VNF ID'} required status={!props.functionVNFId.valid}>
      <Input value={props.functionVNFId.value} onChange={value => props.change({functionVNFId: value})} />
      <Form.Error>{props.functionVNFId.message}</Form.Error>
    </Form.Item>
  </FormContainer>
)
const GeneralInfoTwo = props => (
  <FormContainer>
    <FormTitle title={'general info Part 2'} />
    <Form.Item label={'description'} required status={!props.functionDescription.valid}>
      <Input value={props.functionDescription.value} onChange={value => props.change({functionDescription: value})} />
      <Form.Error>{props.functionDescription.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Instantiation Level Expression'} required status={!props.functionInstExp.valid}>
      <Input value={props.functionInstExp.value} onChange={value => props.change({functionInstExp: value})} />
      <Form.Error>{props.functionInstExp.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Flavour Expression'} required status={!props.functionFlavourExp.valid}>
      <Input value={props.functionFlavourExp.value} onChange={value => props.change({functionFlavourExp: value})} />
      <Form.Error>{props.functionFlavourExp.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Min Instances Count'} required status={!props.functionMinInst.valid}>
      <Input value={props.functionMinInst.value} onChange={value => props.change({functionMinInst: value})} />
      <Form.Error>{props.functionMinInst.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Max Instances Count'} required status={!props.functionMaxInst.valid}>
      <Input value={props.functionMaxInst.value} onChange={value => props.change({functionMaxInst: value})} />
      <Form.Error>{props.functionMaxInst.message}</Form.Error>
    </Form.Item>
    <Form.Item label={'Visibility'} required status={!props.functionvisibility.valid}>
      <Select
        type={'default'}
        options={VISIBILITY}
        onChange={value => props.change({functionvisibility: value})}
        value={props.functionvisibility.value}
  />
      <Form.Error>{props.functionvisibility.message}</Form.Error>
    </Form.Item>
  </FormContainer>
)

class FormFunctionSDK extends Component {
  render () {
    const { form, currentStep, previousButton, buttonSubmit, organizations } = this.props
    const { change, prevStep, nextStep,
      changeParameters, addParameter, removeParameter,
      submit } = this.actions
    const {
      functionName, functionOwner, functionVendor,
      functionVersion, functionVNFId, functionDescription,
      functionInstExp, functionFlavourExp, functionConnectPoints,
      functionRequiredPorts, functionSofImaDta, functionMonitParams,
      functionMetaData, functionParameters, functionMinInst,
      functionMaxInst, functionAccessLevel,
      functionvisibility, functionSliceId } = form

    return (
      <Wrapper>
        <FormFunction
          labelPosition={'top'}
        >
          {currentStep === 1 &&
          <GeneralInfoOne
            change={change}
            functionName={functionName}
            functionSliceId={functionSliceId}
            organizations={organizations}
            functionAccessLevel={functionAccessLevel}
            functionOwner={functionOwner}
            functionVendor={functionVendor}
            functionVersion={functionVersion}
            functionVNFId={functionVNFId}
          />
          }
          {currentStep === 2 &&
          <GeneralInfoTwo
            change={change}
            functionDescription={functionDescription}
            functionInstExp={functionInstExp}
            functionFlavourExp={functionFlavourExp}
            functionMinInst={functionMinInst}
            functionMaxInst={functionMaxInst}
            functionvisibility={functionvisibility}
          />
          }
          {currentStep === 3 &&
          <FormContainer>
            <FormTitle title={'Connection Points'} />
            <Form.Item label={'Connection Points'} required status={!functionConnectPoints.valid}>
              <Input
                type='textarea'
                autosize={{minRows: 5, maxRows: 10}}
                placeholder={PLACEHOLDER_CP}
                value={functionConnectPoints.value}
                onChange={value => change({functionConnectPoints: value})}
              />
              <Form.Error>{functionConnectPoints.message}</Form.Error>
            </Form.Item>
          </FormContainer>
          }
          {currentStep === 4 &&
          <FormContainer>
            <FormTitle title={'Required Ports'} />
            <Form.Item label={'Required Ports'} required status={!functionRequiredPorts.valid}>
              <Input
                type='textarea'
                autosize={{minRows: 5, maxRows: 10}}
                placeholder={PLACEHOLDER_RP}
                value={functionRequiredPorts.value}
                onChange={value => change({functionRequiredPorts: value})}
              />
              <Form.Error>{functionRequiredPorts.message}</Form.Error>
            </Form.Item>
          </FormContainer>
          }
          {currentStep === 5 &&
          <FormContainer>
            <FormTitle title={'Software Image Data'} />
            <Form.Item label={'Software Image Data'} required status={!functionSofImaDta.valid}>
              <Input
                type='textarea'
                autosize={{minRows: 5, maxRows: 10}}
                placeholder={PLACEHOLDER_SWIMAGE}
                value={functionSofImaDta.value}
                onChange={value => change({functionSofImaDta: value})}
              />
              <Form.Error>{functionSofImaDta.message}</Form.Error>
            </Form.Item>
          </FormContainer>
          }
          {currentStep === 6 &&
          <FormContainer>
            <FormTitle title={'Monitoring Parameters'} />
            <Form.Item label={'Monitoring Parameters'} required status={!functionMonitParams.valid}>
              <Input
                type='textarea'
                autosize={{minRows: 5, maxRows: 10}}
                placeholder={PLACEHOLDER_MONITPARAMS}
                value={functionMonitParams.value}
                onChange={value => change({functionMonitParams: value})}
              />
              <Form.Error>{functionMonitParams.message}</Form.Error>
            </Form.Item>
          </FormContainer>
          }
          {currentStep === 7 &&
          <FormContainer>
            <FormTitle title={'Metadata'} />
            <Form.Item label={'Metadata'} required status={!functionMetaData.valid}>
              <Input
                type='textarea'
                autosize={{minRows: 5, maxRows: 10}}
                placeholder={PLACEHOLDER_METADATA}
                value={functionMetaData.value}
                onChange={value => change({functionMetaData: value})}
              />
              <Form.Error>{functionMetaData.message}</Form.Error>
            </Form.Item>
          </FormContainer>
          }
          {currentStep === 8 &&
          <FormContainer>
            <FormTitle title={'Parameters'} />
            {functionParameters.array.map((parameter, index) =>
              <Form.Item
                key={index}
                label={`Parameters ${index + 1}`}
                status={!parameter.valid}
              >
                <Layout.Row gutter='6'>
                  <Layout.Col span='12'>
                    <Input
                      value={parameter.value}
                      onChange={value => changeParameters('functionParameters', value, index)}
                  />
                    <Form.Error>{parameter.message}</Form.Error>
                  </Layout.Col>
                  <Layout.Col span='6'>
                    <Button
                      text={'Remove'}
                      type={'danger'}
                      svg={<DeleteIcon />}
                      onClick={() => removeParameter(index)}
                  />
                  </Layout.Col>
                </Layout.Row>
              </Form.Item>
              )}
            <AddMore
              text={'Add Parameter'}
              svg={<PlusIcon />}
              type={'primary'}
              onClick={() => addParameter()}
            />
          </FormContainer>
          }

          <Button
            type={'secondary'}
            svg={<LeftIcon />}
            text={'Previous'}
            float={'left'}
            disabled={previousButton}
            onClick={() => prevStep()}
          />
          {!buttonSubmit &&
          <Button
            type={'secondary'}
            svg={<RightIcon />}
            text={'Next'}
            float={'right'}
            onClick={() => nextStep()}
          />
          }
          {buttonSubmit &&
          <Button
            type={'primary'}
            svg={<CheckIcon />}
            text={'Submit'}
            float={'right'}
            onClick={() => submit()}
          />
          }
        </FormFunction>
      </Wrapper>
    )
  }
}

export default withRouter(Logic(FormFunctionSDK))

const Wrapper = styled.div`
margin-left: 40px;
display: inline-flex;
`
const AddMore = styled(Button)`
  margin-top: 0px;
  margin-bottom: 10px;
`
const FormContainer = styled.div`
  margin-bottom: 15px;
`
const FormFunction = styled(Form)`
  width: 640px;
`
