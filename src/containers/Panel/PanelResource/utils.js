/**
 * PanelResource Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

const NewInfra = { value: null, valid: false }

export const AddNewInfra = state => {
  const newState = { ...state }
  const array = newState.controller.array.concat(NewInfra)
  newState.controller.array = array
  return newState
}
