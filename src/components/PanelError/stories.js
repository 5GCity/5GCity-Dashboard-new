/**
 * PanelError Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import PanelError from './index'
import Button from 'components/Button'
import { action } from '@storybook/addon-actions'

const State1 = () => (
  <PanelError>
    <CloseButton
      outline
      type={'secondary'}
      text={'Close'}
      icon={'close'}
      onClick={action('click')}
    />
  </PanelError>
)

storiesOf('PanelError', module)
  .add('Default', State1)

const CloseButton = styled(Button)`
    float:right;
  `
