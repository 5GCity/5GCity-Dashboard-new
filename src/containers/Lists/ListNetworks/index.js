/**
 * Listnetworks Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import { withRouter } from 'react-router-dom'


/* Containers */
import ModalInfoNetwork from 'containers/Modals/ModalInfoNetwork'
import ModalRemoveNetwork from 'containers/Modals/ModalRemoveNetwork'

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
  name: 'Slice Name',
  propItem: 'slic3Name',
  render: (vendor) =>
     !vendor ? "N.A" : vendor
}]


class ListNetworks extends Component {

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }


  render () {
    const  { networkServicesInstance, loadingList, modalInfo, modalDelete, networkSelect } = this.props
    const { actionModal, actionModalDelete } = this.actions
    return (
        <Loading loading={loadingList}>
          <ModalInfoNetwork
            networkSelect={networkSelect}
            OpenModal={modalInfo}
          />
          <ModalRemoveNetwork
            size={'tiny'}
            changeStatus={actionModalDelete}
            data={networkSelect}
            statusModal={modalDelete}
            title={'Remove Network Service'}
          />

          <List
            titles={Titles}
            data={networkServicesInstance}
            removeNetwork={(network) => actionModalDelete(network)}
            viewNetwork={(network) => actionModal(network)}
            viewNetworkMonitor={({ id }) => this.navigate(`/monitor/ns_id/${id}`)}
            network
          />
        </Loading>
    )
  }
}

export default withRouter(Logic(ListNetworks))
