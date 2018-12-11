/**
 * Navbar Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const giveUserRole = (userArray) => {
    const findAdmin = userArray.roles.find(role => role === 'Administrator')
    return findAdmin !== undefined ? 'Inf. Owner' : 'Slice Requester'
 }