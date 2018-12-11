/**
 * Formats numbers to portuguese format using commas
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
export default (number: any) => String(number).replace('.', ',')
