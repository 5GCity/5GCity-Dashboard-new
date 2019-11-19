/**
 * Listsdkservices Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component, Fragment } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Titles } from './utils'
import { withRouter } from 'react-router-dom'

/* Component */
import List from 'components/List'
import Button from 'components/Button'
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon, CloneIcon } from 'components/Icons'
import Modal from 'components/Modal'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'

const ListSDKService = props => (
  <ListContainer>
  { props.services &&
  <List>
    <List.Header>
      {Titles && Titles.map(title => <List.Column size={title.size} key={title.id}>
        {title.name}
      </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.services.map((service, i) => <List.Row key={i} row={1280}>
      {Titles && Titles.map(({
        size,
        propItem,
        render
      }) => {
        return [render && service && <List.Column key={i} size={size}>
          {render(service[propItem])}
        </List.Column>, !render && service && <List.Column key={i} size={size}>
          {service[propItem]}
        </List.Column>]
      })}

      <ColumnBottons>
        <ContainerButtons>
          <Button
            type={'secondary'}
            svg={<CloneIcon />}
            onClick={() => props.selectService(service, 'clone')}
            text={'Clone'}
          />
          {props.usersView &&
          <Fragment>
          <Button
            type={'secondary'}
            svg={<DeleteIcon />}
            onClick={() => props.selectService(service, 'delete')}
            text={'Delete'}
          />
          <Button
            type={'primary'}
            svg={<EditIcon />}
            onClick={() => props.navigate(`/sdk/composer/${service.id}`)}
            text={'Edit'}
          />
          </Fragment>
        }
        </ContainerButtons>
      </ColumnBottons>
    </List.Row>)}
  </List>
  }
  </ListContainer>
)

const ModalSDKServiceDelete = props => (
  <Modal
    size={'tiny'}
    showClose
    onCancel={() => props.actionModal()}
    title={'Delete'}
    visible={props.modalVisibled}
  >
    <Modal.Body>
      {props.service && <Title>Are you sure you want to delete service {props.service.name} ?</Title>}
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'Yes'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => props.deleteService(props.service.id)}
      />
      <Button
        text={'No'}
        svg={<CloseIcon />}
        type={'secondary'}
        onClick={() => props.actionModal()}
      />
    </Modal.Footer>
  </Modal>
)

const ModalSDKServiceClone = props => (
  <Modal
    size={'tiny'}
    showClose
    onCancel={() => props.actionModal()}
    title={'Clone'}
    visible={props.modalVisibled}
  >
    <Modal.Body>
      {props.service && <Title>Are you sure you want to clone service {props.service.name} ?</Title>}
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'Yes'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => props.cloneService(props.service)}
      />
      <Button
        text={'No'}
        svg={<CloseIcon />}
        type={'secondary'}
        onClick={() => props.actionModal()}
      />
    </Modal.Footer>
  </Modal>
)

const ModalError = props => (
  <Modal
    size={'tiny'}
    showClose
    onCancel={() => props.actionModalError()}
    title={'Error'}
    visible={props.modalErrorVisibled}
  >
    <Modal.Body>
      <Error>{props.modalErrorMessage}</Error>
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'Ok'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => props.actionModalError()}
    />
    </Modal.Footer>
  </Modal>
)

class ListSDKServices extends Component {
  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    const {
      serviceList,
      modalVisibledDelete,
      modalVisibledClone,
      service,
      noData,
      errorFecth,
      modalErrorVisibled,
      modalErrorMessage,
      usersView
    } = this.props

    const {
      deleteService,
      cloneService,
      actionModalDelete,
      actionModalClone,
      selectService,
      actionModalError
    } = this.actions

    return (
      <React.Fragment>
        <ModalSDKServiceDelete
          modalVisibled={modalVisibledDelete}
          deleteService={deleteService}
          actionModal={actionModalDelete}
          service={service}
        />
        <ModalSDKServiceClone
          modalVisibled={modalVisibledClone}
          selectService={selectService}
          actionModal={actionModalClone}
          service={service}
          cloneService={cloneService}
        />
        {serviceList && !noData &&
          <ListSDKService
            navigate={this.navigate}
            services={serviceList}
            selectService={selectService}
            cloneService={cloneService}
            usersView={usersView}
          />
        }
        {noData &&
          <NoData
            title={'You don’t have any services yet...'}
            message={'Click on the “Add new service” button to add your first service!'}
          />
        }
        {errorFecth &&
          <ErroPage />
        }
        <ModalError
          modalErrorVisibled={modalErrorVisibled}
          modalErrorMessage={modalErrorMessage}
          actionModalError={actionModalError}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(Logic(ListSDKServices))

const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`
const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
const Error = styled.h3`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};

`

const ListContainer = styled.div`
overflow: auto;
height: calc(100vh - 169px);
`
