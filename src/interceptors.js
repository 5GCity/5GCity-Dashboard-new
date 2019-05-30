import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { AUTH_TOKEN_TYPE, REQUEST_CAMELIZE } from 'config'

const decamelizeKeysTransformer = function (data) {
  return data && JSON.stringify(decamelizeKeys(data))
}

export const setAuthorizationInterceptor = authToken => {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `${AUTH_TOKEN_TYPE} ${authToken}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

export const removeAuthorizationInterceptor = () => {
  axios.interceptors.request.use(function (config) {
    delete config.headers.Authorization
    return config
  }, function (error) {
    return Promise.reject(error)
  })
}

// Converts all responses for CamelCase
axios.interceptors.response.use((response) => {
  response.data = camelizeKeys(response.data)
  return response
}, (error) => {
  return Promise.reject(error)
})


// Converts all requests to under-cased
axios.interceptors.request.use((request) => {
  const currentContentType = request.headers['Content-Type']

  // Converts URL get params to underscored
  if (request.params) {
      request.params = decamelizeKeys(request.params)
  }

  if (!currentContentType) {
    request.headers['Content-Type'] = 'application/json;charset=utf-8'
    const find = REQUEST_CAMELIZE.find(url => request.url.includes(url))
    if (!find) {
      request.transformRequest = [decamelizeKeysTransformer]
    }
  }

  return request
}, function (error) {
  return Promise.reject(error)
})



export default axios
