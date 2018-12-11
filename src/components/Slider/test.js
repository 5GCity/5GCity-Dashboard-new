/**
 * Slider Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Slider from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<Slider />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
