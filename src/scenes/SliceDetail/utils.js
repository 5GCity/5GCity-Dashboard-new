/**
 * SliceDetail Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
export const createSlice = resources => {
  const markers = []
  const networkLocation = []

  if (!resources) {
    return markers
  }

  const computeLocation = resources.chunks.openstackProjects.map((compute) =>
    compute
  )

  resources.chunks.openstackVlans.forEach((network) => {
    if (network.physicalNetwork) {
      networkLocation.push({
        ...network
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

      const findNetwork = networkLocation[0]
      if (findNetwork && locationExistsOnMarkers) {
        locationExistsOnMarkers.location.resources.computes.push({
          id: compute.id,
          name: compute.name,
          computeData: {...compute.requirements},
          ischecked: false
        })
      } else if (!findNetwork && locationExistsOnMarkers) {
        locationExistsOnMarkers.location.resources.computes.push({
          id: compute.id,
          name: compute.name,
          computeData: {...compute.requirements},
          ischecked: false
        })
      } else if (findNetwork && !locationExistsOnMarkers) {
        markers.push({
          location: {
            latitude: latitude,
            longitude: longitude,
            resources: {
              computes: [{
                id: compute.id,
                name: compute.name,
                computeData: {...compute.requirements},
                ischecked: false
              }],
              network: {
                id: findNetwork.id,
                name: findNetwork.name,
                networkData: { ...findNetwork.physicalNetworkData }
              }
            }
          }
        })
      } else if (!findNetwork && !locationExistsOnMarkers) {
        markers.push({
          location: {
            latitude: latitude,
            longitude: longitude,
            resources: {
              computes: [{
                id: compute.id,
                name: compute.name,
                computeData: {...compute.requirements},
                ischecked: false
              }]
            }
          }
        })
      }
    })
  }

  compareComputes()

  return ({
    'name': resources.name,
    'markers': markers
  })
}

export const CreateSliceChunk = list => {
  const chunk = list.chunk
  const slice = list.slice
  const boxes = list.boxes

  // 1º Create Compute and networks
  const markerObject = createSlice(chunk)
  // Add Chunkete
  const boxesChoose = []
  slice.chunks.chunketeChunks.forEach(chunkete => {
    chunkete.topology.physicalInterfaceList.forEach(phy => {
      let phyId = phy.id
      boxes.forEach(box => {
        const find = box.phys.find(phy => phy.id === phyId)
        if (find) {
          boxesChoose.push({
            location: {
              latitude: box.location.latitude,
              longitude: box.location.longitude
            },
            boxName: box.name,
            boxId: box.id,
            boxInfo: box.location.info,
            phys: [{
              id: find.id,
              name: find.name,
              type: find.type,
              config: find.config
            }]
          })
        }
      })
    })
  })
    // Create Object box
  boxesChoose.length > 0 && boxesChoose.forEach(box => {
    const { latitude, longitude } = box.location

    const locationExistsOnMarkers = markerObject.markers.find((marker) =>
        marker.location.latitude === latitude &&
        marker.location.longitude === longitude
      )
    const typePhy = box.phys[0].type === 'SUB6_ACCESS' ? 'wifi' : 'LTE'
    if (locationExistsOnMarkers) {
      if (locationExistsOnMarkers.location.resources[typePhy]) {
        locationExistsOnMarkers.location.resources[typePhy][0].physical.push(...box.phys)
      }
    } else {
      markerObject.markers.push({
        location: {
          latitude: box.location.latitude,
          longitude: box.location.longitude,
          resources: {
            [typePhy]: [{
              info: box.boxInfo,
              id: box.boxId,
              name: box.boxName,
              physical: [...box.phys]
            }]
          }
        }
      })
    }
  })

  console.log('markerObject', markerObject)

  return markerObject
}
