/**
 * ModalCreateLinkComposer Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import { filter } from 'lodash'

export const createFormFunction = (link, key) => {
  const object = {}
  const options = []
  const nodeType = link[key].type

   if (nodeType === 'VNF'){
    object.type ="VNF"
    object.name = link[key].extra_info.name.replace('-',' ')
    object.connection_name = link[`connection_name_${key}`] || null

    link[key].connection_point.forEach(point => {
    let select = false
      if (link.connection_point_select === point.name || point.isUsed  ) {
        select = true
      } else {
        select = false
      }

      options.push({
        id: point.id,
        name: point.name,
        value: point.requiredPort,
        disabled: select,
      })
    })
    object.options = options
  } else if(nodeType === 'start') {
    object.type ="BRIDGE"
    object.name = 'Bridge'
    object.connection_name = link[`connection_name_${key}`] || null
    object.options = null

  } else if(nodeType === 'stop'){
    object.type ="EXTERNAL"
    object.name = 'External'
    object.connection_name = link[`connection_name_${key}`] || null
    object.required_ports = link.required_ports
    object.options = null
  }

  return object
}

export const createLink = (selectLink, d3Data, newData) => {
  const {nodes, links } = d3Data
  const findLink = links.find(link => link === selectLink)

  if(findLink) {
    const connection_point_source = findLink.connection_point_source_selected
    const connection_point_target = findLink.connection_point_source_selected
    removeLastConnectionsPoints(connection_point_source, connection_point_target, nodes)
    findLink.confirm = true
    findLink.connection_name_source = newData.name_connection_source
    findLink.connection_name_target = newData.name_connection_target
    findLink.connection_point_source_selected = newData.options_select_source
    findLink.connection_point_target_selected = newData.options_select_target
    findLink.link_name = newData.link_name
    findLink.required_ports = newData.required_ports
    addNewConnectionsPoints(newData.options_select_source, newData.options_select_target, nodes)
    }

  return {nodes: nodes, links: links}
}


const removeLastConnectionsPoints = (source, target, nodes) => {
  nodes.forEach(node => {
    const connectionPoints = filter(node.connection_point, connect => connect.requiredPort === source || connect.requiredPort === target)
    connectionPoints.forEach(connection => {
      connection.isUsed = false
    })
  })
}

const addNewConnectionsPoints = (source, target, nodes) => {
  nodes.forEach(node => {
    const connectionPoints = filter(node.connection_point, connect => connect.requiredPort === source || connect.requiredPort === target)
    connectionPoints.forEach(connection => {
      connection.isUsed = true
    })
  })
}
