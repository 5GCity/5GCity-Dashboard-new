/**
 * Listnewnetworks Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { TITLE_LIST } from './utils'

/* Components */
import List from 'components/List'
import Modal from 'components/Modal'
import Button from 'components/Button'
import { PlayIcon, CloseIcon, CheckIcon } from 'components/Icons'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'

/* Containers */
import NewNetworkForm from 'containers/Forms/NewNetworkForm'

/**
 *  Modal to Show error
 * @param {*} props
 */
const ModalError = props => (
  <Modal
    size={'tiny'}
    showClose
    onCancel={props.actionModalError}
    visible={props.modalError}
    title='Error'
  >
    <Modal.Body>
      <Error>
        {props.message || 'Error to create new instance' }
      </Error>
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'ok'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={props.actionModalError}
      />
    </Modal.Footer>
  </Modal>
)

/**
 *  Modal to Create new Instance
 * @param {*} props
 */
const ModalNewInstance = (props) => (
  <Modal
    size={'tiny'}
    showClose
    onCancel={props.actionModal}
    visible={props.modalVisibled}
    title='Confirmation'
  >
    <Modal.Body>
      <NewNetworkForm />
    </Modal.Body>
    <Modal.Footer>
      <Button
        disabled={props.isSubmitting}
        onClick={() => props.submit()}
        text={'Yes'}
        svg={<CheckIcon />}
        type={'primary'}
        loading={props.loading}
      />
      <Button
        text={'No'}
        svg={<CloseIcon />}
        type={'secondary'}
        onClick={props.actionModal}
      />
    </Modal.Footer>
  </Modal>
)

const ListNetworkServices = (props) => (
  <List>
    <List.Header>
      {TITLE_LIST.map(title =>
        <List.Column size={title.size} key={title.id}>
          {title.name}
        </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.networkServices && props.networkServices.map((networkService, i) =>
      <List.Row key={i}>
        {TITLE_LIST && TITLE_LIST.map(({
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
          </List.Column>]
        })}
        <ColumnBottons>
          <ContainerButtons>
            <Button
              type={'primary'}
              onClick={() => props.setSelectNetwork(networkService)}
              text={'Instantiate'}
              svg={<PlayIcon />}
          />
          </ContainerButtons>
        </ColumnBottons>
      </List.Row>)}
  </List>
)

class ListNewNetworks extends Component {
  render () {
    const {networkServices, modalError, modalVisibled,
      isSubmitting, loading, noData, errorFecth } = this.props
    const { actionModalError, actionModal, setSelectNetwork,
       submit } = this.actions

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
        {networkServices &&
        <ListNetworkServices
          networkServices={networkServices}
          setSelectNetwork={setSelectNetwork}
        />
        }
        {noData &&
        <NoData
          title={'You don’t have any services catalogue yet...'}
          message={'Create a new service!'}
        />
        }
        {errorFecth &&
        <ErroPage />
        }
      </Wrapper>
    )
  }
}

export default Logic(ListNewNetworks)

const Wrapper = styled.div`
overflow: auto;
height: calc(100vh - 169px);
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
