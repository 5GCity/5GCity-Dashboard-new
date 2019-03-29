/**
 * Catalogue Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';

import Catalogue from './index'
import styled from 'styled-components'

const ExampleOne = () => (
  <Wrapper>
    <Catalogue
      name={"Start"}
      type={'start'}
      onClick={action('click')}
    />
    <Catalogue
      version={"3.0.1"}
      type={'VNF'}
      colortext="blue"
      circlefill="yellow"
      name={"other mec with long name"}
      onClick={action('click')}
    />
    <Catalogue
      version={"3.0.1"}
      type={'VNF'}
      colortext="whiteSmoke"
      circlefill="green"
      name={"other mec name"}
      onClick={action('click')}
      disabled
    />
    <Catalogue
      name={"Virtual Switch"}
      type={'VS'}
      onClick={action('click')}
    />
  </Wrapper>
)

storiesOf('Catalogue', module)
  .add('default', ExampleOne)

  const Wrapper = styled.div``
