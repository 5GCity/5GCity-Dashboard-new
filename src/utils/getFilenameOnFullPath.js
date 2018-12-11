/**
 * Gets filename from full path
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
export default (fullPath: any) => fullPath.replace(/^.*(\\|\/|:)/, '')
