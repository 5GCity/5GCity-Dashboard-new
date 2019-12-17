/**
 * ListAlerts Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ListAlerts from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<ListAlerts />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
