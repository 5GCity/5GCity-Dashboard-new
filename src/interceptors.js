import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { AUTH_TOKEN_TYPE } from 'config'

const decamelizeKeysTransformer = function (data) {
  return data && JSON.stringify(decamelizeKeys(data))
}

export const setAuthorizationInterceptor = (authToken) => {
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


export const initInterceptors = () => {
  // Converts all responses for CamelCase
  axios.interceptors.response.use((response) => {
    response.data = camelizeKeys(response.data)
    return response
  }, (error) => {
    return Promise.reject(error)
  })


  // Converts all requests to under-cased
  axios.interceptors.request.use((config) => {
    const currentContentType = config.headers['Content-Type']

    // Converts URL get params to underscored
    if (config.params) {
      config.params = decamelizeKeys(config.params)
    }

    if (!currentContentType) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      config.transformRequest = [decamelizeKeysTransformer]
    }

    return config
  }, function (error) {
    return Promise.reject(error)
  })
}



export default axios
