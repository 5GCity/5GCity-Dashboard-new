export default (url, obj) => {
  let newUrl = url

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      newUrl = newUrl.replace(`{${key}}`, value)
    }
  }

  return newUrl
}
