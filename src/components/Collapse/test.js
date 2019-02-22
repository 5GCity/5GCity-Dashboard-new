/**
 * Collapse Component Tests
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Collapse from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<Collapse />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
