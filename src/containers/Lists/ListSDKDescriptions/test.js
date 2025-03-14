/**
 * ListSDKDescriptions Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ListSDKDescriptions from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<ListSDKDescriptions />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
