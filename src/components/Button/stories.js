/**
 * Button Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { DeleteIcon, CirclePlusIcon, CheckIcon } from 'components/Icons'

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
      svg={<DeleteIcon />}
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

const BtnLoading = () => (
  <Button type={'primary'} loading svg={<CheckIcon />}>Yes</Button>
)

const BtnOutline = () => (
  <div>
    <Button
      outline
      type={'secondary'}
      text={'Close'}
      icon={'close'}
    />
    <Button
      outline
      type={'primary'}
      text={'Add new'}
      width={236}
      height={48}
      svg={<CirclePlusIcon fill={'white'} />}
    />
    <Button
      outline
      type={'primary'}
      text={'Add new'}
      width={236}
      height={48}
      disabled={true}
      svg={<CirclePlusIcon fill={'white'} />}
    />
  </div>
)

storiesOf('Button', module)
  .add('Primary', BtnPrimary)
  .add('Secondary', BtnSecondary)
  .add('Btn + Icon', BtnIcon)
  .add('Danger', BtnDanger)
  .add('Loading', BtnLoading)
  .add('Outline', BtnOutline)
