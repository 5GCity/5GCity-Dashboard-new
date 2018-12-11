import getFilenameOnFullPath from 'utils/getFilenameOnFullPath'


test('getFilenameOnFullPath returns the a filename as it should', () => {
  const fileFullPath = '/folder/folder-two/filename.test'

  const result = getFilenameOnFullPath(fileFullPath)
  expect(result).toEqual('filename.test')
})
