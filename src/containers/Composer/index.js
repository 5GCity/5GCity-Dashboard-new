/**
 * Composer Container
 * Please write a description
 *
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { select, zoom, event, drag, symbol, symbolTriangle, symbolWye, selectAll,
   forceLink, forceSimulation, forceManyBody, forceCollide } from 'd3'
import { CONFIG_D3 as d3Config, CONFIG_NODE, GLOBAL_VALUES, verifyCanLink } from '../SDKContainer/config_d3'
import './d3.css'
import Dimensions from 'react-dimensions'
import { wordsUtils } from 'utils'

/* Containers */
import ModalCreateLinkComposer from 'containers/Modals/ModalCreateLinkComposer'
import ModalConfigParameters from 'containers/Modals/ModalConfigParameters'
import ModalConfigMonitoring from 'containers/Modals/ModalConfigMonitoring'

class Composer extends Component {
  state = {
    width: this.props.containerWidth - 240,
    height: this.props.containerHeight
  }
  /**
   * @param {object} selectNode
   */
  removeNode (selectNode) {
    const { removeNode } = this.props
    removeNode(selectNode)
  }
  /**
   * @param {object} selectLink
   */
  removeLink (selectLink) {
    const { removeLink } = this.props
    removeLink(selectLink)
  }

  configParams (node) {
    const { configParams } = this.props
    configParams(node)
  }

  configMonitoring (node) {
    const { configMonitoring } = this.props
    configMonitoring(node)
  }

  /**
   *
   * @param {object} links
   * @return {boolean}
   *
   */
  connectPoints (link) {
    const { modalAction } = this.props
    modalAction(link)
  }
  /**
   *
   * @param {object} source
   * @param {object} target
   *
   */
  createLink (source, target) {
    event.stopPropagation()
    const { createLink } = this.props
    createLink(source, target)
  }

  componentDidMount () {
    this.props.d3Data &&
      this.drawD3()
  }

  drawD3 () {
    // mouse event vars
    let selectedNode = null
    let mousedownLink = null
    let mousedownNode = null
    let mouseupNode = null
    let svgMousePosition = { x: 0, y: 0 }
    let selectLink = null
    let zoomPosition = { x: 240, y: 136, k: 1 }
    let nodesVNF = []
    let optionSelectDraw = null
    let isMouseUpConfig = false
    let d3Data = this.props.d3Data
    let {nodes, links} = d3Data

    var zoomD3 = zoom()
    .scaleExtent([d3Config.zoom.min_zoom, d3Config.zoom.max_zoom])
    .on('zoom', zoomed)

    // Area
    const svg =
    select('#composer')
    .on('mousemove', mousemove)
    .attr('oncontextmenu', 'return false;')
    .call(zoomD3)

    const svgZoom =
    svg
      .append('g')
      .attr(
        'transform',
        `translate(${d3Config.margin.left},${d3Config.margin.right})`
      )
      .attr('cursor', 'move')

    // ADD new rect to zoom
    svgZoom
    .append('rect')
    .attr('width', this.state.width)
    .attr('height', this.state.height)
    .style('fill', 'none')
    .style('pointer-events', 'all')

    const gZoom = svgZoom.append('g')

    // handles to link and node element groups
    let path = gZoom.append('svg:g').attr('id', 'path').selectAll('path')
    let groupBridge = gZoom.append('svg:g').attr('id', 'bridge').selectAll('g .group_bridge')
    let groupExternal = gZoom.append('svg:g').attr('id', 'external').selectAll('g .group_external')
    let groupVNF = gZoom.append('svg:g').attr('id', 'vnf').selectAll('g .group_vnf')
    let groupVirtualSwitch = gZoom.append('svg:g').attr('id', 'vs').selectAll('g .group_vs')

    // line displayed when dragging new nodes
    const gOption = gZoom.append('g').attr('id', 'option_link')
    gOption
    .append('svg:rect')
    .attr('class', 'menu_otpions visibility')
    .attr('fill', '#404F57')
    .attr('width', 200)
    .attr('height', 80)
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', 10)
    // Settigns
    gOption
    .append('svg:rect')
    .attr('class', 'menu_otpions visibility')
    .attr('fill', 'transparent')
    .attr('width', 200)
    .attr('height', 40)
    .attr('x', 0)
    .attr('y', 0)
    .on('click', () => {
      const linkFind = links.find(link => link.id === selectLink.id)
      this.connectPoints(linkFind)
      selectAll('#option_link .menu_otpions').classed('visibility', true)
    })
    gOption
    .append('svg:text')
    .attr('class', 'menu_otpions visibility')
    .attr('x', 40)
    .attr('y', 25)
    .text('Settings')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold')
    .attr('fill', '#fff')
    // OPEN New TAB
    /* gOption
    .append('svg:text')
    .attr('class', 'menu_otpions visibility')
    .attr('x', 40)
    .attr('y', 66)
    .text('Open in new tab')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold')
    .attr('fill', '#fff');
    gOption
    .append('svg:rect')
    .attr('class', 'menu_otpions visibility')
    .attr('fill', 'transparent')
    .attr('width', 200)
    .attr('height', 40)
    .attr('x', 0)
    .attr('y', 50)
    .on('click', d => {
      console.info('Open tab');
    }) */
    // REMOVE
    gOption
    .append('svg:rect')
    .attr('class', 'menu_otpions visibility')
    .attr('fill', 'transparent')
    .attr('width', 200)
    .attr('height', 40)
    .attr('x', 0)
    .attr('y', 50) // 90
    .on('click', () => {
      removeLink()
    })
    gOption
    .append('svg:text')
    .attr('class', 'menu_otpions visibility')
    .attr('x', 40)
    .attr('y', 66) // 106
    .text('Remove')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold')
    .attr('fill', '#fff')

    // Drag and drop
    const dragger =
    drag()
    .on('start', d => {
      select(`#${d.id}`).classed('active', false)
    })
    .on('drag', d => {
      d.x = event.x
      d.y = event.y
      tick()
    })
    .on('end', d => {
      select(`#${d.id}`).classed('active', false)
    })

    function tick () {
      // draw directed edges
      path
      .attr('x1', d => {
        return d.source.x + d.source[d.sourcePosition].x
      })
      .attr('y1', d => {
        return d.source.y + d.source[d.sourcePosition].y
      })
      .attr('x2', d => {
        return d.target.x + d.target[d.targetPosition].x
      })
      .attr('y2', d => {
        return d.target.y + d.target[d.targetPosition].y
      })

      groupBridge.attr('transform', d => `translate(${d.x},${d.y})`)

      groupExternal.attr('transform', d => `translate(${d.x},${d.y})`)

      groupVNF.attr('transform', d => `translate(${d.x},${d.y})`)

      groupVirtualSwitch.attr('transform', d => `translate(${d.x},${d.y})`)
    }
    // Simulation
    const simulation = forceSimulation()
  .force('charge', forceManyBody())
   .force('collision', forceCollide().radius(d =>
      d.w
    ))

    this.updateData = newd3Data => {
      nodes = newd3Data.nodes
      links = newd3Data.links
      // UPDATE
      // Update Bridge
      groupBridge
      .attr('id', d => d.id)
      .attr('class', d => {
        if (d.right.isLink) {
          select(`g #${d.id} .option_bridge`).classed('hidden', false)
        } else {
          select(`g #${d.id} .option_bridge`).classed('hidden', true)
        }
      })
      // Update VNF
      groupVNF
      .attr('id', d => d.id)
      .attr('class', d => {
        d.array_link.forEach(option => {
          if (d[option].isLink) {
            return selectAll(`g #${d.id} .option_VNF_${option}`)
                  .classed('hidden', false)
          } else {
            return selectAll(`g #${d.id} .option_VNF_${option}`)
            .classed('hidden', true)
          }
        })
      })
      // Update Virtual Switch
      groupVirtualSwitch
      .attr('id', d => d.id)
      .attr('class', d => {
        d.array_link.forEach(option => {
          if (d[option].isLink) {
            return selectAll(`g #${d.id} .option_virtual_switch_${option}`)
                  .classed('hidden', false)
          } else {
            return selectAll(`g #${d.id} .option_virtual_switch_${option}`)
            .classed('hidden', true)
          }
        })
      })
      // Update External
      groupExternal
      .attr('id', d => d.id)
      .attr('class', d => {
        if (d.left.isLink) {
          select(`g #${d.id} .option_external`).classed('hidden', false)
        } else {
          select(`g #${d.id} .option_external`).classed('hidden', true)
        }
      })
      // Update Path
      path
      .attr('id', d => d.id)
      .attr('class', d => (d.confirm ? 'link confirm' : 'selected'))

      restart()
      // REMOVE MENU bridge and VS
      selectAll('g .group_bridge_menu').lower()
      selectAll('g .group_vs_menu').lower()

        // Simulation link
      simulation.force('link',
        forceLink()
        .id(d => d.id))
        // Simulation Node
      simulation
        .nodes(nodes)
        .on('tick', () => tick(path, groupBridge, groupExternal, groupVNF, groupVirtualSwitch))
    }
    const restart = () => {
      /** LINKS**/
      path = path.data(links)

      // Remove old links
      path.exit().remove()

      // Add new links
      path = path
      .enter()
      .append('svg:line')
      .attr('id', d => d.id)
      .attr('class', d => (d.confirm ? 'link confirm' : 'selected'))
      .on('click', d => confirmLink(d))
      .on('mousedown', d => {
        // select link
        mousedownLink = d
        selectedNode = null
        restart()
      })
      .on('contextmenu', d => {
        confirmLink(d)
      })
      .merge(path)

      nodesVNF = nodes.filter(node => node.type === 'vnf' && node)

      groupVNF = groupVNF.data(nodesVNF, d => d.id)

      // remove old VNF
      groupVNF.exit().remove()

      // Add NEW GROUP
      const gVNF = groupVNF
        .enter()
        .append('svg:g')
        .attr('class', 'vnf')
        .attr('id', d => d.id)
        .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr('y', d => d.y)
        .on('mouseover', d => {
          setFocus(d)
          d.array_link.forEach(option => {
            if (!d[option].isLink) {
              return selectAll(`g #${d.id} .option_VNF_${option}`)
                .classed('hidden', false)
            }
          })
        })
        .on('mouseout', d => {
          unsetFocus(d)
          d.array_link.forEach(option => {
            if (!d[option].isLink) {
              return selectAll(`g #${d.id} .option_VNF_${option}`)
                    .classed('hidden', true)
            }
          })
        })
        .on('contextmenu', d => {
          showTooltip(d)
        })
      // Create RECT GRoup
      gVNF
        .append('svg:rect')
        .attr('class', 'rect_VNF')
        .attr('r', d => d.radius)
        .attr('width', d => d.w)
        .attr('height', d => d.h)
        .attr('rx', d => d.border)
        .attr('fill', d => d.fill)
        .on('mousedown', d => onMouseDown(d, null))

      // Circle Info
      gVNF
        .append('svg:circle')
        .attr('r', d => 24)
        .attr('cx', d => d.w / 2)
        .attr('cy', d => 40)
        .attr('fill', d => d.circle_color)
        .on('mousedown', d => onMouseDown(d, null))
      gVNF
        .append('svg:text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('fill', d => d.circle_text_color)
        .attr('x', d => d.w / 2)
        .attr('y', 44)
        .text(d => d.circle_text)
        .on('mousedown', d => onMouseDown(d, null))

      // NAME Only one Word
      gVNF
        .append('svg:text')
        .attr('class', 'name')
        .attr('text-anchor', 'middle')
        .attr('x', d => d.w / 2)
        .attr('y', d => d.h - 30)
        .text(d => {
          const name = wordsUtils(d.extra_info.name)
          return name[0]
        })
        .on('mousedown', d => onMouseDown(d, null))
      // SUBNAME
      gVNF
        .append('svg:text')
        .attr('class', 'vendor')
        .attr('text-anchor', 'middle')
        .attr('x', d => d.w / 2)
        .attr('y', d => d.h - 15)
        .text(d => d.extra_info.vendor)
      // VERSION
      gVNF
        .append('svg:text')
        .attr('class', 'version')
        .attr('text-anchor', 'middle')
        .attr('x', d => 18)
        .attr('y', 15)
        .text(d => d.extra_info.version)
      // Options Right
      gVNF
        .append('svg:circle')
        .attr('class', d => {
          if (d.right && d.right.isLink) {
            return 'option_VNF_right'
          } else {
            return 'option_VNF_right hidden'
          }
        })
        .attr('fill', d => d.right.isManagement ? CONFIG_NODE.colorIsManagement : CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w)
        .attr('cy', d => d.h / 2)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'right'}
          onMouseDown(d, 'right')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'right')
        })

      // Options Left
      gVNF
        .append('svg:circle')
        .attr('class', d => {
          if (d.left && d.left.isLink) {
            return 'option_VNF_left'
          } else {
            return 'option_VNF_left hidden'
          }
        })
        .attr('fill', d => d.left.isManagement ? CONFIG_NODE.colorIsManagement : CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', 0)
        .attr('cy', d => d.h / 2)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'left'}
          onMouseDown(d, 'left')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'left')
        })
      // Options Bottom
      gVNF
        .append('svg:circle')
        .attr('class', d => {
          if (d.bottom && d.bottom.isLink) {
            return 'option_VNF_bottom'
          } else {
            return 'option_VNF_bottom hidden'
          }
        })
        .attr('fill', d => d.bottom.isManagement ? CONFIG_NODE.colorIsManagement : CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w / 2)
        .attr('cy', d => d.h)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'bottom'}
          onMouseDown(d, 'bottom')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'bottom')
        })

      // Options Top
      gVNF
        .append('svg:circle')
        .attr('class', d => {
          if (d.top && d.top.isLink) {
            return 'option_VNF_top'
          } else {
            return 'option_VNF_top hidden'
          }
        })
        .attr('fill', d => d.top.isManagement ? CONFIG_NODE.colorIsManagement : CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w / 2)
        .attr('cy', 0)
        .attr('r', 5)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'top'}
          onMouseDown(d, 'top')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'top')
        })

      const groupVNFMenu = gVNF.append('svg:g').attr('class', 'group_vnf_menu')
      groupVNFMenu
        .append('svg:rect')
        .attr('class', 'menu')
        .attr('fill', 'transparent')
        .attr('width', 35)
        .attr('height', 35)
        .attr('rx', '5%')
        .attr('ry', '100%')
        .attr('x', 105)
        .attr('y', 0)
        .on('click', d => showTooltip(d))
      groupVNFMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', '#404F57')
        .attr('width', 200)
        .attr('height', 115)
        .attr('rx', 5)
        .attr('x', 122)
        .attr('y', 0)
        .on('click', d => {
          if (d.extra_info.parameter) { confParams(d) }
        })
      // Settigns
      groupVNFMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', 'transparent')
        .attr('width', 200)
        .attr('height', 35)
        .attr('rx', 5)
        .attr('x', 122)
        .attr('y', 0)
        .on('click', d => {
          if (d.extra_info.parameter) { confParams(d) }
        })
      groupVNFMenu
        .append('svg:text')
        .attr('class', 'menu_otpions visibility')
        .attr('x', 150)
        .attr('y', 22)
        .text(d => {
          if (d.extra_info.parameter) {
            return 'Configure Parameters'
          } else {
            return 'No configurations required'
          }
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', d => {
          if (d.extra_info.parameter) {
            return '#fff'
          } else {
            return '#89979F'
          }
        })
        .on('click', d => {
          if (d.extra_info.parameter) { confParams(d) }
        })
      // Open in new tab
      groupVNFMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', 'transparent')
        .attr('width', 200)
        .attr('height', 35)
        .attr('rx', 5)
        .attr('x', 122)
        .attr('y', 40)
        .on('click', d => {
          if (d.extra_info.monitoringVNF) { confMonitoring(d) }
        })
      groupVNFMenu
        .append('svg:text')
        .attr('class', 'menu_otpions visibility')
        .attr('x', 150)
        .attr('y', 60)
        .text(d => {
          if (d.extra_info.monitoringVNF) {
            return 'Monitoring Parameters'
          } else {
            return 'No monitoring'
          }
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', d => {
          if (d.extra_info.monitoringVNF) {
            return '#fff'
          } else {
            return '#89979F'
          }
        })
        .on('click', d => {
          if (d.extra_info.monitoringVNF) { confMonitoring(d) }
        })
      // Remover
      groupVNFMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', 'transparent')
        .attr('width', 150)
        .attr('height', 35)
        .attr('rx', 5)
        .attr('x', 122)
        .attr('y', 70)
        .on('click', () => {
          deleteNodes()
        })
      groupVNFMenu
        .append('svg:text')
        .attr('class', 'menu_otpions visibility')
        .attr('x', 150)
        .attr('y', 94)
        .text('Remove')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#fff')
        .on('click', () => {
          deleteNodes()
        })
      // MENU
      groupVNFMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 114)
        .attr('cy', 12)
      // MENU
      groupVNFMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 114)
        .attr('cy', 18)
      // MENU
      groupVNFMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 114)
        .attr('cy', 24)

      groupVNF = gVNF.merge(groupVNF)

      const nodesBridge = nodes.filter(node => node.type === 'bridge')

      groupBridge = groupBridge.data(nodesBridge, d => d.id)

      // remove old Bridge
      groupBridge.exit().remove()

      // Create Group Start
      let gStart = groupBridge
        .enter()
        .append('svg:g')
        .attr('class', 'group_bridge')
        .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr('id', d => d.id)
        .on('mouseover', d => {
          if (!d.right.isLink) {
            select(`g #${d.id} .option_bridge`).classed('hidden', false)
          }
        })
        .on('mouseout', d => {
          if (!d.right.isLink) {
            select(`g #${d.id} .option_bridge`).classed('hidden', true)
          }
        })
        .on('contextmenu', d =>
          showTooltipAndOptions(d)
        )

      // Create Rect
      gStart
        .append('svg:rect')
        .attr('class', 'rect_bridge')
        .attr('r', d => d.radius)
        .attr('width', d => d.w)
        .attr('height', d => d.h)
        .attr('rx', d => d.border)
        .attr('fill', d => d.fill)
        .on('mousedown', d =>
        onMouseDown(d, 'groupBridge')
        )

      // add option right
      gStart
        .append('svg:circle')
        .attr('fill', CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w)
        .attr('cy', d => d.h / 2)
        .attr('class', d => {
          if (d.right.isLink) {
            return 'option_bridge'
          } else {
            return 'option_bridge hidden'
          }
        })
        .on('mousedown', d => {
          onMouseDown(d, 'right')
        })
        .on('mouseup', d => mouseUpConfig(d, 'right'))

      // Play Button
      gStart
        .append('svg:circle')
        .attr('fill', 'white')
        .attr('r', 10)
        .attr('cx', d => d.w / 2)
        .attr('cy', d => d.h / 2)
        .on('mousedown', d => {
          onMouseDown(d, 'groupBridge')
        })

      // Create Triangle
      const triangle =
        symbol()
        .type(symbolTriangle)
        .size(GLOBAL_VALUES.BRIDGE.icon_size)

      gStart
        .append('path')
        .attr('d', triangle)
        .attr('fill', '#8CC14E')
        .attr('transform', d => `translate(${d.w / 2},${d.h / 2}) rotate(90)`)
        .on('mousedown', d => onMouseDown(d, 'groupBridge'))

      const gStartMenu = gStart.append('svg:g').attr('class', 'group_bridge_menu')
      gStartMenu
      .append('svg:rect')
      .attr('class', 'menu')
      .attr('fill', 'transparent')
      .attr('width', 35)
      .attr('height', 35)
      .attr('rx', '5%')
      .attr('ry', '100%')
      .attr('x', 20)
      .attr('y', -8)

      gStartMenu
      .append('svg:rect')
      .attr('class', 'menu_otpions visibility')
      .attr('fill', '#404F57')
      .attr('width', 200)
      .attr('height', 35)
      .attr('rx', 5)
      .attr('x', 32)
      .attr('y', -8)
      .on('click', () => {
        // console.info('Settings')
      })
      gStartMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', 'transparent')
        .attr('width', 200)
        .attr('height', 35)
        .attr('rx', 5)
        .attr('x', 32)
        .attr('y', -8)
        .on('click', () => {
          deleteNodes()
        })
      gStartMenu
        .append('svg:text')
        .attr('class', 'menu_otpions visibility')
        .attr('x', 50)
        .attr('y', 15)
        .text('Remove')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#fff')
        .on('click', () => {
          deleteNodes()
        })
      // MENU
      gStartMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 28)
        .attr('cy', 4)
      // MENU
      gStartMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 28)
        .attr('cy', 10)
      // MENU
      gStartMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 28)
        .attr('cy', 16)

      groupBridge = gStart.merge(groupBridge)

      // remove old nodes
      groupBridge.exit().remove()

      const nodesVirtualSwitch = nodes.filter(node => node.type === 'vs')

      groupVirtualSwitch = groupVirtualSwitch.data(nodesVirtualSwitch, d => d.id)

      // remove old nodes
      groupVirtualSwitch.exit().remove()

      // Create Group Start
      let gVirtualSwitch = groupVirtualSwitch
        .enter()
        .append('svg:g')
        .attr('class', 'group_vs')
        .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr('id', d => d.id)
        .on('mouseover', d => {
          d.array_link.forEach(option => {
            if (!d[option].isLink) {
              return selectAll(`g #${d.id} .option_virtual_switch_${option}`)
                .classed('hidden', false)
            }
          })
        })
        .on('mouseout', d => {
          d.array_link.forEach(option => {
            if (!d[option].isLink) {
              return selectAll(`g #${d.id} .option_virtual_switch_${option}`)
                    .classed('hidden', true)
            }
          })
        })
        .on('contextmenu', d => {
          showTooltipAndOptions(d)
        })

      // Create Rect
      gVirtualSwitch
        .append('svg:rect')
        .attr('class', 'rect_virtual_switch')
        .attr('r', d => d.radius)
        .attr('width', d => d.w)
        .attr('height', d => d.h)
        .attr('rx', d => d.border)
        .attr('fill', d => d.fill)
        .on('mousedown', d =>
        onMouseDown(d, 'groupVirtualSwitch')
        )

      // Options Right
      gVirtualSwitch
        .append('svg:circle')
        .attr('class', d => {
          if (d.right && d.right.isLink) {
            return 'option_virtual_switch_right'
          } else {
            return 'option_virtual_switch_right hidden'
          }
        })
        .attr('fill', CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w)
        .attr('cy', d => d.h / 2)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'right'}
          onMouseDown(d, 'right')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'right')
        })
      /* // Options Left
      gVirtualSwitch
        .append('svg:circle')
        .attr('class', d => {
          if (d.left && d.left.isLink) {
            return 'option_virtual_switch_left'
          } else {
            return 'option_virtual_switch_left hidden'
          }
        })
        .attr('fill', CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', 0)
        .attr('cy', d => d.h / 2)
        .on('mousedown', d =>{
          optionSelectDraw = {node: d, position: 'left'}
          onMouseDown(d, 'left')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'left');
        });
      // Options Bottom
      gVirtualSwitch
        .append('svg:circle')
        .attr('class', d => {
          if (d.bottom && d.bottom.isLink) {
            return 'option_virtual_switch_bottom'
          } else {
            return 'option_virtual_switch_bottom hidden'
          }
        })
        .attr('fill', CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w / 2)
        .attr('cy', d => d.h)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'bottom'}
          onMouseDown(d, 'bottom')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'bottom')
        });

      // Options Top
      gVirtualSwitch
        .append('svg:circle')
        .attr('class', d => {
          if (d.top && d.top.isLink) {
            return 'option_virtual_switch_top'
          } else {
            return 'option_virtual_switch_top hidden'
          }
        })
        .attr('fill', CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => d.w / 2)
        .attr('cy', 0)
        .attr('r', 5)
        .on('mousedown', d => {
          optionSelectDraw = {node: d, position: 'top'}
          onMouseDown(d, 'top')
        })
        .on('mouseup', d => {
          mouseUpConfig(d, 'top')
        }) */
    // Create Y element
      const wye =
      symbol()
      .type(symbolWye)
      .size(GLOBAL_VALUES.VS.icon_size)

      gVirtualSwitch
      .append('path')
      .attr('d', wye)
      .attr('fill', 'white')
      .attr('transform', d => `translate(${d.w / 2},${d.h / 2})`)
      .on('mousedown', d => onMouseDown(d, 'groupVirtualSwitch'))

      const gVirtualSwitchMenu = gVirtualSwitch.append('svg:g').attr('class', 'group_vs_menu')
      gVirtualSwitchMenu
      .append('svg:rect')
      .attr('class', 'menu')
      .attr('fill', 'transparent')
      .attr('width', 35)
      .attr('height', 35)
      .attr('rx', '5%')
      .attr('ry', '100%')
      .attr('x', 25)
      .attr('y', -8)
      gVirtualSwitchMenu
      .append('svg:rect')
      .attr('class', 'menu_otpions visibility')
      .attr('fill', '#404F57')
      .attr('width', 200)
      .attr('height', 35)
      .attr('rx', 5)
      .attr('x', 40)
      .attr('y', -8)
      gVirtualSwitchMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', 'transparent')
        .attr('width', 200)
        .attr('height', 35)
        .attr('rx', 5)
        .attr('x', 50)
        .attr('y', -8)
        .on('click', () => {
          deleteNodes()
        })
      gVirtualSwitchMenu
        .append('svg:text')
        .attr('class', 'menu_otpions visibility')
        .attr('x', 50)
        .attr('y', 15)
        .text('Remove')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#fff')
        .on('click', () => {
          deleteNodes()
        })
      // MENU
      gVirtualSwitchMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 34)
        .attr('cy', 4)
      // MENU
      gVirtualSwitchMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 34)
        .attr('cy', 10)
      // MENU
      gVirtualSwitchMenu
        .append('svg:circle')
        .attr('class', 'option_menu hidden')
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('cx', 34)
        .attr('cy', 16)

      groupVirtualSwitch = gVirtualSwitch.merge(groupVirtualSwitch)

      const nodesExternal = nodes.filter(node => node.type === 'external')

      groupExternal = groupExternal.data(nodesExternal, d => d.id)

      // remove old External
      groupExternal.exit().remove()

      // Add new options
      const gStop = groupExternal
        .enter()
        .append('svg:g')
        .attr('class', 'group_external')
        .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr('id', d => d.id)
        .on('mouseover', d => {
          if (!d.left.isLink) {
            select(`g #${d.id} .option_external`).classed('hidden', false)
          }
        })
        .on('mouseout', d => {
          if (!d.left.isLink) {
            select(`g #${d.id} .option_external`).classed('hidden', true)
          }
        })
        .on('contextmenu', d => {
          showTooltipAndOptions(d)
        })

      // Create Stop Rect
      gStop
        .append('svg:rect')
        .attr('class', 'rect_external')
        .attr('r', d => d.radius)
        .attr('width', d => d.w)
        .attr('height', d => d.h)
        .attr('rx', d => d.border)
        .attr('fill', d => d.fill)
        .on('mousedown', d => onMouseDown(d, 'groupExternal'))
      // show node options
      gStop
        .append('svg:circle')
        .attr('class', d => (d.left.isLink ? 'option_external' : 'option_external hidden'))
        .attr('id', d => d.id)
        .attr('fill', CONFIG_NODE.color)
        .attr('stroke', CONFIG_NODE.stroke)
        .attr('stroke-width', CONFIG_NODE.stroke_width)
        .attr('r', CONFIG_NODE.r)
        .attr('cx', d => 0)
        .attr('cy', d => d.h / 2)
        .on('mousedown', d => onMouseDown(d, 'left'))
        .on('mouseup', d => {
          mouseUpConfig(d, 'left')
        })
      // Stop Button
      gStop
        .append('svg:circle')
        .attr('class', 'option_external hidden')
        .attr('id', d => d.id)
        .attr('fill', 'white')
        .attr('r', GLOBAL_VALUES.EXTERNAL.icon_size)
        .attr('cx', d => d.w / 2)
        .attr('cy', d => d.h / 2)
        .attr('id', d => d.id)
        .attr('class', d => 'stop')
        .on('mousedown', d => onMouseDown(d, 'groupExternal'))

      const gStopMenu = gStop.append('svg:g').attr('class', 'group_external_menu')
      gStopMenu
        .append('svg:rect')
        .attr('class', 'menu')
        .attr('fill', 'transparent')
        .attr('width', 35)
        .attr('height', 35)
        .attr('rx', '5%')
        .attr('ry', '100%')
        .attr('x', 20)
        .attr('y', -8)
      gStopMenu
        .append('svg:rect')
        .attr('class', 'menu_otpions visibility')
        .attr('fill', '#404F57')
        .attr('width', 200)
        .attr('height', 35)
        .attr('rx', 5)
        .attr('x', 32)
        .attr('y', -8)
        .on('click', () => {
          // console.info('Settings')
        })
      gStopMenu
          .append('svg:rect')
          .attr('class', 'menu_otpions visibility')
          .attr('fill', 'transparent')
          .attr('width', 200)
          .attr('height', 35)
          .attr('rx', 5)
          .attr('x', 32)
          .attr('y', -8)
          .on('click', () => {
            deleteNodes()
          })
      gStopMenu
          .append('svg:text')
          .attr('class', 'menu_otpions visibility')
          .attr('x', 50)
          .attr('y', 15)
          .text('Remove')
          .attr('font-family', 'sans-serif')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('fill', '#fff')
          .on('click', () => {
            deleteNodes()
          })
        // MENU
      gStopMenu
          .append('svg:circle')
          .attr('class', 'option_menu hidden')
          .attr('r', 2)
          .attr('fill', 'white')
          .attr('cx', 28)
          .attr('cy', 4)
        // MENU
      gStopMenu
          .append('svg:circle')
          .attr('class', 'option_menu hidden')
          .attr('r', 2)
          .attr('fill', 'white')
          .attr('cx', 28)
          .attr('cy', 10)
        // MENU
      gStopMenu
          .append('svg:circle')
          .attr('class', 'option_menu hidden')
          .attr('r', 2)
          .attr('fill', 'white')
          .attr('cx', 28)
          .attr('cy', 16)

      groupExternal = gStop.merge(groupExternal)
      // remove old nodes
      groupExternal.exit().remove()

      tick()
    }

    const onMouseDown = (node, position) => {
      switch (position) {
        case 'right':
          event.stopPropagation()
          mouseDownConfig(node, position)
          break
        case 'left':
          event.stopPropagation()
          mouseDownConfig(node, position)
          break
        case 'top':
          event.stopPropagation()
          mouseDownConfig(node, position)
          break
        case 'bottom':
          event.stopPropagation()
          mouseDownConfig(node, position)
          break
        case 'groupBridge':
          groupBridge.call(dragger)
          break
        case 'groupExternal':
          groupExternal.call(dragger)
          break
        case 'groupVirtualSwitch':
          groupVirtualSwitch.call(dragger)
          break
        default:
          groupVNF.call(dragger)
          break
      }
    }

    // line displayed when dragging new nodes
    const dragLine = gZoom
    .append('g svg:path')
    .attr('class', 'link dragline hidden')
    .attr('d', 'M0,0L0,0')

    const mouseDownConfig = (node, position) => {
      if (!node[position].isLink) {
        // select node
        mousedownNode = node
        selectedNode = mousedownNode === selectedNode ? null : mousedownNode
        node.optionSelect = position
        if (node.type !== 'vs') {
          node[position].isLink = true
        }
        // reposition drag line
        dragLine.classed('hidden', false).attr('d', () =>
            null
        )
        restart()
      }
    }

    const mouseUpConfig = (node, position) => {
      if (!mousedownNode) return
      // hidden drag line
      dragLine.classed('hidden', true)

      // check for drag-to-self
      mouseupNode = node
      if (mouseupNode === mousedownNode) {
        resetMouseVars()
        return
      }
      // check if is linked
      let nodeSelect = node[position].isLink
      if (nodeSelect) {
        const nodeFind = nodes.find(node => node.id === mousedownNode.id)
        nodeFind[mousedownNode.optionSelect].isLink = false
        removeCircleOption(mousedownNode, mousedownNode.optionSelect)
        resetMouseVars()
        return
      }

      node.optionSelect = position
      isMouseUpConfig = true
      selectedNode = null

      if (verifyCanLink(mousedownNode, mouseupNode)) {
        createLink()
      } else {
        removeCircleOption(mousedownNode, mousedownNode.optionSelect)
        resetMouseVars()
      }
    }

    const resetMouseVars = () => {
      mousedownNode = null
      mouseupNode = null
      mousedownLink = null
    }

    const createLink = () => {
      let target = mouseupNode
      let source = mousedownNode
      if (mousedownNode.type === 'vs') {
        this.createLink(target, source)
      } else {
        this.createLink(source, target)
      }
      source.optionSelect = null
      target.optionSelect = null
      resetMouseVars()
    }

    this.handlerRestart = () => {
      restart()
    }

    const setFocus = d => {
      if (!d.isOpen) {
        selectAll(`g #${d.id} .option_menu`).classed('hidden', false)
        select(`g #${d.id} rect`).style('filter', 'url(#shadow)')
      }
    }

    const unsetFocus = d => {
      if (!d.isOpen) {
        selectAll(`g #${d.id} .option_menu`).classed('hidden', true)
      }
      select(`g #${d.id} rect`).style('filter', '')
    }

    // Tooltip
    const showTooltip = node => {
      node.isOpen = !node.isOpen
      if (node.isOpen) {
        selectAll(`g #${node.id} .group_${node.type}_menu rect.menu`).attr(
          'fill',
          '#404F57'
        )
        selectAll(`g #${node.id} .menu_otpions`).classed('visibility', false)
        select(`g #${node.id} rect`).style('filter', '')
        selectedNode = node
      } else {
        selectAll(`g #${node.id} .group_${node.type}_menu rect.menu`).attr(
          'fill',
          'transparent'
        )
        selectAll(`g #${node.id} .menu_otpions`).classed('visibility', true)
      }
    }

    // Close Tooltip
    const closeTooltip = node => {
      node.isOpen = false
      selectAll(`g #${node.id} .group_${node.type}_menu rect.menu`).attr(
          'fill',
          'transparent'
        )
      selectAll(`g #${node.id} .menu_otpions`).classed('visibility', true)
    }

    // Use in Bidge External and VS
    const showTooltipAndOptions = node => {
      node.isOpen = !node.isOpen
      if (node.isOpen) {
        selectAll(`g #${node.id} .group_${node.type}_menu rect.menu`)
        .attr('fill', '#404F57')
        selectAll(`g #${node.id} .menu_otpions`).classed('visibility', false)
        select(`g #${node.id} rect`).style('filter', '')
        selectAll(`g #${node.id} .group_${node.type}_menu`).raise()
        // Options
        selectAll(`g #${node.id} .option_menu`).classed('hidden', false)
        selectedNode = node
      } else {
        selectAll(`g #${node.id} .group_${node.type}_menu rect.menu`)
        .attr('fill', 'transparent')
        selectAll(`g #${node.id} .group_${node.type}_menu`).lower()
        selectAll(`g #${node.id} .menu_otpions`).classed('visibility', true)
        // Options
        selectAll(`g #${node.id} .option_menu`).classed('hidden', true)
      }
    }

    const confirmLink = link => {
      selectLink = link
      selectAll('#option_link').attr(
      'transform',
      `translate(${(svgMousePosition.x - zoomPosition.x) /
        zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
        zoomPosition.k}) `
    )
      selectAll('#option_link .menu_otpions').classed('visibility', false)
    }

    const deleteNodes = () => {
      if (selectedNode) {
        this.removeNode(selectedNode)
      }
      selectedNode = null
    }

    const removeCircleOption = (node, position) => {
      switch (node.type) {
        case 'bridge':
          node.optionSelect = null
          node[position].isLink = false
          select(`g #${node.id} .option_bridge`).classed('hidden', true)
          break
        case 'external':
          node.optionSelect = null
          node[position].isLink = false
          select(`g #${node.id} .option_external`).classed('hidden', true)
          break
        case 'vs':
          node.optionSelect = null
          node[position].isLink = null
          select(`g #${node.id} .option_virtual_switch_${position}`).classed('hidden', true)
          break
        default:
          return select(`g #${node.id} .option_VNF_${position}`).classed('hidden', true)
      }
    }

    // Zoom
    function zoomed () {
      zoomPosition = {
        x: event.transform.x + 240,
        y: event.transform.y + 136,
        k: event.transform.k
      }
      gZoom.attr('transform', event.transform)
    }

    // Remove links
    const removeLink = () => {
      this.removeLink(selectLink)
      selectAll('#option_link .menu_otpions').classed('visibility', true)
      restart()
    }

    // Shadow VNF
    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var shadow = svg
    .append('filter')
    .attr('id', 'shadow')
    .attr('height', '130%')

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    shadow
    .append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 1.7)
    .attr('result', 'blur')

    // ADD color to background
    shadow
    .append('feFlood')
    .attr('flood-color', '#5A666D')
    .attr('flood-opacity', '0.9')
    .attr('result', 'offsetColor')

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    shadow
    .append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 5)
    .attr('dy', 5)
    .attr('result', 'offsetBlur')

    shadow
    .append('feComposite')
    .attr('in', 'offsetColor')
    .attr('in2', 'offsetBlur')
    .attr('operator', 'in')
    .attr('result', 'offsetBlur')

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = shadow.append('feMerge')

    feMerge.append('feMergeNode').attr('in', 'offsetBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

      // app starts here
    function mousemove () {
      svgMousePosition.x = event.pageX
      svgMousePosition.y = event.pageY
      if (!mousedownNode) return
    // update drag line
      dragLine.attr('d', () => {
        switch (mousedownNode.optionSelect) {
          case 'left':
            return `M${mousedownNode.x},${mousedownNode.y +
            mousedownNode.h / 2}L${(svgMousePosition.x - zoomPosition.x) /
            zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
            zoomPosition.k}`
          case 'right':
            return `M${mousedownNode.x + mousedownNode.w},${mousedownNode.y +
            mousedownNode.h / 2}L${(svgMousePosition.x - zoomPosition.x) /
            zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
            zoomPosition.k}`
          case 'top':
            return `M${mousedownNode.x + mousedownNode.w / 2},${
            mousedownNode.y
          }L${(svgMousePosition.x - zoomPosition.x) /
            zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
            zoomPosition.k}`
          case 'bottom':
            return `M${mousedownNode.x + mousedownNode.w / 2},${mousedownNode.y +
            mousedownNode.h}L${(svgMousePosition.x - zoomPosition.x) /
            zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
            zoomPosition.k}`
          default:
            return `M${mousedownNode.x},${mousedownNode.y}L${svgMousePosition.x},${
            svgMousePosition.y}`
        }
      })
      restart()
    }

    function mouseup () {
      if (!mouseupNode && !isMouseUpConfig) {
        if (mousedownNode) {
          const findNode = nodes.find(node => node.id === mousedownNode.id)
          findNode[findNode.optionSelect].isLink = false
          removeCircleOption(findNode, findNode.optionSelect)
        }
        if (optionSelectDraw) {
          removeCircleOption(optionSelectDraw.node, optionSelectDraw.position)
          const findNodeMouseUp = nodes.find(node => node.id === optionSelectDraw.node.id)
          if (findNodeMouseUp) {
            findNodeMouseUp[optionSelectDraw.position].isLink = false
          }
        }
      }
      dragLine.classed('hidden', true)
      isMouseUpConfig = false
    // clear mouse event vars
      resetMouseVars()
    }

    const confParams = node => {
      this.configParams(node)
      closeTooltip(node)
    }

    const confMonitoring = node => {
      this.configMonitoring(node)
      closeTooltip(node)
    }

    function mousedown () {
      if (mousedownNode || mousedownLink) return
      restart()
    }

    svg
    .on('mousedown', mousedown)
    .on('mousemove', mousemove)
    .on('mouseup', mouseup)

    restart()
  }

  componentDidUpdate () {
    const { d3Data } = this.props
    if (d3Data) {
      this.updateData(d3Data)
    }
  }

  render () {
    const {
      modalStatus,
      modalData,
      modalAction,
      modalParameters,
      modalNodeConfigData,
      modalMonitoring
    } = this.props
    return (
      <React.Fragment>
        <D3>
          <svg
            width={this.state.width}
            height={this.state.height}
            id={'composer'}
          />
        </D3>
        {modalStatus &&
        <ModalCreateLinkComposer
          visibled={modalStatus}
          title={'Create Link'}
          modalAction={modalAction}
          data={modalData}
        />
        }
        {modalParameters &&
          <ModalConfigParameters
            visibled={modalParameters}
            title={'Configure Parameters'}
            data={modalNodeConfigData}
          />
        }
        {modalMonitoring &&
          <ModalConfigMonitoring
            visibled={modalMonitoring}
            title={'Configure Monitoring'}
          />
        }
      </React.Fragment>
    )
  }
}

export default (Dimensions()(Logic(Composer)))

const D3 = styled.div`
  margin-left: 240px;

  #composer {
    background-color: #37474f;
    cursor: move;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`
