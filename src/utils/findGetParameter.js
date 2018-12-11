/**
 * Finds a get parameter in url
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
export default (parameterName) => {
  let result = null
  let tmp = []
  let items = window.location.search.substr(1).split('&')
  for (let index = 0; index < items.length; index++) {
    tmp = items[index].split('=')
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
  }
  return result
}
