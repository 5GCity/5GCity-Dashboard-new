/**
 * Progress Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles';

import Progress from './index'

const bStyle = {
  padding:'30px',
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};

const cpus = {
	height: '12px',
	width: '60px',
	color: '#FFFFFF',
	fontFamily: 'Open Sans',
	fontSize: '12px',
	lineHeight: '12px'
}


const example_1 = () => (
  <div style={bStyle}>
    <p style={cpus}>12/64 GB</p>
    <Progress percentage={20} type={'line'} textInside={false} showText={false} /><br/>
    <p style={cpus}>45/64 GB</p>
    <Progress percentage={70} type={'line'} textInside={false} showText={false} status={'warning'}/><br/>
    <p style={cpus}>63/64 GB</p>
    <Progress percentage={99} type={'line'} textInside={false} showText={false} status={'danger'}/>
  </div>
)


storiesOf('Progress', module)
  .add('line', example_1)