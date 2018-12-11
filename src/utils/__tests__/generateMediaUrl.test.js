import generateMediaUrl from 'utils/generateMediaUrl'

test('generateMediaUrl generate url as it should', () => {
  const fileUrl = '/file/aaaa.png'
  const result = generateMediaUrl(fileUrl)
  expect(result).toMatch(fileUrl)
})
