/**
 * Chart Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Chart from './index'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 2400, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 2400, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 2400, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 2400, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 2400, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 2400, amt: 2100,
  },
];

const Chart1 = () => (
  <Chart width={600} height={400} data={data} />
)

storiesOf('Chart', module)
  .add('default', Chart1)
