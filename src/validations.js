// Checks the validation of the whole form
export const checkValidation = (form: {}, validations: {}): ValidatedForm => {
  let clone: {} = { ...form }
  let invalid: boolean = false

  for (const key in clone) {
    if (clone.hasOwnProperty(key)) {
      const element: any = clone[key]
      const validationList: Array<Function> = validations[key]
      element.valid = true

      if (validationList && validationList.length) {
        for (let index: number = 0; index < validationList.length; index++) {
          const check: Function = validationList[index]
          const response = check(element.value, form)

          if (response.result === 'end') {
            // put valid true and empty message like default value
            element.valid = true
            element.message = ''
            break
          }

          if (!response.result) {
            element.valid = false
            element.message = response.message
            invalid = true
          } else {
            element.valid = true
          }
        }
      }
    }
  }

  return { invalid, form: clone }
}

// Checks the validation of a field
export const setAndCheckValidation = (state: {}, payload: ChangedValue, validations: {}): FormState => {
  let newStateChanges: {} = {}

  Object.keys(payload.field).forEach((fieldName) => {
    const field: any = payload.field[fieldName]
    const validationList: Array<Function> = validations[fieldName]

    let settedField: ChangedValueValidated = {
      value: field,
      valid: true
    }

    if (validationList) {
      for (var index = 0; index < validationList.length; index++) {
        const check: Function = validationList[index]
        const response: ValidationResult = check(field, state)

        if (response.result === 'end') {
          break
        }

        if (!response.result) {
          settedField.valid = false
          settedField.message = response.message
          break
        }
      }
    }

    newStateChanges = { ...newStateChanges, [fieldName]: settedField }
  })

  return { ...state, ...newStateChanges }
}

// Validates and email
export const Email = (value: string, state: {}): ValidationResult => {
  const message: string = `O email não está no formato correcto`
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}

// Validates if a field is set
export const isRequired = (value: any, state: {}): ValidationResult => {
  const message: string = `Campo de preenchimento obrigatório`

  if (!value) {
    return { result: false, message }
  }

  return { result: true }
}

// Used to validate unrequired fields
export const hasValue = (value: any, state: {}): ValidationResult => {
  if (!value) {
    return { result: 'end' }
  }

  return { result: 'continue' }
}

// Validates if its a valid postal code
export const isValidPostalCode = (value: any, state: {}): ValidationResult => {
  const message: string = `O código postal não está no formato correto`
  const regex = /^\d{4}-\d{3}$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}

export const isValidPhoneNumber = (value: any, state: {}): ValidationResult => {
  const message: string = `Número está incorreto`
  const regex = /^\d{9}$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}

export const isValidWebsite = (value: any, state: {}): ValidationResult => {
  const message: string = `Website invalido`
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}
