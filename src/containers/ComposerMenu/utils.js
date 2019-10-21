/**
 * ComposerMenu Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

 export const Organizations = value => {
   const array = [{id:9999, value: 'all', name: 'All'}]
   value && value.forEach(organization => {
    array.push({ id:organization.id, value: organization.sliceId, name: organization.sliceId})
   })
   return array
 }
