/**
 * ListSDKServices Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

export const Titles = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
}, {
  id: 2,
  size: 20,
  name: 'Short Name',
  propItem: 'name',
}, {
  id: 3,
  size: 15,
  name: 'Design',
  propItem: 'design',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}, {
  id: 4,
  size: 15,
  name: 'Version',
  propItem: 'version',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
},{
  id: 5,
  size: 15,
  name: 'Repository',
  propItem: 'repository',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}, {
  id: 6,
  size: 15,
  name: 'Last Update',
  propItem: 'lastUpdate',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}
]

export const getResult = services => {
  const array = []
  services &&
  services.forEach(service => {
    array.push({
      name: service.name,
      id: service.id,
      design: service.designer,
      version: service.version,
      repository: service.repository || null,
      lastUpdate: service.lastUpdate || null,
    })
  })
  return array
}
