/**
 * Sdk Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router'

/* Component */
import HeaderNav from 'components/HeaderNav'
import Tabs from 'components/Tabs'
import { BackIcon, PublishIcon, SaveIcon } from 'components/Icons'
import Button from 'components/Button'

/* Container */
import ComposerForm from 'containers/ComposerForm'
import Composer from 'containers/Composer'
import ComposerMenu from 'containers/ComposerMenu'
import ModalServiceParameters from 'containers/Modals/ModalServiceParameters'
import PanelErrors from 'containers/PanelErrors'

class SDKContainer extends Component {
  navigateToBack = () => {
    const { history } = this.props
    history.push('/sdk/services')
  }

  componentDidMount () {
    const { setService, fetchOrganizations, changePublishStatus } = this.actions
    setService(Number(this.props.match.params.id))
    changePublishStatus('secondary')
    fetchOrganizations()
  }

  componentWillUnmount () {
    const { reset } = this.actions
    reset()
  }

  render () {
    const {
      catalogue,
      modalData,
      modalStatus,
      d3Data,
      serviceInfo,
      modalConfigParameterStatus,
      modalNodeConfigData,
      modalConfigMonitoringStatus,
      isPublishLoading,
      isSaved,
      isSaveLoading,
      modalPublishStatus,
      errorsMessages,
      panelError,
      activeTab } = this.props
    const {
      modalAction,
      createNode,
      removeLink,
      removeNode,
      createLink,
      setActiveTab,
      saveComposer,
      configParams,
      configMonitoring,
      publishComposer,
      actionModalPublish,
      changeStatusPanel
    } = this.actions

    return (
      <Container>
        <PanelErrors
          show={panelError}
          messages={errorsMessages}
          close={changeStatusPanel}
      />
        <Wrapper>
          {modalPublishStatus &&
            <ModalServiceParameters
              title={'Configure Parameters'}
              action={actionModalPublish}
              status={modalPublishStatus}
              service={serviceInfo}
            />
          }
          <HeaderNav
            name={'New Service'}
            buttonBack={<BackIcon />}
            navigateBack={() => this.navigateToBack()}
        >
            <HeaderNav.Left>
              <Button
                key={1}
                type={isSaved ? 'primary' : 'secondary'}
                text={isSaved ? 'Saved Draft' : 'Unsaved Draft'}
                svg={<SaveIcon />}
                loading={isSaveLoading}
                disabled={isSaved}
                onClick={() => saveComposer()}
            />
              <Button
                key={2}
                type={'primary'}
                text={'Publish'}
                loading={isPublishLoading}
                svg={<PublishIcon />}
                onClick={() => publishComposer()}
            />
            </HeaderNav.Left>
          </HeaderNav>
          <Tabs
            activeName={activeTab}
            onTabClick={value => setActiveTab(value)}
          >
            <Tabs.Pane
              key={1}
              name='composer'
              label='Composer'
              closable={false}
            >
              <Wrapper>
                <ComposerMenu
                  createNode={createNode}
                />
                <Composer
                  catalogue={catalogue}
                  modalData={modalData}
                  modalStatus={modalStatus}
                  modalAction={modalAction}
                  d3Data={d3Data}
                  removeLink={removeLink}
                  removeNode={removeNode}
                  createLink={createLink}
                  configParams={configParams}
                  configMonitoring={configMonitoring}
                  modalParameters={modalConfigParameterStatus}
                  modalMonitoring={modalConfigMonitoringStatus}
                  modalNodeConfigData={modalNodeConfigData}
                />
              </Wrapper>
            </Tabs.Pane>
            <Tabs.Pane
              key={2}
              name='basicSettings'
              label='Basic settings'
              closable={false}
            >
              <ComposerForm />
            </Tabs.Pane>
          </Tabs>
        </Wrapper>
      </Container>
    )
  }
}

export default withRouter(Logic(SDKContainer))

const Wrapper = styled.div`
  height: calc(100vh - 136px) !important;
  background-color: #324148;
`
const Container = styled.section``
