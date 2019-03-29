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
import Input from 'components/Input'
import Button from 'components/Button'
import Collapse from 'components/Collapse'
import Catalogue from 'components/Catalogue'


class ComposerMenu extends Component {

  render () {
    const { catalogue, createNode } = this.props

    return (
      <Wrapper>
        <WrapperInput>
          <Input icon={'search'} placeholder={'Start typing to search...'} />
        </WrapperInput>
        <WrapperContent>
          <Collapse value={['catalogue','default']}>
            <WrapperCatalogue title={'General'} name={'default'} key={1}>
              <Catalogue
                name={'Bridge'}
                key={'9998'}
                type={'start'}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                name={'External'}
                key={'9999'}
                type={'stop'}
                onClick={(node) => createNode(node)}
              />
{/*               <Catalogue
                name={'Virtual Switch'}
                key={'9999'}
                type={'VS'}
                onClick={(node) => createNode(node)}
              /> */}
            </WrapperCatalogue>
            <WrapperCatalogue title={'My catalogue'} name={'catalogue'} key={2}>
            {catalogue && catalogue.map((item, i) =>
              <Catalogue
                key={i}
                version={item.version}
                type={'VNF'}
                colortext='#00A294'
                circlefill='#A8D0CE'
                name={item.name}
                onClick={() => createNode(item)}
                disabled={item.disabled}
              />
            )}
            </WrapperCatalogue>
{/*             <WrapperCatalogue title={'Favorites'} name={'favorite'} onClick={(data) => console.log(data)}>
            <Catalogue
              version={'3.0.1'}
              type={'VNF'}
              colortext='blue'
              circlefill='yellow'
              name={'Function D'}
              onClick={(node) => createNode(node)}
            />
            </WrapperCatalogue> */}
          </Collapse>
        </WrapperContent>
        <WrapperButton>
          <Button
            type={'secondary'}
            text={'Add from public repository'}
            icon={'plus'}
            dsiabled={true}
          />
        </WrapperButton>
      </Wrapper>
    )
  }
}

export default Logic(ComposerMenu)

const Wrapper = styled.div`
  background-color: ${({theme}) => theme.bodyBackground };
  position: absolute;
  left: 0;
  min-height: 768px;
  max-width: 240px;
`
const WrapperInput = styled.div`
  max-height: 72px;
  background-color: ${({theme}) => theme.bodyBackground };
  padding: 20px 8px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.2);
`
const WrapperContent = styled.div`
  height: 700px;
  overflow-y:scroll;
  max-width: 240px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.2);
`

const WrapperButton = styled.div`
  position: fixed;
  bottom: 0;
  max-height: 72px;
  width: 240px;
  background-color: ${({theme}) => theme.bodyBackground };
  padding: 20px 20px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.2);
`
const WrapperCatalogue = styled.div`
  text-align:center;
`
