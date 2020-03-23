/**
 * FormChunkLte Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import * as Check from 'validations'

export const DEFAULT_FORM = () => ({
  name: {
    array: []
  },
  plmnId: {
    array: []
  }
})

export const VALIDATIONS = {
  name: [
    Check.isRequired
  ],
  plmnId: [
    Check.isRequired
  ]
}

export const SetForm = form => (
  Check.checkValidation(form, VALIDATIONS).form
)

export const ChangeField = (state, payload) => (
  Check.setAndCheckValidationArray(state, payload, VALIDATIONS)
)

export const CreateForm = chunks => {
  const newForm = DEFAULT_FORM()
  const chunksLength = chunks.length
  for (let index = 0; index < chunksLength; index++) {
    if (index > 0) {
      newForm.name.array[index].push({ value: null })
      newForm.plmnId.array[index].push({ value: null })
    } else {
      newForm.name.array.push({ value: null })
      newForm.plmnId.array.push({ value: null })
    }
  }
  return newForm
}
