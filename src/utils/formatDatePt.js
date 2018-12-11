/**
 * Formats dates to Portugues Format
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import moment from 'moment'

export default (date) => {
  return date && moment(date).format('DD-MM-YYYY')
}
