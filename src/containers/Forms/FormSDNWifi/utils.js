/**
 * formSDNWifi Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

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

export const AddChannel = state => (
  Object.assign({}, state, state.channels.push(
    {
      bandwidth: {
        value: null
      },
      number:{
        value: null
      },
      txPower:{
        value: null
      }
    }
    )
  )
)
