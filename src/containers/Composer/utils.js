/**
 * Visualisation Container Utils
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */

import { NODE_TYPE } from './config_d3'
import faker from 'faker'

/**
 * Create d3 Object
 * @param {array} Nodes
 * @return {array} D3 Nodes Format
 * */
export const nodeData = data => {
  const { nodes } = data;

  return nodes.map(node => {
    switch (node.type) {
      case "start":
        return {
          ...node,
          fill: NODE_TYPE.START.color,
          w: NODE_TYPE.START.w,
          h: NODE_TYPE.START.h,
          border: NODE_TYPE.START.border,
          right: {
            x: NODE_TYPE.START.w,
            y: NODE_TYPE.START.h / 2,
            isLink: false
          }
        };
      case "stop":
        return {
          ...node,
          fill: NODE_TYPE.STOP.color,
          h: NODE_TYPE.STOP.h,
          w: NODE_TYPE.STOP.w,
          border: NODE_TYPE.STOP.border,
          left: { x: 0, y: NODE_TYPE.STOP.h / 2, isLink: false }
        };
        default:
        return {
          ...node,
          h: NODE_TYPE.VNF.h,
          w: NODE_TYPE.VNF.w,
          fill: NODE_TYPE.VNF.color,
          circleColor: NODE_TYPE.VNF.circleColor || node.circleColor,
          circleTextColor: NODE_TYPE.VNF.circleTextColor || node.circleTextColor,
          circleText: node.type.toUpperCase() || 'VNF',
          border: NODE_TYPE.VNF.border,
          left: { x: 0, y: NODE_TYPE.VNF.h / 2, isLink: false },
          right: {
            x: NODE_TYPE.VNF.w,
            y: NODE_TYPE.VNF.h / 2,
            isLink: false
          },
          top: { x: NODE_TYPE.VNF.w / 2, y: 0, isLink: false },
          bottom: {
            x: NODE_TYPE.VNF.w / 2,
            y: NODE_TYPE.VNF.h,
            isLink: false
          },
          isOpen: false
        };
    }
  })
};
/**
 * Change to d3 links format
 * @param {array} Links
 * @param {array} nodes
 * @return {object} D3 Format
 * */
export const findLinkById = (links, nodes) => {
  links.forEach(link => {
    link.source = nodes.find(node => node.id === link.source);
    link.target = nodes.find(node => node.id === link.target);
    link.source[link.sourcePosition].isLink = true;
    link.target[link.targetPosition].isLink = true;
    const changeNodeSource = nodes.find(
      node => node.id === link.source.id || node.id === link.target.id
    );
    if (changeNodeSource) {
      changeNodeSource[link.sourcePosition].isLink = true;
    }
  });
  return {links: links, nodes: nodes}
}

/**
 * Add New Node
 * @param {string} type_node
 * @return {object} New d3 Node
 */
export const addNode = node => {

  switch(node.type) {
    case "start":
      return {
        id: `test${faker.random.number()}`,
        type: "start",
        x: 300,
        y: 200,
        fill: NODE_TYPE.START.color,
        w: NODE_TYPE.START.w,
        h: NODE_TYPE.START.h,
        border: NODE_TYPE.START.border,
        right: {
          x: NODE_TYPE.START.w,
          y: NODE_TYPE.START.h / 2
        }
      }

    case "stop":
    return {
      id: `test${faker.random.number()}`,
      type: "stop",
      x: 30,
      y: 100,
      fill: NODE_TYPE.STOP.color,
      h: NODE_TYPE.STOP.h,
      w: NODE_TYPE.STOP.w,
      border: NODE_TYPE.STOP.border,
      left: { x: 0, y: NODE_TYPE.STOP.h / 2 , isLinked: false},
    }

    default:
    return {
      id: `test${faker.random.number()}`,
      type: "VNF",
      extra_info: {
        version: node.version,
        name: node.name,
        sub_name: node.sub_name
      },
      h: NODE_TYPE.VNF.h,
      w: NODE_TYPE.VNF.w,
      fill: NODE_TYPE.VNF.color,
      border: NODE_TYPE.VNF.border,
      circleColor: node.circlefill || NODE_TYPE.VNF.circleColor,
      circleTextColor: node.colortext || NODE_TYPE.VNF.border,
      circleText: node.type.toUpperCase(),
      left: { x: 0, y: NODE_TYPE.VNF.h / 2 },
      right: {
        x: NODE_TYPE.VNF.w,
        y: NODE_TYPE.VNF.h / 2
      },
      top: { x: NODE_TYPE.VNF.w / 2, y: 0 },
      bottom: {
        x: NODE_TYPE.VNF.w / 2,
        y: NODE_TYPE.VNF.h
      }
    }
  }
}
