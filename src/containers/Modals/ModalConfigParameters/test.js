/**
 * ModalConfigParameters Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ModalConfigParameters from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<ModalConfigParameters />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
