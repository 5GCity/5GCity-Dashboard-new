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
import Button from 'components/Button'

/* Containers */
import FormBasicSettings from 'containers/Forms/FormBasicSettings'

class ComposerForm extends Component {


  componentDidUpdate(prevProps) {
    const { getServiceInfo } = this.actions
    if (this.props.serviceData !== prevProps.serviceData) {
      getServiceInfo()
    }
  }

  render () {
    const { form, isSubmitting } = this.props
    const { setValue, submit, setValueParameters,addParameter, removeParameter } = this.actions
    return (
      <Wrapper>
        <Step>
          <Wrapper step={1} description={'General info'}>
            <FormBasicSettings
              dataForm={form}
              setValue={setValue}
              setValueParameters={setValueParameters}
              addParameter={addParameter}
              removeParameter={removeParameter}
            />
            <Button
              type={'primary'}
              icon={'caret-right'}
              text={'Validate'}
              float={'right'}
              disabled={isSubmitting}
              onClick={submit}
            />
          </Wrapper>
        </Step>
      </Wrapper>
    )
  }
}

export default Logic(ComposerForm)

const Wrapper = styled.div`
`
