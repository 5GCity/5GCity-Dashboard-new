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




class ModalInfoNetwork extends Component {

  modalBody = (networkSelect) => {
      return(
        <ContainerModal>
        {networkSelect &&
          <React.Fragment>
            <Field><FieldTitle>Name:</FieldTitle> {networkSelect.name}</Field>
            <Field><FieldTitle>Description:</FieldTitle> {networkSelect.description}</Field>
            <Field><FieldTitle>User ID:</FieldTitle> {networkSelect.userId}</Field>
            <Field><FieldTitle>Floating IP:</FieldTitle> {networkSelect.floatingIp}</Field>
            <Field><FieldTitle>Id:</FieldTitle> {networkSelect.id}</Field>
            <Field><FieldTitle>Vlan:</FieldTitle> {networkSelect.vlanPort}</Field>
            <Field><FieldTitle>Network Service ID:</FieldTitle> {networkSelect.networkServiceId}</Field>
            <Field><FieldTitle>OsmInstance ID:</FieldTitle> {networkSelect.osmInstanceId}</Field>
            <Field><FieldTitle>Slice ID:</FieldTitle> {networkSelect.slic3Id}</Field>
            <Field><FieldTitle>Port:</FieldTitle>
            {
            networkSelect.ports && networkSelect.ports.length ? networkSelect.ports.map((itemTestArray) =>
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
    const { OpenModal ,networkSelect } = this.props
    const { actionModal }= this.actions

    return (
      <Modal
        size={'tiny'}
        showClose={true}
        onCancel={() => actionModal(null)}
        title="Network Information"
        visible={OpenModal}
        bodyContent={ this.modalBody(networkSelect) }
        footerContent={ this.footerButton() }
      />
    )
  }
}

export default Logic(ModalInfoNetwork)

const ContainerButton = styled.div`
`

const ContainerModal = styled.div`
`
const Field = styled.p`
  color: white;
`
const FieldTitle = styled.span`
  font-weight: bold;
`
