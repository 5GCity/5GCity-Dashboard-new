/**
 * Icon Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Icon from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<Icon />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
