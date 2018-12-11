/**
 * SliceNew Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Form, Checkbox } from 'element-react'

 /* Containers */
import SliceMap from 'containers/SliceMap'

/* Components */
import HeaderNav from 'components/HeaderNav'
import Modal from 'components/Modal' 
import Button from 'components/Button'
import Input from 'components/Input'
import PanelRight from 'components/PanelRight'
import { NodeMarkerIcon, BackIcon } from 'components/Icons'



const headerItems = [
  { id: 1,
    type: 'shopCart'
  }
]


class SliceNew extends Component {


  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }
  

  modalBody = () => {
    const { change } = this.actions
    const { sliceName } = this.props
      return(
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Item label="Slice name" labelWidth="120">
          <Input 
            value={sliceName} 
            onChange={(value) => change(value)} />
        </Form.Item>
      </Form>
      )
  }

  footerButton = () => {
    const { createSlice } = this.actions
    const { loading } = this.props
    
    return(
      <ContainerButton>
        <Button description={'Submit request'} icon={'check'} type={'primary'} onClick={createSlice} loading={loading}/>
      </ContainerButton>
    )
  }
 
infoMarkerContainer = () => { 
  const { pinsResources, selectPin } = this.props
  const { changeNetwork, changeComputes, changeHotspot } = this.actions
  const marker = pinsResources[selectPin]
  const computes = marker.location.resources.computes
  const networks = marker.location.resources.networks
  const hotspots = marker.location.resources.hotspots

  return ( 
      <Form model={marker} labelWidth="120" labelPosition={'top'} key={marker.id}>
        <Form.Item>
            {computes &&
              <TitlePanel>Computing</TitlePanel>
            }
            {computes && computes.map((computeinfo,i) =>
              {
                return (
                  <Checkbox.Group
                  value={computeinfo.ischecked === false ? []: [computeinfo.name]} 
                  onChange={(value) => changeComputes(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
                    <Checkbox key={computeinfo.id} label={computeinfo.name}>
                      <Name>{computeinfo.name}</Name>
                      <Id>{computeinfo.id}</Id>
                    </Checkbox>
                  </Checkbox.Group>
                )       
              })
            }          
          </Form.Item> 

      <React.Fragment>
      {networks &&
        <TitlePanel>Network</TitlePanel>
      }
      {networks && networks.map((networkinfo,i) =>
        <React.Fragment>
          <Form.Item>
            <Checkbox.Group 
              value={networkinfo.ischecked === false ? []: [networkinfo.name]} 
              onChange={(value) => changeNetwork(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
              <Checkbox key={networkinfo.id} label={networkinfo.name}>
                <Name>{networkinfo.name}</Name>
                <Id>{networkinfo.id}</Id>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {networkinfo.ischecked &&
          <FormContainer key={i}>
          <Form.Item key={networkinfo.id} label="CIDR" >
            <Input type="text" value={networkinfo.cidr} onChange={(value) => changeNetwork(selectPin,i,'cidr',value)}/>
          </Form.Item>
          <Form.Item key={networkinfo.id} label="tag">
            <Input type="text" value={networkinfo.tag} onChange={(value) => changeNetwork(selectPin,i,'tag',value)}/>
          </Form.Item>
          </FormContainer>
          }
        </React.Fragment>
      )}
       {hotspots &&
        <TitlePanel>Wifi</TitlePanel>
      }
      {hotspots && hotspots.map((hotspot,i) =>
        <React.Fragment>
          <Form.Item>
            <Checkbox.Group 
              value={hotspot.ischecked === false ? []: [hotspot.name]} 
              onChange={(value) => changeHotspot(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
              <Checkbox key={hotspot.id} label={hotspot.name}>
                <Name>{hotspot.name}</Name>
                <Id>{hotspot.id}</Id>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </React.Fragment>
      )}
    </React.Fragment>
    </Form> 
  )
}

 


  state = {
    viewport: {
      width: this.props.containerWidth,
      height: this.props.containerHeight,
      latitude: 41.39695180342038,
      longitude: 2.1569907609795886,
      zoom: 12,
    }
  };

 


  render () {

    const { pinsResources, dialogVisible, visiblePanel, error } = this.props
    const { updateMarker, openModal, closeModal, closePanel, openPanel } = this.actions 

    return (
      <Wrapper>
        <HeaderNav 
         buttonBack={<BackIcon />}
         navigateBack={() => this.navigateToBack()} 
         name={'Add new slice'} 
         leftContent={headerItems} 
         clickFunction={openModal} 
         />
        <PanelRight 
          show={visiblePanel} 
          closeNav={closePanel}
          headerIcon={<NodeMarkerIcon height={30} width={30} />} 
          container={pinsResources && this.infoMarkerContainer()}
          bottomPanel= {<Button size={'xxxlarge'} svg={<BackIcon />} description={'Update Card'} type={'primary'} onClick={updateMarker}/>}
          action={(item) => console.log(item)} 
        />
        <SliceMap 
        viewport={this.state.viewport} 
        markers={pinsResources} 
        onClick={(marker) =>openPanel(marker) } 
        /> 
        <Modal 
          size={'tiny'} 
          showClose={true}
          onCancel={closeModal}
          title="Confirm acquisition" 
          visible={dialogVisible} 
          bodyContent={ this.modalBody() }
          footerContent={ this.footerButton() }
        />
        <Modal 
          size={'tiny'} 
          showClose={true}
          onCancel={closeModal}
          title="Error" 
          visible={error} 
          bodyContent={<h2>An error occured</h2> }
        />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(SliceNew))

const Wrapper = styled.div`
  height: calc(100% - 80px) !important;
`

const ContainerButton = styled.div``

/* const PanelInfo = styled.div`
.noBorder {
  border-bottom: none;
}

.el-checkbox+.el-checkbox{
  margin: 0;
}
` */
const TitlePanel = styled.h5`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 32px 0 24px 0;
  font-size: 20px;
  line-height: 20px;
`

/* const TypeMarker = styled.div`
  border-bottom: 1px solid rgba(239,242,247,0.1);
  ` */

const Name = styled.p`
  margin: 12px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${({ theme }) => theme.fontFamily};

`

const Id = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: #89979F;
`

const FormContainer = styled.div`
  margin-top: 20px;
  margin-left: 32px;
`