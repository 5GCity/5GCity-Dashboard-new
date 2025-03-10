/**
 * SDKFunctions Scene
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

/* Containers */
import NavBar from 'containers/Navbar'
import ListSDKFunctions from 'containers/Lists/ListSDKFunctions'
import PageTitleOrganization from 'containers/PageTitleOrganization'

/* Components */
import { PlusIcon } from 'components/Icons'

class SDKFunctions extends Component {
  navigate = path => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    return (
      <Wrapper>
        <PageTitleOrganization
          title={'My Repository - Functions'}
          buttonTitle={'Add new function'}
          type={'primary'}
          icon={<PlusIcon />}
          onClick={() => this.navigate('/sdk/function/0')}
        />
        <NavBar />
        <ListSDKFunctions />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(SDKFunctions))

const Wrapper = styled.div`
  margin-left:120px;
  padding: 0 24px;
`
