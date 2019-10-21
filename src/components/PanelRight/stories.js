/**
 * Sidebar Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'
import styled from 'styled-components'

import PanelRight from './index'

import Button from 'components/Button'

class PanelRightComponent extends Component {
  state = {
    show: false
  }

  render () {
    const { show } = this.state
    return (
      <React.Fragment>
        <PanelRight
          show={show}
      >
          <CloseContainer onClick={() => this.setState({show: !show})} />
          <Title>teste</Title>
        </PanelRight>
        <Button
          text='Show'
          onClick={() => this.setState({show: !show})}
      />
      </React.Fragment>
    )
  }
}

const exampleOne = () => (
  <PanelRightComponent />
)

const Title = styled.h5`
  color: ${Theme.primaryColor};
  font-family: ${Theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
`

const CloseContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  text-align: center;
  left: -31px;
  height: 32px;
  font-size: 20px;
  width: 32px;
  color: #89979F;
  background-color: #37474F;
  box-shadow: inset -1px 0 0 0 rgba(0,0,0,0.15), 0 0 50px 0 rgba(0,0,0,0.2);
  cursor: pointer;
`

storiesOf('Panel Right', module)
  .add('default', exampleOne)
