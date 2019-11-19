/**
 * sdk Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import {
  newBridgeNode,
  newExtrenalNode,
  newVNFNode,
  newVirtualSwitchNode
} from '../SDKContainer/config_d3'
import { reject, filter, cloneDeep } from 'lodash'

export const NEW_SERVICE = {
  name: null,
  version: null,
  designer: null,
  parameters: [],
  license: {
      type: null,
      url: null,
  },
  link: [],
  component: [],
  connectionPoints: [],
  l3Connectivity: [ ],
  metadata: { },
  intMonitoringParameters: [],
  extMonitoringParameters: [],
  accessLevel: 0,
  actions: [],
  actionRules: [],
  visibility: "PUBLIC",
  ownerId: "ubiwhere",
}

export const NEW_SERVICE_FORM = {
  name: null,
  version: null,
  designer: null,
  parameters: [],
  license: {
      type: null,
      url: null,
  },
  link: [],
  component: [],
  connectionPoints: [],
  l3Connectivity: [ ],
  metadata: { },
  intMonitoringParameters: [],
  extMonitoringParameters: [],
  accessLevel: 0,
  actions: [],
  actionRules: [],
  visibility: "PUBLIC",
  ownerId: "ubiwhere",
}

let idLink = 0
let idNode = 0
let idError = 0
/**
 * Change to d3 links format
 * @param {array} ObjectD3
 * @param {service} service
 * @return {object} D3 Format
 **/
export const findLinkById = (nodes, service) => {
  // 1º Por cada service verificar verificar os links
  const links = []
  const arrayNodes = cloneDeep(nodes)
  service.link.forEach(link => {
    let source = false
    let lastId = null
    const linkLength = link.connectionPointNames.length
    const link_name = link.name
    let linkIsCreate = false
    switch (linkLength) {
    case 2:
      link.connectionPointNames.forEach(name => {
        let findNode = false
        const findConnection = service.connectionPoints.find(connection_point_service => connection_point_service.name  === name)
        if(findConnection && findConnection.cpType === 'INTERNAL') {
          if (!findNode) {
            arrayNodes && arrayNodes.forEach(node => {
              if (node.type === 'vnf' && node.extra_info.componentIndex === findConnection.componentIndex) {
                const arrayofConnectionPoints = node.connection_point
                const findConnectionPointNode = arrayofConnectionPoints.find(point => point.id === findConnection.internalCpId)
                if(findConnectionPointNode  && !linkIsCreate && node.connections < node.initial_connections) {
                  node.connections++
                  findConnectionPointNode.isUsed = true
                  if(!source) {
                    const newIdLink = addNewLink()
                    links.push({
                      id: newIdLink,
                      source: node,
                      target: null,
                      sourcePosition: randomPosition(node),
                      confirm: true,
                      connection_point_source_selected: findConnectionPointNode.requiredPort,
                      link_name: link_name,
                      connection_name_source: name,
                    })
                    findConnectionPointNode.link_id = newIdLink
                    lastId = newIdLink
                    source = true
                    findNode = true
                  } else {
                    const linkTarget = links.find(link => link.id === lastId)
                    if (linkTarget) {
                      linkTarget.target = node
                      linkTarget.targetPosition = randomPosition(node)
                      linkTarget.connection_point_target_selected = findConnectionPointNode.requiredPort
                      linkTarget.source[linkTarget.sourcePosition].isLink = true
                      linkTarget.target[linkTarget.targetPosition].isLink = true
                      linkTarget.connection_name_target = name
                      source = false
                      const changeNode = nodes.find(
                        node => node.id === linkTarget.source.id || node.id === linkTarget.target.id
                      )
                      if (changeNode) {
                        changeNode[linkTarget.targetPosition].isLink = true
                      }
                      findConnectionPointNode.link_id = linkTarget.id
                      linkIsCreate = true
                      findNode = true
                    }
                  }
                }
              }
            })
          }
        } else if (findConnection && findConnection.cpType === 'EXTERNAL') {
          const externalNode = newExtrenalNode()
          if(!source) {
            const newIdLink = addNewLink()
            links.push({
              id: newIdLink,
              source: externalNode,
              target: null,
              sourcePosition: 'left',
              targetPosition: null,
              confirm: true,
              connection_point_source_selected: null,
              link_name: link_name,
              connection_name_source: name,
              required_ports: findConnection.requiredPort,
            })
            lastId = newIdLink
            source = true
          } else {
            const findlink = links.find( link => link.id === lastId)
            findlink.target = externalNode
            findlink.targetPosition = 'left'
            findlink.link_name = link_name
            findlink.connection_name_target = name
            findlink.required_ports = findConnection.requiredPort
            findlink.connection_point_target_selected = null
            findlink.source[findlink.sourcePosition].isLink = true
            findlink.target[findlink.targetPosition].isLink = true

            const changeNode = nodes.find(
              node => node.id === findlink.source.id || node.id === findlink.target.id
            )
            if (changeNode) {
              changeNode[findlink.sourcePosition].isLink = true
            }
            source = false
          }
          arrayNodes.push(externalNode)
        } else {
          console.error('Error')
          return {error: false, message: `Can not no find connection point to ${name}`}
        }
      })
    break;
    case 1:
      link.connectionPointNames.forEach(name => {
      const findConnection =service.connectionPoints.find(connection_point_service => connection_point_service.name  === name)
      if(findConnection) {
        arrayNodes && arrayNodes.forEach(node => {
          if (node.type === 'vnf') {
            const findConnectionPointNode = node.connection_point.find(point => point.id === findConnection.internalCpId)
            if (findConnectionPointNode) {
              findConnectionPointNode.isUsed = true
              const newIdLink = addNewLink()
              const bridgeNode = newBridgeNode()
              links.push({
                id: newIdLink,
                source: node,
                target: bridgeNode,
                sourcePosition: randomPosition(node),
                targetPosition: 'right',
                confirm: true,
                connection_point_source_selected : findConnectionPointNode.requiredPort,
                link_name: link_name,
                connection_name_source: name,
              })
              const linkTarget = links.find(link => link.id === newIdLink)
              linkTarget.connection_point_target_selected = null
              linkTarget.link_name = link_name
              linkTarget.connection_name_target = name
              linkTarget.source[linkTarget.sourcePosition].isLink = true
              linkTarget.target[linkTarget.targetPosition].isLink = true

              const changeNode = nodes.find( node => node.id === linkTarget.source.id || node.id === linkTarget.target.id )

              if (changeNode) {
                changeNode[linkTarget.sourcePosition].isLink = true
              }
              arrayNodes.push(bridgeNode)
              source = false
              findConnectionPointNode.link_id = linkTarget.id
          }
        }
      })
      }
    })
    break;
    default:
      const newVirtualSwitch = newVirtualSwitchNode(link_name)
      link.connectionPointNames.forEach(name => {
        const findConnection = service.connectionPoints.find(
          connection_point_service => connection_point_service.name  === name
        )
        if ( findConnection && findConnection.cpType === 'INTERNAL') {
          arrayNodes && arrayNodes.forEach(node => {
            if (node.type === 'vnf') {
            const findConnectionPointNode = node.connection_point.find(point =>
              point.id === findConnection.internalCpId)
              if(findConnectionPointNode) {
                if (node.type === 'vnf') {
                  const newIdLink = addNewLink()
                  links.push({
                    id: newIdLink,
                    source: node,
                    target: newVirtualSwitch,
                    sourcePosition: randomPosition(node),
                    connection_point_source_selected: findConnectionPointNode.requiredPort,
                    confirm: true,
                    targetPosition: 'right',
                    link_name: link_name,
                    virtual_switch: true,
                    connection_name_source: name,
                  })
                  findConnectionPointNode.link_id = newIdLink
                  findConnectionPointNode.isUsed = true
                  const findLink = links.find(link => link.id === newIdLink)
                  node[findLink.sourcePosition].isLink = true
                }
              }
            }
         })
        } else if (findConnection && findConnection.cpType === 'EXTERNAL') {
            const newIdLink = addNewLink()
            const externalNode = newExtrenalNode()
            links.push({
              id: newIdLink,
              source: externalNode,
              target: newVirtualSwitch,
              sourcePosition: 'left',
              targetPosition: 'right',
              confirm: true,
              link_name: link_name,
              virtual_switch: true,
            })
            const findLink = links.find(link => link.id === newIdLink)
            node[findLink.sourcePosition].isLink = true
        }
      })
      arrayNodes.push(newVirtualSwitch)
    break;
    }
  })
  return {nodes: arrayNodes, links: links}
}


/**
 * Add New Node
 * @param {object} node
 * @return {object} New d3 Node
 */
export const addNode = node => {
  const infoNode = cloneDeep(node)
  switch(infoNode.type) {
    case 'bridge':
      return newBridgeNode()
    case 'external':
      return newExtrenalNode()
    case 'vs':
      return newVirtualSwitchNode(null)
    default:
      return newVNFNode(infoNode)
  }
}

/**
 * @param {array} data
 * @param {array} catalogue
 * @return {object} New d3 Node
 */
export const transformToD3Object = (service, catalogue) => {
  let createNodeD3 = []
  let existCatalogue = catalogue
  service.component.forEach( dataService => {
   const match = existCatalogue.find(catalogueItem => catalogueItem.id === dataService.componentId)
   if (match) {
    if (match.vnfdId) {
      const mapping_expression = dataService.mappingExpressions
      const componentIndex = dataService.componentIndex
      const initialServiceConnections = service.connectionPoints.filter(point => point.componentIndex === componentIndex).length
      createNodeD3.push(cloneDeep(newVNFNode(match, mapping_expression, componentIndex, initialServiceConnections)))
    } else {
      createNodeD3.push({...match, type:'vnf'})
    }
   }
  })
  return findLinkById(createNodeD3, service)
}

/**
 * @param {object} Node
 * Returns a random position
 */
export const randomPosition = node => {
  if(!node.right.isLink) {
      return 'right'
  } else if (!node.left.isLink) {
      return 'left'
  } else if(!node.bottom.isLink) {
      return 'bottom'
  } else if(!node.top.isLink) {
      return 'top'
  }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const arrayOfPosition = []
export const randomXY = () => {
  const x = window.innerWidth - 500
  const y = window.innerHeight - 300
  const randomX = Math.floor(Math.random()*x)
  const randomY = Math.floor(Math.random()*y)
  if (arrayOfPosition.length === 0) {
    arrayOfPosition.push({x:randomX,y:randomY})
  }
  const findSamePosition = arrayOfPosition.find(position => position.x === randomX)
  if(findSamePosition){
    randomXY()
  } else {
    arrayOfPosition.push({x:randomX,y:randomY})
  }
  return { x:randomX, y:randomY }
}

/**
 * Returns link id to d3 object
 * @return {string} string id to link
 */
export const addNewLink = () => (
  `link${idLink++}`
)
/**
 * Returns node id to d3 object
 * @return {string} string id to node
 */
export const addNewNode = () => (
  `node${idNode++}`
)

const nodeId = node => {
  const item = Object.assign({}, node)
  const id = item.id.split("node")
  return id[1]
}

/**
 *
 * @param {object} selectLink Select Link
 * @param {object} d3Data d3 Data
 */
export const removeLink = (selectLink, d3Data) => {
  const newD3Data = Object.assign(d3Data, {})
  let { nodes, links } = newD3Data
  const connection_point_source = selectLink.connection_point_source_selected
  const connection_point_target = selectLink.connection_point_target_selected

  nodes.forEach(node => {
    if (node.id === selectLink.source.id) {
      node[selectLink.sourcePosition].isLink = false
      removeConnectionPoint(connection_point_source, connection_point_target, node)
    } else if (node.id === selectLink.target.id) {
      node[selectLink.targetPosition].isLink = false
      removeConnectionPoint(connection_point_source, connection_point_target, node)
    }
  })
  newD3Data.links = reject(links, link => link.id === selectLink.id)
  return newD3Data
}

/**
 *
 * @param {object} selectNode Node Select
 * @param {object} d3Data d3 Data
 * @param {object} catalogue Catalogue
 */
export const removeNode = (selectNode, d3Data) => {
  const { nodes, links } = d3Data
  nodes.splice(nodes.indexOf(selectNode), 1)
  // decrement connections on links
  const foundLinks = filter(links,
    link =>
      link.source.id === selectNode.id || link.target.id === selectNode.id
  )
  foundLinks.forEach(link => {
    let node = null
    if (link.source.id !== selectNode.id) {
      const id = link.source.id
      node = nodes.find(node => node.id === id)
      node[link.sourcePosition].isLink = false
    } else {
      const id = link.target.id
      node = nodes.find(node => node.id === id)
      node[link.targetPosition].isLink = false
    }
    const connection_point_source = link.connection_point_source_selected
    const connection_point_target = link.connection_point_target_selected
    removeConnectionPoint(connection_point_source, connection_point_target, node)
    removeConnectionPoint(connection_point_source, connection_point_target, selectNode)
  })

  const toSplice = links.filter(l => l.source === selectNode || l.target === selectNode)
  for (const link of toSplice) {
    links.splice(links.indexOf(link), 1)
  }
  return { newd3Data: d3Data }
}

export const createNewLink = (source, target, d3Data) => {
  const { links } = d3Data
  let newLink = {}
  if(source.type === 'vs'){
   const lastTarget = target
   const lastSource = source
    source = Object.assign({}, lastTarget)
    target = Object.assign({}, lastSource)
  }
  // add link to graph (update if exists)
  const source_exist = links.find(
    link =>
      (link.sourcePosition === source.optionSelect &&
        link.source.id === source.id) ||
      (link.targetPosition === source.optionSelect &&
        link.target.id === source.id)
  )
  const target_exist = links.find(
    link =>
      (link.sourcePosition === target.optionSelect &&
        link.source.id === target.id) ||
      (link.targetPosition === target.optionSelect &&
        link.target.id === target.id)
  )
  if (
    !source_exist &&
    !target_exist &&
    source.optionSelect &&
    target.optionSelect &&
    target.type !== 'vs'
  ) {
    const newId = addNewLink()
      newLink = {
      id: newId,
      source: source,
      target: target,
      sourcePosition: source.optionSelect,
      targetPosition: target.optionSelect,
      confirm: false,
      link_name: null,
      connection_name_source: null,
      connection_name_target: null,
      connection_point_target_selected: null,
      connection_point_source_selected: null,
    }
    links.push(newLink)
    source[source.optionSelect].isLink = true
    target[target.optionSelect].isLink = true
  } else if (target.type === 'vs') {
    const newId = addNewLink()
      newLink = {
      id: newId,
      source: source,
      target: target,
      sourcePosition: source.optionSelect,
      targetPosition: 'right',
      confirm: false,
      link_name: null,
      connection_name_source: null,
      connection_point_source_selected: null,
      virtual_switch: true,
    }
    links.push(newLink)
    source[source.optionSelect].isLink = true
  }
  return { newd3Data: d3Data, newLink: newLink }
}

const removeConnectionPoint = (source, target, node) => {
  const connectionPoints = filter(node.connection_point, connect =>
    connect.requiredPort === source || connect.requiredPort === target)
  connectionPoints.forEach(connection => {
    connection.isUsed = false
  })
}

export const transformToJSON = (service, d3Data) => {
  const object = { invalid: false, errors: [], composer:[] }
  const link = [], component = [], connection_point = []
  const {nodes, links} = d3Data
  nodes.forEach(node => {
    if (node.type === 'vnf') {
      const map_exp = node.mapping_expression[0] === undefined ? [] : node.mapping_expression
      component.push({
        componentId: node.extra_info.id,
        componentType: "SDK_FUNCTION",
        mappingExpressions: map_exp,
        componentIndex: nodeId(node)
      })
      verifyMappingExpression(node, object)
    }
  })

  links.forEach(item => {
    if (item.target.type === 'vs') {
      const findExsitLink =link.find(link => link.name === item.link_name)
      if(findExsitLink) {
        findExsitLink.connectionPointNames.push(item.connection_name_source)
      }else{
        link.push({
          name: item.link_name,
          connectionPointNames: [item.connection_name_source]
        })
        verifyLink(item, object, 'target' ,'vs')
      }
    }  else if(item.target.type === 'bridge' || item.source.type === 'bridge') {
      const connection_points = []
      item.connection_name_source && connection_points.push(item.connection_name_source)
        item.connection_name_target && connection_points.push(item.connection_name_target)
      link.push({
        name: item.link_name,
        connectionPointNames: connection_points
      })
    } else {
      link.push({
        name: item.link_name,
        connectionPointNames: [
          item.connection_name_source,
          item.connection_name_target && item.connection_name_target
        ],
      })
    }

    switch (item.source.type) {
      case 'vnf':
        const findCP = item.source.connection_point.find(connection => connection.link_id === item.id)
        if (findCP)
          connection_point.push({
            internalCpId: findCP.id,
            name: item.connection_name_source,
            requiredPort: item.required_ports,
            cpType: "INTERNAL",//findCP.cpType,
            componentIndex: nodeId(item.source)
          })
        verifyLink(item, object, 'source' ,'vnf')
      break;
      case 'external':
        connection_point.push({
          name: item.connection_name_source,
          requiredPort: item.required_ports,
          cpType: item.source.type.toUpperCase(),
          componentIndex: nodeId(item.source)
        })
        verifyLink(item, object, 'source' ,'external')
      break;
      default:
        break;
    }

    switch (item.target.type) {
      case 'external':
        connection_point.push({
          name: item.connection_name_target,
          requiredPort: item.required_ports,
          cpType: item.target.type.toUpperCase(),
          componentIndex: nodeId(item.target)
        })
      break;
      case 'vnf':
        const findCP = item.target.connection_point.find(connection => connection.link_id === item.id)
        if (findCP)
        connection_point.push({
          internalCpId: findCP.id,
          name: item.connection_name_target,
          requiredPort: item.required_ports,
          cpType: "INTERNAL",
          componentIndex: nodeId(item.target)
        })
        verifyLink(item, object, 'target' ,'vnf')
      break;

      default:
        break;
    }
  })

  object.composer = { ...service }
  object.composer.component = component
  object.composer.link = link
  object.composer.connectionPoints = connection_point
  verifyComposer(object.composer, object)
  return object
}

export const changeNode = (nodeSelect, d3Data) => {
  let newD3Data = {...d3Data}
  newD3Data.nodes.forEach(node => {
    if (node.id === nodeSelect.id) {
      node.mapping_expression = nodeSelect.mapping_expression
    }
  })
  newD3Data.links.forEach(link => {
    if (link.source.id === nodeSelect.id) {
      link.source.mapping_expression = nodeSelect.mapping_expression
    } else if (link.target.id === nodeSelect.id) {
      link.target.mapping_expression = nodeSelect.mapping_expression
    }
  })
  return newD3Data
}


const verifyMappingExpression = (node, object) => {
  if(node.extra_info.parameter)
  if (node.extra_info.parameter.length > 0) {
    node.mapping_expression.forEach(mapping => {
      if(typeof(mapping) !== 'string'){
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location: node.extra_info.name,
          description: 'Please input configure paramaters'
        })
      }
    })
  }
}

const verifyLink = (link, object, source, type) => {
    // Verify Name
    if (typeof(link.link_name) !== 'string') {
      object.invalid = true
      object.errors.push({
        id: idError++,
        type: 'danger',
        title:'Error',
        location: 'Link',
        description: 'Please input name on link'
      })
    }

    if (type === 'vnf' && source === 'source') {
      const node_name = link.source.extra_info.name
      // Verify connection Name source
      if(typeof(link.connection_name_source) !== 'string') {
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location: node_name,
          description: 'Please input connection name'
        })
      }
      // Verify connection Point source
      if(!Array.isArray(link.connection_point_source_selected)) {
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location: node_name ,
          description: 'Please input connection point'
        })
      }
    }
    if (type === 'external' && source === 'source') {
      const node_name = 'External'
      // Verify connection Point source
      if(typeof(link.connection_name_source) !== 'string') {
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location: node_name,
          description: 'Please input name on link'
        })
      }
    }
    // Verify connection Name target
    if (type === 'vnf' && source === 'target') {
      const node_name = link.target.extra_info.name
      if(typeof(link.connection_name_target) !== 'string') {
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location:node_name,
          description: 'Please input connection name'
        })
      }
      // Verify connection Point target
      if(!Array.isArray(link.connection_point_target_selected)) {
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location: node_name,
          description: 'Please input connection point'
        })
      }
    }
    if (type === 'external' && source === 'target') {
      const node_name = 'External'
        // Verify connection Name target
      if(typeof(link.connection_name_target) !== 'string') {
        object.invalid = true
        object.errors.push({
          id: idError++,
          type: 'danger',
          title:'Error',
          location: node_name,
          description: 'Please input name on link'
        })
      }
    }
}

const verifyComposer = (composer, object) => {
  if (typeof(composer.name) !== 'string') {
    object.invalid = true
    object.errors.push({
      id: idError++,
      type: 'danger',
      title:'Error Composer',
      location: 'Composer',
      description: 'Please input name'
    })
  }
  if (typeof(composer.version) !== 'string') {
    object.invalid = true
    object.errors.push({
      id: idError++,
      type: 'danger',
      title:'Error Composer',
      location: 'Composer',
      description: 'Please input version'
    })
  }
  if (typeof(composer.designer) !== 'string') {
    object.invalid = true
    object.errors.push({
      id: idError++,
      type: 'danger',
      title:'Error Composer',
      location: 'Composer',
      description: 'Please input designer'
    })
  }
  if (typeof(composer.license.type) !== 'string') {
    object.invalid = true
    object.errors.push({
      id: idError++,
      type: 'danger',
      title:'Error Composer',
      location: 'Composer',
      description: 'Please input type'
    })
  }
  if (typeof(composer.license.url) !== 'string') {
    object.invalid = true
    object.errors.push({
      id: idError++,
      type: 'danger',
      title:'Error Composer',
      location: 'Composer',
      description: 'Please input url'
    })
  }
}

export const Organizations = value => {
  const array = []
  value && value.forEach(organization => {
   array.push({ id:organization.id, value: organization.sliceId, name: organization.sliceId})
  })
  return array
}
