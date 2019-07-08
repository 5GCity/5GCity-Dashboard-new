/**
 * Panelresourceedition Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Containers */
import FormCompute from 'containers/Forms/FormCompute'
import FormNetwork from 'containers/Forms/FormNetwork'
import FormRAN from 'containers/Forms/FormRAN'

class PanelResourceEdition extends Component {
  render () {
    const { data }= this.props
    const { type } = data

    return (
      <Panel>
        {type === 'compute' &&
          <FormCompute />
        }
        {type === 'network' &&
          <FormNetwork />
        }
        {type === 'ran' &&
          <FormRAN />
        }
      </Panel>
    )
  }
}

export default Logic(PanelResourceEdition)

const Panel = styled.div`
  margin: 0 24px 0 24px;
`
