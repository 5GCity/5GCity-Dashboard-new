/**
 * ListSDKOrganisation Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const Titles = [{
  id: 1,
  size: 200,
  name: 'Id',
  propItem: 'id'
}, {
  id: 2,
  size: 200,
  name: 'Name',
  propItem: 'sliceId'
}, {
  id: 3,
  size: 200,
  name: 'Description',
  propItem: 'sliceDescription',
  render: (vendor) =>
    !vendor ? 'N.A' : vendor
}
]

export const FindUsers = (usersAPI, newUsers ) => {
  const obj = {add:[], remove: []}
  usersAPI.forEach(user => {
    const findUser = newUsers.find(newUser => newUser.value === user)
    if(!findUser) {
      obj.remove.push(user)
    }
  })
  newUsers.forEach(newUser => {
    const findUser = usersAPI.find(userAPI => userAPI === newUser.value)
    if(!findUser) {
      obj.add.push(newUser)
    }
  })
  return obj
}
