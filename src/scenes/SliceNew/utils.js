/**
 * SliceNew Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

export const CreateAllPins = resources => {
  const markers = []

  if (!resources) {
    return markers
  }

  const compareComputes = () => {
    resources.computes.length > 0 && resources.computes.forEach((compute) => {
      const { latitude, longitude } = compute.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if (locationExistsOnMarkers) {
        locationExistsOnMarkers.location.resources.computes.push({
          id: compute.id,
          name: compute.name,
          computeData: {...compute.computeData.quota},
          ischecked: false
        })
      } else {
        markers.push({
          location: {
            latitude: compute.location.latitude,
            longitude: compute.location.longitude,
            resources: {
              computes: [{
                id: compute.id,
                name: compute.name,
                availabilityZone: compute.computeData.availabilityZone,
                computeData: {...compute.computeData.quota},
                ischecked: false
              }]
            }
          }
        })
      }
    })
  }

  const compareNetworks = () => {
    resources.networks.length > 0 && resources.networks.forEach((network) => {
      const { latitude, longitude } = network.location

      const locationExistsOnMarkers = markers.find(marker =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if (locationExistsOnMarkers) {
        if (locationExistsOnMarkers.location.resources.networks) {
          locationExistsOnMarkers.location.resources.networks.push({
            id: network.id,
            name: network.name,
            networkData: {...network.physicalNetworkData.quota},
            ischecked: false
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
            id: network.id,
            name: network.name,
            networkData: {...network.physicalNetworkData.quota},
            ischecked: false
          }]
        }
      } else {
        markers.push({
          location: {
            latitude: network.location.latitude,
            longitude: network.location.longitude,
            resources: {
              networks: [{
                id: network.id,
                name: network.name,
                networkData: {...network.physicalNetworkData.quota},
                ischecked: false
              }]
            }
          }
        })
      }
    })
  }

  const compareRadiosPhys = () => {
    resources.radioPhys.length > 0 && resources.radioPhys.forEach(phy => {
      const phyType = phy.type === 'SUB6_ACCESS' ? 'wifi' : 'LTE'
      const { latitude, longitude } = phy.location
      if(ValidCoord(latitude,longitude)){

        const locationExistsOnMarkers = markers.find(marker =>
          marker.location.latitude === latitude &&
          marker.location.longitude === longitude
        )

        if (locationExistsOnMarkers) {
          if (locationExistsOnMarkers.location.resources[phyType]) {
            locationExistsOnMarkers.location.resources[phyType].push({
              id: phy.id,
              name: phy.name,
              info: phy.location.info,
              config: phy.config,
              ranId: phy.ranId,
              ischecked: false
            })
          } else {
            locationExistsOnMarkers.location.resources[phyType] = [{
              id: phy.id,
              name: phy.name,
              info: phy.location.info,
              config: phy.config,
              ranId: phy.ranId,
              ischecked: false
            }]
          }
        } else {
          markers.push({
            location: {
              latitude: latitude,
              longitude: longitude,
              resources: {
                [phyType]: [{
                  id: phy.id,
                  name: phy.name,
                  info: phy.location.info,
                  config: phy.config,
                  ranId: phy.ranId,
                  ischecked: false
                }]
              }
            }
          })
        }
      }
    })
  }

  compareComputes()
  compareNetworks()
  compareRadiosPhys()
  return markers
}

export const GetSelectComputes = locations => {
  const arrayOfComputes = []
  locations.forEach(item => {
    item.location.resources.computes &&
    item.location.resources.computes.forEach(compute => {
      if (compute.ischecked) {
        arrayOfComputes.push({...compute, location:{latitude: item.location.latitude, longitude: item.location.longitude}})
      }
    })
  })
  if (arrayOfComputes.length > 0) {
    return arrayOfComputes
  } else {
    return null
  }
}

export const GetSelectNetworks = locations => {
  const arrayOfNetworks = []
  locations.forEach(item => {
    item.location.resources.networks &&
    item.location.resources.networks.forEach(network => {
      if (network.ischecked) {
        arrayOfNetworks.push({...network, location:{latitude: item.location.latitude, longitude: item.location.longitude}})
      }
    })
  })
  if (arrayOfNetworks.length > 0) {
    return arrayOfNetworks
  } else {
    return null
  }
}

export const GetSelectRadioPhys = locations => {
  debugger
  const arrayOfRadioPhys = {wifi: [], lte: []}
  locations.forEach(item => {
    item.location.resources.wifi && item.location.resources.wifi.forEach(box => {
      if (box.ischecked) {
        arrayOfRadioPhys.wifi.push({...box})
      }
    })
    item.location.resources.lte && item.location.resources.lte.forEach(box => {
      if (box.ischecked) {
        arrayOfRadioPhys.lte.push({...box})
      }
    })
  })
  return arrayOfRadioPhys
}

const ValidCoord = (latitude, longitude) =>{
  if ((latitude >= -90 && latitude <= 90) && (longitude >= -180 && longitude <= 180)){
      return true
  } else {
    return false
  }
}


export const UNITS =[{
  id: 1,
  value: 'MB',
  name: 'MB'
},
{
  id: 2,
  value: 'GB',
  name: 'GB'
}]

export const UNITS_SECONDS =[{
  id: 1,
  value: 'MB/s',
  name: 'MB/s'
},
{
  id: 2,
  value: 'GB/s',
  name: 'GB/s'
}]



export const FindLocationCompute = (computeId, data) => {
  console.log(computeId, data)
  data.forEach( location => {
    console.log(location)
    let findLocation = location.resources.computes && location.resources.computes.find(compute => compute.id === computeId)
    console.log(findLocation)
    if(findLocation) {
      return findLocation
    }
  })
}

export const GETAllChunkIds = resources => {
  const array = []
  resources.forEach(resource => {
    resource.chunkIds && resource.chunkIds.forEach(chunk => {
      array.push(chunk.idChunk)
    })
  })
  return array
}

