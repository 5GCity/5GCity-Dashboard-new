/**
 * AlertMessages Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import AlertMessages from './index'
const alerts = [
  {id: 1, type: 'danger', title:'asdkasjdkj-asd', location: 'eu.5gcity-nfv.vnf.0.3', description: 'App has unused connection points: [vdu02:eth3]'},
  {id: 2, type: 'danger', title:'evt_vnfd_itg_unused_cpoint', location: 'eu.5gcity-nfv.vnf.0.3', description: 'connection points'}
]
const State1 = () => (
  <div>
  <AlertMessages
    title={alerts[0].title}
    location={alerts[0].location}
    description={alerts[0].description}
    type={alerts[0].type}
  />
    <AlertMessages
    title={alerts[1].title}
    location={alerts[1].location}
    description={alerts[1].description}
    type={alerts[1].type}
  />
  </div>
)

storiesOf('AlertMessages', module)
  .add('primary', State1)
