/**
 * FormTitle Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import FormTitle from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<FormTitle />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
