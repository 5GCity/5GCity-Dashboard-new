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
        locationExistsOnMarkers.location.isCompute = true
        locationExistsOnMarkers.location.resources.computes.push({
          id: compute.id,
          name: compute.name,
          computeData: {...compute.computeData.quota}
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
                computeData: {...compute.computeData.quota}
              }]
            },
            isCompute: true
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
        locationExistsOnMarkers.location.isNetwork = true
        if (locationExistsOnMarkers.location.resources.networks) {
          locationExistsOnMarkers.location.resources.networks.push({
            id: network.id,
            name: network.name,
            networkData: {...network.physicalNetworkData}
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
            id: network.id,
            name: network.name,
            networkData: {...network.physicalNetworkData}
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
                networkData: {...network.physicalNetworkData}
              }]
            },
            isNetwork: true
          }
        })
      }
    })
  }

  const compareRAN = () => {
    resources.rans.length > 0 && resources.rans.forEach((ran) => {
      const { latitude, longitude } = ran.location

      const locationExistsOnMarkers = markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )

      if (locationExistsOnMarkers) {
        locationExistsOnMarkers.location.isRAN = true
        if (locationExistsOnMarkers.location.resources.rans) {
          locationExistsOnMarkers.location.resources.rans.push({
            id: ran.id,
            name: ran.name,
            controller_url: ran.ranInfrastructureData.controllerUrl,
            username: ran.ranInfrastructureData.username,
            password: ran.ranInfrastructureData.password
          })
        } else {
          locationExistsOnMarkers.location.resources.rans = [{
            id: ran.id,
            name: ran.name,
            controller_url: ran.ranInfrastructureData.controllerUrl,
            username: ran.ranInfrastructureData.username,
            password: ran.ranInfrastructureData.password
          }]
        }
      } else {
        markers.push({
          location: {
            latitude: ran.location.latitude,
            longitude: ran.location.longitude,
            resources: {
              rans: [{
                id: ran.id,
                name: ran.name,
                controller_url: ran.ranInfrastructureData.controllerUrl,
                username: ran.ranInfrastructureData.username,
                password: ran.ranInfrastructureData.password
              }]
            },
            isRAN: true
          }
        })
      }
    })
  }

  const compareChunketeTopology = () => {
    resources.rans.length > 0 && resources.rans.forEach((ran) => {
      ran.chunketeTopology && ran.chunketeTopology.boxes.length > 0 && ran.chunketeTopology.boxes.forEach(box => {
        const { latitude, longitude } = box.location
        const typeBox = box.phys[0].type === 'SUB6_ACCESS' ? 'wifi' : 'LTE'
        const locationExistsOnMarkers = markers.find((marker) =>
          marker.location.latitude === latitude &&
          marker.location.longitude === longitude
        )

        if (locationExistsOnMarkers) {
          if (locationExistsOnMarkers.location.resources[typeBox]) {
            locationExistsOnMarkers.location.resources[typeBox].push({
              id: box.id,
              name: box.name,
              physical: [...box.phys],
              info: box.location.info,
              ranId : ran.id
            })
          } else {
            locationExistsOnMarkers.location.resources[typeBox] = {
              id: box.id,
              name: box.name,
              physical: [...box.phys],
              info: box.location.info,
              ranId : ran.id
            }
          }
        } else {
          markers.push({
            location: {
              latitude: box.location.latitude,
              longitude: box.location.longitude,
              resources: {
                [typeBox]: {
                  id: box.id,
                  name: box.name,
                  physical: [...box.phys],
                  info: box.location.info,
                  ranId : ran.id
                }
              },
              isWifi: box.phys[0].type === 'SUB6_ACCESS' ? true : false,
              isLTE: box.phys[0].type === 'LTE_PRIMARY_PLMN' ? true : false
            }
          })
        }
      })
    })
  }

  compareComputes()
  compareNetworks()
  compareRAN()
  compareChunketeTopology()
  return markers
}

export const CreateAllLinks = rans => {
  const links = []

  if (!rans) {
    return links
  }

  rans.length > 0 && rans.forEach(ran => {
    const { latitude, longitude } = ran.location
    ran.chunketeTopology && ran.chunketeTopology.boxes.forEach(chunkete => {
      links.push({
        id: ran.id,
        coordinates: {
          source: [chunkete.location.longitude, chunkete.location.latitude],
          target: [longitude, latitude]
        }
      })
    })
  })
  return links
}

