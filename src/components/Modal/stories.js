/**
 * Modal Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf, action } from '@storybook/react'
import styled from 'styled-components'

/* Components */
import Button from 'components/Button'

import Modal from './index'

const exampleOne = () => (
  <Modal
    title='Atributtion'
    size='tiny'
    visible={true}
    onCancel={action('Close Modal')}
  >
    <Modal.Body>
      <h1>test</h1>
    </Modal.Body>
    <Modal.Footer>
    <Button text={'No'} icon={'close'} type={'secondary'}/>
    <Button text={'Yes'} icon={'check'} type={'primary'}/>
    </Modal.Footer>
  </Modal>
)

storiesOf('Modal', module)
  .add('Default', exampleOne)
