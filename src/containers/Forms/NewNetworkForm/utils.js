/**
 * ModalNewNetwork Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import * as Check from 'validations'

export const DEFAULT_FORM = () => ({
  nameInstance: {
    value: null
  },
  description: {
    value: null
  },
  ports: {
    array: [{
      value: null
    }]
  },
  sliceId: {
    value: null
  },
  trusted: {
    value: false
  },
  computeSelect: {
    value: null
  }
})

export const VALIDATIONS = {
  nameInstance: [
    Check.isRequired
  ],
  description: [
    Check.isRequired
  ],
  sliceId: [
    Check.isRequired
  ],
  ports: [
    Check.isNumber
  ],
  computeSelect: [
    Check.isRequired
  ]
}

export const SetField = (state, payload) => (
  Check.setAndCheckValidation(state, payload, VALIDATIONS)
)

export const SetForm = (form) => (
  Check.checkValidation(form, VALIDATIONS).form
)

export const SetPorts = (state, payload) => (
  Check.setAndCheckValidationArray(state, payload, VALIDATIONS)
)

export const SetComputes = (action, slices) => {
  const result = {disabled: true, options: []}
  const sliceId = action.payload.field.sliceId
  const findSlice = slices.find(slice => slice.id === sliceId)
  findSlice.chunks.openstackProjects.forEach(compute =>
    result.options.push({
      id: compute.id,
      value: compute.osmVimId,
      name: compute.name
    })
    )
  result.disabled = !result.disabled
  return result
}

export const CapitalizeFirstLetter = string => (
  string[0].toUpperCase() + string.slice(1)
)

export const AddPort = state => {
  const copyState = { ...state }
  const newValue = {value: null, valid: false}
  copyState.ports.array.push({newValue})
  return copyState
}

export const RemovePort = (state, index) => {
  const result = { ...state }
  state.ports.array.splice(index, 1)
  return result
}
