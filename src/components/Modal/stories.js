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


const bStyle = {
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};

const footerButton = () => {
  return[
    <ContainerButton>
      <Button description={'Yes'} icon={'check'} type={'primary'}/>
      <Button description={'No'} icon={'close'} type={'secondary'}/>
    </ContainerButton>
  ]
}

const exampleOne = () => (
  <div style={bStyle}>
  <Modal visible={true} title={'Confirm acquisition'} footerContent={footerButton()}/>
  </div>
)

storiesOf('Modal', module)
  .add('default', exampleOne)

const ContainerButton = styled.div``