/**
 * ModalCreateLinkComposer Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import filter from 'lodash/filter'

export const createFormFunction = (link, key) => {
  const object = {}
  const options = []
  const nodeType = link[key].type
  if (nodeType === 'vnf') {
    object.type = nodeType
    object.name = link[key].extra_info.name.replace('-', ' ')
    object.connection_name = link[`connection_name_${key}`] || null
    link[key].connection_point.forEach(point => {
      let select = false
      if (link.connection_point_select === point.name || point.isUsed) {
        select = true
      } else {
        select = false
      }

      options.push({
        id: point.id,
        name: `${point.name} ${point.isManagement ? '(Management)' : ''}`,
        value: point.requiredPort,
        disabled: select
      })
    })
    object.options = options
  } else if (nodeType === 'bridge') {
    object.type = nodeType
    object.name = 'Bridge'
    object.connection_name = link[`connection_name_${key}`] || null
    object.options = null
  } else if (nodeType === 'external') {
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
  const { nodes, links } = d3Data
  const findLink = links.find(link => link === selectLink)
  if (findLink) {
    const connectionPointSource = findLink.connection_point_source_selected
    const connectionPointTarget = findLink.connection_point_target_selected
    removeLastConnectionsPoints(connectionPointSource, connectionPointTarget, nodes)
    findLink.confirm = true
    findLink.connection_name_source = newData.name_connection_source && newData.name_connection_source.value
    findLink.connection_name_target = newData.name_connection_target && newData.name_connection_target.value
    findLink.connection_point_source_selected = newData.options_select_source && newData.options_select_source.value
    findLink.connection_point_target_selected = newData.options_select_target && newData.options_select_target.value
    findLink.link_name = newData.link_name.value
    if (findLink.virtual_switch) {
      const allLinks = filter(links, link => link.link_name === findLink.link_name)
      const findNode = nodes.find(node => node.virtual_switch_name === findLink.link_name)
      allLinks.forEach(link => (link.link_name = newData.link_name.value))
      if (findNode) {
        findNode.virtual_switch_name = newData.link_name.value
      } else {
        findLink.target.virtual_switch_name = newData.link_name.value
        const node = nodes.find(node => node.id === findLink.target.id)
        node.virtual_switch_name = newData.link_name.value
      }
    }
    if (newData.required_ports) {
      const requiredPorts = []
      newData.required_ports.array.forEach(item =>
      requiredPorts.push(item.value)
    )
      findLink.required_ports = requiredPorts
    }
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

/**
 * Delete inputs from Form
 * @param {object} linkSelect
 * @param {object} form
 */
export const createForm = (linkSelect, form) => {
  let resultForm = form
  if (linkSelect) {
    const source = linkSelect.source.type
    const target = linkSelect.target.type
    if (source === 'vnf' && target === 'external') {
      delete resultForm.options_select_target
    } else if (source === 'external' && target === 'vnf') {
      delete resultForm.options_select_source
    } else if (source === 'bridge' && target === 'vnf') {
      delete resultForm.required_ports
      delete resultForm.name_connection_source
      delete resultForm.options_select_source
    } else if (source === 'vnf' && target === 'bridge') {
      delete resultForm.required_ports
      delete resultForm.name_connection_target
      delete resultForm.options_select_target
    } else if (source === 'vnf' && target === 'vnf') {
      delete resultForm.required_ports
    } else if (source === 'vnf' && target === 'vs') {
      delete resultForm.required_ports
      delete resultForm.name_connection_target
      delete resultForm.options_select_target
    } else if (source === 'external' && target === 'vs') {
      delete resultForm.name_connection_target
      delete resultForm.options_select_target
      delete resultForm.options_select_source
    } else if (source === 'external' && target === 'bridge') {
      delete resultForm.name_connection_target
      delete resultForm.options_select_target
      delete resultForm.options_select_source
    } else if (source === 'bridge' && target === 'external') {
      delete resultForm.name_connection_source
      delete resultForm.options_select_source
      delete resultForm.options_select_target
    }
  }
  return resultForm
}
