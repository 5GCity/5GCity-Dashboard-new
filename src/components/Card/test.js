/**
 * Card Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Card from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<Card />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
