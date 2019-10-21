/**
 * ModalCreateOrganisation Container Tests
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import ModalCreateOrganisation from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<ModalCreateOrganisation />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
