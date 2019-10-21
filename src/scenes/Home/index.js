/**
 * Home Scene
 *
 * @author Hugo Fonseca <hfonseca@ubiwhere.com>
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logic from './logic'
import styled from 'styled-components'

class Home extends Component {
  render () {
    return (
      <Wrapper>
        <h1>Home</h1>
        <br />
        <Link to={`/sample`}>Sample Page</Link>
      </Wrapper>
    )
  }
}

export default Logic(Home)

const Wrapper = styled.div``
