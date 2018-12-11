/**
 * Button Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'
import { DeleteIcon } from 'components/Icons';

import Button from './index'

const bStyle = {
  backgroundColor: Theme.bodyBackground,
  height: '100%',
  padding: '30px'
};

const BtnPrimary = () => (
  <div style={bStyle}>
  <Button type={'primary'} icon={'edit'} description={'Edit'}/>
  <Button type={'primary'} svg={ <DeleteIcon /> } description={'Delete'}/>
  </div>
)


const BtnSecondary = () => (
  <div style={bStyle}>
  <Button type={'secondary'}>View</Button>
  </div>
)


storiesOf('Button', module)
  .add('primary', BtnPrimary)
  .add('secondary', BtnSecondary)