/**
 * Network Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Container */
import NavBar from 'containers/Navbar'

/* Components */
import PageTitle from 'components/PageTitle'
import { PlusIcon } from 'components/Icons'

/* Container */
import ListNetworks from 'containers/Lists/ListNetworks'

class Network extends Component {

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    return (
      <Wrapper>
        <PageTitle
          title={'running network services'}
          buttonTitle={'Add new network service'}
          type={'primary'}
          svg={<PlusIcon />}
          buttonFunction={() => this.navigate('/network/new')}
        />
        <NavBar />
       <ListNetworks />
      </Wrapper>
    )
  }
}


export default Logic(Network)

const Wrapper = styled.div`
  margin-left: 120px;
  padding: 0 24px;
`
