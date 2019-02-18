/**
 * PageTitle Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'


import PageTitle from './index'

const bStyle = {
  padding:30,
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};

const State1 = () => (
  <div style={bStyle}>
  <PageTitle title={'Add new network service'} buttonTitle={'Add Slice'} type={'primary'} icon={'plus'} />
  </div>
)

storiesOf('PageTitle', module)
  .add('primary', State1)