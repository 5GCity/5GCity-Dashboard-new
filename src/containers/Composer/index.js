/**
 * Composer Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { select, zoom, event, drag, symbol, symbolTriangle, selectAll } from 'd3'
import { CONFIG_D3 as d3Config, NODE_TYPE, CONFIG_NODE } from './config_d3'
import './d3.css'
import Dimensions from 'react-dimensions'
import { filter, reject } from 'lodash'
import faker from 'faker'
import { setTimeout } from 'timers';

class Composer extends Component {

  state = {
    width: this.props.containerWidth - 240,
    height: this.props.containerHeight ,
  }

  componentDidMount() {
    setTimeout(() => {
      this.drawD3();
    }, 300);
  }
  componentDidUpdate() {
    setTimeout(() => {
    this.handlerRestart()
  }, 500);
  }

  removeN(objectData) {
    const { removeNode }= this.props.actions
    return removeNode(objectData)
  }

  drawD3() {
      // mouse event vars
      let selectedNode = null,
      mousedownLink = null,
      mousedownNode = null,
      mouseupNode = null,
      svgMousePosition = { x: 0, y: 0 },
      selectLink = null,
      zoomPosition = { x: 240, y: 136, k: 1 },
      nodesVNF = [],
      optionSelect_Draw = null,
      isMouseUpConfig = false,
      { nodes, links }= this.props.d3Data

      var zoomD3 = zoom()
      .scaleExtent([d3Config.zoom.min_zoom, d3Config.zoom.max_zoom])
      .on("zoom", zoomed);


      // Area
      const svg =
      select("#composer")
      .on("mousemove", mousemove)
      .attr('oncontextmenu', 'return false;')
      .call(zoomD3)


      const svgZoom =
      svg
        .append('g')
        .attr(
          'transform',
          `translate(${d3Config.margin.left},${d3Config.margin.right})`
        )


      // ADD new rect to zoom
      svgZoom
      .append("rect")
      .attr("width", this.state.width)
      .attr("height", this.state.height)
      .style("fill", "none")
      .style("pointer-events", "all");

      const gZoom = svgZoom.append("g");


      // handles to link and node element groups
      let path = gZoom.append("svg:g").attr("id","path").selectAll("path");
      let groupStart = gZoom.append("svg:g").attr("id","start").selectAll("g .group_start");
      let groupStop = gZoom.append("svg:g").attr("id","stop").selectAll("g .group_stop");
      let groupVNF = gZoom.append("svg:g").attr("id","VNF").selectAll("g .group_VNF");

      // line displayed when dragging new nodes
      const gOption = gZoom.append("g").attr("id", "option_link");
      gOption
      .append("svg:rect")
      .attr("class", "menu_otpions visibility")
      .attr("fill", "#404F57")
      .attr("width", 200)
      .attr("height", 120)
      .attr("x", 0)
      .attr("y", 0)
      .attr("rx", 10);
      // Settigns
      gOption
      .append("svg:rect")
      .attr("class", "menu_otpions visibility")
      .attr("fill", "transparent")
      .attr("width", 200)
      .attr("height", 40)
      .attr("x", 0)
      .attr("y", 0)
      .on("click", () => {
        select(`#${selectLink.id}`)
          .classed("selected", false)
          .attr("class", "confirm");
        selectLink.confirm = true;
        selectLink = null;
        selectAll("#option_link .menu_otpions").classed("visibility", true);
      });
      gOption
      .append("svg:text")
      .attr("class", "menu_otpions visibility")
      .attr("x", 40)
      .attr("y", 25)
      .text("Settings")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#fff");
      // OPEN New TAB
      gOption
      .append("svg:text")
      .attr("class", "menu_otpions visibility")
      .attr("x", 40)
      .attr("y", 66)
      .text("Open in new tab")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#fff");
      gOption
      .append("svg:rect")
      .attr("class", "menu_otpions visibility")
      .attr("fill", "transparent")
      .attr("width", 200)
      .attr("height", 40)
      .attr("x", 0)
      .attr("y", 50)
      .on("click", d => {
        console.info("Open tab");
      });
      // REMOVE
      gOption
      .append("svg:rect")
      .attr("class", "menu_otpions visibility")
      .attr("fill", "transparent")
      .attr("width", 200)
      .attr("height", 40)
      .attr("x", 0)
      .attr("y", 90)
      .on("click", d => {
        removeLink();
      });
      gOption
      .append("svg:text")
      .attr("class", "menu_otpions visibility")
      .attr("x", 40)
      .attr("y", 106)
      .text("Remove")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#fff");

      // Drag and drop
      const dragger =
      drag()
      .on("start", d => {
        select(`#${d.id}`).classed("active", false);
      })
      .on("drag", d => {
        d.x = event.x;
        d.y = event.y;
        tick();
      })
      .on("end", d => {
        select(`#${d.id}`).classed("active", false);
      });

      function tick() {
      // draw directed edges
      path
        .attr("x1", d => {
          return d.source.x + d.source[d.sourcePosition].x;
        })
        .attr("y1", d => {
          return d.source.y + d.source[d.sourcePosition].y;
        })
        .attr("x2", d => {
          return d.target.x + d.target[d.targetPosition].x;
        })
        .attr("y2", d => {
          return d.target.y + d.target[d.targetPosition].y;
        });
      groupStart.attr("transform", d => `translate(${d.x},${d.y})`);

      groupStop.attr("transform", d => `translate(${d.x},${d.y})`);

      groupVNF.attr("transform", d => `translate(${d.x},${d.y})`);
      }

      const restart = () => {
        /**LINKS**/
        path = path.data(links);

        // Remove old links
        path.exit().remove();

        // Add new links
        path = path
        .enter()
        .append("svg:line")
        .attr("id", d => d.id)
        .attr("class", d => (d.confirm ? "link confirm" : "selected"))
        .on("click", d => confirmLink(d))
        .on("mousedown", d => {
          // select link
          mousedownLink = d;
          selectedNode = null;
          restart();
        })
        .merge(path);

      // Remove old links
      path.exit().remove();

      nodesVNF = nodes.filter(node => node.type === "VNF" && node);

      groupVNF = groupVNF.data(nodesVNF, d => d.id);

      // Update Group
      groupVNF.selectAll(".group_VNF").attr("id", d => d.id);

      // remove old VNF
      groupVNF.exit().remove();

      // Add NEW GROUP
      const gVNF = groupVNF
        .enter()
        .append("svg:g")
        .attr("class", "group_VNF")
        .attr("id", d => d.id)
        .attr("transform", d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr("y", d => d.y)
        .on("mouseover", d => {
          set_focus(d);
          const options = ["right", "left", "top", "bottom"];
          options.forEach(option => {
            if (!d[option].isLink) {
               return selectAll(`g #${d.id} .option_VNF_${option}`)
                .classed("hidden", false);
            }
          });
        })
        .on("mouseout", d => {
          unset_focus(d);
          const options = ["right", "left", "top", "bottom"];
          options.forEach(option => {
            if (!d[option].isLink) {
              return selectAll(`g #${d.id} .option_VNF_${option}`)
                    .classed("hidden", true);
            }
          });
        });
      // Create RECT GRoup
      gVNF
        .append("svg:rect")
        .attr("class", "rect_VNF")
        .attr("r", d => d.radius)
        .attr("width", d => d.w)
        .attr("height", d => d.h)
        .attr("rx", d => d.border)
        .attr("fill", d => d.fill)
        .on("mousedown", d => onMouseDown(d, null));

      // Circle Info
      gVNF
        .append("svg:circle")
        .attr("r", d => 24)
        .attr("cx", d => d.w / 2)
        .attr("cy", d => 40)
        .attr("fill", d => d.circleColor )
        .on("mousedown", d => onMouseDown(d, null));
      gVNF
        .append("svg:text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("fill", d => d.circleTextColor)
        .attr("x", d => d.w / 2)
        .attr("y", 44)
        .text(d => d.circleText)
        .on("mousedown", d => onMouseDown(d, null));
      // NAME
      gVNF
        .append("svg:text")
        .attr("class", "name")
        .attr("text-anchor", "middle")
        .attr("x", d => d.w / 2)
        .attr("y", d => d.h - 30)
        .text(d => d.extra_info.name)
        .on("mousedown", d => onMouseDown(d, null));
      // SUBNAME
      gVNF
        .append("svg:text")
        .attr("class", "sub_name")
        .attr("text-anchor", "middle")
        .attr("x", d => d.w / 2)
        .attr("y", d => d.h - 15)
        .text(d => d.extra_info.sub_name);
      // VERSION
      gVNF
        .append("svg:text")
        .attr("class", "version")
        .attr("text-anchor", "middle")
        .attr("x", d => 18)
        .attr("y", 15)
        .text(d => d.extra_info.version);
      // Options Right
      gVNF
        .append("svg:circle")
        .attr("class", d => {
          if (d.right.isLink) {
            return "option_VNF_right";
          } else {
            return "option_VNF_right hidden ";
          }
        })
        .attr("fill", CONFIG_NODE.color)
        .attr("stroke", CONFIG_NODE.stroke)
        .attr("stroke-width", CONFIG_NODE.stroke_width)
        .attr("r", CONFIG_NODE.r)
        .attr("cx", d => d.w)
        .attr("cy", d => d.h / 2)
        .on("mousedown", d => {
          optionSelect_Draw = {node: d, position: "right"}
          onMouseDown(d, "right")
        })
        .on("mouseup", d =>{
          mouseUpConfig(d, "right")
        });

      // Options Left
      gVNF
        .append("svg:circle")
        .attr("class", d => {
          if (d.left.isLink) {
            return "option_VNF_left ";
          } else {
            return "option_VNF_left hidden ";
          }
        })
        .attr("fill", CONFIG_NODE.color)
        .attr("stroke", CONFIG_NODE.stroke)
        .attr("stroke-width", CONFIG_NODE.stroke_width)
        .attr("r", CONFIG_NODE.r)
        .attr("cx", 0)
        .attr("cy", d => d.h / 2)
        .on("mousedown", d =>{
          optionSelect_Draw = {node: d, position: "left"}
          onMouseDown(d, "left")
        })
        .on("mouseup", d => {
          mouseUpConfig(d, "left");
        });
      // Options Bottom
      gVNF
        .append("svg:circle")
        .attr("class", d => {
          if (d.bottom.isLink) {
            return "option_VNF_bottom ";
          } else {
            return "option_VNF_bottom hidden";
          }
        })
        .attr("fill", CONFIG_NODE.color)
        .attr("stroke", CONFIG_NODE.stroke)
        .attr("stroke-width", CONFIG_NODE.stroke_width)
        .attr("r", CONFIG_NODE.r)
        .attr("cx", d => d.w / 2)
        .attr("cy", d => d.h)
        .on("mousedown", d => {
          optionSelect_Draw = {node: d, position: "bottom"}
          onMouseDown(d, "bottom")
        })
        .on("mouseup", d => {
          mouseUpConfig(d, "bottom");
        });

      // Options Top
      gVNF
        .append("svg:circle")
        .attr("class", d => {
          if (d.top.isLink) {
            return "option_VNF_top ";
          } else {
            return "option_VNF_top hidden ";
          }
        })
        .attr("fill", CONFIG_NODE.color)
        .attr("stroke", CONFIG_NODE.stroke)
        .attr("stroke-width", CONFIG_NODE.stroke_width)
        .attr("r", CONFIG_NODE.r)
        .attr("cx", d => d.w / 2)
        .attr("cy", 0)
        .attr("r", 5)
        .on("mousedown", d => {
          optionSelect_Draw = {node: d, position: "top"}
          onMouseDown(d, "top")
        })
        .on("mouseup", d => {
          mouseUpConfig(d, "top");
        });

      const groupVNFMenu = gVNF.append("svg:g").attr("class", "group_VNF_menu");
      groupVNFMenu
        .append("svg:rect")
        .attr("class", "menu")
        .attr("fill", "transparent")
        .attr("width", 35)
        .attr("height", 35)
        .attr("rx", "5%")
        .attr("ry", "100%")
        .attr("x", 105)
        .attr("y", 0)
        .on("click", d => showTooltip(d));
      groupVNFMenu
        .append("svg:rect")
        .attr("class", "menu_otpions visibility")
        .attr("fill", "#404F57")
        .attr("width", 200)
        .attr("height", 120)
        .attr("rx", 5)
        .attr("x", 120)
        .attr("y", 0)
        .on("click", d => {
          console.info("Settings");
        });
      // Settigns
      groupVNFMenu
        .append("svg:rect")
        .attr("class", "menu_otpions visibility")
        .attr("fill", "transparent")
        .attr("width", 200)
        .attr("height", 40)
        .attr("rx", 5)
        .attr("x", 120)
        .attr("y", 0)
        .on("click", d => {
          console.info("Settings");
        });
      groupVNFMenu
        .append("svg:text")
        .attr("class", "menu_otpions visibility")
        .attr("x", 150)
        .attr("y", 25)
        .text("Settings")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff");
      // Open in new tab
      groupVNFMenu
        .append("svg:rect")
        .attr("class", "menu_otpions visibility")
        .attr("fill", "transparent")
        .attr("width", 200)
        .attr("height", 40)
        .attr("rx", 5)
        .attr("x", 120)
        .attr("y", 40)
        .on("click", () => {
          deleteNodes();
        });
      groupVNFMenu
        .append("svg:text")
        .attr("class", "menu_otpions visibility")
        .attr("x", 150)
        .attr("y", 60)
        .text("Open in new tab")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff");
      // Remover
      groupVNFMenu
        .append("svg:rect")
        .attr("class", "menu_otpions visibility")
        .attr("fill", "transparent")
        .attr("width", 200)
        .attr("height", 40)
        .attr("rx", 5)
        .attr("x", 120)
        .attr("y", 80)
        .on("click", d => {
          deleteNodes();
        });
      groupVNFMenu
        .append("svg:text")
        .attr("class", "menu_otpions visibility")
        .attr("x", 150)
        .attr("y", 100)
        .text("Remove")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff")
        .on("click", d => {
          deleteNodes();
        });
      // MENU
      groupVNFMenu
        .append("svg:circle")
        .attr("class", "option_menu hidden")
        .attr("r", 2)
        .attr("fill", "white")
        .attr("cx", 114)
        .attr("cy", 12);
      // MENU
      groupVNFMenu
        .append("svg:circle")
        .attr("class", "option_menu hidden")
        .attr("r", 2)
        .attr("fill", "white")
        .attr("cx", 114)
        .attr("cy", 18);
      // MENU
      groupVNFMenu
        .append("svg:circle")
        .attr("class", "option_menu hidden")
        .attr("r", 2)
        .attr("fill", "white")
        .attr("cx", 114)
        .attr("cy", 24);

      groupVNF = gVNF.merge(groupVNF);


      const nodesStart = nodes.filter(node => node.type === "start");

      groupStart = groupStart.data(nodesStart, d => d.id);


      // Create Group Start
      let gStart = groupStart
        .enter()
        .append("svg:g")
        .attr("class", "group_start")
        .attr("transform", d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr("id", d => d.id)
        .on("mouseover", d => {
          set_focus(d);
          if (!d.right.isLink) {
            select(`g #${d.id} .option_start`).classed("hidden", false);
          }
        })
        .on("mouseout", d => {
          unset_focus(d);
          if (!d.right.isLink) {
            select(`g #${d.id} .option_start`).classed("hidden", true);
          }
        });

      // Create Rect
      gStart
        .append("svg:rect")
        .attr("class", "rect_start")
        .attr("r", d => d.radius)
        .attr("width", d => d.w)
        .attr("height", d => d.h)
        .attr("rx", d => d.border)
        .attr("fill", d => d.fill)
        .on("mousedown", d =>
        onMouseDown(d, "groupStart")
        );

      // add option right
      gStart
        .append("svg:circle")
        .attr("fill", CONFIG_NODE.color)
        .attr("stroke", CONFIG_NODE.stroke)
        .attr("stroke-width", CONFIG_NODE.stroke_width)
        .attr("r", CONFIG_NODE.r)
        .attr("cx", d => d.w)
        .attr("cy", d => d.h / 2)
        .attr("class", d => {
          if (d.right.isLink) {
            return "option_start";
          } else {
            return "option_start hidden";
          }
        })
        .on("mousedown", d => {
          onMouseDown(d, "right")
        })
        .on("mouseup", d => mouseUpConfig(d, "right"));

      // Play Button
      gStart
        .append("svg:circle")
        .attr("fill", "white")
        .attr("r", 10)
        .attr("cx", d => d.w / 2)
        .attr("cy", d => d.h / 2)
        .on("mousedown", d => {
          onMouseDown(d, "groupStart")
        });
      // Create Triangle
      const triangle =
        symbol()
        .type(symbolTriangle)
        .size(50);

      gStart
        .append("path")
        .attr("d", triangle)
        .attr("fill", NODE_TYPE.START.color)
        .attr("transform", d => `translate(${d.w / 2},${d.h / 2}) rotate(90)`)
        .on("mousedown", d => onMouseDown(d, "groupStart"));

      groupStart = gStart.merge(groupStart);

      // remove old nodes
      groupStart.exit().remove();

      const nodesStop = nodes.filter(node => node.type === "stop");

      groupStop = groupStop.data(nodesStop, d => d.id);

      // Update Group
      groupStop.attr("id", d => d.id);



      //Add new options
      const gStop = groupStop
        .enter()
        .append("svg:g")
        .attr("class", "group_stop")
        .attr("transform", d => `translate(${d.x || 0}, ${d.y || 0})`)
        .attr("id", d => d.id)
        .on("mouseover", d => {
          set_focus(d);
          if (!d.left.isLink) {
            select(`g #${d.id} .option_stop`).classed("hidden", false);
          }
        })
        .on("mouseout", d => {
          unset_focus(d);
          if (!d.left.isLink) {
            select(`g #${d.id} .option_stop`).classed("hidden", true);
          }
        });

      // Create Stop Rect
      gStop
        .append("svg:rect")
        .attr("class", "rect_stop")
        .attr("r", d => d.radius)
        .attr("width", d => d.w)
        .attr("height", d => d.h)
        .attr("rx", d => d.border)
        .attr("fill", d => d.fill)
        .on("mousedown", d => onMouseDown(d, "groupStop"));
      // show node options
      gStop
        .append("svg:circle")
        .attr("class", d => (d.left.isLink ? "option_stop" : "option_stop hidden"))
        .attr("id", d => d.id)
        .attr("fill", CONFIG_NODE.color)
        .attr("stroke", CONFIG_NODE.stroke)
        .attr("stroke-width", CONFIG_NODE.stroke_width)
        .attr("r", CONFIG_NODE.r)
        .attr("cx", d => 0)
        .attr("cy", d => d.h / 2)
        .on("mousedown", d => onMouseDown(d, "left"))
        .on("mouseup", d => {
          mouseUpConfig(d, "left");
        });
      // Stop Button
      gStop
        .append("svg:circle")
        .attr("class", "option_stop hidden")
        .attr("id", d => d.id)
        .attr("fill", "white")
        .attr("r", 10)
        .attr("cx", d => d.w / 2)
        .attr("cy", d => d.h / 2)
        .attr("id", d => d.id)
        .attr("class", d => "stop")
        .on("mousedown", d => onMouseDown(d, "groupStop"));
      groupStop = gStop.merge(groupStop);
      // remove old nodes
      groupStop.exit().remove();

      tick();
      };

      const onMouseDown = (node, position) => {
        switch (position) {
          case "right":
            event.stopPropagation();
            mouseDownConfig(node, position);
            break;
          case "left":
            event.stopPropagation();
            mouseDownConfig(node, position);
            break;
          case "top":
            event.stopPropagation();
            mouseDownConfig(node, position);
            break;
          case "bottom":
            event.stopPropagation();
            mouseDownConfig(node, position);
            break;
          case "groupStart":
            groupStart.call(dragger);
            break;
          case "groupStop":
            groupStop.call(dragger);
            break;
          default:
            groupVNF.call(dragger);
            break;
        }
      };

      // line displayed when dragging new nodes
      const dragLine = gZoom
      .append("g svg:path")
      .attr("class", "link dragline hidden")
      .attr("d", "M0,0L0,0");

      const mouseDownConfig = (node, position) => {
      if (!node[position].isLink) {
        // select node
        mousedownNode = node;
        selectedNode = mousedownNode === selectedNode ? null : mousedownNode;
        node.optionSelect = position;
        node[position].isLink = true;
        // reposition drag line
        dragLine.classed("hidden", false).attr("d", () =>
           null
        );
        restart();
      }
      };

      const mouseUpConfig = (node, position) => {
        if (!mousedownNode) return;
        // hidden drag line
        dragLine.classed("hidden", true);

        // check for drag-to-self
        mouseupNode = node;
        if (mouseupNode === mousedownNode) {
          resetMouseVars();
          return;
        }
        // check if is linked
        let nodeSelect = node[position].isLink;
        if (nodeSelect) {
          const nodeFind = nodes.find(node => node.id === mousedownNode.id);
          nodeFind[mousedownNode.optionSelect].isLink = false;
          removeCircleOption(mousedownNode, mousedownNode.optionSelect);
          alert("is linked");
          resetMouseVars();
          return;
        }
        // unenlarge target node
        //select(this).attr("transform", null);
        node.optionSelect = position;
        isMouseUpConfig = true;
        selectedNode = null;
        createLink();
      };


      const resetMouseVars = () => {
      mousedownNode = null;
      mouseupNode = null;
      mousedownLink = null;
      };

      const spliceLinksForNode = node => {
      const toSplice = links.filter(l => l.source === node || l.target === node);
      for (const link of toSplice) {
        links.splice(links.indexOf(link), 1);
      }
      };

      const createLink = () => {
      // add link to graph (update if exists)
      const target = mouseupNode;
      const source = mousedownNode;
      const source_exist = links.find(
        link =>
          (link.sourcePosition === source.optionSelect &&
            link.source.id === source.id) ||
          (link.targetPosition === source.optionSelect &&
            link.target.id === source.id)
      );
      const target_exist = links.find(
        link =>
          (link.sourcePosition === target.optionSelect &&
            link.source.id === target.id) ||
          (link.targetPosition === target.optionSelect &&
            link.target.id === target.id)
      );
      if (
        !source_exist &&
        !target_exist &&
        source.optionSelect &&
        target.optionSelect
      ) {
        links.push({
          id: `link${faker.random.number()}`,
          source: source,
          target: target,
          sourcePosition: source.optionSelect,
          targetPosition: target.optionSelect,
          confirm: false
        });
        source[source.optionSelect].isLink = true;
        target[target.optionSelect].isLink = true;
      } else {
        alert("error pass max connections");
      }
      source.optionSelect = null;
      target.optionSelect = null;
      resetMouseVars();
      restart();
      };

      this.handlerRestart = () => restart();

      const set_focus = d => {
      if (d.type === "VNF" && !d.isOpen) {
        selectAll(`g #${d.id} .option_menu`).classed("hidden", false);
        select(`g #${d.id} rect`).style("filter", "url(#shadow)");
      }
      };

      const unset_focus = d => {
      if (d.type === "VNF" && !d.isOpen) {
        selectAll(`g #${d.id} .option_menu`).classed("hidden", true);
      }
      select(`g #${d.id} rect`).style("filter", "");
      };

      // Open info
      const showTooltip = node => {
      node.isOpen = !node.isOpen;
      if (node.isOpen) {
        selectAll(`g #${node.id} .group_VNF_menu rect.menu`).attr(
          "fill",
          "#404F57"
        );
        selectAll(`g #${node.id} .menu_otpions`).classed("visibility", false);
        select(`g #${node.id} rect`).style("filter", "");
        selectedNode = node;
      } else {
        selectAll(`g #${node.id} .group_VNF_menu rect.menu`).attr(
          "fill",
          "transparent"
        );
        selectAll(`g #${node.id} .menu_otpions`).classed("visibility", true);
      }
      };

      const confirmLink = link => {
      selectLink = link;
      selectAll("#option_link").attr(
        "transform",
        `translate(${(svgMousePosition.x - zoomPosition.x) /
          zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
          zoomPosition.k}) `
      );
      selectAll("#option_link .menu_otpions").classed("visibility", false);
      };

      const deleteNodes = () => {
      if (selectedNode) {
        nodes.splice(nodes.indexOf(selectedNode), 1);
        // decrement connections on links
        const foundLinks = filter(
          links,
          link =>
            link.source.id === selectedNode.id || link.target.id === selectedNode.id
        );
        foundLinks.forEach(link => {
          if (link.source.id !== selectedNode.id) {
            const id = link.source.id;
            const node = nodes.find(node => node.id === id);
            node[link.sourcePosition].isLink = false;
            removeCircleOption(node, link.sourcePosition);
          } else {
            const id = link.target.id;
            const node = nodes.find(node => node.id === id);
            node[link.targetPosition].isLink = false;
            removeCircleOption(node, link.targetPosition);
          }
        });
        spliceLinksForNode(selectedNode);
        this.removeN({nodes:nodes,links:links})
      }
      selectedNode = null;
      };

      const removeCircleOption = (node, position) => {
      switch (node.type) {
        case "start":
          return select(`g #${node.id} .option_start`).classed("hidden", true);
        case "stop":
          return select(`g #${node.id} .option_stop`).classed("hidden", true);
        default:
          return select(`g #${node.id} .option_VNF_${position}`).classed("hidden", true);
      }
      };

      // Zoom
      function zoomed() {
      zoomPosition ={
        x: event.transform.x + 240,
        y: event.transform.y + 136,
        k: event.transform.k
      };
      gZoom.attr("transform", event.transform);
      }

      // Remove links
      const removeLink = () => {
      //selectLink
      nodes.forEach(node => {
        if (node.id === selectLink.source.id) {
          node[selectLink.sourcePosition].isLink = false;
          removeCircleOption(node, selectLink.sourcePosition);
        } else if (node.id === selectLink.target.id) {
          node[selectLink.targetPosition].isLink = false;
          removeCircleOption(node, selectLink.targetPosition);
        }
      });
      links = reject(links, link => link.id === selectLink.id);
      selectAll("#option_link .menu_otpions").classed("visibility", true);
      restart();
      };

      // Shadow VNF
      // create filter with id #drop-shadow
      // height=130% so that the shadow is not clipped
      var shadow = svg
      .append("filter")
      .attr("id", "shadow")
      .attr("height", "130%")

      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
      shadow
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 1.7)
      .attr("result", "blur");

      // ADD color to background
      shadow
      .append("feFlood")
      .attr("flood-color", "#5A666D")
      .attr("flood-opacity", "0.9")
      .attr("result", "offsetColor");

      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      shadow
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 5)
      .attr("dy", 5)
      .attr("result", "offsetBlur");

      shadow
      .append("feComposite")
      .attr("in", "offsetColor")
      .attr("in2", "offsetBlur")
      .attr("operator", "in")
      .attr("result", "offsetBlur");


      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
      var feMerge = shadow.append("feMerge")

      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");



      // app starts here
      function mousemove() {
      svgMousePosition.x = event.pageX;
      svgMousePosition.y = event.pageY;
      if (!mousedownNode) return;
      // update drag line
      dragLine.attr("d", () => {
        switch (mousedownNode.optionSelect) {
          case "left":
            return `M${mousedownNode.x},${mousedownNode.y +
              mousedownNode.h / 2}L${(svgMousePosition.x - zoomPosition.x) /
              zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
              zoomPosition.k}`;
          case "right":
            return `M${mousedownNode.x + mousedownNode.w},${mousedownNode.y +
              mousedownNode.h / 2}L${(svgMousePosition.x - zoomPosition.x) /
              zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
              zoomPosition.k}`;
          case "top":
            return `M${mousedownNode.x + mousedownNode.w / 2},${
              mousedownNode.y
            }L${(svgMousePosition.x - zoomPosition.x) /
              zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
              zoomPosition.k}`;
          case "bottom":
            return `M${mousedownNode.x + mousedownNode.w / 2},${mousedownNode.y +
              mousedownNode.h}L${(svgMousePosition.x - zoomPosition.x) /
              zoomPosition.k},${(svgMousePosition.y - zoomPosition.y) /
              zoomPosition.k}`;
          default:
            return `M${mousedownNode.x},${mousedownNode.y}L${svgMousePosition.x},${
              svgMousePosition.y
            }`;
        }
      });
      restart();
      }

      function mouseup() {
      if (!mouseupNode && !isMouseUpConfig) {
        if(mousedownNode){
          const findNode = nodes.find(node => node.id === mousedownNode.id);
          findNode[findNode.optionSelect].isLink = false;
          removeCircleOption(findNode, findNode.optionSelect);
        }
        if(optionSelect_Draw){
          removeCircleOption(optionSelect_Draw.node, optionSelect_Draw.position)
          const findNodeMouseUp = nodes.find(node => node.id === optionSelect_Draw.node.id)
          findNodeMouseUp[optionSelect_Draw.position].isLink = false
        }
      }
      dragLine.classed("hidden", true);
      isMouseUpConfig = false
      // clear mouse event vars
      resetMouseVars();
      }

      function mousedown() {
      if (mousedownNode || mousedownLink) return;
      restart();
      }

      svg
      .on("mousedown", mousedown)
      .on("mousemove", mousemove)
      .on("mouseup", mouseup);

      restart();

  }

  render() {

    const { d3Data }= this.props

    return(
    d3Data &&
      <D3>
        <svg
          width={this.state.width}
          height={this.state.height}
          id={'composer'}
        />
      </D3>
    )
  }
}

export default Logic(Dimensions()(Composer))

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
