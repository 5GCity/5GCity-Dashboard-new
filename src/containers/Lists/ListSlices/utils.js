/**
 * ListSlices Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const Titles = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 20,
  name: 'Name',
  propItem: 'name',
},{
  id: 4,
  size: 10,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
},{
  id: 5,
  size: 15,
  name: 'Slice User',
  propItem: 'tenantName',
}]

export const TitlesUser = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 20,
  name: 'Name',
  propItem: 'name',
},{
  id: 4,
  size: 10,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
}]
