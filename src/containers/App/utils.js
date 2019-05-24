export const giveUserRole = (userArray) => {
  const findAdmin = userArray.roles.find(role => role === 'Administrator')
  return findAdmin !== undefined ? 'Inf. Owner' : 'Slice Requester'
}
