/**
 * Tabs Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Tab from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(
    <Tab></Tab>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
