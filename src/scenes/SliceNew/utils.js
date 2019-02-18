/**
 * SliceNew Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
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
          ischecked:false
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
                  ischecked:false
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
            ischecked:false,
            cidr: null,
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
              id: network.id ,
              name: network.name,
              ischecked:false,
              cidr: null,
        }]
        locationExistsOnMarkers.location.resources.networksCount = 0
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
                  ischecked:false,
                  cidr: null,
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
            ischecked: false,
            channel: null,
            dhcpd: null,
            dns: null,
            sdnWifiName: null,
          })
        } else {
          locationExistsOnMarkers.location.resources.sdnWifi = [{
              id: sdnWifi.id ,
              name: sdnWifi.name,
              ischecked: false,
              channel: null,
              dhcpd: null,
              dns: null,
              sdnWifiName: null,
          }]
          locationExistsOnMarkers.location.resources.sdnWifiCount = 0
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
                  ischecked: false,
                  channel: null,
                  dhcpd: null,
                  dns: null,
                  sdnWifiName: null,
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
