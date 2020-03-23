/**
 * ModalConfigParameters Container Utils
 * Please write a description
 *
 */

/**
 * Verify how many parameter has and create form
 * @param {Object} node Node
 */
export const setForm = node => {
  const array = []
  node.extra_info.parameter.forEach(element =>
    array.push({
      value: null,
      valid: true
    })
  )
  for (let index = 0; index < array.length; index++) {
    const element = node.mapping_expression[index]
    if (element) {
      array[index].value = element
    } else {
      array[index].value = null
    }
  }
  return array
}
