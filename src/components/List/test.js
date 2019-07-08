/**
 * List Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import List from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<List />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
