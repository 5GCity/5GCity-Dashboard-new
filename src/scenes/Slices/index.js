/**
 * Slices Scene
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

/* Components */
import PageTitle from 'components/PageTitle'
import { PlusIcon } from 'components/Icons'

/* Containers */
import ListSlices from 'containers/Lists/ListSlices'
import Navbar from 'containers/Navbar'

class Slices extends Component {
  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }
  render () {
    return (
      <Wrapper>
        <PageTitle
          title={'slices'}
          buttonTitle={'Add new slice'}
          type={'primary'}
          svg={<PlusIcon />}
          buttonFunction={() => this.navigate('/slices/new')}
        />
        <Navbar />
        <ListSlices />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(Slices))

const Wrapper = styled.div`
  margin-left:120px;
  padding: 0 24px;
`
