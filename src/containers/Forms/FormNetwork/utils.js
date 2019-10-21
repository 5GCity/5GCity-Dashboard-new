/**
 * formNetwork Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const RemoveItem = (state, index) => {
  state.provisionedTags.array.splice(index, 1)
  return state
}

export const NAMES = [{
  id: 1,
  name: 'Public',
  value: 'public'
}, {
  id: 2,
  name: 'Private',
  value: 'private'
},
{
  id: 3,
  name: 'External',
  value: 'external'
}]

export const UNITS = [{
  id: 1,
  name: 'MB/s',
  value: 'MB/s'
}, {
  id: 2,
  name: 'GB/s',
  value: 'GB/s'
}]
