/**
 * Modalerror Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpattriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import Modal from 'components/Modal'

class ModalError extends Component {
  modalBody = () => (
    <Error> Error to create new instance </Error>
  )

  render () {
    const { changeStatusModal, statusModal  } = this.props

    return (
      <Modal
        size={'tiny'}
        showClose={true}
        onCancel={changeStatusModal}
        visible={statusModal}
        title="Error"
        bodyContent={ this.modalBody() }
      />
    )
  }
}

export default Logic(ModalError)

const Error = styled.h3`
  text-align: center;
  color: white;
`
