import { getStore } from 'kea'
import sagaPlugin from 'kea-saga'

export const Store = getStore({
  plugins: [ sagaPlugin ]
})
