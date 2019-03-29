/**
 * Listslices Container
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Titles, TitlesUser } from './utils'

/* Components */
import List from 'components/List'
import Modal from 'components/Modal'
import Button from 'components/Button'
import { DeleteIcon } from 'components/Icons'



const ModalDeleteSlice = (props) => (
  <Modal
    size={'tiny'}
    showClose={true}
    onCancel={() => props.actionModal()}
    title="Confirmation"
    visible={props.modalVisibled}
  >
    {props.sliceSelect && <Modal.Body>
      <Title>
        Are you sure you want to delete slice {props.sliceSelect.name} ?
          </Title>
    </Modal.Body>}
    <Modal.Footer>
      <Button
        text={'Yes'}
        icon={'check'}
        type={'primary'}
        loading={props.loading}
        onClick={() => props.deleteSlice(props.sliceSelect.id)}
      />
      <Button
        text={'No'}
        icon={'close'}
        type={'secondary'}
        onClick={() => props.actionModal()}
      />
    </Modal.Footer>
  </Modal>
);



const ListAllSlices = (props) => (
  <List>
    <List.Header>
      {props.title.map(title =>
      <List.Column size={title.size} key={title.id}>
        {title.name}
      </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.slices && props.slices.map((slice, i) =>
    <List.Row key={i}>
      {props.title && props.title.map(({
        size,
        propItem,
        render
      }) => {
        return [render && slice &&
        <List.Column key={i} size={size}>
          {render(slice[propItem])}
        </List.Column>, !render && slice &&
        <List.Column key={i} size={size}>
          {slice[propItem]}
        </List.Column>];
      })}
      <ColumnBottons>
        <ContainerButtons>
          <Button
            type={'secondary'}
            svg={<DeleteIcon />}
            onClick={() => props.sliceInfo(slice)} text={'Remove'}
          />
          <Button
            type={'primary'}
            icon={'view'}
            onClick={() =>
            props.navigate(`/slice/${slice.id}`)} text={'View'}
          />
          <Button
            type={'primary'}
            icon={'setting'}
            onClick={() => props.navigate(`/monitor/slice/${slice.id}`)}
            text={'Monitoring'}
          />
        </ContainerButtons>
      </ColumnBottons>
    </List.Row>)}
  </List>
);


class ListSlices extends Component {

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render() {
    const { slices, userRole, modalVisibled, loading, sliceSelect } = this.props
    const { deleteSlice, actionModal, sliceInfo } = this.actions
    const title = userRole === 'Inf. Owner' ? Titles : TitlesUser
    return (
      <Wrapper>
        <ModalDeleteSlice
          modalVisibled={modalVisibled}
          loading={loading}
          sliceSelect={sliceSelect}
          deleteSlice={deleteSlice}
          actionModal={actionModal}
        />
        <ListAllSlices
          navigate={this.navigate}
          slices={slices}
          sliceInfo={sliceInfo}
          title={title}
        />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(ListSlices))

const Wrapper = styled.div`
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
