---
to: src/components/<%=name%>/stories.js
---
/**
 * <%=name%> Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'

import <%=name%> from './index'

const State1 = () => (
  <<%=name%> />
)

storiesOf('<%=name%>', module)
  .add('primary', State1)