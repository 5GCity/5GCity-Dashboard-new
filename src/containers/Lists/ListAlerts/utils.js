/**
 * ListAlerts Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const TITLE_LIST =[{
  id: 1,
  size: 250,
  name: 'Alert',
  propItem: 'alertname'
}, {
  id: 2,
  size: 150,
  name: 'Job',
  propItem: 'job'
}, {
  id: 3,
  size: 150,
  name: 'Severity',
  propItem: 'severity',
  render: (vendor) =>
   !vendor ? 'N.A' : vendor
},
{
  id: 4,
  size: 150,
  name: 'Start Time',
  propItem: 'startsAtTimestamp',
  render: (vendor) =>
   !vendor ? 'N.A' : convertDateAndTime(vendor)
}]


export const convertDateAndTime = unixTimeStamp => {
  const validateTimeStamp = new Date(unixTimeStamp).getTime() > 0

  if (!validateTimeStamp) return unixTimeStamp

  const date = new Date(unixTimeStamp)

  return (
    ('00' + date.getDate()).slice(-2) +
    '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    date.getUTCFullYear() +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2) +
    ':' +
    ('00' + date.getSeconds()).slice(-2)

  )
}

