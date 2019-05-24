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
import { BackIcon, CheckIcon } from 'components/Icons'
import Select from 'components/Select'


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
          svg={<CheckIcon />}
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
    const { selectSlice, selectPin } = this.props
    const { changeNetwork, changeComputes, changeSDN } = this.actions
    const { computes, networks, sdnWifi} = selectSlice
    return (
      <Form
        labelWidth="120"
        labelPosition={'top'}
      >
        <Form.Item>
          {computes &&
            <TitlePanel>Computing</TitlePanel>
          }
          {computes && computes.map((compute,i) =>
            <React.Fragment key={i}>
              <Checkbox.Group
                value={compute.ischecked === false ? []: [compute.name]}
                onChange={(value) => changeComputes(selectPin,i,'ischecked',value.length > 0 ? true : false)}>
                <Checkbox
                  key={compute.id}
                  label={compute.name}
                >
                  <Name>{compute.name}</Name>
                  <Id>{compute.id}</Id>
                </Checkbox>
              </Checkbox.Group>
              {compute.ischecked &&
              <FormContainer key={i}>
                  <Form.Item label="Name">
                  <Input
                  type="text"
                  value={compute.computeName}
                  onChange={(value) => changeComputes(selectPin,i,'computeName',value)}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                  type="text"
                  value={compute.computeDescription}
                  onChange={(value) => changeComputes(selectPin,i,'computeDescription',value)}
                  />
                </Form.Item>
                <Form.Item label="CPUs">
                  <Input
                  type="text"
                  value={compute.cpus}
                  onChange={(value) => changeComputes(selectPin,i,'cpus',value)}
                  />
                </Form.Item>
                <Id>CPU Total: {compute.computeData.cpus.total} cores </Id>
                <Id>CPU Provisioned: {compute.computeData.cpus.provisioned} cores </Id>
                <Form.Item label="RAM">
                  <Input
                  type="text"
                  value={compute.ram}
                  onChange={(value) => changeComputes(selectPin,i,'ram',value)}
                  />
                </Form.Item>
                <Id>RAM Total: {compute.computeData.ram.total} {compute.computeData.ram.units} </Id>
                <Id>RAM Provisioned: {compute.computeData.ram.provisioned} {compute.computeData.ram.units} </Id>
                <Form.Item label="Storage">
                  <Input
                  type="text"
                  value={compute.storage}
                  onChange={(value) => changeComputes(selectPin,i,'storage',value)}
                  />
                </Form.Item>
                <Id>Storage Total: {compute.computeData.storage.total} {compute.computeData.storage.units} </Id>
                <Id>Storage Provisioned: {compute.computeData.storage.provisioned} {compute.computeData.storage.units} </Id>
              </FormContainer>
              }
              </React.Fragment>
          )}
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
            <Form.Item label="Name">
              <Input
                type="text"
                value={network.networkName}
                onChange={(value) => changeNetwork(selectPin,i,'networkName',value)}
              />
            </Form.Item>
            <Form.Item label="INIT CIDR">
              <Input
                type="text"
                value={network.int_cidr}
                onChange={(value) => changeNetwork(selectPin,i,'int_cidr',value)}
              />
            </Form.Item>
            <Form.Item label="CIDR">
              <Input
                type="text"
                value={network.cidr}
                onChange={(value) => changeNetwork(selectPin,i,'cidr',value)}
              />
            </Form.Item>
            <Form.Item label="Bandwidth">
              <Input
                type="text"
                value={network.bandwidth}
                onChange={(value) => changeNetwork(selectPin,i,'bandwidth',value)}
              />
            </Form.Item>
            <Id>Bandwidth Total: {network.networkData.bandwidth.total} {network.networkData.bandwidth.units}</Id>
            <Id>Bandwidth Provisioned: {network.networkData.bandwidth.provisioned} {network.networkData.bandwidth.units}</Id>
            <Form.Item label="Floating IP's">
              <Input
                type="text"
                value={network.floatingIps}
                onChange={(value) => changeNetwork(selectPin,i,'floatingIps',value)}
              />
            </Form.Item>
            <Id>Floating IP's Total: {network.networkData.floatingIps.total} {network.networkData.floatingIps.units}</Id>
            <Id>Floating IP's Provisioned: {network.networkData.floatingIps.provisioned} {network.networkData.floatingIps.units}</Id>
            <Form.Item label="Tag">
              <Input
                type="text"
                value={network.tag}
                onChange={(value) => changeNetwork(selectPin,i,'tag',value)}
              />
            </Form.Item>
            <Id>
              Tag Range: {network.networkData.tagRange.init} - {network.networkData.tagRange.end}
            </Id>
          {network.networkData.provisionedTags &&
            <Id>
              Provisioned Tags: {network.networkData.provisionedTags.map((tag, i) =>
              <Tag key={i}>
                {tag} {i < network.networkData.provisionedTags.length - 1 ? ',' : ''}
              </Tag>
              )
            }
            </Id>
          }

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
            <Select
              placeholder={'Select Channel'}
              type={'default'}
              options={sdnWifi.channelOptions}
              onChange={value => changeSDN(selectPin,i,'channel',value)}
              selectOption={sdnWifi.channel}
            />
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
      locations,
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
        >
        <HeaderNav.Left>
          <ButtonShop onClick={() => modalNewSliceStatus()} svg={<CheckIcon />} />
        </HeaderNav.Left>
        </HeaderNav>
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
          location={locations}
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
  margin-left: 5px;
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
const Tag = styled.span`

`
const ButtonShop = styled(Button)`
  border: 0px;
  background: transparent;
  color: white;
`
