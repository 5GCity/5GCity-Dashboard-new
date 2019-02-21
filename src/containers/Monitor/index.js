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
  Legend } from 'recharts'
import styled from 'styled-components'


const CustomTickX = (props) => {
    const { x, y, payload } = props;

    return (
      <text x={x} y={y + 10} fill="#fff" fontSize={12} textAnchor="middle" dominantBaseline="hanging">
        {payload.value}
      </text>
    );
}

const CustomTickY = (props) => {
  const { x, y, payload ,unitData } = props;

  return (
    <text x={x - 25} y={y -10} fill="#fff" fontSize={12} textAnchor="middle" dominantBaseline="hanging">
      {payload.value} {unitData}
    </text>
  );
}


class Monitor extends Component {
  render () {
    const { data, width, max, height, title, colorArea, datakeyAxis, dataKeyArea, unit } = this.props
    return (
      <ComposedChart
        height={height}
        width={width}
        data={data}
        margin={{ top: 5, right: 5, bottom: 12, left: 5 }}
      >
        <Legend
          verticalAlign="top"
          content={
          <div>
            <Title color={colorArea}>{title}</Title>
          </div>}
        />
        <XAxis
          padding={{left: 0, right: 0}}
          orientation={'bottom'}
          dataKey={datakeyAxis}
          tick={<CustomTickX />}
        >
        </XAxis>
        <YAxis
          tick={<CustomTickY unitData={unit} />}
          domain={[0, max]}
        >
          </YAxis>
        <Tooltip/>
        <Area
          type='monotone'
          dataKey={dataKeyArea}
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

const Title = styled.h3`
  color: ${({color}) => color || '#fff' };
`
