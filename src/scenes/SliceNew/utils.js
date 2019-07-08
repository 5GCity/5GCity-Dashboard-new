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
          id: compute.id ,
          name: compute.name,
          computeData: {...compute.computeData.quota},
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
                  computeData: {...compute.computeData.quota},
                  ischecked:false
                }]
              },
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
            networkData: {...network.physicalNetworkData},
            ischecked:false
          })
        } else {
          locationExistsOnMarkers.location.resources.networks = [{
              id: network.id ,
              name: network.name,
              networkData: {...network.physicalNetworkData},
              ischecked:false
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
                  networkData: {...network.physicalNetworkData},
                  ischecked:false
                }],
              },
          }
        })
      }
    })
  }


  compareComputes()
  compareNetworks()
  console.log(markers)
  return markers
}
