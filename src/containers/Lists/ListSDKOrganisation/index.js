/**
 * ListsdkOrganisation Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Titles } from './utils'

/* Component */
import List from 'components/List'
import Button from 'components/Button'
import { DeleteIcon, CheckIcon, CloseIcon, EditIcon } from 'components/Icons'
import Modal from 'components/Modal'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'
import SelectAutoComplete from 'containers/SelectAutoComplete'

const ModalDeleteSlice = props => (
  <Modal
    size={'tiny'}
    showClose
    onCancel={() => props.modalDeleteClose()}
    title={'Delete repository'}
    visible={props.modalDeleteStatus}
  >
    <Modal.Body>
    {props.slice &&
    <Message>Are you sure you want to delete repository {props.slice.sliceId} ?</Message>
    }
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'Yes'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => props.deleteSlice(props.slice.sliceId)}
      />
      <Button
        text={'No'}
        svg={<CloseIcon />}
        type={'secondary'}
        onClick={() => props.modalDeleteClose()}
      />
    </Modal.Footer>
  </Modal>
)


const ModalInfoSlice = props => {

  return(
    <Modal
      size={'tiny'}
      showClose
      onCancel={() => props.modalInfoClose()}
      title={'Edit repository'}
      visible={props.modalInfoStatus}
    >
      <Modal.Body>
      {props.slice &&
      <React.Fragment>
        <Title>Repository name</Title>
          <Item>{props.slice.sliceId}</Item>
        <Title>Repository description</Title>
          <Item>{props.slice.sliceDescription}</Item>
        <Title>Users</Title>
        <SelectAutoComplete
          options={props.users}
          valueSelect={props.slice.users}
          onChange={value => props.setNewUsers(value)}
        />
      </React.Fragment>
      }
      </Modal.Body>
      <Modal.Footer>
        <Button
          text={'Yes'}
          svg={<CheckIcon />}
          type={'primary'}
          onClick={() => props.actionUsers(props.slice.sliceId)}
        />
        <Button
          text={'No'}
          svg={<CloseIcon />}
          type={'secondary'}
          onClick={() => props.modalInfoClose()}
        />
      </Modal.Footer>
    </Modal>
  )
}

class ListSDKOrganisation extends Component {
  render () {
    const {
      noData, errorFecth, selectSlice, modalDeleteStatus, modalInfoStatus,
      slices, users, usersSelect, usersView } = this.props
    const { modalDeleteOpen, modalDeleteClose, modalInfoClose,
      modalInfoOpen, actionUsers, setNewUsers, deleteSlice }= this.actions
    return (
      <Wrapper>
        <ModalDeleteSlice
          modalDeleteStatus={modalDeleteStatus}
          modalDeleteClose={modalDeleteClose}
          slice={selectSlice}
          deleteSlice={deleteSlice}
        />
        <ModalInfoSlice
          modalInfoStatus={modalInfoStatus}
          modalInfoClose={modalInfoClose}
          slice={selectSlice}
          users={users}
          actionUsers={actionUsers}
          setNewUsers={setNewUsers}
          usersSelect={usersSelect}
        />
        {slices &&
        <List>
          <List.Header>
            {Titles && Titles.map(title =>
              <List.Column size={title.size} key={title.id}>
                {title.name}
              </List.Column>
            )}
            <List.Column marginLeft />
          </List.Header>
          {slices.map((slice, i) =>
            <List.Row key={i}>
              {Titles && Titles.map(({ size, propItem, render }) => {
                return [
                  render && slice &&
                  <List.Column key={i} size={size}>
                    {render(slice[propItem])}
                  </List.Column>,
                  !render && slice &&
                  <List.Column key={i} size={size}>
                    {slice[propItem]}
                  </List.Column>
                ]
              })}
              {usersView &&
              <ColumnBottons>
                <ContainerButtons>
                  <Button
                    type={'secondary'}
                    svg={<DeleteIcon />}
                    onClick={() => modalDeleteOpen(slice) }
                    text={'delete'}
                  />
                  <Button
                    type={'primary'}
                    svg={<EditIcon />}
                    onClick={() => modalInfoOpen(slice) }
                    text={'Edit'}
                  />
                </ContainerButtons>
              </ColumnBottons>
              }
            </List.Row>
          )}
        </List>
        }
      {noData &&
        <NoData
          title={'You don’t have any repository yet...'}
          message={'Please contact Administration to be added to one or mode repositories'}
        />
      }
      {errorFecth &&
        <ErroPage />
      }
      </Wrapper>
    )
  }
}

export default Logic(ListSDKOrganisation)

const Wrapper = styled.div`

`

const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`

const Title = styled.p`
  text-align: left;
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  margin-left: 4px;
`

const Item = styled.p`
  color: #FFFFFF;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  margin-left: 4px;
`

const Message = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
