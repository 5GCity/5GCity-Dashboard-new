/**
 * ModalConfigurationSliceList Container Utils
 * Please write a description
 *
 */

export const VerifyChunks = chunks => {
  let hasWifi = false
  let hasLTE = false
  chunks[0].topology.physicalInterfaceList.forEach(phy => {
    if (phy.type === 'LTE_PRIMARY_PLMN') {
      hasLTE = true
    }
    if (phy.type === 'SUB6_ACCESS') {
      hasWifi = true
    }
  })

  if (hasWifi && hasLTE) {
    return 'all'
  } else if (hasWifi) {
    return 'wifi'
  } else if (hasLTE) {
    return 'lte'
  }
}
