/**
 * Select Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'
import  Select from './index'

const examples = [{
  label: 'Example 1',
  value: 1
}];

const bStyle = {
  padding:'30px',
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};

const fakeOptions = [{
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

const selectTestOne = () => (
  <div style={bStyle}>
      <Select placeholder={'wazaaaa'} options={fakeOptions} />
  </div>
)
const selectTestTwo = () => (
  <div style={bStyle}>
  <Select placeholder={'change type'} title={'Nº of Instantiated services'} type={'default'} options={fakeOptions} />
  <Select placeholder={'change type'} uppercase title={'Uppercase'} type={'default'} options={fakeOptions} />
  <Select placeholder={'change type'} uppercase title={'Uppercase'} type={'default'} options={fakeOptions} headerNav/>
</div>
)

storiesOf('Select', module)
  .add('default', selectTestTwo)
  .add('primary', selectTestOne)