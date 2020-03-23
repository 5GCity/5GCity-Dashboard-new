import isEmpty from 'lodash/isEmpty'

/**
 * ComposerForm Container Utils
 * Please write a description
 *
 */
export const STEPS = () => ({
  array: [
    {
      id: 1,
      description: 'General info',
      active: true,
      validation: null,
      disabled: false
    },
    {
      id: 2,
      description: 'Actions',
      active: false,
      validation: null,
      disabled: true
    },
    {
      id: 3,
      description: 'Actions Rules',
      active: false,
      validation: null,
      disabled: true
    }
  ],
  currentStep: 1,
  isDisabledPrevious: true,
  hasNext: false
})

export const NextStep = steps => {
  const result = { ...steps }
  const indexStep = result.currentStep - 1
  let find = false
  for (let i = indexStep; i < result.array.length; i++) {
    if (!find) {
      const step = result.array[i]
      if (!step.disabled) {
        step.active = !step.active
        if (step.active) {
          result.hasNext = true
          result.currentStep = step.id
          find = true
        }
      }
      if (result.currentStep > 1) {
        result.isDisabledPrevious = false
      }
      if (result.currentStep === 3) {
        result.hasNext = false
      }
    }
  }
  return result
}

export const PrevStep = steps => {
  const result = { ...steps }
  const indexStep = result.currentStep - 1
  let find = false
  for (let i = indexStep; i >= 0; i--) {
    if (!find) {
      const step = result.array[i]
      if (!step.disabled) {
        step.active = !step.active
        if (step.active) {
          result.currentStep = step.id
          result.hasNext = true
          find = true
        }
      }
      if (result.currentStep < result.array.length) {
        result.buttonSubmit = false
      }
      if (result.currentStep === 1) {
        result.isDisabledPrevious = true
      }
    }
  }
  return result
}

export const ShowActions = (vnfs, steps) => {
  const result = { ...steps }
  if (!isEmpty(vnfs)) {
    if (result.currentStep === 3) {
      result.hasNext = false
    } else {
      const action = result.array.find(step => step.description === 'Actions')
      action.disabled = false
      result.hasNext = true
    }
  } else {
    result.hasNext = false
    result.currentStep = 1
    result.isDisabledPrevious = true
    for (let i = 1; i < result.array.length; i++) {
      const element = result.array[i]
      element.disabled = true
    }
  }
  return result
}

export const ActiveStep = (state, id) => {
  const result = { ...state }
  const find = result.array.find(step => step.id === id)
  find.disabled = false
  return result
}

export const InvalidStep = (state, id) => {
  const result = { ...state }
  const find = result.array.find(step => step.id === id)
  find.validation = 'danger'
  result.buttonSubmit = false
  return result
}

export const SuccessStep = (state, id) => {
  const result = { ...state }
  const find = result.array.find(step => step.id === id)
  find.validation = 'success'
  return result
}

export const WarningStep = (state, id) => {
  const result = { ...state }
  const find = result.array.find(step => step.id === id)
  find.validation = 'warning'
  return result
}
