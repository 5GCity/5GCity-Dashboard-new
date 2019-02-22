/**
 * ModalRemove Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ModalRemove from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<ModalRemove />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})