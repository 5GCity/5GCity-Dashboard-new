/**
 * Helper function for axios interceptor
 *
 * @param {*} config
 * @param {*} idToken
 */
export const axiosAuthInterceptor = (config: any, idToken: string) => {
    if (!config.ignoreAuth) {
      config.headers.Authorization = `Bearer ${idToken}`
    }
    return config
  }