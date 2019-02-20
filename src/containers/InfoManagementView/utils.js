/**
 * InfoManagementView Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

export const createAllPins = (resources) =>{
  const markers = []


  if (!resources) {
    return markers
  }

  const compareComputes = () => {
    resources.computes.forEach((compute) => {
      const { latitude, longitude } = compute.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if (locationExistsOnMarkers) {
        locationExistsOnMarkers.location.resources.computes.push({
          id: compute.id ,
          name: compute.name,
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
                }]
              }
          }
        })
      }
    })
  }

  const compareNetworks = () => {
    resources.networks.forEach((network) => {
      const { latitude, longitude } = network.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if(locationExistsOnMarkers) {
        if(locationExistsOnMarkers.location.resources.networks) {
          locationExistsOnMarkers.location.resources.networks.push({
            id: network.id ,
            name: network.name,
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
              id: network.id ,
              name: network.name,
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
                }]
              },
          }
        })
      }
    })
  }

  const compareSDN = () => {
    resources.sdnWifi.forEach((sdnWifi) => {
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
            bandwidth: sdnWifi.sdnWifiAccessPointData.channels[0].bandwidth,
            number: sdnWifi.sdnWifiAccessPointData.channels[0].number,
            txPower: sdnWifi.sdnWifiAccessPointData.channels[0].txPower,
          })
        } else {
          locationExistsOnMarkers.location.resources.sdnWifi = [{
              id: sdnWifi.id ,
              name: sdnWifi.name,
              bandwidth: sdnWifi.sdnWifiAccessPointData.channels[0].bandwidth,
              number: sdnWifi.sdnWifiAccessPointData.channels[0].number,
              txPower: sdnWifi.sdnWifiAccessPointData.channels[0].txPower,
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
                  bandwidth: sdnWifi.sdnWifiAccessPointData.channels[0].bandwidth,
                  number: sdnWifi.sdnWifiAccessPointData.channels[0].number,
                  txPower: sdnWifi.sdnWifiAccessPointData.channels[0].txPower,
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
