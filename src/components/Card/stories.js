/**
 * Card Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'
import Card from './index'

const bStyle = {
  padding: '30px',
  backgroundColor: Theme.bodyBackground,
  height: '100%'
}

const example1 = () => (
  <div style={bStyle}>
    <Card>
      <div className='text item'>List item 1</div>
      <div className='text item'>List item 2</div>
      <div className='text item'>List item 3</div>
      <div className='text item'>List item 4</div>
    </Card>
  </div>
)

const example2 = () => (
  <div style={bStyle}>
    <Card
      header={
        <div>
          <span>Card Name</span>
        </div>
  }
>
      <div className='text item'>List item 1</div>
      <div className='text item'>List item 2</div>
      <div className='text item'>List item 3</div>
      <div className='text item'>List item 4</div>
    </Card>
  </div>
)

storiesOf('Card', module)
  .add('default', example1)
  .add('default + header', example2)
