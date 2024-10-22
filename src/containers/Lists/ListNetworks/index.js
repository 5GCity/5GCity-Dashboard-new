/**
 * Listnetworks Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { TITLE_LIST } from './utils'
/* Components */
import List from 'components/List'
import Modal from 'components/Modal'
import Button from 'components/Button'
import NoData from 'components/NoData'
import {
  DeleteIcon,
  EyeIcon,
  SettingIcon,
  CheckIcon,
  CloseIcon,
  AlertIcon
} from 'components/Icons'
import ErroPage from 'components/ErroPage'

const ModalInfo = (props) => (
  <Modal
    size={'tiny'}
    visible={props.modalInfo}
    onCancel={props.actionModal}
    title='Network Information'
  >
    {props.networkSelect &&
      <Modal.Body>
        <Field><FieldTitle>Name: </FieldTitle> {props.networkSelect.name}</Field>
        <Field><FieldTitle>Description: </FieldTitle> {props.networkSelect.description}</Field>
        <Field><FieldTitle>User ID: </FieldTitle> {props.networkSelect.userId}</Field>
        {props.networkSelect.floatingIps && props.networkSelect.floatingIps.length > 0 &&
        <Field><FieldTitle>Floating IP: </FieldTitle>
          {props.networkSelect.floatingIps.map((ip, i) =>
            <span key={i}>
              {ip} {i < props.networkSelect.floatingIps.length - 1 ? ',' : ''}
            </span>
          )}
        </Field>
        }
        <Field><FieldTitle>Id:</FieldTitle> {props.networkSelect.id}</Field>
        {/* <Field><FieldTitle>Vlan:</FieldTitle> {props.networkSelect.vlanPort}</Field> */}
        <Field><FieldTitle>Network Service ID: </FieldTitle> {props.networkSelect.networkServiceId}</Field>
        <Field><FieldTitle>OsmInstance ID: </FieldTitle> {props.networkSelect.osmInstanceId}</Field>
        <Field><FieldTitle>Slice Name: </FieldTitle> {props.networkSelect.slic3Name}</Field>
        {props.networkSelect.ports && props.networkSelect.ports.length > 0 &&
        <Field><FieldTitle>Port: </FieldTitle>
          {props.networkSelect.ports.map((port, i) =>
            <span key={i}>
              {port} {i < props.networkSelect.ports.length - 1 ? ',' : ''}
            </span>
          )}
        </Field>
        }
      </Modal.Body>
    }
    <Modal.Footer>
      <Button
        text={'Done'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={props.actionModal}
      />
    </Modal.Footer>
  </Modal>
)

const ModalDelete = props => {
  return (
    <Modal
      size={'tiny'}
      title={'Remove Network Service'}
      visible={props.modalDelete}
      onCancel={props.actionModalDelete}
    >
      <Modal.Body>
        {props.networkSelect &&
          <Title>
            Are you sure you want to delete the network service instance {props.networkSelect.name} ?
        </Title>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button
          text={'Yes'}
          svg={<CheckIcon />}
          type={'primary'}
          onClick={() => props.deleteNetwork(props.networkSelect.id)}
        />
        <Button
          text={'No'}
          svg={<CloseIcon />}
          type={'secondary'}
          onClick={props.actionModalDelete}
        />
      </Modal.Footer>
    </Modal>
  )
}

const ListNetwork = (props) => (
  <List>
    <List.Header>
      {TITLE_LIST.map(title => <List.Column size={title.size} key={title.id}>
        {title.name}
      </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.networkServicesInstance.map(network =>
      <List.Row key={network.id}>
        {TITLE_LIST && TITLE_LIST.map(({
        size,
        propItem,
        render
      }) => {
          return [
            render && network &&
            <List.Column key={network.id} size={size}>
              {render(network[propItem])}
            </List.Column>, !render && network &&
            <List.Column key={network.id} size={size}>
              {network[propItem]}
            </List.Column>
          ]
        })}
        <ColumnBottons>
          <ContainerButtons>
            <Button
              type={'secondary'}
              svg={<DeleteIcon />}
              onClick={() => props.actionModalDelete(network)}
              text={'Remove'}
            />
            <Button
              type={'primary'}
              svg={<EyeIcon />}
              onClick={() => props.actionModal(network)}
              text={'View'}
            />
            <Button
              type={'primary'}
              svg={<SettingIcon />}
              onClick={() => props.navigate(`/monitor/${network.name}`)}
              text={'Monitoring'}
            />
            <Button
              type={'primary'}
              svg={<AlertIcon fill={'#fff'} />}
              onClick={() => props.navigate(`/network/${network.id}/alerts`)}
              text={'Alerts'}
            />
          </ContainerButtons>
        </ColumnBottons>
      </List.Row>)}
  </List>
)

class ListNetworks extends Component {
  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    const { networkServicesInstance,
      modalInfo,
      networkSelect,
      modalDelete,
      noData, errorFecth } = this.props
    const { actionModal, actionModalDelete, deleteNetwork } = this.actions
    return (
      <Wrapper>
        <ModalInfo
          modalInfo={modalInfo}
          networkSelect={networkSelect}
          actionModal={actionModal}
         />
        <ModalDelete
          networkSelect={networkSelect}
          modalDelete={modalDelete}
          actionModalDelete={actionModalDelete}
          deleteNetwork={deleteNetwork}
        />
        {networkServicesInstance &&
        <ListNetwork
          navigate={this.navigate}
          networkServicesInstance={networkServicesInstance}
          actionModal={actionModal}
          actionModalDelete={actionModalDelete}
        />
        }
        {noData &&
        <NoData
          title={'You don’t have any network services yet...'}
          message={'Click on the “Add new  network service” button to add your first service!'}
        />
        }
        {errorFecth &&
        <ErroPage />
        }
      </Wrapper>
    )
  }
}

export default withRouter(Logic(ListNetworks))

const Wrapper = styled.div`
overflow: auto;
height: calc(100vh - 100px);
`

const Field = styled.p`
  color: white;
`
const FieldTitle = styled.span`
  font-weight: bold;
`

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`

const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`
