/**
 * Generates a media url from config MEDIA_BASE_URL
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import { MEDIA_BASE_URL } from 'config'

export default (uri: string): string => {
  return `${MEDIA_BASE_URL}${uri}`
}
