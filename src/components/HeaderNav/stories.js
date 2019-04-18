/**
 * HeaderNav Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import  HeaderNav from './index'

/* Components */
import Button from 'components/Button'
import { DeleteIcon } from 'components/Icons'


const headerItems = [
  { id: 1,
    type: 'switch',
    name: 'Show bandwidth',
    defaultValue: true,
  },
  { id: 2,
    type: 'select',
    placeholder: 'All types',
    style: 'default',
    options:[{
      id: 1,
      name: "One",
      value: "wazaaaaaaa"
      },{
      id: 2,
      name: "Two",
      value: "aaaaaaaaaaa"
      },{
      id: 3,
      name: "Three",
      value: "up",
      disabled: true
    }]
  },{ id: 3,
    type: 'select',
    placeholder: 'All status',
    style: 'default',
    options:[{
      id: 1,
      name: "One",
      value: "wazaaaaaaa"
      },{
      id: 2,
      name: "Two",
      value: "aaaaaaaaaaa"
      },{
      id: 3,
      name: "Three",
      value: "up",
      disabled: true
    }]
  }
]


const exampleOne = () => (
  <HeaderNav
    name={'Add new slice'}
    buttonBack={true}
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
      svg={ <DeleteIcon /> }
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
