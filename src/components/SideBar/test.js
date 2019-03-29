/**
 * SideBar Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import SideBar from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<SideBar />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
