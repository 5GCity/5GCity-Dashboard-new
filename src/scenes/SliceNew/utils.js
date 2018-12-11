/**
 * SliceNew Container Utils
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */


export const createAllPins = (resources) =>{
const markers = []
const compareComputes = () => {
 resources && resources.computes.map((compute) => {
   let found = false
    markers.find((el) => {
      if(el.location.latitude === compute.location.latitude && el.location.longitude === compute.location.longitude){
       found = true
       return el.location.resources.computes.push({id: compute.id , name: compute.name, ischecked:false})
      }
    })
   if(!found){
    return markers.push({location:{'latitude':compute.location.latitude ,'longitude': compute.location.longitude ,'resources':{computes:[{id: compute.id , name: compute.name, ischecked:false}]}}})
   }
 });
 return markers
}
const compareNetworks = () => {
 resources && resources.networks.map((network) => {
   let found = false
   markers.find((el) => { 
      if(el.location.latitude === network.location.latitude && el.location.longitude === network.location.longitude){
       if(el.location.resources.networks == null){
         el.location.resources.networks = [{id: network.id , name: network.name, ischecked:false, cidr:"", tag: ""}]
       }else{
       el.location.resources.networks.push({id: network.id , name: network.name, ischecked:false, cidr:"", tag: ""})
       }
       found = true
      }
    })
   if(!found){
     markers.push({location:{latitude:network.location.latitude,longitude: network.location.longitude,resources:{networks:[{id: network.id , name: network.name, ischecked:false, cidr:"", tag: ""}]}}})
   }
 });
 return markers
}

markers.push({location:{'latitude': 48.235146, 'longitude': 16.412469, 'resources':{hotspots:[{id:'5be191a0d306de66cec16f92' , name:'SDNAP', ischecked:false}]}}})

compareComputes()
compareNetworks() 

return markers 
}
