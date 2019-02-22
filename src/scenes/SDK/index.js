/**
 * SDK Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'

/* Container */
import SDKContainer from 'containers/SDKContainer'

class SDK extends Component {
  render () {
    return (
      <SDKContainer />
    )
  }
}


export default  Logic(SDK)

