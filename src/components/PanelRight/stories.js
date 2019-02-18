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

const bStyle = {
  backgroundColor: Theme.backgroundColor,
  height:'100%'
}

const fakeData = {
  title:"0020110b0c30c",
  subtitle: "Cabinet"
}

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
    show: true,
  }

  render () {

  const bStyle = {
  padding: '30px',
  backgroundColor: Theme.bodyBackground,
  height:'100%'
}

 //
  const info = (marker) => {
    console.log(marker);
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
        closeNav={() => this.setState({show: false})}
        headerIcon={<NodeMarkerIcon height={30} width={30} />}
        action={(item) => console.log(item)}
        container={info(marker)}
        buttonNav={<Button onClick={() => this.setState({show: true})} description={'show'} type={'primary'} />}/>
        <Button onClick={() => this.setState({show: true})} description={'show'} type={'primary'} />
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

storiesOf('Panel Right', module)
  .add('default', exampleOne)
