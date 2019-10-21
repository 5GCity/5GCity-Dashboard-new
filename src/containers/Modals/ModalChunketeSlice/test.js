/**
 * ModalChunketeSlice Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ModalChunketeSlice from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<ModalChunketeSlice />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
