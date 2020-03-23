/**
 * FormCompute Container Utils
 * Please write a description
 *
 */

 export const UNITS = [{
   id: 1,
   value: 'MB',
   name: 'MB'
 },
 {
   id: 2,
   value: 'GB',
   name: 'GB'
 }]

 export const COMPUTE_TYPES = [{
   id: 1,
   value: 'openstack',
   name: 'Openstack'
 },
 {
   id: 2,
   value: 'fos',
   name: 'Fos'
 }]

 export const NewCompute = {
   name: null,
   trusted: false,
   computeData: {
     availabilityZone: null,
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
   computeType: null,
   location: {
     latitude: null,
     longitude: null
   }
 }

 export const CapitalizeFirstLetter = string => (
  string[0].toUpperCase() + string.slice(1)
 )
