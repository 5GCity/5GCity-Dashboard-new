/**
 * Modalerrorslice Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Component */
import Modal from 'components/Modal'

class ModalErrorSlice extends Component {
  render () {
    const { modalStatus, modalError, error } = this.props
    return (
      <Modal
        size={'tiny'}
        showClose={true}
        onCancel={modalStatus}
        title="Error"
        visible={modalError}
      >
        <Modal.Body>
          <Erro>{error}</Erro>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Logic(ModalErrorSlice)

const Erro = styled.h3`
  text-align: center;
  color: #fff;
`
