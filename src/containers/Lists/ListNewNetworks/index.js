/**
 * Listnewnetworks Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import List from 'components/List'

/* Containers */
import ModalNewNetwork from 'containers/Modals/ModalNewNetwork'
import ModalError from 'containers/Modals/ModalError'

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
}]

class ListNewNetworks extends Component {


  openModal = (network) => {
    const { actionModal, setSelectNetwork } = this.actions
    setSelectNetwork(network.id)
    actionModal()
  }

  render () {
    const { networkServices, modalError } = this.props
    const { actionModalError } = this.actions
    return (
      <Wrapper>
        <ModalNewNetwork />
        <ModalError
          changeStatusModal={actionModalError}
          statusModal={modalError}
        />
        <List
          titles={Titles}
          data={networkServices}
          instaNetwork={(network) => this.openModal(network)}
        />
      </Wrapper>
    )
  }
}

export default Logic(ListNewNetworks)

const Wrapper = styled.div`
`
