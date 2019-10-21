/**
 * formLTE Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

const NewChannel = {
  bandwidth: {
    value: null
  },
  number: {
    value: null
  },
  txPower: {
    value: null
  }
}

export const CreateForm = (form, data) => {
  const array = []
  form.name = data.name
  data.sdnWifiAccessPointData.channels.forEach(channel =>
    array.push({
      ...channel
    })
  )
  form.channels = array

  return form
}

export const AddChannel = state => {
  const newState = { ...state }
  const array = newState.channels.concat(NewChannel)
  newState.channels = array
  return newState
}
