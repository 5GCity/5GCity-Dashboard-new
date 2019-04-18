import findGetParameter from 'utils/findGetParameter'

test('findGetParameter find parameter as it should', () => {

  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: `?t=${expectedValue}`
  })

  const result = findGetParameter('t')
  expect(result).toEqual(expectedValue)
})

test('findGetParameter when couldn\'t find parameter', () => {
  const result = findGetParameter('var')
  expect(result).toEqual(null)
})
