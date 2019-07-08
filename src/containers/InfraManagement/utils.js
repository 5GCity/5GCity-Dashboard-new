/**
 * infraManagement Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */


export const AddResource = (location, resources) => {
  const array = [...resources]
  array.push({
    location: {
      latitude: location[1],
      longitude: location[0],
      resources: { }
    }
  })

  return array
}

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
              },
              isCompute: true,
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
        locationExistsOnMarkers.location.isNetwork = true
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
                }],
              },
              isNetwork: true,
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

      if(locationExistsOnMarkers) {
        locationExistsOnMarkers.location.isRAN = true
        if(locationExistsOnMarkers.location.resources.rans) {
          locationExistsOnMarkers.location.resources.rans.push({
            id: ran.id ,
            name: ran.name,
            controller_url:ran.ranInfrastructureData.controllerUrl,
            username: ran.ranInfrastructureData.username,
            password: ran.ranInfrastructureData.password
          })
        } else {
          locationExistsOnMarkers.location.resources.rans = [{
              id: ran.id ,
              name: ran.name,
              controller_url:ran.ranInfrastructureData.controllerUrl,
              username: ran.ranInfrastructureData.username,
              password: ran.ranInfrastructureData.password
          }]
      }
      } else {
        markers.push({
          location:{
            latitude:ran.location.latitude,
            longitude: ran.location.longitude,
              resources:{
                rans:[{
                  id: ran.id ,
                  name: ran.name,
                  controller_url:ran.ranInfrastructureData.controllerUrl,
                  username: ran.ranInfrastructureData.username,
                  password: ran.ranInfrastructureData.password,
                }],
              },
              isRAN: true,
          }
        })
      }
    })
  }

  compareComputes()
  compareNetworks()
  compareRAN()
  return markers
}

/* export const CreateControllersSelect = controllers => {
  const array = []
  controllers.forEach(controller => {
    array.push({
      value: controller.id,
      name: controller.name,
    })
  })
  return array
} */

/* export const CreateAllLinks = rans => {
  const links = []

  if (!rans) {
    return links
  }

  rans.length > 0 && rans.forEach(ran => {
    const { latitude, longitude } = ran.location
    ran.chunketeTopology.boxes.forEach(chunkete => {
      links.push({
        id: ran.id,
        type: 'MultiLineString',
        coordinates: [
          [chunkete.location.longitude, chunkete.location.latitude],
          [longitude, latitude]
        ]
      })
    })
  })
  return links
} */
