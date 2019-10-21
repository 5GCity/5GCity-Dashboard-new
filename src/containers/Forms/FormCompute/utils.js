/**
 * FormCompute Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

 export const UNITS =[{
    id: 1,
    value: 'MB',
    name: 'MB'
  },
  {
    id: 2,
    value: 'GB',
    name: 'GB'
  }]


  export const NewCompute = {
    name: null,
    compute_data: {
      availability_zone: null,
      quota: {
        cpus: {
          provisioned: 0,
          total: null
        },
        ram: {
          provisioned: 0,
          total: null,
          units: 'MB' // default
        },
        storage: {
          provisioned: 0,
          total: null,
          units: 'GB' // default
        }
      }
    },
    location: {
      latitude: null,
      longitude: null
    }
  }
