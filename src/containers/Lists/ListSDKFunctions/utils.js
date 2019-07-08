/**
 * ListSDKFunctions Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const Titles = [{
  id: 1,
  size: 200,
  name: 'Id',
  propItem: 'id',
}, {
  id: 2,
  size: 200,
  name: 'Name',
  propItem: 'name',
},{
  id: 3,
  size: 120,
  name: 'Version',
  propItem: 'version',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
},{
  id: 4,
  size: 120,
  name: 'Visibility',
  propItem: 'visibility',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
},{
  id: 5,
  size: 120,
  name: 'Status',
  propItem: 'status',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
},
{
  id: 6,
  size: 120,
  name: 'Owner',
  propItem: 'ownerId',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}
]
