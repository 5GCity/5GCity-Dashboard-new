/**
 * Modal Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles'
import styled from 'styled-components'

/* Components */
import Button from 'components/Button';

import Modal from './index'

const footerButton = () => {
  return[
    <ContainerButton>
      <Button text={'Yes'} icon={'check'} type={'primary'}/>
      <Button text={'No'} icon={'close'} type={'secondary'}/>
    </ContainerButton>
  ]
}

const exampleOne = () => (
  <Modal
    visible={true}
    title={'Confirm'}
    footerContent={footerButton()}
  />
)

storiesOf('Modal', module)
  .add('default', exampleOne)

const ContainerButton = styled.div``
