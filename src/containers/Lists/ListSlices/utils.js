/**
 * ListSlices Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const Titles = [{
  id: 1,
  size: 300,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 350,
  name: 'Name',
  propItem: 'name',
},{
  id: 4,
  size: 100,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
},{
  id: 5,
  size: 350,
  name: 'Slice User',
  propItem: 'tenantName',
}]

export const TitlesUser = [{
  id: 1,
  size: 350,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 350,
  name: 'Name',
  propItem: 'name',
},{
  id: 4,
  size: 100,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
}]
