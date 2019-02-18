/**
 * Modalnetwork Container
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




class ModalNetwork extends Component {

  modalBody = () => {
    const {networkSelect} = this.props

      return(
        <ContainerModal>
        {networkSelect &&
          <React.Fragment>
            <Field><FieldTitle>Name:</FieldTitle> {networkSelect.name}</Field>
            <Field><FieldTitle>Description:</FieldTitle> {networkSelect.description}</Field>
            <Field><FieldTitle>User ID:</FieldTitle> {networkSelect.userId}</Field>
            <Field><FieldTitle>Floating IP:</FieldTitle> {networkSelect.floatingIp}</Field>
            <Field><FieldTitle>Id:</FieldTitle> {networkSelect.id}</Field>
            <Field><FieldTitle>Vlan Port:</FieldTitle> {networkSelect.vlanPort}</Field>
            <Field><FieldTitle>Network Service ID:</FieldTitle> {networkSelect.networkServiceId}</Field>
            <Field><FieldTitle>OsmInstance ID:</FieldTitle> {networkSelect.osmInstanceId}</Field>
            <Field><FieldTitle>Slice ID:</FieldTitle> {networkSelect.slic3Id}</Field>
            <Field><FieldTitle>Port:</FieldTitle>
            {
            networkSelect.ports.length ? networkSelect.ports.map((itemTestArray) =>
            (<span> {itemTestArray} </span>)) : '-'
            }
            </Field>
          </React.Fragment>
        }
        </ContainerModal>

      )
  }

  footerButton = () => {
    const { actionModal } = this.actions
    return(
      <ContainerButton>
        <Button
          text={'Done'}
          icon={'check'}
          type={'primary'}
          onClick={actionModal}
        />
      </ContainerButton>
    )
  }

  render () {
    const { modalVisibled } = this.props
    const { actionModal } = this.actions

    return (
      <Modal
        size={'tiny'}
        showClose={true}
        onCancel={actionModal}
        title="Network Information"
        visible={modalVisibled}
        bodyContent={ this.modalBody() }
        footerContent={ this.footerButton() }
      />
    )
  }
}

export default Logic(ModalNetwork)

const ContainerButton = styled.div``

const ContainerModal = styled.div`

`
const Field = styled.p`
  color: white;
`
const FieldTitle = styled.span`
  font-weight: bold;
`