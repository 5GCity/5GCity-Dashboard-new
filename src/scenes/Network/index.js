/**
 * Network Scene
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Container */
import NavBar from 'containers/Navbar'

/* Components */
import PageTitle from 'components/PageTitle'
import Input from 'components/Input'
import Select from 'components/Select'
// import Button from 'components/Button'
// import { DeleteIcon, EditIcon } from 'components/Icons'

/* Container */
import ListNetworks from 'containers/ListNetworks'


const selectEx = [{
  name: 'Example 1',
  value: 1, 
},{
  name: 'Example 2',
  value: 2, 
},{
  name: 'Example 3',
  value: 3, 
  disabled: true
}];


class Network extends Component {

  navigateToBack = () => {
    const { history } = this.props
    history.goBack()
  }

  render () {
    return (
      <Wrapper>
        <PageTitle title={'Network services'} buttonTitle={'Add new network service'} type={'primary'} icon={'plus'} buttonFunction={() => this.navigate('/slices/new')}/>
        <ContainerInputs>
          <ContainerSearch>
            <Input icon={'search'} placeholder={'Start typing to search...'} />
          </ContainerSearch>   
          <ContainerSelect>    
                <Select title={'Slices'} uppercase options={selectEx} placeholder={'All Slices'}>
            </Select>
          </ContainerSelect>
        </ContainerInputs>
        <NavBar />
       <ListNetworks />
      </Wrapper>
    )
  }
}


export default Logic(Network)

const Wrapper = styled.div`
  margin-left: 120px;
  padding: 0 24px;
`
const ContainerInputs = styled.div`
  display: flex;
  padding: 16px 0px;
  box-shadow: inset 0 -1px 0 0 #47565F;
`
const ContainerSearch = styled.div`
  height: 32px;
  width: 30%;
`
const ContainerSelect = styled.div`
  margin-left: auto;
  display: flex;
  height: 32px;
`
/* const ContainerButtons = styled.div`
  display: flex;
  align-items: flex-end;
` */

/* const ButtonOnly = styled(Button)`
  margin-left: auto;
` */