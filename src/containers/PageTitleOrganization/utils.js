/**
 * PageTitleOrganization Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const Organizations = (value = null) => {
  const array = []
  if(value)
    value.forEach(organization => {
      array.push({
        id:organization.id,
        value: organization.sliceId,
        name: organization.sliceId
      })
    })
  return array
}
