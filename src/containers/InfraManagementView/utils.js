/**
 * InfoManagementView Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
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
          id: compute.id ,
          name: compute.name,
          computeData: {...compute.computeData.quota},
        })
      } else {
        markers.push({
          location:{
            latitude:compute.location.latitude,
            longitude: compute.location.longitude,
              resources:{
                computes:[{
                  id: compute.id ,
                  name: compute.name,
                  computeData: {...compute.computeData.quota},
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

      const locationExistsOnMarkers = markers.find( marker =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if(locationExistsOnMarkers) {
        if(locationExistsOnMarkers.location.resources.networks) {
          locationExistsOnMarkers.location.resources.networks.push({
            id: network.id ,
            name: network.name,
            networkData: {...network.physicalNetworkData}
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
              id: network.id ,
              name: network.name,
              networkData: {...network.physicalNetworkData}
        }]
      }
      } else {
        markers.push({
          location:{
            latitude:network.location.latitude,
            longitude: network.location.longitude,
              resources:{
                networks:[{
                  id: network.id ,
                  name: network.name,
                  networkData: {...network.physicalNetworkData}
                }]
              },
          }
        })
      }
    })
  }

  const compareSDN = () => {
    resources.sdnWifi.length > 0 && resources.sdnWifi.forEach((sdnWifi) => {
      const { latitude, longitude } = sdnWifi.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if(locationExistsOnMarkers) {
        if(locationExistsOnMarkers.location.resources.sdnWifi) {
          locationExistsOnMarkers.location.resources.sdnWifi.push({
            id: sdnWifi.id ,
            name: sdnWifi.name,
            sdnData: {...sdnWifi.sdnWifiAccessPointData}
          })
        } else {
          locationExistsOnMarkers.location.resources.sdnWifi = [{
              id: sdnWifi.id ,
              name: sdnWifi.name,
              sdnData: {...sdnWifi.sdnWifiAccessPointData}
          }]
      }
      } else {
        markers.push({
          location:{
            latitude:sdnWifi.location.latitude,
            longitude: sdnWifi.location.longitude,
              resources:{
                sdnWifi:[{
                  id: sdnWifi.id ,
                  name: sdnWifi.name,
                  sdnData: {...sdnWifi.sdnWifiAccessPointData}
                }]
              }
          }
        })
      }
    })
  }

  compareComputes()
  compareNetworks()
  compareSDN()

  return markers
}

