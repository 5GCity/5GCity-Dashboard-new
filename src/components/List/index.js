/**
 * List Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import { Icon } from 'element-react'
import { DeleteIcon } from 'components/Icons'

export default ({ children, titles, data, buttons, iconFilter, removeSlice, editSlice, viewSlice, ...props }) => (
  <Wrapper {...props}>
  <Header>
    {titles.map(title => 
      <Column size={title.size} key={title.id} onClick={() => iconFilter(title)}>{title.name} {title.filter ? <IconFilter name={'caret-bottom'}/> : <IconFilter name={'caret-up'}/>}</Column>
    )} 
    <Column marginLeft></Column>
  </Header>
  <Container>
   {data && data.map(data =>
    <Row key={data.id} >
      {titles && titles.map(({ size, propItem, render }) => {
         return [
          render && data && <Column size={size} key={data.id}>{render(data[propItem])}</Column>,
          !render && data && <Column size={size} key={data.id}>{data[propItem]}</Column>
        ]
      })}
      {titles && titles.map(({ propItem }) => {
          return [
          data[propItem] === 'Approved' && 
          <Column>
            <ContainerButtons>
              <ButtonList type={'secondary'} svg={ <DeleteIcon /> } onClick={() => removeSlice(data)} description={'Remove'} />
              <ButtonList type={'primary'} icon={'view'} onClick={() => viewSlice(data)} description={'View'} />
              {/* <ButtonList type={'secondary'} svg={ <EditIcon /> } onClick={() => editSlice(data)} description={'edit'} /> */}
            </ContainerButtons>    
         </Column>
         ]
      })}

      {titles && titles.map(({ propItem }) => {
         return [
           data[propItem] === 'Pending' &&
          <Column marginLeft>
              <ButtonList type={'primary'} icon={'view'} onClick={() => viewSlice(data)} description={'View'}/>
          </Column>
         ]
      })}
    </Row>

    )}
  </Container>
  </Wrapper>
)



const Wrapper = styled.div`
  width: 100%;
`

const Header = styled.div`
    text-transform: uppercase;
    background-color: transparent;
    color: #89979F;
    ${({ theme }) => theme &&`
    font-family: ${({ theme }) => theme.secondaryFont};
    `}
    font-size: 12px;
    display: flex;
    cursor: pointer;
    align-items: center;
    margin: 14px 16px;
`

const Column = styled.div`
  flex: 1 1;
  padding-right: 10px;
`
const Container = styled.div``

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 26px 16px;
  background-color: #5A666D;
  border-radius: 6px;
  height: 64px; 
  color: #fff;
  font-size: 14px;
  font-family: "Open Sans";
  margin-bottom: 16px;
`
const ContainerButtons = styled.div`
  display: flex;
  align-items: unset;
`

const ButtonList = styled(Button)`
margin-left: auto;
`
/* const ColumnItem = styled.span`
font-size:14px;
font-family: "Open Sans";
font-weight: 600;
color: #FFFFFF;

${({ propItem }) => propItem === 'n_inst' &&`
  color: #8CC14E;`
}

${({ data }) => data === 'Pending' &&`
  color: #E3C60B;`
}
` */
const IconFilter = styled(Icon)`
  height: 24px;
  width: 24px;
  padding-left: 6px;
`