/**
 * Maps onChange from inputs and other DOM elements to state
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
export default (state, payload) => {
  const key = Object.keys(payload.field)[0]
  const value = payload.field[key]
  const oldState = state[key] || {}
  return { ...state, ...{ [key]: { ...oldState, value } } }
}
