/**
 * Table Component
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'element-react';
import Progress from 'components/Progress';


export default ({ children, toogleAction, ...props }) => (
  <Wrapper {...props}>
    <Header>
      {props.columns.map( (el) =>
        <Column size={el.size} key={el.title}>{el.title}</Column>
      )}
      <Column></Column>
    </Header>
    <Container>
      {props.data && props.data.map((item) => {
        return[
        <Row key={item.id} onClick={() => toogleAction(item)}>
          {props.columns && props.columns.map(({ prop, render, size }) => {
            const colProps = { size }
            return [
              render && item[prop] && <Column key={item.id} {...colProps}> <ColumnTitle>{render(item[prop])}</ColumnTitle> <ProgressContainer percentage={item[prop].percentage} type={'line'} textInside={false} showText={false} status={item[prop].status} /></Column>,
              !render && item[prop] && <Column key={item.id} {...colProps}>{item[prop]}</Column>
            ]
          })}
          <Column key={item.id}>
            { item.open &&
              <Icon name={'arrow-up'} />
            }
            { !item.open &&
              <Icon name={'arrow-right'} />
            }
          </Column>
        </Row>,
        item.details && item.details.map((detail) =>
        <DetailRow key={detail.id} show={item.open}>
         {props.columns && props.columns.map(({ prop, render, size }) => {
            const colProps = { size }
            return [
              render && detail[prop] &&
              <Column key={detail.id} {...colProps}>
                <ColumnTitle>{render(detail[prop])}</ColumnTitle>
                <ProgressContainer
                  percentage={item[prop].percentage}
                  type={'line'}
                  textInside={false}
                  showText={false}
                  status={item[prop].status}
                />
              </Column>,
              !render && detail[prop] &&
              <Column key={detail.id} {...colProps}>
              {detail[prop]}</Column>
            ]
          })}
            <Column key={detail.id}></Column>
        </DetailRow>
        )
        ]})}
    </Container>
  </Wrapper>
)


const Wrapper = styled.div`
`

const Header = styled.div`
  display: flex;
  align-items: center;
	height: 48px;
  padding 25px 26px;
  color: #89979F;
  font-family: ${({ theme }) => theme.fontDinCondensed };
  font-size: 12px;
  letter-spacing: 1px;
	background-color: #37474F;
	box-shadow: inset 0 -1px 0 0 #47565F;
`

const Container = styled.div``

const Row = styled.div`
  display: flex;
  align-items: center;
  padding 25px 26px;
	height: 64px;
  background-color: #37474F;
  color: #FFFFFF;
  font-family: "Open Sans";
  font-size: 14px;
	box-shadow: inset 0 1px 0 0 #47565F, inset 0 -1px 0 0 #47565F;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding 25px 26px;
  background-color: #324148;
  color: #FFFFFF;
  font-family: "Open Sans";
  font-size: 14px;
  box-shadow: inset 0 1px 0 0 #47565F, inset 0 -1px 0 0 #47565F;

  ${({ show }) => !show && `
    display: none;
    height: 0px;
  `}
`

const Column = styled.div`
  align-items: center;

  :last-child {
    height: 14px;
    width: 14px;
  }

  ${({ size }) => size && `
    flex-basis: ${size}%;

  `}
`
const ColumnTitle = styled.p`
  margin:16px 0px 12px 0px;
`

const ProgressContainer = styled(Progress)`
  padding-right: 160px;
  margin-bottom: 16px;
`
