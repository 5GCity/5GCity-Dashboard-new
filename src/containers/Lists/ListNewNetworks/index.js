/**
 * Listnewnetworks Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import List from 'components/List'
import Modal from 'components/Modal'
import Button from 'components/Button'

/* Containers */
import NewNetworkForm from 'containers/Forms/NewNetworkForm'

const Titles = [{
  id: 1,
  size: 350,
  name: 'Id',
  propItem: 'id',
}, {
  id: 2,
  size: 400,
  name: 'Name',
  propItem: 'name',
}]

/**
 *  Modal to Show error
 * @param {*} props
 */
const ModalError = props => (
  <Modal
    size={'tiny'}
    showClose={true}
    onCancel={props.actionModalError}
    visible={props.modalError}
    title="Error"
  >
    <Modal.Body>
      <Error> Error to create new instance </Error>
    </Modal.Body>
  </Modal>
)


/**
 *  Modal to Create new Instance
 * @param {*} props
 */
const ModalNewInstance = (props) => (
  <Modal
    size={'tiny'}
    showClose={true}
    onCancel={props.actionModal}
    visible={props.modalVisibled}
    title="Confirmation"
  >
    <Modal.Body>
      <NewNetworkForm />
    </Modal.Body>
    <Modal.Footer>
      <Button
        disabled={props.isSubmitting}
        onClick={props.submit}
        text={'Yes'}
        icon={'check'}
        type={'primary'}
        loading={props.loading}
      />
      <Button
        text={'No'}
        icon={'close'}
        type={'secondary'}
        onClick={props.actionModal}
      />
    </Modal.Footer>
  </Modal>
)


const ListNetworkServices = (props) => (
  <List>
    <List.Header>
      {Titles.map(title =>
      <List.Column size={title.size} key={title.id}>
        {title.name}
      </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.networkServices && props.networkServices.map((networkService, i) =>
    <List.Row key={i}>
      {Titles && Titles.map(({
        size,
        propItem,
        render
      }) => {
        return [render && networkService &&
        <List.Column key={i} size={size}>
          {render(networkService[propItem])}
        </List.Column>, !render && networkService &&
        <List.Column key={i} size={size}>
          {networkService[propItem]}
        </List.Column>];
      })}
      <ColumnBottons>
        <ContainerButtons>
          <Button
            type={'primary'}
            onClick={() => props.setSelectNetwork(networkService)}
            text={'Instantiate'}
          />
        </ContainerButtons>
      </ColumnBottons>
    </List.Row>)}
  </List>
);


class ListNewNetworks extends Component {

  render() {
    const {
      networkServices, modalError, modalVisibled,
      isSubmitting, submit, loading } = this.props,
      { actionModalError, actionModal, setSelectNetwork } = this.actions

    return (
      <Wrapper>
        <ModalNewInstance
          modalVisibled={modalVisibled}
          isSubmitting={isSubmitting}
          submit={submit}
          loading={loading}
          actionModal={actionModal}
        />
        <ModalError
          modalError={modalError}
          actionModalError={actionModalError}
        />
        <ListNetworkServices
          networkServices={networkServices}
          setSelectNetwork={setSelectNetwork}
        />
      </Wrapper>
    )
  }
}

export default Logic(ListNewNetworks)

const Wrapper = styled.div`
`

const Error = styled.h3`
  text-align: center;
  color: white;
`

const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`
