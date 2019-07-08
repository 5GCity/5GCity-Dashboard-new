import { addNewNode, randomXY } from '../SDKContainer/utils'

export const GLOBAL_VALUES = {
  VNF:{w: 125, h: 122, type: 'vnf'},
  BRIDGE:{ w:32, h:32, color: '#8CC14E', max_conections: 1, type: 'bridge', icon_size: 50 },
  EXTERNAL:{ w:32, h:32, color: '#D84F4F', max_conections: 1, type: 'external', icon_size: 10 },
  VS: { w:40, h:40, color:'#006BB7', type:'vs', icon_size: 350, max_conections: 1 }
}

const NODE_TYPE ={
  VNF: {
    w: GLOBAL_VALUES.VNF.w,
    h: GLOBAL_VALUES.VNF.h,
    fill: "#879195",
    border: 10,
    circle_color: "#B8D0DF",
    circle_text_color: "#006bb7",
    type: GLOBAL_VALUES.VNF.type,
    left: {
      x: 0,
      y: GLOBAL_VALUES.VNF.h / 2,
      isLink: false,
    },
    right: {
      x: GLOBAL_VALUES.VNF.w,
      y: GLOBAL_VALUES.VNF.h / 2,
      isLink: false
    },
    top: {
      x: GLOBAL_VALUES.VNF.w / 2 ,
      y: 0,
      isLink: false
    },
    bottom: {
      x: GLOBAL_VALUES.VNF.w / 2 ,
      y: GLOBAL_VALUES.VNF.h,
      isLink: false
    },
  },
  MEC: {
    w: GLOBAL_VALUES.VNF.w,
    h: GLOBAL_VALUES.VNF.h,
    fill: "#879195",
    border: 10,
    circle_color: "#cdb5d3",
    circle_text_color: "#a900b8",
    left: {
      x: 0,
      y: GLOBAL_VALUES.VNF.h / 2,
      isLink: false,
    },
    right: {
      x: GLOBAL_VALUES.VNF.w,
      y: GLOBAL_VALUES.VNF.h / 2,
      isLink: false
    },
    top: {
      x: GLOBAL_VALUES.VNF.w / 2 ,
      y: 0,
      isLink: false
    },
    bottom: {
      x: GLOBAL_VALUES.VNF.w / 2 ,
      y: GLOBAL_VALUES.VNF.h,
      isLink: false
    },
  },
}

export const newBridgeNode = () => {
  const position = randomXY()
 return {
    max_conections: GLOBAL_VALUES.EXTERNAL.max_conections,
    fill: GLOBAL_VALUES.BRIDGE.color,
    w: GLOBAL_VALUES.BRIDGE.w,
    h: GLOBAL_VALUES.BRIDGE.h,
    border: 5,
    type: GLOBAL_VALUES.BRIDGE.type,
    right: {
      x: GLOBAL_VALUES.BRIDGE.w,
      y: GLOBAL_VALUES.BRIDGE.h / 2,
      isLink: false
    },
    id: addNewNode(),
    ...position,
    array_link: ['right']
  }
}

export const newExtrenalNode = () => {
  const position = randomXY()
  return {
      max_conections: GLOBAL_VALUES.EXTERNAL.max_conections,
      fill: GLOBAL_VALUES.EXTERNAL.color,
      w: GLOBAL_VALUES.EXTERNAL.w,
      h: GLOBAL_VALUES.EXTERNAL.h,
      border: 5,
      type: GLOBAL_VALUES.EXTERNAL.type,
      left: {
        x: 0,
        y: GLOBAL_VALUES.EXTERNAL.h / 2,
        isLink: false,
      },
      id: addNewNode(),
      array_link: ['left'],
      ...position
    }
}

export const newVirtualSwtichNode = (link_name) => {
  const position = randomXY()
  return {
    max_conections: GLOBAL_VALUES.VS.max_conections,
    fill: GLOBAL_VALUES.VS.color,
    w: GLOBAL_VALUES.VS.w,
    h: GLOBAL_VALUES.VS.h,
    border: 5,
    type: GLOBAL_VALUES.VS.type,
    virtual_switch_name: link_name,
    id: addNewNode(),
    ...position,
    right:{
      x: GLOBAL_VALUES.VS.w / 2,
      y: GLOBAL_VALUES.VS.h / 2,
      isLink: null,
    },
    array_link: ['right']
  }
}

export const newVNFNode = (nodeInfo, mapping_expression) => {
  const arrayExpression = mapping_expression  === undefined ? [undefined] : mapping_expression
  const position = Position(nodeInfo.connectionPoints.length)
  const XY = randomXY()
  return {
    ...NODE_TYPE.VNF,
    id: addNewNode(),
    ...XY,
    extra_info: {
      version: nodeInfo.version,
      name: nodeInfo.name,
      vendor: nodeInfo.vendor,
      description: nodeInfo.description,
      vnfd_id: nodeInfo.vnfdId,
      vnfd_version: nodeInfo.vnfdVersion,
      id: nodeInfo.id,
      parameter:[...nodeInfo.parameters],
    },
    mapping_expression: arrayExpression,
    connection_point:[...nodeInfo.connectionPoints],
    max_connections: nodeInfo.connectionPoints.length,
    circle_text: nodeInfo.vnfdId && "VNF",
    array_link: position.array_link,
    ...position.links,
  }
}

export const CONFIG_D3 = {
  zoom: { min_zoom: 0.2, max_zoom: 3 },
  margin: { top: -5, right: -5, bottom: -5, left: -5 }
}

export const CONFIG_NODE = {
  color: "rgba(55,71,79,1)",
  stroke: "rgba(239,242,247,1)",
  r: 5,
  stroke_width: 2
}


export const Position = length => {
    switch (length) {
      case 1:
        return {
          links: {
            right: {
              x: NODE_TYPE.VNF.w,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            }
          },
        array_link: ['right']
        }

        case 2:
        return {
          links:{
            right: {
              x: NODE_TYPE.VNF.w,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            },
            left: {
              x: 0,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            }
          },
          array_link: ['right','left']
        }

        case 3:
        return {
          links: {
            right: {
              x: NODE_TYPE.VNF.w,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            },
            left: {
              x: 0,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            },
            bottom: {
              x: NODE_TYPE.VNF.w / 2,
              y: NODE_TYPE.VNF.h,
              isLink: false,
            }
          },
          array_link: ['right','left', 'bottom']
        }
        case 4:
        return {
          links: {
            right: {
              x: NODE_TYPE.VNF.w,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            },
            left: {
              x: 0,
              y: NODE_TYPE.VNF.h / 2,
              isLink: false,
            },
            bottom: {
              x: NODE_TYPE.VNF.w / 2,
              y: NODE_TYPE.VNF.h,
              isLink: false,
            },
            top: {
              x: NODE_TYPE.VNF.w / 2,
              y: 0,
              isLink: false
            }
          },
          array_link: ['right','left', 'bottom','top']
        }


      default:
        break;
    }
}

/**
 * Return is Possible link the nodes
 * @param {object} source node source
 * @param {object} target node target
 * @return {boolean}
 */
export const verifyCanLink = (source, target) => {
  if(source.type === 'vs'){
    const lastTarget = target
    const lastSource = source
     source = Object.assign({}, lastTarget)
     target = Object.assign({}, lastSource)
   }
  if(source.type === 'vs' && target.type === 'vs'){
    return false
  } else if (source.type === 'bridge' && target.type === 'vs') {
    return false
  } else {
    return true
  }
}
