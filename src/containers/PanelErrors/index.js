/**
 * Panelerror Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import PanelError from 'components/PanelError'

/* Component */
import Button from 'components/Button'
import AlertMessages from 'components/AlertMessages'
import { CloseIcon } from 'components/Icons'

class PanelErrors extends Component {
  render () {
    const { show, messages, close } = this.props
    return (
      <PanelError
        show={show}
      >
        <CloseButton
          outline
          type={'secondary'}
          text={'Close'}
          svg={<CloseIcon />}
          onClick={() => close()}
        />
        {messages && messages.map(message =>
          <AlertMessages
            type={message.type}
            message={message.message}
            location={message.location}
            title={message.title}
            description={message.description}
            key={message.id}
          />
        )}
      </PanelError>
    )
  }
}

export default Logic(PanelErrors)

const CloseButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: 24px;
`
