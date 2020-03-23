/**
 * Composerform Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import Step from 'components/Step'
import { LeftIcon, RightIcon, CheckIcon } from 'components/Icons'
import Button from 'components/Button'

/* Containers */
import FormBasicSettings from 'containers/Forms/FormBasicSettings'
import FormSDKActions from 'containers/Forms/formSDKActions'
import FormSDKActionsRules from 'containers/Forms/FormSDKActionsRules'

class ComposerForm extends Component {
  render () {
    const { steps } = this.props
    const { currentStep, isDisabledPrevious, hasNext } = steps
    const { nextButton, prevStep, doneButton } = this.actions
    return (
      <Wrapper>
        <WrapperStep>
          <Step>
            {steps.array.map(step =>
              <Step
                key={step.id}
                step={step.id}
                description={step.description}
                active={step.active}
                disabled={step.disabled}
                validation={step.validation}
                onClick={(step) => console.log(step)}
            />
            )}
          </Step>
        </WrapperStep>
        <ContainerForm>
          {currentStep === 1 &&
          <FormBasicSettings />
        }
          {currentStep === 2 &&
          <FormSDKActions />
        }
          {currentStep === 3 &&
          <FormSDKActionsRules />
        }
          <WrapperButtons>
            {!isDisabledPrevious &&
              <Button
                type={'secondary'}
                svg={<LeftIcon />}
                text={'Previous'}
                float={'left'}
                onClick={() => prevStep()}
              />
            }
            {hasNext &&
            <Button
              type={'secondary'}
              svg={<RightIcon />}
              text={'Next'}
              float={'right'}
              onClick={() => nextButton()}
            />
            }
            {!hasNext &&
            <Button
              type={'primary'}
              svg={<CheckIcon />}
              text={'Done'}
              float={'right'}
              onClick={() => doneButton()}
            />
            }
          </WrapperButtons>
        </ContainerForm>
      </Wrapper>
    )
  }
}

export default Logic(ComposerForm)

const Wrapper = styled.div`
 display: flex;
`
const ContainerForm = styled.div`
  margin-left: 40px;
  width: 640px;
`
const WrapperStep = styled.div`
  display: inline-flex;
`
const WrapperButtons = styled.div``
