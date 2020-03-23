/**
 * FormSDKActionsRules Container Utils
 * Please write a description
 *
 */

import * as Check from 'validations'
import isEmpty from 'lodash/isEmpty'

const defaultForm = {
  name: {
    value: null
  },
  duration: {
    value: null
  },
  severity: {
    value: null
  },
  operator: {
    value: null
  }
}

const condition = {
  conditionName: {
    value: null
  },
  conditionValue: {
    value: null
  },
  comparator: {
    value: null
  }
}

export const DEFAULT_FORM = () => ([
  {
    ...defaultForm,
    actionsSelect: {
      array: []
    },
    conditions: [{
      ...condition
    }]
  }
])

export const OPERATORS = [
  {
    id: 1,
    name: 'Or',
    value: 'or'
  },
  {
    id: 2,
    name: 'And',
    value: 'and'
  }
]

export const COMPARATOR = [
  {
    id: 1,
    name: 'g',
    value: 'g'
  },
  {
    id: 2,
    name: 'geq',
    value: 'geq'
  },
  {
    id: 3,
    name: 'l',
    value: 'l'
  },
  {
    id: 4,
    name: 'leq',
    value: 'leq'
  },
  {
    id: 5,
    name: 'eq',
    value: 'eq'
  }
]

export const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  severity: [
    Check.isRequired
  ],
  duration: [
    Check.isRequired
  ],
  operator: [
    Check.isRequired
  ],
  conditionName: [
    Check.isRequired
  ],
  conditionValue: [
    Check.isRequired
  ],
  comparator: [
    Check.isRequired
  ]
}

export const ValidationForm = (state, payload) => {
  const result = [ ...state ]
  let newPayload = null
  if (!payload.field) {
    const field = `{"${payload.key}": ${payload.value}}`
    newPayload = { field: JSON.parse(field) }
  } else {
    newPayload = payload
  }
  const input = state[payload.index]
  const test = Check.setAndCheckValidation(input, newPayload, VALIDATIONS)
  result[payload.index] = test
  return result
}

export const ValidationFormCondition = (state, payload) => {
  const { parentIndex, childIndex } = payload
  const result = [ ...state ]
  const input = state[parentIndex].conditions[childIndex]
  const validationForm = Check.setAndCheckValidation(input, payload, VALIDATIONS)
  result[parentIndex].conditions[childIndex] = validationForm
  return result
}

/**
 * Add more field to the form
 * @param {array} state State of Form
 */
export const AddActionRule = state => {
  const result = [ ...state ]
  const newForm = DEFAULT_FORM()
  const newField = Check.checkValidation(newForm, VALIDATIONS).form[0]
  result.push({...newField})
  return result
}

/**
 * Add more field to the form
 * @param {array} state State of Form
 */
export const AddCondition = (state, parentIndex) => {
  const result = [ ...state ]
  const newCondition = { ...condition }
  const newField = Check.checkValidation(newCondition, VALIDATIONS).form
  result[parentIndex].conditions.push({...newField})
  return result
}

/**
 * Remove action Form
 * @param {object} state Form
 * @param {object} action object to remove
 */
export const RemoveActionRule = (state, i) => {
  const result = [ ...state ]
  return result.slice(0, i).concat(result.slice(i + 1, result.length))
}

export const SetFormActionsRules = service => {
  let form = null
  if (service === null || !isEmpty(service.actionRules)) {
    form = []
    for (let index = 0; index < service.actionRules.length; index++) {
      const actionRule = service.actionRules[index]
      form.push({
        actionsSelect: {
          array: []
        },
        name: {
          value: actionRule.name
        },
        duration: {
          value: actionRule.duration
        },
        severity: {
          value: actionRule.severity
        },
        operator: {
          value: actionRule.operator
        },
        conditions: []
      })
      for (let i = 0; i < service.actionRules[index].actionsName.length; i++) {
        const actionName = service.actionRules[index].actionsName[i]
        form[index].actionsSelect.array.push({ value: actionName, label: actionName })
      }
      for (let i = 0; i < service.actionRules[index].conditions.length; i++) {
        const elementCondition = actionRule.conditions[i]
        form[index].conditions.push({
          conditionName: {
            value: elementCondition.parameterName
          },
          conditionValue: {
            value: elementCondition.value
          },
          comparator: {
            value: elementCondition.comparator
          }
        })
      }
    }
  } else {
    form = DEFAULT_FORM()
  }
  form.forEach(actionRule => {
    actionRule.conditions.forEach(condition =>
          Check.checkValidation(condition, VALIDATIONS).form
        )
  })
  form.forEach(actionRule =>
        Check.checkValidation(actionRule, VALIDATIONS).form
      )
  const actionsOptions = GetActionsOptions(service)
  return {form: form, actionsOptions: actionsOptions}
}

export const RemoveCondition = (state, parentIndex, childIndex) => {
  const result = [ ...state ]
  const conditions = [ ...result[parentIndex].conditions ]
  const test1 = conditions.slice(0, childIndex).concat(
    conditions.slice(childIndex + 1, result[parentIndex].conditions.length)
  )
  result[parentIndex].conditions = test1
  return result
}

const GetActionsOptions = service => {
  const result = []
  service.actions.forEach(action =>
    result.push({ value: action.name, label: action.name })
  )
  return result
}

export const SetActionsRulesService = (service, form) => {
  const result = { ...service }
  const array = []
  for (let i = 0; i < form.length; i++) {
    const arrayActionsName = []
    const arrayCondition = []
    const element = form[i]
    element.actionsSelect.array.forEach(action => (
      arrayActionsName.push(action.value)
    ))
    element.conditions.forEach(condition => {
      const obj = {
        parameterName: condition.conditionName.value,
        comparator: condition.comparator.value,
        value: condition.conditionValue.value
      }
      arrayCondition.push(obj)
    })
    const obj = {
      name: element.name.value,
      operator: element.operator.value,
      duration: element.duration.value,
      severity: element.severity.value,
      actionsName: arrayActionsName,
      conditions: arrayCondition
    }
    array.push({ ...obj })
  }
  result.actionRules = array
  return result
}

export const ChangeActions = (state, payload) => {
  const resultState = [ ...state ]
  const newArray = []
  const { value, parentIndex } = payload
  value && value.forEach(item => (
    newArray.push(item.value)
  ))
  resultState[parentIndex].actionsSelect.array = newArray
  return resultState
}

export const ValidationActionRules = form => {
  let isInvalid = false
  form.forEach(monitoring => {
    if (isInvalid === false) {
      const validationForm = Check.checkValidation(monitoring, VALIDATIONS)
      isInvalid = validationForm.invalid
    }
  })
  return isInvalid
}
