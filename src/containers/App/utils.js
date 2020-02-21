export const giveUserRole = (userArray) => {
  const findAdmin = userArray.roles.includes('Administrator')
  return findAdmin ? 'Inf. Owner' : 'Slice Requester'
}

export const AdminVerification = user => {
  if (user.realm_access.roles.includes('Administrator')) {
    return 'admin'
  } else {
    return user.preferred_username
  }
}
