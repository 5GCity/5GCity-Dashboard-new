/**
 * Modalremove Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import styled from 'styled-components'
import Logic from './logic'

/* Components */
import Modal from 'components/Modal'
import Button from 'components/Button'


class ModalRemoveNetwork extends Component {

  modalBody = (data) => (
    <Title>Are you sure you want to delete slice {data.name} ?</Title>
  )

  footerButton = (changeStatus, data) => {
    const { deleteNetwork } = this.actions
    return(
      <ContainerButton>
        <Button
          text={'Yes'}
          icon={'check'}
          type={'primary'}
          onClick={() => deleteNetwork(data.id) }
        />
        <Button
          text={'No'}
          icon={'close'}
          type={'secondary'}
          onClick={changeStatus}
        />
      </ContainerButton>
    )
  }

  render () {
    const { changeStatus, statusModal, title, size, data } = this.props
    return (
      <React.Fragment>
      {data &&
        <Modal
          size={size}
          showClose={true}
          onCancel={changeStatus}
          visible={statusModal}
          title={title}
          bodyContent={ this.modalBody(data) }
          footerContent={ this.footerButton(changeStatus, data) }
        />
      }
      </React.Fragment>
    )
  }
}

export default Logic(ModalRemoveNetwork)

const Title = styled.h5`
  text-align: center;
  color: #EFF2F7;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily};
`
const ContainerButton = styled.div`
`
