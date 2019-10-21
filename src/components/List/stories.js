/**
 * List Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import * as moment from 'moment'
import styled from 'styled-components'

import { DeleteIcon } from 'components/Icons'
import Button from 'components/Button'

import List from './index'

const fakeTitle = [{
  id: 1,
  size: 300,
  name: 'Id',
  propItem: 'sliceId',
  filter: true
}, {
  id: 2,
  size: 200,
  name: 'Name',
  propItem: 'name',
  filter: true
}, {
  id: 3,
  name: 'Acceptance Date',
  size: 200,
  propItem: 'date',
  filter: true,
  render: (date) =>
     !date ? 'N.A' : moment(date).format('DD/MM/YYYY HH:mm')
}, {
  id: 4,
  name: 'Status',
  size: 50,
  propItem: 'status',
  filter: true
}, {
  id: 5,
  size: 200,
  name: 'Nº of Instantaited Services',
  propItem: 'n_inst',
  filter: true
}]

const fakeData = [
  {
    id: 1,
    sliceId: '00028213',
    name: 'Slice name 1',
    date: 1525208520000,
    status: 'Approved',
    n_inst: 2
  },
  {
    id: 2,
    sliceId: '00028218',
    name: 'Slice name 2',
    date: 1525208520000,
    status: 'Approved',
    n_inst: 4
  },
  {
    id: 3,
    sliceId: '00027111',
    name: 'Slice name 3',
    date: null,
    status: 'Pending',
    n_inst: 0
  }
]

const exmapleOne = () => (
  <List>
    <List.Header>
      {fakeTitle.map(title =>
        <List.Column
          size={title.size}
          key={title.id}
          >
          {title.name}
        </List.Column>
        )}
      <List.Column marginLeft />
    </List.Header>
    {fakeData && fakeData.map((data, i) =>
      <List.Row key={i}>
        {fakeTitle && fakeTitle.map(({ size, propItem, render }) => {
          return [
            render && data &&
            <List.Column
              size={size}
              key={data.id}>
              {render(data[propItem])}
            </List.Column>,
            !render && data &&
            <List.Column
              size={size}
              key={data.id}>
              {data[propItem]}
            </List.Column>
          ]
        })}
        <ColumnBottons key={data.id}>
          <ContainerButtons>
            <Button
              type={'secondary'}
              svg={<DeleteIcon />}
              onClick={() => console.log(data)}
              text={'Remove'} />
            <Button
              type={'primary'}
              icon={'view'}
              onClick={() => console.log(data)}
              text={'View'} />
            <Button
              type={'primary'}
              icon={'setting'}
              onClick={() => console.log(data)}
              text={'Monitoring'}
            />
          </ContainerButtons>
        </ColumnBottons>
      </List.Row>
          )}
  </List>
)

storiesOf('List', module)
  .add('Default', exmapleOne)

const ContainerButtons = styled.div`
  display: flex;
`
const ColumnBottons = styled.div`
  width: 100%;
  float: right;
`
