import generateUrl from 'utils/generateUrl'

test('generateUrl generate a url as it should', () => {
  const endpoint = `localhost/private/entity/{id}/`
  const url = generateUrl(endpoint, { id: 1 })
  const expectedUrl = `localhost/private/entity/1/`
  expect(url).toEqual(expectedUrl)
})

test('generateUrl generate a url whithout parameters', () => {
  const endpoint = `localhost/private/entity/`
  const url = generateUrl(endpoint)
  const expectedUrl = `localhost/private/entity/`
  expect(url).toEqual(expectedUrl)
})
