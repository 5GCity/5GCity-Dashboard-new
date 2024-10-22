/**
 * Modal Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Modal from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<Modal onCancel={false} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
