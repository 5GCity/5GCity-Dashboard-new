/**
 * Modalsliceerror Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { connect } from 'kea'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import Input from 'components/Input'

/* Container */
import Modal from 'components/Modal'

class ModalSliceError extends Component {
  render () {
    return (
      <Modal
        footerContent={ this.footerButton() }
      >
        <Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Item label="Slice name" labelWidth="120">
              <Input
                value={sliceName}
                onChange={(value) => change(value)} />
            </Form.Item>
        </Form>
        </Body>
      </Modal>
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
})(ModalSliceError)

const Wrapper = styled.div`

`
