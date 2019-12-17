/**
 * Alerts Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */


 export const OPTIONS_REACT = [
   {
     id: 1,
     value: null,
     name: 'All'
   },
   {
    id: 2,
    value: true,
    name: 'React'
  },
  {
    id: 3,
    value: false,
    name: 'No React'
  }
 ]

 export const TODAY_DATE = () => (
   Date.now()
 )


 export const convertDate = unixTimeStamp => {
  const validateTimeStamp = new Date(unixTimeStamp).getTime() > 0

  if (!validateTimeStamp) return unixTimeStamp

  return new Date(unixTimeStamp)
}


export const getTodayDateParams = unix => {
  const startDate = new Date()
  const endDate = new Date()

  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 0)

  if (unix) {
    const start = new Date(startDate).getTime()

    const end = new Date(endDate).getTime()

    const params = {
      start,
      end
    }
    return params
  }

  const params = [
    startDate,
    endDate
  ]
  return params
}


export const convertDateToUnix = dateToConvert => {
  const convertedDate = new Date(dateToConvert).getTime()
  return convertedDate
}
