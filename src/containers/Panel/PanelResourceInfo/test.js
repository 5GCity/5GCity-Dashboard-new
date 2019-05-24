/**
 * PanelResourceInfo Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import PanelResourceInfo from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<PanelResourceInfo />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
