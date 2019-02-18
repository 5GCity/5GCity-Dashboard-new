/**
 * Button Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { DeleteIcon } from 'components/Icons'

import Button from './index'


const BtnPrimary = () => (
  <div>
  <Button
    type={'primary'}
    icon={'edit'}
    text={'Edit'}
  />
  <Button
    type={'primary'}
    svg={ <DeleteIcon /> }
    text={'Delete'}
  />
  </div>
)


const BtnSecondary = () => (
  <Button type={'secondary'}>View</Button>
)

const BtnIcon = () => (
  <Button
    type={'secondary'}
    text={'Add from public repository'}
    icon={'plus'}
  />
)


storiesOf('Button', module)
  .add('Primary', BtnPrimary)
  .add('Secondary', BtnSecondary)
  .add('Btn + Icon', BtnIcon)
