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
  console.log(newState)
  const array = newState.service_parameter.array.concat(NewParameter)
  newState.service_parameter.array = array
  return newState
}
