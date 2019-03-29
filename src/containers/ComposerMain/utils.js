/**
 * Visualisation Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { newBridgeNode, newExtrenalNode, newVNFNode} from './config_d3'
import { reject, filter } from 'lodash'

let idLink = 0
let idNode = 0
/**
 * Change to d3 links format
 * @param {array} ObjectD3
 * @param {service} service
 * @return {object} D3 Format
 **/
export const findLinkById = (d3Data, service, catalogue) => {
  const changeD3Data = {d3Data:{...d3Data}, newCatalogue :catalogue}
  const {links, nodes} = changeD3Data.d3Data
  service.link.forEach(link => {
    let source = false
    let lastId = null
    const linkLength = link.connectionPointNames.length
    const link_name = link.name
    switch (linkLength) {
      case 3:
      console.log('link as 3 connections points GOooood Luck')
      link.connectionPointNames.forEach(name => {
        const findConnection = service.connectionPoint.find(
          connection_point_service => connection_point_service.name  === name
        )
      })
      break
      case 2:
        link.connectionPointNames.forEach(name => {
          const findConnection = service.connectionPoint.find(connection_point_service => connection_point_service.name  === name)
          if(findConnection && findConnection.type === 'INTERNAL') {
            nodes && nodes.forEach(node => {
              if (node.type === "VNF") {
              const findConnectionPointNode = node.connection_point.find(point => point.id === findConnection.internalCpId)
              if(findConnectionPointNode) {
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

                  lastId = newIdLink
                  source = true
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
                  }
                }
              }
            }
            })
          } else if (findConnection && findConnection.type === 'EXTERNAL') {
            const findlink = links.find( link => link.id === lastId)
            if (findlink){
              const externalNode = newExtrenalNode()
              if (!source){
                findlink.source = {
                  id: newIdLink,
                  source: externalNode,
                  target: null,
                  sourcePosition: 'left',
                  targetPosition: randomPosition(),
                  confirm: true,
                  connection_point_source_selected: null,
                  link_name: link_name,
                  connection_name_source: name,
                  required_ports: findConnection.requiredPort,
                }
              } else {
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
              nodes.push(externalNode)
            }
          } else {
            console.error('Error')
            return {error: false, message: `Can't no find connection point to ${name}`}
          }
        })
    break;
    case 1:
    link.connectionPointNames.forEach(name => {
      const findConnection =service.connectionPoint.find(connection_point_service => connection_point_service.name  === name)
      if(findConnection) {
        nodes && nodes.forEach(node => {
          if (node.type === "VNF") {
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
              nodes.push(bridgeNode)
              source = false
          }
        }
      })
      }
    })
    break;
    default:
    break;
    }
  })
  return changeD3Data
}

/**
 * Add New Node
 * @param {string} type_node
 * @return {object} New d3 Node
 */
export const addNode = (node, catalogue) => {
  const newCatalogue = [...catalogue]
  switch(node.type) {
    case "start":
      return  { node: newBridgeNode(), newCatalogue: newCatalogue }
    case "stop":
      return  { node: newExtrenalNode(), newCatalogue: newCatalogue }
    default:
      const findCatalogue = newCatalogue.find(catalogueItem => catalogueItem.id === node.id)
      findCatalogue.disabled = true
      return  { node: newVNFNode(node), newCatalogue: newCatalogue }
  }
}

/**
 * @param {array} data
 * @param {array} catalogue
 * @return {object} New d3 Node
 */
export const transformToD3Object = (service, catalogue) => {
  let created3Object = {links:[], nodes:[]}
  let existCatalogue = [...catalogue]
  service.component.forEach( dataItem => {
   const match = existCatalogue.find(catalogueItem => catalogueItem.id === dataItem.componentId)
   if (match) {
    if (match.vnfdId) {
      match.disabled = true
      created3Object.nodes.push(newVNFNode(match))
    } else {
      created3Object.nodes.push({...match, type:'VNF'})
    }
   }
  })
  return findLinkById(created3Object, service, catalogue)
}
/**
 * Returns a random number between min (inclusive) and max (exclusive)
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
export const randomNumber = () => {
  const min = Math.ceil(20)
  const max = Math.floor(500)
  return Math.floor(Math.random() * (max - min + 1)) + min
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
export const removeNode = (selectNode, d3Data, catalogue) => {
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
    const findCatalogue = catalogue.find(catalogue => catalogue.id === selectNode.extra_info.id)
    if(findCatalogue) {
      findCatalogue.disabled = false
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
  return {newd3Data: d3Data, newCatalogue : catalogue}
}

export const createNewLink = (source, target, d3Data) => {
  const { links } = d3Data
  let newLink = {}
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
    target.optionSelect
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
    source[source.optionSelect].isLink = true;
    target[target.optionSelect].isLink = true;
  }
  return {newd3Data: d3Data, newLink: newLink }
}

const removeConnectionPoint = (source, target, node) => {
  const connectionPoints = filter(node.connection_point, connect => connect.requiredPort === source || connect.requiredPort === target)
  connectionPoints.forEach(connection => {
    connection.isUsed = false
  })
}
