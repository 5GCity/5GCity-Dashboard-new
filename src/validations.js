// Checks the validation of the whole form
export const checkValidation = (form, validations) => {
  let clone = { ...form }
  let invalid = false

  for (const key in clone) {
    if (clone.hasOwnProperty(key)) {
      const element = clone[key]
      const validationList = validations[key]
      element.valid = true

      if (validationList && validationList.length) {
        for (let index = 0; index < validationList.length; index++) {
          const check = validationList[index]
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
export const setAndCheckValidation = (state, payload, validations) => {
  let newStateChanges = {}

  Object.keys(payload.field).forEach((fieldName) => {
    const field = payload.field[fieldName]
    const validationList = validations[fieldName]

    let settedField = {
      value: field,
      valid: true
    }

    if (validationList) {
      for (var index = 0; index < validationList.length; index++) {
        const check = validationList[index]
        const response = check(field, state)

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
export const Email = (value, state) => {
  const message = `O email não está no formato correcto`
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}

// Validates if a field is set
export const isRequired = (value, state) => {
  const message = `Campo de preenchimento obrigatório`

  if (!value) {
    return { result: false, message }
  }

  return { result: true }
}

// Used to validate unrequired fields
export const hasValue = (value, state) => {
  if (!value) {
    return { result: 'end' }
  }

  return { result: 'continue' }
}

// Validates if its a valid postal code
export const isValidPostalCode = (value, state) => {
  const message = `O código postal não está no formato correto`
  const regex = /^\d{4}-\d{3}$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}

export const isValidPhoneNumber = (value, state) => {
  const message = `Número está incorreto`
  const regex = /^\d{9}$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}

export const isValidWebsite = (value, state) => {
  const message = `Website invalido`
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
  if (!regex.test(value)) {
    return { result: false, message }
  }

  return { result: true }
}
