/**
 * Collapse Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */
import React from 'react'
import { storiesOf, action } from '@storybook/react'

import Collapse from './index'
import Catalogue from 'components/Catalogue'
import { CirclePlus } from 'components/Icons'

const CollapseOne = () => (
  <Collapse value={'favorite'} onChange={action('Collapse on change')}>
    <p title={'My catalogue'}>Catalogue</p>
    <p
      title={'Favorite'}
      name={'favorite'}
      onClick={action('Click Catalogue')}
      icon={<CirclePlus />}
    >
      <Catalogue
        version={'3.0.1'}
        type={'VNF'}
        colortext='blue'
        circlefill='yellow'
        name={'other mec with long name'}
        onClick={action('Click Catalogue')}
      />
      <Catalogue
        version={'1.0.1'}
        type={'VNF'}
        colortext='blue'
        circlefill='yellow'
        name={'other name'}
        onClick={action('Click Catalogue')}
      />
    </p>
  </Collapse>
)

storiesOf('Collapse', module)
  .add('default', CollapseOne)
