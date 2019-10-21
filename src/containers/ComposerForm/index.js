/**
 * Composerform Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import Step from 'components/Step'
/* Containers */
import FormBasicSettings from 'containers/Forms/FormBasicSettings'

class ComposerForm extends Component {
  componentDidUpdate (prevProps) {
    const { getServiceInfo } = this.actions
    if (this.props.serviceData !== prevProps.serviceData) {
      getServiceInfo()
    }
  }

  render () {
    const { form, isSubmitting, steps, organizations } = this.props
    const { submit, setValueParameters,addParameter, removeParameter, change } = this.actions
    return (
      <Wrapper>
        <WrapperStep>
          <Step>
            {steps.map(step =>
            <Step
              key={step.id}
              step={step.id}
              description={step.description}
              active={step.active}
            />
            )}
          </Step>
        </WrapperStep>
        <ContainerForm>
          <FormBasicSettings
            dataForm={form}
            organizations={organizations}
            setValue={change}
            setValueParameters={setValueParameters}
            addParameter={addParameter}
            removeParameter={removeParameter}
            isSubmitting={isSubmitting}
            submit={submit}
          />
        </ContainerForm>
      </Wrapper>
    )
  }
}

export default Logic(ComposerForm)

const Wrapper = styled.div`

`
const ContainerForm = styled.div`
  margin-left: 40px;
  display: inline-flex;
`
const WrapperStep = styled.div`
  display: inline-flex;
`
