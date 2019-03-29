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
import { BackIcon } from 'components/Icons'



const headerItems = [
  { id: 1,
    type: 'shopCart'
  }
]

const ModalCreateSlice = (props) => (
  <Modal
    size={'tiny'}
    showClose={true}
    onCancel={props.modalNewSliceStatus}
    visible={props.modalNewSlice}
    title="Confirmation"
  >
    <Form
      model={props.form}
    >
    <Modal.Body>
      <Form.Item
        label="Slice name"
        labelPosition={'top'}
      >
        <Input
          value={props.form.nameSlice}
          onChange={value => props.changeForm('nameSlice',value)}
        />
      </Form.Item>
    </Modal.Body>
    <Modal.Footer>
      <ContainerButton>
        <Button
          text={'Submit request'}
          icon={'check'}
          type={'primary'}
          onClick={props.createSlice}
          loading={props.loading}
        />
      </ContainerButton>
    </Modal.Footer>
    </Form>
  </Modal>
);

const ModalError = (props) => (
  <Modal
    size={'tiny'}
    showClose={true}
    onCancel={props.modalStatus}
    title="Error"
    visible={props.modalError}
  >
    <Modal.Body>
      <Erro>{props.error}</Erro>
    </Modal.Body>
    <Modal.Footer />
  </Modal>
);

class SliceNew extends Component {


  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  infoMarkerContainer = () => {
    const { pinsResources, selectPin } = this.props
    const { changeNetwork, changeComputes, changeSDN } = this.actions
    const marker = pinsResources[selectPin]
    const computes = marker.location.resources.computes
    const networks = marker.location.resources.networks
    const sdnWifi = marker.location.resources.sdnWifi

    return (
      <Form
        model={marker}
        labelWidth="120"
        labelPosition={'top'}
        key={marker.id}>
        <Form.Item>
          {computes &&
            <TitlePanel>Computing</TitlePanel>
          }
          {computes && computes.map((compute,i) => {
            return (
              <Checkbox.Group
                key={i}
                value={compute.ischecked === false ? []: [compute.name]}
                onChange={(value) => changeComputes(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
                <Checkbox
                  key={compute.id}
                  label={compute.name}
                >
                  <Name>{compute.name}</Name>
                  <Id>{compute.id}</Id>
                  <Id>CPU: 6 cores </Id>
                  <Id>RAM: 6 GB </Id>
                  <Id>DISK: 250GB </Id>
                </Checkbox>
              </Checkbox.Group>
            )
          })}
      </Form.Item>

      <React.Fragment>
      {networks &&
        <TitlePanel>Network</TitlePanel>
      }
      {networks && networks.map((network,i) =>
        <React.Fragment key={i}>
          <Form.Item >
            <Checkbox.Group
              value={network.ischecked === false ? []: [network.name]}
              onChange={(value) => changeNetwork(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
              <Checkbox
                key={network.id}
                label={network.name}
              >
                <Name>{network.name}</Name>
                <Id>{network.id}</Id>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {network.ischecked &&
          <FormContainer key={i}>
          <Form.Item label="CIDR" >
            <Input
              type="text"
              value={network.cidr}
              onChange={(value) => changeNetwork(selectPin,i,'cidr',value)}
            />
            {/*<InputMask
            mask={[/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/,'.',/\d/,'/',/\d/, /\d/]}
            type="text"
            value={network.cidr}
            onChange={(value) => changeNetwork(selectPin,i,'cidr',value)}
            /> */}
          </Form.Item>
          </FormContainer>
          }
        </React.Fragment>
      )}
        {sdnWifi &&
        <TitlePanel>Wifi</TitlePanel>
      }
      {sdnWifi && sdnWifi.map((sdnWifi,i) =>
        <React.Fragment key={i}>
          <Form.Item>
            <Checkbox.Group
              value={sdnWifi.ischecked === false ? []: [sdnWifi.name]}
              onChange={(value) => changeSDN(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
              <Checkbox label={sdnWifi.name}>
                <Name>{sdnWifi.name}</Name>
                <Id>{sdnWifi.id}</Id>
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {sdnWifi.ischecked &&
          <FormContainer key={i}>
          <Form.Item label="Name" >
            <Input
              type="text"
              value={sdnWifi.sdnWifiName}
              onChange={(value) => changeSDN(selectPin,i,'sdnWifiName',value)}/>
          </Form.Item>
          <Form.Item label="DNS IP" >
            <Input
              type="text"
              value={sdnWifi.dns}
              onChange={(value) => changeSDN(selectPin,i,'dns',value)}/>
          </Form.Item>
          <Form.Item label="DHCPD IP" >
            <Input
              type="text"
              value={sdnWifi.dhcpd}
              onChange={(value) => changeSDN(selectPin,i,'dhcpd',value)}/>
          </Form.Item>
          <Form.Item label="Channel">
            <Input
              type="text"
              value={sdnWifi.channel}
              onChange={(value) => changeSDN(selectPin,i,'channel',value)}/>
          </Form.Item>
          </FormContainer>
          }
        </React.Fragment>
      )}
    </React.Fragment>
    </Form>
    )
  }

  render () {

    const { pinsResources,
      modalNewSlice,
      visiblePanel,
      modalError,
      error,
      loading,
      sliceName,
      formSlice,
      } = this.props
    const {
      updateMarker,
      modalNewSliceStatus,
      modalStatus,
      actionPanel,
      createSlice,
      change,
      setValue,
      selectLocation,
    } = this.actions
    return (
      <Wrapper>
        <HeaderNav
         buttonBack={<BackIcon />}
         navigateBack={() => this.navigateToBack()}
         name={'Add new slice'}
         leftContent={headerItems}
         clickFunction={modalNewSliceStatus}
        />
        <PanelRight
          show={visiblePanel}
          close={actionPanel}
        >
          <Container>
          {pinsResources && this.infoMarkerContainer()}
          </Container>
          <Bottom>
          <BottomContainer>
          <Button
            size={'xxxlarge'}
            svg={<BackIcon />}
            text={'Update Card'}
            type={'primary'}
            onClick={updateMarker}
          />
          </BottomContainer>
          </Bottom>
        </PanelRight>
        <SliceMap
          markers={pinsResources}
          onClick={(marker) =>selectLocation(marker) }
        />
         {/* Modal Create Slice */}
         <ModalCreateSlice
          modalNewSlice={modalNewSlice}
          loading={loading}
          sliceName={sliceName}
          modalNewSliceStatus={modalNewSliceStatus}
          createSlice={createSlice}
          change={change}
          form={formSlice}
          changeForm={setValue}
        />
        {/* Modal Error */}
        <ModalError
          modalError={modalError}
          error={error}
          modalStatus={modalStatus}
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

const TitlePanel = styled.h5`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 32px 0 24px 0;
  font-size: 20px;
  line-height: 20px;
`

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
const Erro = styled.h3`
  text-align: center;
  color: #fff;
`

const Container = styled.div`
  overflow-y: auto;
  margin: 0 0 0 20px;
  max-height: calc(100vh - 200px);
  `

const Bottom = styled.div`
background-color: rgba(255,255,255,0.05);
height: 80px;
width: 100%;
position: absolute;
bottom: 80px;
`
const BottomContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
`
