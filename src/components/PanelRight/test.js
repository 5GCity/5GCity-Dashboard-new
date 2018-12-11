/**
 * Sidebar Component Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Sidebar from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const fakeData = {
    title:"0020110b0c30c",
    subtitle: "Cabinet"
  }

  const tree = renderer
    .create(<Sidebar data={fakeData} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
