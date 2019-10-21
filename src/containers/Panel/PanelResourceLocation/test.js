/**
 * PanelResourceLocation Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import PanelResourceLocation from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<PanelResourceLocation />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
