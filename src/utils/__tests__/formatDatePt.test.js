import formatDatePt from 'utils/formatDatePt'

test('formatDatePt formate values as it should', () => {
  const result = formatDatePt('2018-12-01')
  expect(result).toEqual('01-12-2018')
})
