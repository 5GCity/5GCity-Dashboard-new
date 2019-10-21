/**
 * HeaderNav Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import HeaderNav from './index'

/* Components */
import Button from 'components/Button'
import { DeleteIcon } from 'components/Icons'

const exampleOne = () => (
  <HeaderNav
    name={'Add new slice'}
    buttonBack
  >
    <HeaderNav.Left>
      <Button
        key={1}
        type={'primary'}
        icon={'edit'}
        text={'Edit'}
    />
      <Button
        key={2}
        type={'primary'}
        svg={<DeleteIcon />}
        text={'Delete'}
    />
    </HeaderNav.Left>
  </HeaderNav>
)

const exampleTwo = () => (
  <HeaderNav type={'transparent'} />
)

storiesOf('HeaderNav', module)
  .add('solid', exampleOne)
  .add('transparent', exampleTwo)
