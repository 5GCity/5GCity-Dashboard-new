/**
 * ListNetworks Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

 export const TITLE_LIST = [{
   id: 1,
   size: 250,
   name: 'Id',
   propItem: 'id'
 }, {
   id: 2,
   size: 250,
   name: 'Short Name',
   propItem: 'name'
 }, {
   id: 3,
   size: 240,
   name: 'Slice Name',
   propItem: 'slic3Name',
   render: (vendor) =>
    !vendor ? 'N.A' : vendor
 }]
