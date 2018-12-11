/**
 * HeaderNav Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import HeaderNav from './index'
import { Theme } from 'globalStyles';
import Button from 'components/Button';


const bStyle = {
  backgroundColor: Theme.bodyBackground,
  height: '100%',
};

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
  <div style={bStyle}>
    <HeaderNav name={'Add new slice'} buttonBack={true} leftContent={headerItems}/>
  </div>
)

const exampleTwo = () => (
  <div style={bStyle}>
    <HeaderNav type={'transparent'} />
  </div>
)

storiesOf('HeaderNav', module)
  .add('solid', exampleOne)
  .add('transparent', exampleTwo)