/**
 * Formsdkactionsrules Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Icon } from 'element-react'
import { OPERATORS, COMPARATOR } from './utils'

/* Components */
import Form from 'components/Form'
import FormTitle from 'components/FormTitle'
import Input from 'components/Input'
import { AddIcon } from 'components/Icons'
import Select from 'components/Select'

/* Container */
import SelectAutoCompleteActions from 'containers/SelectAutoCompleteActions'

class FormSDKActionsRules extends Component {
  render () {
    const {
      actionsOptions,
      formActionsRules,
      monitoringNames
    } = this.props
    const {
      change,
      removeActionRule,
      addActionRule,
      addCondition,
      removeCondition,
      changeCondition,
      changeActions
    } = this.actions
    return (
      <FormContainer>
        <FormTitle title={'Actions Rules'} />
        <Form
          labelPosition={'top'}
        >
          {formActionsRules.map((action, i) => (
            <WrapperForm key={i}>
              {i > 0 &&
              <DeleteButton onClick={() => removeActionRule(i)}>
                <Icon name={'close'} />
              </DeleteButton>
              }
              <Form.Item
                label={'Actions Name'}
              >
                <SelectAutoCompleteActions
                  options={actionsOptions}
                  valueSelect={action.actionsSelect.array[i]}
                  onChange={value => changeActions(value, i)}
                />
                {/* <Form.Error>{action.name.message}</Form.Error> */}
              </Form.Item>
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
                label={'Duration'}
                required
                status={!action.duration.valid}
              >
                <Input
                  value={action.duration.value}
                  onChange={value => change({duration: value}, i)}
                />
                <Form.Error>{action.duration.message}</Form.Error>
              </Form.Item>
              <Form.Item
                label={'Severity'}
                required
                status={!action.severity.valid}
              >
                <Input
                  value={action.severity.value}
                  onChange={value => change({severity: value}, i)}
                />
                <Form.Error>{action.severity.message}</Form.Error>
              </Form.Item>
              <Form.Item
                label={'Operator'}
                required
                status={!action.operator.valid}
              >
                <Select
                  value={action.operator.value}
                  placeholder={'Select operator'}
                  options={OPERATORS}
                  onChange={value => change({operator: value}, i)}
                />
                <Form.Error>{action.operator.message}</Form.Error>
              </Form.Item>
              <SubTitle>Conditions</SubTitle>
              {action.conditions.map((condition, index) =>
                <WrapperSubForm key={index}>
                  {index > 0 &&
                    <DeleteConditionButton onClick={() => removeCondition(i, index)}>
                      <Icon name={'close'} />
                    </DeleteConditionButton>
                  }
                  <Form.Item
                    label={'Parameter name'}
                    required
                    status={!condition.conditionName.valid}
                  >
                    <Select
                      value={condition.conditionName.value}
                      placeholder={'Select operator'}
                      options={monitoringNames}
                      onChange={value => changeCondition({conditionName: value}, i, index)}
                    />
                    <Form.Error>{condition.conditionName.message}</Form.Error>
                  </Form.Item>
                  <Form.Item
                    label={'Comparator'}
                    required
                    status={!condition.comparator.valid}
                  >
                    <Select
                      value={condition.comparator.value}
                      placeholder={'Select comparator'}
                      options={COMPARATOR}
                      onChange={value => changeCondition({comparator: value}, i, index)}
                    />
                    <Form.Error>{condition.comparator.message}</Form.Error>
                  </Form.Item>
                  <Form.Item
                    label={'Value'}
                    required
                    status={!condition.conditionValue.valid}
                  >
                    <Input
                      value={condition.conditionValue.value}
                      onChange={value => changeCondition({conditionValue: value}, i, index)}
                  />
                    <Form.Error>{condition.conditionValue.message}</Form.Error>
                  </Form.Item>
                </WrapperSubForm>
              )}
              <AddButton onClick={() => addCondition(i)}>
                <AddIcon fill={'#8CC14E'} />
                Add Condition
              </AddButton>
            </WrapperForm>
          ))}
        </Form>
        <AddButton onClick={() => addActionRule()}>
          <AddIcon fill={'#8CC14E'} /> Add Action
        </AddButton>
      </FormContainer>
    )
  }
}

export default Logic(FormSDKActionsRules)

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

const WrapperSubForm = styled.div`
  padding: 10px 16px;
  border: 1px solid rgba(90,102,109,1);
  border-radius: 6px;
  &:first-child {
    margin-top: 0;
  }
  margin-top: 20px;
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
const SubTitle = styled.p`
  color: #EFF2F7;
  font-family: d-din,sans-serif;
  font-size: 16px;
`

const DeleteConditionButton = styled.div`
  position: relative;
  top: -27px;
  left: 573px;
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
