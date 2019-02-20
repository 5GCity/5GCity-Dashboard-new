/**
 * Monitor Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Label } from 'recharts'



class Monitor extends Component {
  render () {
    const { data, width, max, height, title, colorArea } = this.props
    return (
        <ComposedChart
          height={height}
          width={width}
          data={data}
          margin={{ top: 5, right: 5, bottom: 12, left: 5 }}
        >
          <XAxis
            dataKey="name"
            tick={{fill: '#fff'}}
          >
          <Label
            value={title}
            offset={250}
            position="top"
            fill={'#fff'}
          />
          </XAxis>
          <YAxis
            tick={{fill: '#fff'}}
          />
          <Tooltip/>
          <Area
            type='monotone'
            dataKey='uv'
            activeDot={false}
            dot={false}
            stroke={colorArea}
            fill={colorArea}
          />
          <ReferenceLine
            y={max}
            stroke="#DD6C6C"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        </ComposedChart>
    )
  }
}

export default Logic(Monitor)

