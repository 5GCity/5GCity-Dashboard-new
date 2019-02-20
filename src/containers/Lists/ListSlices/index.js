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

/* Container */
import Navbar from 'containers/Navbar'

/* Components */
import List from 'components/List'
import Modal from 'components/Modal'
import Button from 'components/Button'


const Titles = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 20,
  name: 'Name',
  propItem: 'name',
},{
  id: 4,
  size: 10,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
},{
  id: 5,
  size: 15,
  name: 'Tenant',
  propItem: 'tenantName',
}]

const TitlesUser = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 20,
  name: 'Name',
  propItem: 'name',
},{
  id: 4,
  size: 10,
  name: 'Status',
  propItem: 'status',
  render: (status) =>
     !status ? '...' : status
}]

class ListSlices extends Component {


  modalBody = () => {
    const {sliceSelect} = this.props
      return(
        <React.Fragment>
          {sliceSelect &&
          <Title>Are you sure you want to delete slice {sliceSelect.name} ?</Title>
          }
        </React.Fragment>
      )
  }

  footerButton = () => {
    const { deleteSlice, closeModal } = this.actions
    const {sliceSelect, loading} = this.props
    return(
      <ContainerButton>
        <Button
          text={'Yes'}
          icon={'check'}
          type={'primary'}
          loading={loading}
          onClick={() => {deleteSlice(sliceSelect.id)}}/>
        <Button
          text={'No'}
          icon={'close'}
          type={'secondary'}
          onClick={closeModal}/>
      </ContainerButton>
    )
  }

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  state = {
    dialogVisible: false
  }

  openModal = (data) => {
    const { sliceInfo, openModal } = this.actions
    openModal()
    sliceInfo(data)
  }

  render () {

  const { slices, userRole, modalVisibled } = this.props
  const { closeModal } = this.actions
  const title = userRole === 'Inf. Owner' ?  Titles :  TitlesUser

    return (
      <Wrapper>
        <Modal
          size={'tiny'}
          showClose={false}
          onCancel={closeModal}
          title="Confirmation"
          visible={modalVisibled}
          bodyContent={this.modalBody()}
          footerContent={this.footerButton()}
        />
        <Navbar/>
        <List
          titles={title}
          data={slices}
          viewSlice={({id}) => this.navigate(`/slice/${id}`)}
          removeSlice={(data) => {this.openModal(data)}}
          viewSliceMonitor={({ id }) => this.navigate(`/monitor/slice/${id}`)}
          slices
        />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(ListSlices))

const Wrapper = styled.div``

const ContainerButton = styled.div``

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
