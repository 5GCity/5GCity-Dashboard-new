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
    // Actions
    const { createNode } = this.actions

    return (
      <Wrapper>
        <WrapperInput>
          <Input icon={'search'} placeholder={'Start typing to search...'} />
        </WrapperInput>
        <WrapperContent>
          <Collapse value={["favorite","catalogue","default"]}>
            <WrapperCatalogue title={"General"} name={"default"}>
              <Catalogue
                name={"Start"}
                type={'start'}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                name={"Stop"}
                type={'stop'}
                onClick={(node) => createNode(node)}
              />
            </WrapperCatalogue>
            <WrapperCatalogue title={"My catalogue"} name={"catalogue"}>
              <Catalogue
                version={"1.0.1"}
                type={'VNF'}
                colortext="#00A294"
                circlefill="#A8D0CE"
                name={"Traffic Filtering"}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                version={"1.0.2"}
                type={'MEC'}
                colortext="#A900B8"
                circlefill="#CDB5D3"
                name={"Video Analysis"}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                version={"2.1.3"}
                type={'MEC'}
                colortext="#00A294"
                circlefill="#A8D0CE"
                name={"Video Processing"}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                version={"1.0.0"}
                type={'VNF'}
                colortext="#006BB7"
                circlefill="#A9C2D1"
                name={"Video Distribution"}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                version={"1.0.1"}
                type={'VNF'}
                colortext="#006BB7"
                circlefill="#A9C2D1"
                name={"Function A"}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                version={"2.0.1"}
                type={'VNF'}
                colortext="#006BB7"
                circlefill="#A9C2D1"
                name={"Function B"}
                onClick={(node) => createNode(node)}
              />
              <Catalogue
                version={"2.0.1"}
                type={'VNF'}
                colortext="#006BB7"
                circlefill="#A9C2D1"
                name={"Function C"}
                onClick={(node) => createNode(node)}
              />
            </WrapperCatalogue>
            <WrapperCatalogue title={"Favorites"} name={"favorite"} onClick={(data) => console.log(data)}>
            <Catalogue
              version={"3.0.1"}
              type={'VNF'}
              colortext="blue"
              circlefill="yellow"
              name={"Function D"}
              onClick={(node) => createNode(node)}
            />
            </WrapperCatalogue>
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
