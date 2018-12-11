/**
 * Listnetworks Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { connect } from 'kea'
import Logic from './logic'
// import styled from 'styled-components'
/* Components */
import List from 'components/List'

const Titles = [{
  id: 1,
  size: 20,
  name: 'Id',
  propItem: 'id',
  filter: true
},{
  id: 2,
  size: 20,
  name: 'Short Name',
  propItem: 'short_name',
  filter: true,
},{
  id: 3,
  size: 15,
  name: 'Vendor',
  propItem: 'vendor',
  filter: true,
  render: (date) =>
     !date ? "N.A" : moment(date).format('DD/MM/YYYY HH:mm')
},{
  id: 4,
  size: 10,
  name: 'Version',
  propItem: 'version',
  filter: true,
  render: (status) =>
     !status ? '...' : status
},{
  id: 5,
  size: 15,
  name: 'slice',
  propItem: 'slice',
  filter: true,
  render: (n_inst) =>
     !n_inst ? "..." : n_inst
},{
  id: 6,
  size: 15,
  name: 'Last Update',
  propItem: 'last_update',
  filter: true,
  render: (n_inst) =>
     !n_inst ? "..." : n_inst
}]

class ListNetworks extends Component {

  render () {
    const  { networksServices } = this.props
    console.log(networksServices)
    return (
      <List 
        titles={Titles} 
        data={networksServices} 
      />  
    )
  }
}

export default connect({
  props: [
    Logic, [

    ]
  ],

  actions: [
    Logic, [

    ]
  ]
})(ListNetworks)


