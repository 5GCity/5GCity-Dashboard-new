/**
 * Brand Component Tests
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Brand from './index'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
    .create(<Brand />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
