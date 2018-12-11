import mapOnChangeToState from 'utils/mapOnChangeToState'

test('mapOnChangeToState returns the state as it should', () => {
  const state = {
    fieldOne: {
      value: 'test'
    },
    fieldTwo: {
      value: 'test2'
    }
  }
  const payload = {
    field: { fieldOne: 'changed' }
  }

  const result = mapOnChangeToState(state, payload)
  const expectedResult = {
    fieldOne: {
      value: 'changed'
    },
    fieldTwo: {
      value: 'test2'
    }
  }
  expect(result).toEqual(expectedResult)
})
