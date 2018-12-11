/**
 * Slices Scene
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'


/* Components */
import PageTitle from 'components/PageTitle';
/* import Input from 'components/Input';
import Select from 'components/Select'; */

/* Containers */
import ListSlices from 'containers/ListSlices';

import { withRouter } from 'react-router-dom';

/* const selectEx = [{
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
 */
class Slices extends Component {


  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    return (
      <Wrapper>
        <PageTitle 
          title={'slices'} 
          buttonTitle={'Add new slice'} 
          type={'primary'} 
          icon={'plus'} 
          buttonFunction={() => this.navigate('/slices/new')}/>
  {/*       <ContainerInputs>
          <ContainerSearch>
            <Input icon={'search'} placeholder={'Start typing to search...'} />
          </ContainerSearch>   
          <ContainerSelect>    
            <Select title={'Status'} placeholder={'All vendors'} uppercase options={selectEx}>
            </Select>
                <Select title={'Nº of Instantiated services'} uppercase options={selectEx} placeholder={'All vendors'}>
            </Select>
          </ContainerSelect>
        </ContainerInputs> */}
        <ListSlices  />
      </Wrapper>
    )
  }
}

export default withRouter(Logic(Slices))

const Wrapper = styled.div`
  margin-left:120px;
  padding: 0 24px;
`
/* const ContainerInputs = styled.div`
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
`*/