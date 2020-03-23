/**
 * formSDKActions Container Utils
 * Please write a description
 *
 */
import * as Check from 'validations'
import isEmpty from 'lodash/isEmpty'

export const DEFAULT_FORM = () => ([
  { ...formDefault }
])

const formDefault = {
  name: {
    value: null
  },
  actionType: {
    value: null
  },
  step: {
    value: null
  },
  VNFSelect: {
    value: null
  }
}

export const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  actionType: [
    Check.isRequired
  ],
  step: [
    Check.isRequired
  ],
  VNFSelect: [
    Check.isRequired
  ]
}

export const ACTION_TYPE = [
  {
    id: 1,
    name: 'Scale in',
    value: 'SCALE_IN'
  },
  {
    id: 2,
    name: 'Scale out',
    value: 'SCALE_OUT'
  }
]

export const SetFormActions = service => {
  let form = DEFAULT_FORM()
  if (service === null || !isEmpty(service.actions)) {
    form = []
    service.actions.forEach(action => {
      form.push({
        name: { value: action.name },
        actionType: { value: action.actionType },
        step: { value: action.step },
        VNFSelect: { value: action.componentIndex }
      })
    })
  }
  form.forEach(action =>
    Check.checkValidation(action, VALIDATIONS).form
  )
  return form
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

/**
 * Add more field to the form
 * @param {array} state State of Form
 */
export const AddAction = state => {
  const result = [ ...state ]
  const newField = Check.checkValidation(formDefault, VALIDATIONS).form
  result.push({...newField})
  return result
}

/**
 * Remove action Form
 * @param {object} state Form
 * @param {object} action object to remove
 */
export const RemoveAction = (state, i) => {
  const result = [ ...state ]
  return result.slice(0, i).concat(result.slice(i + 1, result.length))
}

export const SetNewService = (service, form) => {
  const result = { ...service }
  const array = []
  form.forEach(action => {
    const obj = {
      step: action.step.value,
      actionType: action.actionType.value,
      name: action.name.value,
      componentIndex: action.VNFSelect.value
    }
    return array.push(obj)
  })
  result.actions = array
  return result
}
