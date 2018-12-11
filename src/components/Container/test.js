/**
 * Brand Component Tests
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
import Container from './index'
import 'jest-styled-components'

it('renders as it should', () => {
  const tree = renderer
    .create(
      <Container>
        <div>children element</div>
      </Container>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()

  expect(tree).toHaveStyleRule('max-width', '1200px')
  expect(tree).toHaveStyleRule('margin', '0 auto')
})
