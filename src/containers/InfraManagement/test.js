/**
 * infraManagement Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import infraManagement from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<infraManagement />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
