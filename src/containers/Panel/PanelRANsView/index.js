/**
 * Panelransview Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Theme } from 'globalStyles'

export default  class PanelRANsView extends Component {
  render () {
    const { rans }= this.props
    return (
      <Wrapper>
       {rans &&
        <Title>RAN Controller</Title>
        }
        {rans && rans.map((ran, i) =>
        <TypeMarker
          className={i === rans.length - 1 && 'noBorder'}
          key={ran.id}>
          <Name>{ran.name}</Name>
          <Id>{ran.id}</Id>
          <Id>Controller Url: {ran.controller_url}</Id>
          <Id>Username: {ran.username}</Id>
        </TypeMarker>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`

`

const Title = styled.h5`
  color: ${Theme.primaryColor};
  font-family: ${Theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
`

const TypeMarker = styled.div`
  border-bottom: 1px solid rgba(239,242,247,0.1);
  `

const Name = styled.p`
  margin: 12px 0;
  font-size: 18px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${Theme.fontFamily};
`

const Id = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${Theme.fontFamily};
  color: #89979F;
`
