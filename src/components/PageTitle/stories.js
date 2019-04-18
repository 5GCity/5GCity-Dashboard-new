/**
 * PageTitle Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import PageTitle from './index'

const State1 = () => (
  <PageTitle title={'Add new network service'} buttonTitle={'Add Slice'} type={'primary'} icon={'plus'} />
)

storiesOf('PageTitle', module)
  .add('primary', State1)
