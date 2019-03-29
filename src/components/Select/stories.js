/**
 * Select Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import  Select from './index'

const examples = [{
  label: 'Example 1',
  value: 1
}];

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
      <Select placeholder={'wazaaaa'} options={fakeOptions}  onChange={action('Change Value')}/>
)
const selectTestTwo = () => (
  <React.Fragment>
    <Select placeholder={'change type'} title={'Nº of Instantiated services'} type={'default'} options={fakeOptions} onChange={(e) => action(e)} />
    <Select placeholder={'change type'} uppercase title={'Uppercase'} type={'default'} options={fakeOptions} />
    <Select placeholder={'change type'} uppercase title={'Uppercase'} type={'default'} options={fakeOptions} />
  </React.Fragment>
)

storiesOf('Select', module)
  .add('primary', selectTestOne)
