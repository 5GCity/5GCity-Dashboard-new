/**
 * PanelWifi Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import PanelWifi from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<PanelWifi />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
