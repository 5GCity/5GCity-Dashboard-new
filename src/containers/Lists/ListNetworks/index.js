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

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }


  render () {
    const  { networkServicesInstance, loadingList, modalVisibled, networkSelect } = this.props
    const { actionModal } = this.actions
    const { deleteNetwork } = this.actions
    return (
        <Loading loading={loadingList}>
          <ModalNetwork networkSelect={networkSelect} OpenModal={modalVisibled} />
          <List
            titles={Titles}
            data={networkServicesInstance}
            removeNetwork={({ id }) => deleteNetwork(id)}
            viewNetwork={(network) => actionModal(network)}
            viewNetworkMonitor={({ id }) => this.navigate(`/monitor/ns_id/${id}`)}
            network
          />
        </Loading>
    )
  }
}

export default withRouter(Logic(ListNetworks))
