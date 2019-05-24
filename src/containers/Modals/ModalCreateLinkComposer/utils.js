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
   if (nodeType === 'vnf'){
    object.type = nodeType
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
  } else if(nodeType === 'bridge') {
    object.type = nodeType
    object.name = 'Bridge'
    object.connection_name = link[`connection_name_${key}`] || null
    object.options = null

  } else if(nodeType === 'external'){
    object.type = nodeType
    object.name = 'External'
    object.connection_name = link[`connection_name_${key}`] || null
    object.required_ports = link.required_ports
    object.options = null
  } else if (nodeType === 'vs' && key === 'target') {
    object.type = 'vs'
    object.name = 'Virtual Switch'
  }

  return object
}

export const changeLinkProperties = (selectLink, d3Data, newData) => {
  const {nodes, links } = d3Data
  const findLink = links.find(link => link === selectLink)
  if(findLink) {
    const connection_point_source = findLink.connection_point_source_selected
    const connection_point_target = findLink.connection_point_target_selected
    removeLastConnectionsPoints(connection_point_source, connection_point_target, nodes)
    findLink.confirm = true
    findLink.connection_name_source = newData.name_connection_source && newData.name_connection_source.value
    findLink.connection_name_target = newData.name_connection_target && newData.name_connection_target.value
    findLink.connection_point_source_selected = newData.options_select_source && newData.options_select_source.value
    findLink.connection_point_target_selected = newData.options_select_target && newData.options_select_target.value
    findLink.link_name = newData.link_name.value
    if (findLink.virtual_switch) {
      const allLinks = filter(links, link => link.link_name === findLink.link_name)
      const findNode = nodes.find(node => node.virtual_switch_name === findLink.link_name)
      allLinks.forEach( link => link.link_name = newData.link_name.value )
      if(findNode) {
        findNode.virtual_switch_name = newData.link_name.value
      } else {
        findLink.target.virtual_switch_name = newData.link_name.value
        const node = nodes.find(node => node.id  === findLink.target.id)
        node.virtual_switch_name = newData.link_name.value
      }
    }
    findLink.required_ports =  newData.required_ports && newData.required_ports.array
    addNewConnectionsPoints(newData.options_select_source && newData.options_select_source.value, newData.options_select_target && newData.options_select_target.value, nodes, findLink.id)
    }

  return {nodes: nodes, links: links}
}


const removeLastConnectionsPoints = (source, target, nodes) => {
  nodes.forEach(node => {
    const connectionPoints = filter(node.connection_point, connect => connect.requiredPort === source || connect.requiredPort === target)
    connectionPoints.forEach(connection => {
      connection.isUsed = false
      connection.link_id = null
    })
  })
}

const addNewConnectionsPoints = (source, target, nodes, linkId) => {
  nodes.forEach(node => {
    const connectionPoints = filter(node.connection_point, connect => connect.requiredPort === source || connect.requiredPort === target)
    connectionPoints.forEach(connection => {
      connection.isUsed = true
      connection.link_id = linkId
    })
  })
}

export const createForm = (linkSelect, form) => {
  let resultForm = form
  if(linkSelect) {
    switch (linkSelect.source.type) {
      case 'vnf':
        delete resultForm.required_ports
      break
      case 'bridge':
        delete resultForm.required_ports
        delete resultForm.name_connection_source
        delete resultForm.options_select_source
      break
      default:
        delete resultForm.options_select_source
      break
    }
    switch (linkSelect.target.type) {
      case 'vnf':
        delete resultForm.required_ports
      break
      case 'bridge':
        delete resultForm.required_ports
        delete resultForm.name_connection_target
        delete resultForm.options_select_target
      break
      case 'vs':
        delete resultForm.required_ports
        delete resultForm.name_connection_target
        delete resultForm.options_select_target
      break
      default:
        delete resultForm.options_select_target
        break
    }
  }
  return resultForm
}


