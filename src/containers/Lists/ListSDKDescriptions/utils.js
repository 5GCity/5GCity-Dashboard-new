/**
 * ListSDKDescriptions Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const Titles = [
  {
    id: 1,
    size: 200,
    name: 'Id',
    propItem: 'id'
  },{
    id: 2,
    size: 120,
    name: 'Service Id',
    propItem: 'serviceId',
    render: (vendor) =>
      !vendor ? 'N.A' : vendor
  }, {
    id: 3,
    size: 120,
    name: 'Status',
    propItem: 'status',
    render: (vendor) =>
      !vendor ? 'N.A' : vendor
  }
]