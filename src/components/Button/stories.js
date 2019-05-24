/**
 * Button Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { DeleteIcon, CirclePlusIcon } from 'components/Icons'


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

const BtnDanger = () => (
  <Button type={'danger'}>No</Button>
)

const BtnOutline = () => (
  <div>
  <Button
    outline={true}
    type={'secondary'}
    text={'Close'}
    icon={'close'}
  />
  <Button
    outline={true}
    type={'primary'}
    text={'Add new'}
    width={236}
    height={48}
    svg={<CirclePlusIcon fill={'#8CC14E'} />}
  />
</div>
)

storiesOf('Button', module)
  .add('Primary', BtnPrimary)
  .add('Secondary', BtnSecondary)
  .add('Btn + Icon', BtnIcon)
  .add('Danger', BtnDanger)
  .add('Outline', BtnOutline)
