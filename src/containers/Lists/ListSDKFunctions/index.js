/**
 * Listsdkfunctions Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component, Fragment } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Titles } from './utils'
import { withRouter } from 'react-router-dom'

/* Component */
import List from 'components/List'
import Button from 'components/Button'
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon, PublishIcon } from 'components/Icons'
import Modal from 'components/Modal'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'

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

const ModalDelete = (props) => (
  <Modal size={'tiny'} showClose onCancel={() => props.actionModalDelete()} title={'Delete'} visible={props.modalVisibledDelete}>
    <Modal.Body>
      {props.functionSelect && <Title>Are you sure you want to delete function {props.functionSelect.name} ?</Title>}
    </Modal.Body>
    <Modal.Footer>
      <Button text={'Yes'} svg={<CheckIcon />} type={'primary'} onClick={() => props.deleteFunction(props.functionSelect.id)} />
      <Button text={'No'} svg={<CloseIcon />} type={'secondary'} onClick={() => props.actionModalDelete()} />
    </Modal.Footer>
  </Modal>
)

const ModalPublish = (props) => (
  <Modal size={'tiny'} showClose onCancel={() => props.actionModalPublish()} title={'Delete'} visible={props.modalVisibledPublish}>
    <Modal.Body>
      {props.functionSelect && <Title>Are you sure you want to publish function {props.functionSelect.name} ?</Title>}
    </Modal.Body>
    <Modal.Footer>
      <Button text={'Yes'} svg={<CheckIcon />} type={'primary'} onClick={() => props.publishFunction(props.functionSelect.id)} />
      <Button text={'No'} svg={<CloseIcon />} type={'secondary'} onClick={() => props.actionModalPublish()} />
    </Modal.Footer>
  </Modal>
)

const ModalUnPublish = (props) => (
  <Modal size={'tiny'} showClose onCancel={() => props.actionModalUnPublish()} title={'Unpublish'} visible={props.modalVisibledUnPublish}>
    <Modal.Body>
      {props.functionSelect && <Title>Are you sure you want to unpublish function {props.functionSelect.name} ?</Title>}
    </Modal.Body>
    <Modal.Footer>
      <Button text={'Yes'} svg={<CheckIcon />} type={'primary'} onClick={() => props.unPublishFunction(props.functionSelect.id)} />
      <Button text={'No'} svg={<CloseIcon />} type={'secondary'} onClick={() => props.actionModalUnPublish()} />
    </Modal.Footer>
  </Modal>
)

class ListSDKFunctions extends Component {
  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    const {
      functions,
      functionSelect,
      noData,
      errorFecth,
      modalVisibledDelete,
      modalVisibledPublish,
      modalErrorVisibled,
      modalErrorMessage,
      userLabel,
      modalVisibledUnPublish
    } = this.props
    const {
      actionModalDelete,
      actionModalPublish,
      deleteFunction,
      selectFunc,
      actionModalError,
      actionModalUnPublish,
      publishFunction,
      unPublishFunction
    } = this.actions
    return (
      <Wrapper>
        <ModalDelete
          functionSelect={functionSelect}
          modalVisibledDelete={modalVisibledDelete}
          actionModalDelete={actionModalDelete}
          deleteFunction={deleteFunction}
        />
        <ModalPublish
          functionSelect={functionSelect}
          modalVisibledPublish={modalVisibledPublish}
          actionModalPublish={actionModalPublish}
          publishFunction={publishFunction}
        />
        <ModalUnPublish
          functionSelect={functionSelect}
          modalVisibledUnPublish={modalVisibledUnPublish}
          actionModalUnPublish={actionModalUnPublish}
          unPublishFunction={unPublishFunction}
        />
        {functions && !noData &&
        <List>
          <List.Header>
            {Titles && Titles.map(title =>
              <List.Column size={title.size} key={title.id}>
                {title.name}
              </List.Column>
            )}
            <List.Column marginLeft />
          </List.Header>
          {functions && functions.map((func, i) =>
            <List.Row key={i} row={1320}>
              {Titles && Titles.map(({ size, propItem, render }) => {
                return [
                  render && func &&
                  <List.Column key={i} size={size}>
                    {render(func[propItem])}
                  </List.Column>,
                  !render && func &&
                  <List.Column key={i} size={size}>
                    {func[propItem]}
                  </List.Column>
                ]
              })}

              <ColumnBottons>
                <ContainerButtons>
                  {func.status !== 'COMMITTED' &&
                  <Button
                    type={'primary'}
                    svg={<PublishIcon />}
                    onClick={() => selectFunc(func, 'publish')}
                    text={'Publish'}
                  />
                  }
                  {func.status === 'COMMITTED' &&
                  <Button
                    type={'secondary'}
                    svg={<PublishIcon />}
                    onClick={() => selectFunc(func, 'unPublish')}
                    text={'Unpublish'}
                  />
                  }
                  {(userLabel === 'admin' || userLabel === func.ownerId) &&
                  <Fragment>
                    <Button
                      type={'secondary'}
                      svg={<DeleteIcon />}
                      onClick={() => selectFunc(func, 'delete')}
                      text={'Delete'}
                  />
                    <Button
                      type={'primary'}
                      svg={<EditIcon />}
                      onClick={() => this.navigate(`/sdk/function/${func.id}`)}
                      text={'Edit'}
                  />
                  </Fragment>
                  }
                </ContainerButtons>
              </ColumnBottons>

            </List.Row>
          )}
        </List>
        }
        {noData &&
          <NoData
            title={'You don’t have any functions yet...'}
            message={'Click on the “Add new function" button to add your first function!'}
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
      </Wrapper>
    )
  }
}

export default withRouter(Logic(ListSDKFunctions))

const Wrapper = styled.div`
overflow: auto;
height: calc(100vh - 169px);
`

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
