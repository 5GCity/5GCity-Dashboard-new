import { addNewNode, randomNumber } from './utils'

const NODE_TYPE ={
  VNF: {
    w: 125,
    h: 122,
    fill: "#879195",
    border: 10,
    circle_color: "#B8D0DF",
    circle_text_color: "#006bb7",
    type: "VNF",
    left: {
      x: 0,
      y: 122 / 2,
      isLink: false,
    },
    right: {
      x: 125,
      y: 122 / 2,
      isLink: false
    },
    top: {
      x: 125 / 2,
      y: 0,
      isLink: false
    },
    bottom: {
      x: 125 / 2,
      y: 122,
      isLink: false
    },
  },
  MEC: {
    w: 125,
    h: 122,
    fill: "#879195",
    border: 10,
    circle_color: "#cdb5d3",
    circle_text_color: "#a900b8",
    left: {
      x: 0,
      y: 122 / 2,
      isLink: false,
    },
    right: {
      x: 125,
      y: 122 / 2,
      isLink: false
    },
    top: {
      x: 125 / 2,
      y: 0,
      isLink: false
    },
    bottom: {
      x: 125 / 2,
      y: 122,
      isLink: false
    },
  },
}

export const newBridgeNode = () => (
  {
    max_conections: 1,
    fill: "#8CC14E",
    w: 32,
    h: 32,
    border: 5,
    type: "start",
    right: {
      x: 32,
      y: 32 / 2,
      isLink: false
    },
    id: addNewNode(),
    x: randomNumber(),
    y: randomNumber(),
  }
)

export const newExtrenalNode = () => (
  {
    max_conections: 1,
    fill: "#D84F4F",
    w: 32,
    h: 32,
    border: 5,
    type: "stop",
    left: {
      x: 0,
      y: 32 / 2,
      isLink: false,
    },
    id: addNewNode(),
    x: randomNumber(),
    y: randomNumber(),
  }
)

export const newVNFNode = nodeInfo => {
  const position = Position(nodeInfo.connectionPoint.length)
  return {
    ...NODE_TYPE.VNF,
    id: addNewNode(),
    x: randomNumber(),
    y: randomNumber(),
    extra_info: {
      version: nodeInfo.version,
      name: nodeInfo.name,
      vendor: nodeInfo.vendor,
      description: nodeInfo.description,
      vnfd_id: nodeInfo.vnfdId,
      vnfd_version: nodeInfo.vnfdVersion,
      id: nodeInfo.id
    },
    parameter:[...nodeInfo.parameter],
    connection_point:[...nodeInfo.connectionPoint],
    max_connections: nodeInfo.connectionPoint.length,
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
