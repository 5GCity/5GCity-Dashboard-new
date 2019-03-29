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

/* Components */
import List from 'components/List'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import Button from 'components/Button'
import { DeleteIcon } from 'components/Icons'


const Titles = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
}, {
  id: 2,
  size: 20,
  name: 'Short Name',
  propItem: 'name',
}, {
  id: 3,
  size: 15,
  name: 'Slice Name',
  propItem: 'slic3Name',
  render: (vendor) =>
    !vendor ? "N.A" : vendor
}]

const ModalInfo = (props) => (
  <Modal
    size={'tiny'}
    visible={props.modalInfo}
    onCancel={props.actionModal}
    title="Network Information"
  >
    {props.networkSelect &&
      <Modal.Body>
        <Field><FieldTitle>Name:</FieldTitle> {props.networkSelect.name}</Field>
        <Field><FieldTitle>Description:</FieldTitle> {props.networkSelect.description}</Field>
        <Field><FieldTitle>User ID:</FieldTitle> {props.networkSelect.userId}</Field>
        <Field><FieldTitle>Floating IP:</FieldTitle> {props.networkSelect.floatingIp}</Field>
        <Field><FieldTitle>Id:</FieldTitle> {props.networkSelect.id}</Field>
        <Field><FieldTitle>Vlan:</FieldTitle> {props.networkSelect.vlanPort}</Field>
        <Field><FieldTitle>Network Service ID:</FieldTitle> {props.networkSelect.networkServiceId}</Field>
        <Field><FieldTitle>OsmInstance ID:</FieldTitle> {props.networkSelect.osmInstanceId}</Field>
        <Field><FieldTitle>Slice ID:</FieldTitle> {props.networkSelect.slic3Id}</Field>
        <Field><FieldTitle>Port:</FieldTitle>
          {props.networkSelect.ports && props.networkSelect.ports.length ? props.networkSelect.ports.map(itemTestArray =>
            <span> {itemTestArray} </span>) : '-'
          }
        </Field>
      </Modal.Body>
    }
    <Modal.Footer>
      <Button
        text={'Done'}
        icon={'check'}
        type={'primary'}
        onClick={props.actionModal}
      />
    </Modal.Footer>
  </Modal>
)

const ModalDelete = (props) => (
  <Modal
    size={'tiny'}
    title={'Remove Network Service'}
    visible={props.modalDelete}
    onCancel={props.actionModalDelete}
  >
    <Modal.Body>
      {props.networkSelect &&
        <Title>
          Are you sure you want to delete slice {props.networkSelect.name} ?
      </Title>
      }
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'Yes'}
        icon={'check'}
        type={'primary'}
        onClick={() => props.deleteNetwork(data.id)}
      />
      <Button
        text={'No'}
        icon={'close'}
        type={'secondary'}
        onClick={props.actionModalDelete}
      />
    </Modal.Footer>
  </Modal>
);


const ListNetwork = (props) => (
  <List>
    <List.Header>
      {Titles.map(title => <List.Column size={title.size} key={title.id}>
        {title.name}
      </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.networkServicesInstance && props.networkServicesInstance.map(network =>
    <List.Row key={network.id}>
      {Titles && Titles.map(({
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
        ];
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
            icon={'view'}
            onClick={() => props.actionModal(network)} text={'View'}
            />
          <Button
            type={'primary'}
            icon={'setting'}
            onClick={() => props.navigate(`/monitor/ns_id/${network.id}`)}
            text={'Monitoring'}
          />
        </ContainerButtons>
      </ColumnBottons>
    </List.Row>)}
  </List>
);


class ListNetworks extends Component {

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render() {
    const { networkServicesInstance,
      loadingList,
      modalInfo,
      networkSelect,
      modalDelete } = this.props
    const { actionModal, actionModalDelete } = this.actions
    return (
      <Loading loading={loadingList}>
        <ModalInfo
          modalInfo={modalInfo}
          networkSelect={networkSelect}
          actionModal={actionModal}
        >
        </ModalInfo>
        <ModalDelete
          networkSelect={networkSelect}
          modalDelete={modalDelete}
          actionModalDelete={actionModalDelete}
        >
        </ModalDelete>
        <ListNetwork
          navigate={this.navigate}
          networkServicesInstance={networkServicesInstance}
          actionModal={actionModal}
          actionModalDelete={actionModalDelete}
        />
      </Loading>
    )
  }
}

export default withRouter(Logic(ListNetworks))

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
