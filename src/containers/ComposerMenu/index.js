/**
 * Composermenu Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

// Components
import Collapse from 'components/Collapse'
import Catalogue from 'components/Catalogue'
import Select from 'components/Select'

class ComposerMenu extends Component {
  render () {
    const { functions, createNode, selectOrganization, organizationsList
     } = this.props
    const { changeOrganization }= this.actions
    return (
      <Wrapper>
        <WrapperInput>
          <Select
            type={'default'}
            options={organizationsList}
            selectOption={selectOrganization}
            onChange={value => changeOrganization(value)}
          />
        </WrapperInput>
        <WrapperContent>
          <Collapse value={['catalogue', 'default']}>
            <WrapperCatalogue title={'General'} name={'default'} key={1}>
              <Catalogue
                name={'Bridge'}
                key={'9997'}
                type={'bridge'}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                name={'External'}
                key={'9998'}
                type={'external'}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                name={'VS'}
                key={'9999'}
                type={'vs'}
                onClick={(node) => createNode(node)}
              />
            </WrapperCatalogue>
            <WrapperCatalogue title={selectOrganization} name={'catalogue'} key={2}>
            {functions && functions.map((item, i) =>
              <Catalogue
                key={i}
                version={item.version}
                type={'vnf'}
                colortext='#00A294'
                circlefill='#A8D0CE'
                name={item.name}
                onClick={() => createNode(item)}
              />
            )}
            </WrapperCatalogue>
          </Collapse>
        </WrapperContent>
      </Wrapper>
    )
  }
}

export default Logic(ComposerMenu)

const Wrapper = styled.div`
  background-color: ${({theme}) => theme.bodyBackground};
  position: absolute;
  left: 0;
  min-height: 768px;
  max-width: 240px;
`
const WrapperInput = styled.div`
  max-height: 72px;
  background-color: ${({theme}) => theme.bodyBackground};
  padding: 20px 8px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.2);
`
const WrapperContent = styled.div`
  height: 100vh;
  overflow-y:scroll;
  max-width: 240px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.2);
`

const WrapperCatalogue = styled.div`
  text-align:center;
`
