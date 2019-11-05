/**
 * ListSlices Container Utils
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
  propItem: 'name'
}, {
  id: 4,
  size: 100,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
}, {
  id: 5,
  size: 200,
  name: 'Slice User',
  propItem: 'tenantName'
},
{
  id: 6,
  size: 200,
  name: 'Activation status',
  propItem: 'activationStatus'
}]

export const TitlesUser = [{
  id: 1,
  size: 350,
  name: 'Id',
  propItem: 'id'
}, {
  id: 2,
  size: 350,
  name: 'Name',
  propItem: 'name'
}, {
  id: 4,
  size: 100,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
},{
  id: 5,
  size: 200,
  name: 'Activation status',
  propItem: 'activationStatus'
}]
