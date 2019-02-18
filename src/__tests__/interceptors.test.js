
import client from 'interceptors'

it('should convert a response to camelcase', () => {
  const pascal = {
    "data": {
      'test_convert': 'jest testing axios',
      'test_Convert_stuff': 'jest testing axios'
    }
  }

  const camel = {
    "data": {
      'testConvert': 'jest testing axios',
      'testConvertStuff': 'jest testing axios'
    }
  }
  console.log(client.interceptors)
  const test = JSON.parse(JSON.stringify(client.interceptors.response.handlers[0].fulfilled(pascal)))
  expect(test).toEqual(camel)
})


it('should convert a request to pascal case', () => {
  const pascal = {
    "params": {
      'test_convert': 'jest testing axios',
      'test_convert_stuff': 'jest testing axios'
    },
    "headers": {
      "Content-Type": 'application/json;charset=utf-8'
    },
    "transformRequest": [null]
  }

  const camel = {
      "params": {
        'testConvert': 'jest testing axios',
        'testConvertStuff': 'jest testing axios'
      },
      "headers": {
      }
  }

  const camelWithoutParamsAndWithContentType = {

    "headers": {
      "Content-Type": 'application/json;charset=utf-8'
    }
  }

  const pascalWithoutParamsAndWithContentType = {
    "headers": {
      "Content-Type": 'application/json;charset=utf-8'
    }
  }

  const handler = client.interceptors.request.handlers[0]
  const test = handler.fulfilled(camel)
  expect(test.transformRequest[0](camel.params)).toEqual(JSON.stringify(pascal.params))
  expect(JSON.parse(JSON.stringify(test))).toEqual(pascal)

  const test2 = handler.fulfilled(camelWithoutParamsAndWithContentType)
  expect(JSON.parse(JSON.stringify(test2))).toEqual(pascalWithoutParamsAndWithContentType)
})

it('should return promise on error', () => {
  const handler = client.interceptors.response.handlers[0]
  expect(handler.rejected({
    response: {
      statusText: 'NotFound',
      status: 404,
      data: {message: 'Page not found'}
    }
  })).rejects.toMatchObject({
    response: {
      statusText: 'NotFound',
      status: 404,
      data: {message: 'Page not found'}
    }
  })

  const handlerRequest = client.interceptors.request.handlers[0]
  expect(handlerRequest.rejected({
    response: {
      statusText: 'NotFound',
      status: 404,
      data: {message: 'Page not found'}
    }
  })).rejects.toMatchObject({
    response: {
      statusText: 'NotFound',
      status: 404,
      data: {message: 'Page not found'}
    }
  })
})
