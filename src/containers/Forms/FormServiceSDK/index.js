/**
 * Formservicesdk Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { PHActionRules, PHExtMonitoring, PHIntMonitoring, PHaction } from './utils'
/* Components */
import Form from 'components/Form'
import FormTitle from 'components/FormTitle'
import Input from 'components/Input'
import { LeftIcon, RightIcon, CheckIcon } from 'components/Icons'
import Button from 'components/Button'

/* Containers */
import FormBasicSettings from 'containers/Forms/FormBasicSettings'

const FormSDKMonitoring = ({extMonitoring, intMonitoring, change}) => (
  <FormContainer>
    <FormTitle title={'Monitoring'} />
    <Form
      labelPosition={'top'}
           >
      <Form.Item label={'External Monitoring'}>
        <Input
          type='textarea'
          autosize={{minRows: 5, maxRows: 10}}
          placeholder={PHExtMonitoring}
          value={extMonitoring.value}
          onChange={value => change({service_ext_monitoring: value})}
      />
      </Form.Item>
      <Form.Item label={'Internal Monitoring'}>
        <Input
          type='textarea'
          autosize={{minRows: 5, maxRows: 10}}
          placeholder={PHIntMonitoring}
          value={intMonitoring.value}
          onChange={value => change({service_int_monitoring: value})}
      />
      </Form.Item>
    </Form>
  </FormContainer>
)

const FormSDKAction = ({serviceActions, serviceActionRules, change}) => (
  <FormContainer>
    <FormTitle title={'Actions'} />
    <Form
      labelPosition={'top'}
           >
      <Form.Item label={'Actions'}>
        <Input
          type='textarea'
          autosize={{minRows: 5, maxRows: 10}}
          placeholder={PHaction}
          value={serviceActions.value}
          onChange={value => change({service_actions: value})}
      />
      </Form.Item>
      <Form.Item label={'Actions Rules'}>
        <Input
          type='textarea'
          autosize={{minRows: 5, maxRows: 10}}
          placeholder={PHActionRules}
          value={serviceActionRules.value}
          onChange={value => change({service_action_rules: value})}
      />
      </Form.Item>
    </Form>
  </FormContainer>
)

class FormServiceSDK extends Component {
  render () {
    const {
      organizations,
      currentStep,
      form,
      previousButton,
      buttonSubmit
    } = this.props
    const {
      setValueParameters,
      addParameter,
      removeParameter,
      change,
      prevStep,
      nextStep,
      submit
    } = this.actions
    return (
      <Wrapper>
        {currentStep === 1 &&
          <FormBasicSettings
            dataForm={form}
            organizations={organizations}
            setValue={change}
            setValueParameters={setValueParameters}
            addParameter={addParameter}
            removeParameter={removeParameter}
          />
        }
        {currentStep === 2 &&
          <FormSDKMonitoring
            change={change}
            extMonitoring={form.service_ext_monitoring}
            intMonitoring={form.service_int_monitoring}
          />
        }
        {currentStep === 3 &&
          <FormSDKAction
            change={change}
            serviceActions={form.service_actions}
            serviceActionRules={form.service_action_rules}
          />
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
      </Wrapper>
    )
  }
}

export default Logic(FormServiceSDK)

const Wrapper = styled.div`

`

const FormContainer = styled.div`
  margin-bottom: 15px;
  min-width: 640px;
`
