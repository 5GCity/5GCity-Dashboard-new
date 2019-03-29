/**
 * Composermain Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

/* Container */
import Composer from 'containers/Composer'
import ComposerMenu from 'containers/ComposerMenu'

class ComposerMain extends Component {

  render () {
    const { catalogue, modalData, modalStatus, d3Data, catalogueMenu } = this.props
    const { modalAction, createNode, removeLink, removeNode, createLink } = this.actions

    return (
      <Wrapper>
        <ComposerMenu
          catalogue={catalogueMenu}
          createNode={createNode}
        />
        <Composer
          catalogue={catalogue}
          modalData={modalData}
          modalStatus={modalStatus}
          modalAction={modalAction}
          d3Data={d3Data}
          removeLink={removeLink}
          removeNode={removeNode}
          createLink={createLink}
        />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(ComposerMain))

const Wrapper = styled.div`
height: calc(100vh - 136px) !important;
`
