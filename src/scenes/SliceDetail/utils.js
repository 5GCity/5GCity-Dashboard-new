/**
 * SliceDetail Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
export const createSlice = (resources) => {
const markers = [], networkLocation = []

  if(!resources) {
    return markers
  }

  const computeLocation = resources.chunks.openstackProjects.map((compute) =>
    compute
  )
  const sdnWifiLocation = resources.chunks.virtualWifiAccessPoints.map(wifi =>
    wifi
  )
  console.log(resources)
  resources.chunks.openstackVlans.forEach((network) => {
    if(network.physicalNetwork) {
      networkLocation.push({
        cidr: network.cidr,
        tag: network.tag,
        ...network.physicalNetwork
      })
    }
  })

  const compareComputes = () => {
    computeLocation.forEach((compute) => {
      const { latitude, longitude } = compute.compute.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if (locationExistsOnMarkers) {
        locationExistsOnMarkers.location.resources.computes.push({
          id: compute.compute.id ,
          name: compute.compute.name,
          computeData: {...compute.requirements},
          ischecked:false
        })
      } else {
        markers.push({
          location:{
            latitude:latitude,
            longitude: longitude,
              resources:{
                computes:[{
                  id: compute.compute.id ,
                  name: compute.compute.name,
                  computeData: {...compute.requirements},
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
    console.log(sdnWifiLocation)
    sdnWifiLocation.forEach((sdnWifi) => {
      console.log(sdnWifi)
      const { latitude, longitude } = sdnWifi.sdnWifiAccessPoint.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if(locationExistsOnMarkers) {
        if(locationExistsOnMarkers.location.resources.sdnWifi) {
          locationExistsOnMarkers.location.resources.sdnWifi.push({
            id: sdnWifi.id ,
            name: sdnWifi.name,
            channel: sdnWifi.channel,
            dhcpd: sdnWifi.dhcpdIp,
            dns: sdnWifi.dnsIp,
          })
        } else {
          locationExistsOnMarkers.location.resources.sdnWifi = [{
              id: sdnWifi.id ,
              name: sdnWifi.name,
              channel: sdnWifi.channel,
              dhcpd: sdnWifi.dhcpdIp,
              dns: sdnWifi.dnsIp,
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
                  channel: sdnWifi.channel,
                  dhcpd: sdnWifi.dhcpdIp,
                  dns: sdnWifi.dnsIp,
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
