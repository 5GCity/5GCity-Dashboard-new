/**
 * ListNewNetworks Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const TITLE_LIST = [{
  id: 1,
  size: 350,
  name: 'Id',
  propItem: 'instanceId',
  render: (instanceId) =>
     instanceId ? instanceId : ' '
}, {
  id: 2,
  size: 400,
  name: 'Name',
  propItem: 'nsdName'
},
{
  id: 3,
  size: 150,
  name: 'Version',
  propItem: 'nsdVersion'
}]


export const setCatalogue = catalogue => {
  const newCatalogue = []
  catalogue && catalogue.forEach(item => {
  if(item.manoInfoIds) {
    for (const key in item.manoInfoIds) {
      if (item.manoInfoIds.hasOwnProperty(key)) {
        const element = item.manoInfoIds[key];
        newCatalogue.push({...item, instanceId: element || null})
      }
    }
  }else {
    newCatalogue.push({...item, instanceId: null})
  }
})
return newCatalogue
}
