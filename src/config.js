/**
 * Config.js
 * Where we we set all the configurations and constants to be used in the application
 */
import axios from 'axios'

import 'interceptors'

// ! Do not remove the env comments they are used for building the correct environemnt
// env
export * from 'environments/production'
// env

// Core Constants
export const VERSION = process.env.VERSION && process.env.VERSION.replace(/"/g, '')
export const BUILD_DATE = process.env.BUILD_DATE
export const AUTH_TOKEN_SLUG = `jwtAuthToken`
export const AUTH_TOKEN_TYPE = `bearer`
export const DEFAULT_DATE_FORMAT = `DD-MM-YYYY`
export const API_DATE_FORMAT = `YYYY-MM-DD`
export const MAPBOX_TOKEN = `pk.eyJ1IjoiaHVnb2ZvbnNlY2E0MyIsImEiOiJjam9nMHRhNDEwOWRnM2txenI0Mng5aHVvIn0.WIeLY3YLpDHAO9X76J5usA`
export const MAPBOX_STYLE = `mapbox://styles/mapbox/dark-v9`
export const SENTRY_URL = `https://1512cd26cf0d48cbb47374af14fb951b@sentry2.ubiwhere.com/87`
// Field Constants

// Other Contants
axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Quick off the user on all 401 request code
        // const { data } = error.response
        if (error.response.status === 401) { // && getApiErrorKey(data.message) === `TOKEN_INVALID_OR_EXPIRED`) {
          removeUserSession()
        }
        // when error code os 412 user need to accept new version of terms or eula
        // redirect the user
        // TODO: review this workflow api returns always the body of the terms to accept
        if (error.response.status === 412 && document.URL.indexOf('?terms=true') === -1) {
          window.location.href = `/?terms=true`
        }
      }

      return Promise.reject(error)
    }
  )
