/**
 * Fill default form with values from api
 * @param {object} setDefaultValues -default form
 * @param {object} api - api values
 * @returns {object} obj - form values
 */
export default (setDefaultValues, api) => {
  const obj = Object.assign({}, setDefaultValues)
  for (const key in obj) {
    obj[key].value = api[key] || null
  }
  return obj
}
