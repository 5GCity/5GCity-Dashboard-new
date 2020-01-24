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
import FormServiceSDK from 'containers/Forms/FormServiceSDK'
class ComposerForm extends Component {
  render () {
    const { steps } = this.props
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
          <FormServiceSDK />
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
