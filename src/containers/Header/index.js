/**
 * Header Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { compose } from 'recompose'
import { connect } from 'kea'
import Logic from './logic'
import styled from 'styled-components'

import Brand from 'components/Brand'
import Container from 'components/Container'

class Header extends Component {
  render () {
    return (
      <Wrapper>
        <SpacedContainer>
          <Brand />
        </SpacedContainer>
      </Wrapper>
    )
  }
}


export default compose(
  connect({
    props: [
      Logic, [

      ]
    ],
    actions: [
      Logic, [

      ]
    ]
  })
)(Header)

const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.headerBackground};
`

const SpacedContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
