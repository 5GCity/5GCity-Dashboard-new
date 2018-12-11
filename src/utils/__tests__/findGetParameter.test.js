import findGetParameter from 'utils/findGetParameter'

test('findGetParameter find parameter as it should', () => {
  const expectedValue = '12fbcb72-fcfa-4d87-b973-1e98e58522d3'
  // mock the window.location.search value
  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: `?t=${expectedValue}`
  });
  const result = findGetParameter('t')
  expect(result).toEqual(expectedValue)
})

test('findGetParameter when couldn\'t find parameter', () => {
  const result = findGetParameter('var')
  expect(result).toEqual(null)
})
