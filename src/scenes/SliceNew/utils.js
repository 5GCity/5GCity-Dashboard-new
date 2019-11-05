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
  const arrayOfRadioPhys = {wifi: [], lte: []}
  locations.forEach(item => {
    item.location.resources.wifi && item.location.resources.wifi.forEach(wifi => {
      if (wifi.ischecked) {
        arrayOfRadioPhys.wifi.push({...wifi, location:{ latitude: item.location.latitude, longitude: item.location.longitude }, type: "SUB6_ACCESS"})
      }
    })
    item.location.resources.LTE && item.location.resources.LTE.forEach(lte => {
      if (lte.ischecked) {
        arrayOfRadioPhys.lte.push({...lte, location:{ latitude: item.location.latitude, longitude: item.location.longitude}, type: "LTE_PRIMARY_PLMN"})
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

export const VerifyNetwork = (resources, networks) => {
  let result = false
  networks && networks.forEach(network => {
    const getLocation = resources.find(resource => resource.location.latitude === network.location.latitude && resource.location.longitude === network.location.longitude)
    if(getLocation) {
      getLocation.location.resources.computes && getLocation.location.resources.computes.forEach(compute => {
        if(compute.ischecked)
          result = true
      })
    } else {
      result = false
    }
  })
  return result
}



export const FAKERADIOPHYS =[
    {
      "id": "93187da8-358b-4078-8add-e6cd43ebc57c",
      "name": "primaryPLMN",
      "type": "LTE_PRIMARY_PLMN",
      "config": {
        "prachrootseqindex": 100,
        "earfcndl": 41690,
        "phyCellId": 5,
        "refSignalPower": -40,
        "cellIdentity": 256,
        "trackingAreaCode": 67,
        "primaryPlmnId": "00103",
        "reservedForOperatorUse": "not-reserved",
        "primaryMMEAddress": "10.10.201.59",
        "primaryMMEPort": 3333
      },
      "location": {
        "longitude": 4.656732,
        "latitude": 51.284905,
        "info": "Trappisten Abdij Westmalle"
      },
      "ranId": "5d9372ccb7f26251f27d51ba"
    },
    {
      "config": {
        "channelBandWidth": 20,
        "channelNumber": 36,
        "txPower": 200
      },
      "id": "8df4901b-1232-4349-917b-dddc2fe6e18e",
      "location": {
        "latitude": 4.346732,
        "longitude": 51.584905
      },
      "name": "FAKE phy1",
      "ranId": "5b63089158f568073093f70d",
      "type": "SUB6_ACCESS"
   }
]
