/**
 * ListSDKServices Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

export const Titles = [{
  id: 1,
  size: 200,
  name: 'Id',
  propItem: 'id',
}, {
  id: 2,
  size: 200,
  name: 'Short Name',
  propItem: 'name',
}, {
  id: 3,
  size: 120,
  name: 'Design',
  propItem: 'design',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}, {
  id: 4,
  size: 120,
  name: 'Version',
  propItem: 'version',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}
]

export const getResult = services => {
  if(services){
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
} else {
  return null
}
}

let idCopy = Date.now()

export const changeName = (itemSelect, services) => {
  const allServices = [...services]
  const findService = allServices.find(item => item.id === itemSelect.id)
  if (findService) {
    findService.name = `Copy_${itemSelect.name}_${idCopy++}`
    findService.component && findService.component.forEach(item => delete(item.id))
    findService.connectionPoints && findService.connectionPoints.forEach(item => delete(item.id))
    findService.intMonitoringParameters && findService.intMonitoringParameters.forEach(item => delete(item.id))
    findService.extMonitoringParameters && findService.extMonitoringParameters.forEach(item => delete(item.id))
    findService.link && findService.link.forEach(item => delete(item.id))
    findService.actionRules && findService.actionRules.forEach(item => delete(item.id))
    findService.actions && findService.actions.forEach(item => delete(item.id))
    findService.l3Connectivity && findService.l3Connectivity.forEach(item => delete(item.id))
    delete(findService.id)
  }
  return findService
}

