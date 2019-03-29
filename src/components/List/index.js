/**
 * List Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import styled from 'styled-components'

const List = styled.div`

`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: no-wrap;
  text-transform: uppercase;
  background-color: transparent;
  color: ${({ theme }) => theme.secondaryColor};
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
  flex: 0 0 225px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: no-wrap;
  align-items: center;
  padding: 26px 16px;
  border-radius: 6px;
  background-color: #5A666D;
  height: 64px;
  color: #fff;
  font-size: 14px;
  font-family: "Open Sans";
  margin-bottom: 16px;
`

List.Header = Header
List.Row = Row
List.Column = Column

export default List
