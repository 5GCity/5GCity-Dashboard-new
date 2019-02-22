/**
 * List Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
// import { Icon } from 'element-react'
import { DeleteIcon } from 'components/Icons'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    <Header>
      {props.titles.map( title =>
        <Column
        size={title.size}
        key={title.id}
        // onClick={() => iconFilter(title)}
        >
          {title.name}
{/*           {title.filter && <IconFilter name={'caret-bottom'}/>}
          {!title.filter && <IconFilter name={'caret-up'}/>} */}
        </Column>
      )}
      <Column marginLeft></Column>
    </Header>
    <Container>
    {props.data && props.data.map((data, i) =>
      <Row key={i}>
        {props.titles && props.titles.map(({ size, propItem, render }) => {
          return [
            render && data &&
            <Column
              size={size}
              key={data.id}>
              {render(data[propItem])}
            </Column>,
            !render && data &&
            <Column
              size={size}
              key={data.id}>
              {data[propItem]}
            </Column>
          ]
        })}
        <ColumnBottons key={data.id} >
          {props.slices && props.titles.map(({ propItem }, i) => {
              return (
              data[propItem] === 'Approved' &&
                <ContainerButtons key={i}>
                  <ButtonList
                    type={'secondary'}
                    svg={ <DeleteIcon /> }
                    onClick={() => props.removeSlice(data)}
                    text={'Remove'} />
                  <ButtonList
                    type={'primary'}
                    icon={'view'}
                    onClick={() => props.viewSlice(data)}
                    text={'View'} />
                  {/*<ButtonList
                      type={'secondary'}
                      svg={ <EditIcon /> }
                      onClick={() => props.editSlice(data)}
                      text={'edit'}
                    /> */}
                  <ButtonList
                    type={'primary'}
                    icon={'setting'}
                    onClick={() => props.viewSliceMonitor(data)}
                    text={'Monitoring'}
                  />
                </ContainerButtons>
              )
          })}
          {props.slices && props.titles.map(({ propItem }) => {
            return (
              data[propItem] === 'Pending' &&
              <ColumnBottons marginLeft>
                  <ButtonList
                  type={'primary'}
                  icon={'view'}
                  onClick={() => props.viewSlice(data)}
                  text={'View'}/>
              </ColumnBottons>
            )
          })}
          {props.network &&
          <ContainerButtons>
            <ButtonList
              type={'secondary'}
              svg={ <DeleteIcon /> }
              onClick={() => props.removeNetwork(data)}
              text={'Remove'}
            />
            <ButtonList
              type={'primary'}
              icon={'view'}
              onClick={() => props.viewNetwork(data)}
              text={'View'}
            />
              <ButtonList
              type={'primary'}
              icon={'setting'}
              onClick={() => props.viewNetworkMonitor(data)}
              text={'Monitoring'}
            />
          </ContainerButtons>
          }
          {props.instaNetwork &&
            <ContainerButtons>
              <ButtonList
                type={'primary'}
                onClick={() => props.instaNetwork(data)}
                text={'Instantiate'} />
            </ContainerButtons>
          }
        </ColumnBottons>
      </Row>
      )}
    </Container>
  </Wrapper>
)



const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: no-wrap;
  height: 100%;
  width: auto;
  text-transform: uppercase;
  background-color: transparent;
  color: #89979F;
  ${({ theme }) => theme &&`
  font-family: ${({ theme }) => theme.fontDin};
  `}
  font-size: 12px;
  cursor: pointer;
  align-items: center;
  margin: 14px 16px;
`

const Column = styled.div`
  padding-right: 10px;
  flex: 0 0 250px;
`

const ColumnBottons = styled.div`
  width: 100%;
  float: right;
`
const Container = styled.div`
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: no-wrap;
  height: 100%;
  width: auto;
  align-items: center;
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
  float: right;
`

const ButtonList = styled(Button)`
  float: right;
`

/* const IconFilter = styled(Icon)`
  height: 24px;
  width: 24px;
  padding-left: 6px;
` */
