// validations.test.js

import * as Check from 'validations'

beforeEach(() => {

})

// checkValidation
test('checkValidation returns a valid form', () => {
  const VALIDATIONS = {
    fieldOne: [
      Check.isRequired
    ],
    fieldTwo: [
      Check.Email
    ],
  }

  const form = {
    fieldOne: { value: 'test' },
    fieldTwo: { value: 'email@example.com' }
  }

  const expectedValidation = {
    invalid: false,
    form: {
      fieldOne: { value: 'test', valid: true, message: '' },
      fieldTwo: { value: 'email@example.com', message:'', valid: true }
    }
  }

  const validation = Check.checkValidation(form, VALIDATIONS)
  expect(validation).toEqual(expectedValidation)
})

test('checkValidation invalid field required on form', () => {
  const VALIDATIONS = {
    fieldOne: [
      Check.isRequired
    ]
  }

  const form = {
    fieldOne: { value: '' },
    fieldTwo: { value: 'test' }
  }

  const validation = Check.checkValidation(form, VALIDATIONS)
  expect(validation.form.fieldOne.valid).toEqual(false)
})

test('checkValidation invalid field email on form', () => {
  const VALIDATIONS = {
    fieldOne: [
      Check.Email
    ]
  }

  const form = {
    fieldOne: { value: 'test' }
  }

  const validation = Check.checkValidation(form, VALIDATIONS)
  expect(validation.form.fieldOne.valid).toEqual(false)
})

// setAndCheckValidation
test('setAndCheckValidation returns a valid form', () => {
  const VALIDATIONS = {
    fieldOne: [
      Check.isRequired
    ],
    fieldTwo: [
      Check.Email
    ]
  }

  const form = {
    fieldOne: { value: 'test'},
    fieldTwo: { value: 'email@example.com' }
  }

  const field = { field: { fieldOne: 'test' } }

  const expectedValidation = {
    fieldOne: { value: 'test', valid: true },
    fieldTwo: { value: 'email@example.com' }
  }

  const validation = Check.setAndCheckValidation(form, field, VALIDATIONS)
  expect(validation).toEqual(expectedValidation)
})

test('hasValue', () => {
  let value = ''

  let result = Check.hasValue(value, {})

  expect(result).toEqual({ result: 'end' })

  value = 'withValue'
  result = Check.hasValue(value, {})

  expect(result).toEqual({ result: 'continue' })
})

test('isValidPostalCode', () => {
  let value = '2323lfdlp23d'

  let result = Check.isValidPostalCode(value, {})

  expect(result).toHaveProperty('result', false)

  value = '3865-122'
  result = Check.isValidPostalCode(value, {})

  expect(result).toHaveProperty('result', true)
})

test('isValidPhoneNumber', () => {
  let value = '2323lfdlp23d'

  let result = Check.isValidPhoneNumber(value, {})

  expect(result).toHaveProperty('result', false)

  value = '917623285'
  result = Check.isValidPhoneNumber(value, {})

  expect(result).toHaveProperty('result', true)

  value = '232865343'
  result = Check.isValidPhoneNumber(value, {})

  expect(result).toHaveProperty('result', true)
})

test('isValidWebsite', () => {
  let value = '2323lfdlp23d'

  let result = Check.isValidWebsite(value, {})

  expect(result).toHaveProperty('result', false)

  value = 'www.google.pt'
  result = Check.isValidWebsite(value, {})

  expect(result).toHaveProperty('result', true)

  value = 'https://google.pt'
  result = Check.isValidWebsite(value, {})

  expect(result).toHaveProperty('result', true)
})


