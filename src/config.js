/**
 * Config.js
 * Where we we set all the configurations and constants to be used in the application
 */
import 'interceptors'
// ! Do not remove the env comments they are used for building the correct environemnt
// env
export * from 'environments/docker'

// Core Constants
export const VERSION = process.env.VERSION && process.env.VERSION.replace(/"/g, '')
export const BUILD_DATE = process.env.BUILD_DATE
export const AUTH_TOKEN_SLUG = `jwtAuthToken`
export const AUTH_TOKEN_TYPE = `bearer`
export const DEFAULT_DATE_FORMAT = `DD-MM-YYYY`
export const API_DATE_FORMAT = `YYYY-MM-DD`

// Field Constants

// Other Contants
export const MAPBOX_TOKEN = `pk.eyJ1IjoiaHVnb2ZvbnNlY2E0MyIsImEiOiJjam9nMHRhNDEwOWRnM2txenI0Mng5aHVvIn0.WIeLY3YLpDHAO9X76J5usA`
export const MAPBOX_STYLE = `mapbox://styles/mapbox/dark-v9`
export const REQUEST_CAMELIZE = ['create_descriptor', 'services', 'functions', 'chunkete_chunk', 'sliceManagement', 'wirelessConfig','LTEConfig']
// export const REQUEST_SCHEMA = ['/sdk/services']
