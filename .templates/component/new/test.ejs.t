---
to: src/components/<%=name%>/test.js
---
/**
 * <%=name%> Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import <%=name%> from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<<%=name%> />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
