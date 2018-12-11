/**
 * NavItem Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import NavItem from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<NavItem />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
