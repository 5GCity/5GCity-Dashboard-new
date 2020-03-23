/**
 * Formsdkactions Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { ACTION_TYPE } from './utils'
import { Icon } from 'element-react'

/* Components */
import Form from 'components/Form'
import FormTitle from 'components/FormTitle'
import Input from 'components/Input'
import { AddIcon } from 'components/Icons'
import Select from 'components/Select'

class formSDKActions extends Component {
  render () {
    const {
      VNFOptions,
      formActions
    } = this.props
    const {
      change,
      removeAction,
      addAction
    } = this.actions
    return (
      <FormContainer>
        <FormTitle title={'Actions'} />
        <Form
          labelPosition={'top'}
        >
          {formActions.map((action, i) => (
            <WrapperForm key={i}>
              {i > 0 &&
                <DeleteButton onClick={() => removeAction(i)}>
                  <Icon name={'close'} />
                </DeleteButton>
              }
              <Form.Item
                label={'Name'}
                required
                status={!action.name.valid}
              >
                <Input
                  value={action.name.value}
                  onChange={value => change({name: value}, i)}
                />
                <Form.Error>{action.name.message}</Form.Error>
              </Form.Item>
              <Form.Item
                label={'Step'}
                required
                status={!action.step.valid}
              >
                <Input
                  value={action.step.value}
                  onChange={value => change({step: value}, i)}
                />
                <Form.Error>{action.step.message}</Form.Error>
              </Form.Item>
              <Form.Item
                label={'Action type'}
                required
                status={!action.actionType.valid}
              >
                <Select
                  value={action.actionType.value}
                  placeholder={'Select Action'}
                  options={ACTION_TYPE}
                  onChange={value => change({actionType: value}, i)}
                />
                <Form.Error>{action.actionType.message}</Form.Error>
              </Form.Item>
              <Form.Item
                label={'VNF'}
                required
                status={!action.VNFSelect.valid}
              >
                <Select
                  value={action.VNFSelect.value}
                  placeholder={'Select VNF'}
                  options={VNFOptions}
                  onChange={value => change({VNFSelect: value}, i)}
                />
                <Form.Error>{action.VNFSelect.message}</Form.Error>
              </Form.Item>
            </WrapperForm>
          ))}
        </Form>
        <AddButton onClick={() => addAction()}>
          <AddIcon fill={'#8CC14E'} /> Add Action
        </AddButton>
      </FormContainer>
    )
  }
}

export default Logic(formSDKActions)

const FormContainer = styled.div`
  margin-bottom: 15px;
  min-width: 640px;
`
const WrapperForm = styled.div`
  background-color: rgba(46,59,66,1);
  padding: 24px 16px;
  border-radius: 6px;
  &:first-child {
    margin-top: 0;
  }
  margin-top: 40px;
`

const DeleteButton = styled.div`
  position: relative;
  top: -35px;
  left: 607px;
  height: 32px;
  width: 32px;
  background-color: rgba(90,102,109,1);
  border-radius: 50%;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AddButton = styled.div`
  width: 100%;
  height: 48px;
  border: 1px dashed rgba(90,102,109,0.4);
  border-radius: 6px;
  margin-top: 24px;
  background-color: transparent;
  color:${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontDin};
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items:center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`
