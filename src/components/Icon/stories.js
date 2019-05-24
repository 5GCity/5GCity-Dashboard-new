/**
 * Icon Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from './index'
import { DeleteIcon } from 'components/Icons'


const exampleOne = () => (
    <Icon svg={<DeleteIcon />}/>
)

const exampleTwo = () => (
    <Icon small icon={'edit'}/>
)

storiesOf('Icon', module)
  .add('default', exampleOne)
  .add('small',exampleTwo)
