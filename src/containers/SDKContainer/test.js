/**
 * sdk Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import SDKContainer from './index'

it('renders correctly', () => {
  const tree = renderer
    .create(<SDKContainer />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
