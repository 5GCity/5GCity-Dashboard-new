/**
 * PanelWifisView Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import PanelWifisView from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<PanelWifisView />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
