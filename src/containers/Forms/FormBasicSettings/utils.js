/**
 * FormBasicSettings Container Utils
 * Please write a description
 *
 */

import * as Check from 'validations'
import mapValues from 'lodash/mapValues'

export const LICENSE_TYPE = [{
  id: 1,
  name: 'Public',
  value: 'PUBLIC'
}, {
  id: 2,
  name: 'Private',
  value: 'PRIVATE'
}]

export const ACCESS_LEVEL = [
  {
    id: 0,
    name: 'Platinum',
    value: '4'
  }, {
    id: 1,
    name: 'Gold',
    value: '1'
  }, {
    id: 2,
    name: 'Silver',
    value: '2'
  }, {
    id: 3,
    name: 'Bronze',
    value: '3'
  }
]

export const DEFAULT_FORM = () => ({
  service_name: {
    value: null
  },
  service_access_level: {
    value: null
  },
  service_organization: {
    value: null
  },
  service_designer: {
    value: null
  },
  service_version: {
    value: null
  },
  service_license_type: {
    value: null
  },
  service_license_url: {
    value: null
  },
  service_parameter: {
    array: []
  }
})

export const VALIDATIONS = {
  service_name: [
    Check.isRequired
  ],
  service_organization: [
    Check.isRequired
  ],
  service_access_level: [
    Check.isRequired
  ],
  service_designer: [
    Check.isRequired
  ],
  service_version: [
    Check.isRequired,
    Check.isVersion
  ],
  service_license_type: [
    Check.isRequired
  ],
  service_license_url: [
    Check.isRequired
  ],
  service_parameter: [
  ]
}

const NewParameter = { value: null, valid: false }
/**
 *
 * @param {object} state
 */
export const AddNewParameter = state => {
  const newState = { ...state }
  const array = newState.service_parameter.array.concat(NewParameter)
  newState.service_parameter.array = array
  return newState
}

export const VerifyArray = value => {
  if (Array.isArray(value) && value.length > 0) {
    return JSON.stringify(value, null, 4)
  } else {
    return null
  }
}

export const SetFormBasic = service => {
  const result = DEFAULT_FORM()
  if (service) {
    // Verify if service has parameters key
    if (service.parameters) {
      result.service_parameter.array = service.parameters
    } else {
      result.service_parameter.array = result.service_parameter.array
    }
    result.service_name.value = service.name
    result.service_organization.value = service.sliceId || null
    if (service) {
      result.service_access_level.value = service.accessLevel && service.accessLevel.toString()
    }
    result.service_designer.value = service.designer
    result.service_version.value = service.version
    result.service_license_type.value = service.license.type || null
    result.service_license_url.value = service.license.url || null
  }
  return result
}

export const SetFormBasicSettings = (form, service) => {
  const result = { ...service }
  // Transform object and remove uneeded state values
  let params = mapValues(form, ({ value }) => value)
  result.name = params.service_name
  result.version = params.service_version
  result.designer = params.service_designer
  result.accessLevel = params.service_access_level
  result.license.type = params.service_license_type
  result.license.url = params.service_license_url
  result.sliceId = params.service_organization
  result.parameters = GetParameters(form.service_parameter.array)
  return result
}

const GetParameters = array => {
  if (array.length > 0) {
    const newArrayParameters = []
    array.forEach(element => {
      newArrayParameters.push(element.value)
    })
    return newArrayParameters
  } else {
    return null
  }
}
