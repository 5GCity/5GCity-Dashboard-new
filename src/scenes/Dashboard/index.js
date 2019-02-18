/**
 * Dashboard Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

// Containers
import SlicesStatus from 'containers/SlicesStatus';
import Navbar from 'containers/Navbar'

// Components
import PageTitle from 'components/PageTitle';
import Tabs from 'components/Tabs';

class Dashboard extends Component {

  componentDidMount () {
      const { history } = this.props
      history.push('/slices')
  }

  render () {
    return (
      <Wrapper>
      <Navbar />
      <PageTitle title={'dashboard'}/>
        <Tabs activeName='2' onTabClick={(tab) => console.log(tab.props.name)}>
          <Container label='Current usage' name='1'><SlicesStatus /></Container>
          <Container label='Allocation' name='2'>Allocation</Container>
        </Tabs>

      </Wrapper>
    )
  }
}


export default Logic(Dashboard)

const Wrapper = styled.div`
  margin-left:120px;
  padding: 0 24px;
`
const Container = styled.div`
`

