/**
 * SliceDetail Container Utils
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
export const createSlice = (resources) => {
const markers = []
let computeLocation = resources && resources.chunks.openstackProjects.map((compute) => compute.compute )
let networkLocation = resources && resources.chunks.openstackVlans.map((network) => network.physicalNetwork )
const compareComputes = (computeLocation) => {
  computeLocation && computeLocation.forEach((compute) => {
    let found = false
    markers.find((el) => {
       if(el.location.latitude === compute.location.latitude && el.location.longitude === compute.location.longitude){
        found = true
       return el.location.resources.computes.push({id: compute.id , name: compute.name})
       }
     })
    if(!found){
      markers.push({location:{latitude:compute.location.latitude,longitude: compute.location.longitude,resources:{computes:[{id: compute.id , name: compute.name}]}}})
    }
  });
  return markers
}
const compareNetworks = (networkLocation) => {
  networkLocation && networkLocation.forEach((network) => {
    let found = false
    markers.find((el) => { 
       if(el.location.latitude === network.location.latitude && el.location.longitude === network.location.longitude){
        if(el.location.resources.networks == null){
          found = true
          return  el.location.resources.networks = [{id: network.id , name: network.name}]
        }else{
          found = true
          return  el.location.resources.networks.push({id: network.id , name: network.name})
        }
       }
     })
    if(!found){
      markers.push({location:{latitude:network.location.latitude,longitude: network.location.longitude,resources:{networks:[{id: network.id , name: network.name}]}}})
    }
  });
  return markers
}

compareComputes(computeLocation)
compareNetworks(networkLocation) 
  const findCompute = resources.name.toLowerCase().includes("compute");
  if(!findCompute){
    markers.push({location:{'latitude': 48.235146, 'longitude': 16.412469, 'resources':{hotspots:[{ "channel": 44,
    "dhcpd_ip": "192.168.101.1",
    "dns_ip": "192.168.101.2",
    "id": "5b6308c258f568073093f703",
    "name": "VAP461",}]}}})
  }
return resources && ({ 
"name": resources.name,
"markers": markers
})
}