/**
 * Function Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router'

/* Component */
import HeaderNav from 'components/HeaderNav'
import { BackIcon } from 'components/Icons'
import Step from 'components/Step'

/* Container */
import FormFunctionSDK from 'containers/Forms/FormFunctionSDK'

class Function extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.push('/sdk/functions')
  }

  render () {
    const { steps } = this.props
    return (
      <Wrapper>
        <HeaderNav
          name={'New Function'}
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
        />
        <WrapperStep>
          <Step marginTop={80}>
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
        <FormFunctionSDK />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(Function))

const Wrapper = styled.div`
`
const WrapperStep = styled.div`
  display: inline-flex;
`
