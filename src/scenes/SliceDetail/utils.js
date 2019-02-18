/**
 * SliceDetail Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
export const createSlice = (resources) => {
const markers = [], networkLocation = [], sdnWifiLocation = []

  if(!resources) {
    return markers
  }

  const computeLocation = resources.chunks.openstackProjects.map((compute) =>
    compute.compute)

  resources.chunks.openstackVlans.forEach((network) => {
    if(network.physicalNetwork) {
      console.log(network)
      networkLocation.push({
        cidr: network.cidr,
        tag: network.tag,
        ...network.physicalNetwork
      })
    } else if (network.sdnWifiAccessPoint) {
      sdnWifiLocation.push({
        dhcpd: network.dhcpdIp,
        dns: network.dnsIp,
        channel: network.channel,
        ...network.sdnWifiAccessPoint
      })
    }
  })

  const compareComputes = () => {
    computeLocation.forEach((compute) => {
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
    networkLocation.forEach((network) => {
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
            ischecked: false,
            cidr: network.cidr,
            tag: network.tag
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
              id: network.id ,
              name: network.name,
              ischecked: false,
              cidr: network.cidr,
              tag: network.tag
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
                  ischecked: false,
                  cidr: network.cidr,
                  tag: network.tag
                }]
              }
          }
        })
      }
    })
  }

  const compareSDN = () => {
    sdnWifiLocation.forEach((sdnWifi) => {
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
            channel: sdnWifi.channel,
            dhcpd: sdnWifi.dhcpd,
            dns: sdnWifi.dns,
          })
        } else {
          locationExistsOnMarkers.location.resources.sdnWifi = [{
              id: sdnWifi.id ,
              name: sdnWifi.name,
              ischecked: false,
              channel: sdnWifi.channel,
              dhcpd: sdnWifi.dhcpd,
              dns: sdnWifi.dns,
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
                  ischecked: false,
                  channel: sdnWifi.channel,
                  dhcpd: sdnWifi.dhcpd,
                  dns: sdnWifi.dns,
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

  return ({
  "name": resources.name,
  "markers": markers
  })
}
