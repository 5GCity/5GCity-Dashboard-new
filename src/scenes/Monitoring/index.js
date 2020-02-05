/**
 * Monitoring Scene
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component, Fragment } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { API_MONITORING } from 'config'

/* Components */
import HeaderNav from 'components/HeaderNav'
import { BackIcon } from 'components/Icons'
import Loading from 'components/Loading'
class Monitoring extends Component {
  state = {
    iframe: null
  }

  componentDidMount () {
    const { name } = this.props.match.params
    const iframe = `${API_MONITORING}/d/qymONwsWz/node-view?refresh=1h&orgId=1&var-service=${name}`

    this.setState({iframe})
  }

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { iframe } = this.state
    return (
      <Fragment>
        <Loading />
        <HeaderNav
          buttonBack={<BackIcon />}
          navigateBack={() => this.navigateToBack()}
          name={'Monitoring'}
      />
        {iframe &&
        <Wrapper id='iframeMonitoring' src={iframe} />
      }
      </Fragment>
    )
  }
}

export default withRouter((Logic(Monitoring)))

const Wrapper = styled.iframe`
  height: calc(100% - 80px) !important;
  width: 100%;
  border:none;
`
