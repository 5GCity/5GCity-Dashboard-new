/**
 * ComposerForm Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

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

export const STEPS = [
  {id: 1, description: 'General info', active: true, validation: null},
  {id: 2, description: 'Monitoring', active: false, validation: null},
  {id: 3, description: 'Actions', active: false, validation: null}
]

export const VerifyArray = value => {
  if (Array.isArray(value) && value.length > 0) {
    return JSON.stringify(value, null, 4)
  } else {
    return null
  }
}
