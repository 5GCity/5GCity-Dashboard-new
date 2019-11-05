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
import { Checkbox, Layout } from 'element-react'
import { UNITS, UNITS_SECONDS } from './utils'

/* Containers */
import SliceMap from 'containers/SliceMap'

/* Components */
import HeaderNav from 'components/HeaderNav'
import Button from 'components/Button'
import Input from 'components/Input'
import PanelRight from 'components/PanelRight'
import { BackIcon, CheckIcon } from 'components/Icons'
import Form from 'components/Form'
import Select from 'components/Select'

/* Containers */
import ModalCreateSlice from 'containers/Modals/ModalCreateSlice'
import ModalErrorSlice from 'containers/Modals/ModalErrorSlice'
import ModalChunketeSlice from 'containers/Modals/ModalChunketeSlice'

class SliceNew extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  infoMarkerContainer = () => {
    const { selectSlice, selectPin } = this.props
    const { changeNetwork, changeComputes, changeWifi, changeLTE } = this.actions
    const { computes, networks } = selectSlice
    return (
      <Form
        labelWidth='120'
        labelPosition={'top'}
      >
        <Form.Item>
          {computes &&
            <TitlePanel>Computing</TitlePanel>
          }
          {computes && computes.map((compute, i) =>
            <React.Fragment key={i}>
              <Checkbox.Group
                value={compute.ischecked === false ? [] : [compute.name]}
                onChange={(value) => changeComputes(selectPin, i, 'ischecked', value.length > 0)}>
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
                  <Form.Item label='Name'>
                    <Input
                      type='text'
                      value={compute.computeName}
                      onChange={(value) => changeComputes(selectPin, i, 'computeName', value)}
                    />
                  </Form.Item>
                  <Form.Item label='Description'>
                    <Input
                      type='text'
                      value={compute.computeDescription}
                      onChange={(value) => changeComputes(selectPin, i, 'computeDescription', value)}
                    />
                  </Form.Item>
                  <Form.Item label='CPUs'>
                    <Input
                      type='text'
                      value={compute.cpus}
                      onChange={(value) => changeComputes(selectPin, i, 'cpus', value)}
                    />
                  </Form.Item>
                  <Id>CPU Total: {compute.computeData.cpus.total} cores </Id>
                  <Id>CPU Provisioned: {compute.computeData.cpus.provisioned} cores </Id>
                  <Layout.Row gutter="0">
                    <Layout.Col span="16">
                    <Form.Item label='RAM'>
                      <Input
                        type='text'
                        value={compute.ram}
                        onChange={(value) => changeComputes(selectPin, i, 'ram', value)}
                      />
                    </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="8">
                      <Form.Item label={'Unit'}>
                        <Select
                          type={'default'}
                          placeholder="unit"
                          options={UNITS}
                          onChange={(value) => changeComputes(selectPin, i, 'ramUnits', value)}
                          selectOption={compute.computeData.ram.units || 'MB'}
                        />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Id>RAM Total: {compute.computeData.ram.total} {compute.computeData.ram.units} </Id>
                  <Id>RAM Provisioned: {compute.computeData.ram.provisioned} {compute.computeData.ram.units} </Id>
                  <Layout.Row gutter="0">
                    <Layout.Col span="16">
                      <Form.Item label='Storage'>
                        <Input
                          type='text'
                          value={compute.storage}
                          onChange={(value) => changeComputes(selectPin, i, 'storage', value)}
                        />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="8">
                      <Form.Item label={'Unit'}>
                        <Select
                          type={'default'}
                          placeholder="unit"
                          options={UNITS}
                          onChange={(value) => changeComputes(selectPin, i, 'sotargeUnits', value)}
                          selectOption={compute.computeData.storage.units || 'GB'}
                        />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
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
          {networks && networks.map((network, i) =>
            <React.Fragment key={i}>
              <Form.Item >
                <Checkbox.Group
                  value={network.ischecked === false ? [] : [network.name]}
                  onChange={(value) => changeNetwork(selectPin, i, 'ischecked', value.length > 0)}>
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
                  <Form.Item label='Name'>
                    <Input
                      type='text'
                      value={network.networkName}
                      onChange={(value) => changeNetwork(selectPin, i, 'networkName', value)}
                    />
                  </Form.Item>
                  <Layout.Row gutter="0">
                    <Layout.Col span="14">
                      <Form.Item label='Bandwidth'>
                        <Input
                          type='text'
                          value={network.bandwidth}
                          onChange={(value) => changeNetwork(selectPin, i, 'bandwidth', value)}
                        />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="10">
                      <Form.Item label={'Unit'}>
                        <Select
                          type={'default'}
                          placeholder="unit"
                          options={UNITS_SECONDS}
                          onChange={(value) => changeNetwork(selectPin, i, 'bandwidthUnits', value)}
                          selectOption={network.networkData.bandwidth.units || 'MB/s'}
                        />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Id>Bandwidth Total: {network.networkData.bandwidth.total} {network.networkData.bandwidth.units}</Id>
                  <Id>Bandwidth Provisioned: {network.networkData.bandwidth.provisioned} {network.networkData.bandwidth.units}</Id>
                </FormContainer>
              }
            </React.Fragment>
          )}
          {selectSlice.wifi &&
            <TitlePanel>Wifi</TitlePanel>
          }
          {selectSlice.wifi && selectSlice.wifi.map((phy, physIndex) =>
            <React.Fragment key={phy.id}>
              <Form.Item key={phy.id}>
                <Checkbox.Group
                  value={phy.ischecked === false ? [] : [phy.name]}
                  onChange={(value) => changeWifi(selectPin, physIndex, 'ischecked', value.length > 0)}>
                  <Checkbox
                    key={phy.id}
                    label={phy.name}
                  >
                    <Name>{phy.name}</Name>
                    <Id>{phy.id}</Id>
                  </Checkbox>
                </Checkbox.Group>
                <BoxType>{phy.type}</BoxType>
              </Form.Item>
            </React.Fragment>
            )}
            {selectSlice.LTE &&
            <TitlePanel>LTE</TitlePanel>
            }
            {selectSlice.LTE && selectSlice.LTE.map((phy, physIndex) =>
              <React.Fragment key={phy.id}>
                <Form.Item key={phy.id}>
                  <Checkbox.Group
                    value={phy.ischecked === false ? [] : [phy.name]}
                    onChange={(value) => changeLTE(selectPin, physIndex, 'ischecked', value.length > 0)}>
                    <Checkbox
                      key={phy.id}
                      label={phy.name}
                    >
                      <Name>{phy.name}</Name>
                      <Id>{phy.id}</Id>
                    </Checkbox>
                  </Checkbox.Group>
                  <BoxType>{phy.type}</BoxType>
                </Form.Item>
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
      formSlice,
      locations,
      modalChunkete,
      formChunkete,
      infoChunkete,
    } = this.props
    const {
      updateMarker,
      modalNewSliceStatus,
      modalChunketeStatus,
      modalStatus,
      actionPanel,
      createSlice,
      setChunkete,
      setValue,
      selectLocation,
      changeChunkete,
      verifySlice
    } = this.actions
    return (
      <Wrapper>
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Add new slice'}
        >
          <HeaderNav.Left>
            <ButtonShop
              onClick={() => verifySlice()}
              svg={<CheckIcon />}
            />
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
          markerClick={(marker) => selectLocation(marker)}
        />
        {/* Modal Create Slice */}
        <ModalCreateSlice
          modalNewSlice={modalNewSlice}
          loading={loading}
          formSlice={formSlice}
          modalNewSliceStatus={modalNewSliceStatus}
          createSlice={createSlice}
          setValue={setValue}
        />
        {/* Modal Chunkete */}
        <ModalChunketeSlice
          modalStatus={modalChunketeStatus}
          status={modalChunkete}
          loading={loading}
          setChunkete={setChunkete}
          chunketes={infoChunkete}
          chunkForm={formChunkete}
          change={changeChunkete}
        />
        {/* Modal Error */}
        <ModalErrorSlice
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
  .el-checkbox__label{
    font-size: 16px;
  }
`

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

const BoxType = styled.span`
  margin-left: 20px;
  color: #89979F;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
`

const Id = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: #89979F;
  width: 248px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FormContainer = styled.div`
  margin-left: 5px;
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

const ButtonShop = styled(Button)`
  border: 0px;
  background: transparent;
  color: white;
`
