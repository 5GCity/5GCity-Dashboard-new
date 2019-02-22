/**
 * Helper function for axios interceptor
 *
 * @param {*} config
 * @param {*} idToken
 */
export const axiosAuthInterceptor = (config, idToken) => {
    if (!config.ignoreAuth) {
      config.headers.Authorization = `Bearer ${idToken}`
    }
    return config
  }
