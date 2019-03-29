/**
 * SDKService Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

/* Containers */
import NavBar from 'containers/Navbar'
import ListSDKServices from 'containers/Lists/ListSDKServices'

/* Components */
import PageTitle from 'components/PageTitle'

class SDKService extends Component {

  navigate = path => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    return (
      <Wrapper>
        <PageTitle
          title={'My Repository - Services'}
          buttonTitle={'Add new service'}
          type={'primary'}
          icon={'plus'}
          buttonFunction={() => this.navigate('/sdk/composer/0')}
        />
        <NavBar />
        <ListSDKServices />
      </Wrapper>
    )
  }
}


export default withRouter(Logic(SDKService))

const Wrapper = styled.div`
  margin-left:120px;
  padding: 0 24px;
`
