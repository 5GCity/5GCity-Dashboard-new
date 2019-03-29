/**
 * Sidebar Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'
import styled from 'styled-components'

import PanelRight from './index'

import  { NodeMarkerIcon , DeleteIcon }  from 'components/Icons'
import Button from 'components/Button'

const marker = [{
  type: "Compute",
  id: '5b6308c258f568073093f70e',
  name: 'Compute 1'},
  {
  type: "Compute",
  id: '5b6308c258f568073093f74e',
  name: 'Compute 2'
  },{
  type: "Network",
  id: '5b6308c258f568073093f70e',
  name: 'Network 1'
}]

class PanelRightComponent extends Component {

  state = {
    show: false,
  }

  render () {

  const info = (marker) => {
    return[
   <PanelInfo>
     {marker && marker.map(( el, i ) =>
    <React.Fragment>
    <Title key={el.id}>{el.type === 'Compute' ? 'Computing': 'Network'}</Title>
        <TypeMarke className={ i ===  el.length -1 && 'noBorder'} key={el.id}>
          <Name>{el.name}</Name>
          <Id>{el.id}</Id>
        </TypeMarke>
    </React.Fragment>
     )}
  </PanelInfo>
  ]
  }

  const { show } = this.state
    return (
      <React.Fragment>
        <PanelRight
        show={show}
      >
      <CloseContainer onClick={() => this.setState({show: !show})}></CloseContainer>
      <Title>teste</Title>
      </PanelRight>
      <Button
        text="Show"
        onClick={() => this.setState({show: !show})}
      />
      </React.Fragment>
    )
  }
}

const exampleOne = () => (
  <PanelRightComponent />
)

const PanelInfo = styled.div`
.noBorder {
  border-bottom: none;
}
`
const Title = styled.h5`
  color: ${Theme.primaryColor};
  font-family: ${Theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
`

const TypeMarke = styled.div`
  border-bottom: 1px solid rgba(239,242,247,0.1);
  `

const Name = styled.p`
  margin: 12px 0;
  font-size: 12px;
  line-height: 12px;
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

const CloseContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  text-align: center;
  left: -31px;
  height: 32px;
  font-size: 20px;
  width: 32px;
  color: #89979F;
  background-color: #37474F;
  box-shadow: inset -1px 0 0 0 rgba(0,0,0,0.15), 0 0 50px 0 rgba(0,0,0,0.2);
  cursor: pointer;
`

storiesOf('Panel Right', module)
  .add('default', exampleOne)
