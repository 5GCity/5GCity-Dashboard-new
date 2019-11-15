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
  {id: 1, description:'General info', active: true, validation: null}
]
