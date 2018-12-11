import formatNumbersPt from 'utils/formatNumbersPt'

test('formatNumbersPt formate values as it should', () => {
  const result = formatNumbersPt('20.3')
  expect(result).toEqual('20,3')
})
