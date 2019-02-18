/**
 * Listnetworks Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'


/* Containers */
import ModalNetwork from 'containers/Modals/ModalNetwork'

/* Components */
import List from 'components/List'
import Loading from 'components/Loading'


const Titles = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
},{
  id: 2,
  size: 20,
  name: 'Short Name',
  propItem: 'name',
},{
  id: 3,
  size: 15,
  name: 'Slice ID',
  propItem: 'slic3Id',
  render: (vendor) =>
     !vendor ? "N.A" : vendor
}]


class ListNetworks extends Component {

  openModal = (network) => {
    const { actionModal, setNetworkSelect } = this.actions
    setNetworkSelect(network)
    actionModal()
  }

  allInfoNetwork = (network) => {
    const { actionModal, setNetworkSelect } = this.actions
    setNetworkSelect(network)
    actionModal()
  }

  render () {
    const  { networkServicesInstance, loadingList } = this.props
    return (
        <Loading loading={loadingList}>
          <ModalNetwork />
          <List
            titles={Titles}
            data={networkServicesInstance}
            removeNetwork={(network) => this.openModal(network)}
            viewNetwork={(network) => this.allInfoNetwork(network)}
            network
          />
        </Loading>
    )
  }
}

export default withRouter(Logic(ListNetworks))
