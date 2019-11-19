/**
 * Listsdkdescriptions Container
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
import { DeleteIcon, PublishIcon, CheckIcon, CloseIcon } from 'components/Icons'
import Modal from 'components/Modal'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'


const ModalView = (props) => {
  if(!props.descriptionSelect){
    return null
  }
  let title = null
  let type = null
  switch (props.descriptionSelect.type) {
    case 'publish':
      title = 'Publish'
      type = 'publish'
      break;
    case 'unPublish':
      title = 'Unpublish'
      type = ' unpublish'
      break;
    case 'delete':
      title = 'Delete'
      type = 'delete'
      break;
    default:
      break;
  }

  return (
  <Modal
    size={'tiny'}
    showClose
    onCancel={() => props.actionModal()}
    title={title}
    visible={props.modalVisibled}
    >
    <Modal.Body>
      {props.descriptionSelect.description &&
      <Title>
        Are you sure you want to {type} descriptors {props.descriptionSelect.description.id} ?
      </Title>
      }
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'Yes'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => props.actionDescription(type, props.descriptionSelect.description.id)}
      />
      <Button
        text={'No'}
        svg={<CloseIcon />}
        type={'secondary'}
        onClick={() =>  props.actionModal()}
      />
    </Modal.Footer>
  </Modal>
  )
}


class ListSDKDescriptions extends Component {
  render () {
    const {
      descriptions,
      noData,
      errorFecth,
      descriptionSelect,
      modalVisibled,
      usersView,
      modaErrorlVisibled,
      messageError
    } = this.props
    const { selectDescription, actionModal, actionDescription, actionModalError
    }= this.actions
    return (
      <Wrapper>
         <Modal
    size={'tiny'}
    showClose
    onCancel={() => actionModalError()}
    title={'Error'}
    visible={modaErrorlVisibled}
    >
    <Modal.Body>
      <Title>
        {messageError}
      </Title>
    </Modal.Body>
    <Modal.Footer>
      <Button
        text={'ok'}
        svg={<CheckIcon />}
        type={'primary'}
        onClick={() => actionModalError()}
      />
    </Modal.Footer>
  </Modal>
        <ModalView
          descriptionSelect={descriptionSelect}
          modalVisibled={modalVisibled}
          actionModal={actionModal}
          actionDescription={actionDescription}
        />
        {descriptions && !noData &&
        <List>
          <List.Header>
            {Titles && Titles.map(title =>
              <List.Column size={title.size} key={title.id}>
                {title.name}
              </List.Column>
            )}
            <List.Column marginLeft />
          </List.Header>
          {descriptions && descriptions.map((description, i) =>
            <List.Row key={i}>
              {Titles && Titles.map(({ size, propItem, render }) => {
                return [
                  render && description &&
                  <List.Column key={i} size={size}>
                    {render(description[propItem])}
                  </List.Column>,
                  !render && description &&
                  <List.Column key={i} size={size}>
                    {description[propItem]}
                  </List.Column>
                ]
              })}
              <ColumnBottons>
                <ContainerButtons>
                  {description.status !== 'COMMITTED'
                  ? <Button
                    type={'primary'}
                    svg={<PublishIcon />}
                    onClick={() => selectDescription(description, 'publish')}
                    text={'Publish'}
                  />
                  :
                  <Button
                    type={'secondary'}
                    svg={<PublishIcon />}
                    onClick={() => selectDescription(description, 'unPublish')}
                    text={'Unpublished'}
                  />
                  }
                  {usersView &&
                  <Button
                    type={'secondary'}
                    svg={<DeleteIcon />}
                    onClick={() => selectDescription(description, 'delete')}
                    text={'Delete'}
                  />
                }
                </ContainerButtons>
              </ColumnBottons>
            </List.Row>
          )}
        </List>
        }
        {noData &&
          <NoData
            title={'You don’t have any descriptors yet...'}
            message={''}
          />
        }
        {errorFecth &&
          <ErroPage />
        }
      </Wrapper>
    )
  }
}

export default Logic(ListSDKDescriptions)

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
