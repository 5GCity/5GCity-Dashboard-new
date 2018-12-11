/**
 * List Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Theme } from 'globalStyles';
import * as moment from 'moment';

import List from './index'
import { Button } from 'components/Button';

const bStyle = {
  padding:30,
  backgroundColor: Theme.bodyBackground,
  height:'100%'
};

const fakeTitle = [{
  id: 1,
  size: 2,
  name: 'Id',
  propItem: 'sliceId',
  filter: true
},{
  id: 2,
  size: 2,
  name: 'Name',
  propItem: 'name',
  filter: true,
},{
  id: 3,
  name: 'Acceptance Date',
  size: 2,
  propItem: 'date',
  filter: true,
  render: (date) =>
     !date ? "N.A" : moment(date).format('DD/MM/YYYY HH:mm')
},{
  id: 4,
  name: 'Status',
  size: 1,
  propItem: 'status',
  filter: true
},{
  id: 5,
  size: 2,
  name: 'Nº of Instantaited Services',
  propItem: 'n_inst',
  filter: true
}]

const fakeTitles = fakeTitle.map((obj) => {
  obj.filter = true
  return obj
})

const fakeData =[
  {
    id: 1,
    sliceId: "00028213",
    name: "Slice name 1",
    date: 1525208520000,
    status: "Approved",
    n_inst: 2
  },
  {
    id: 2,
    sliceId: "00028218",
    name: "Slice name 2",
    date: 1525208520000,
    status: "Approved",
    n_inst: 4
  },
  {
    id: 3,
    sliceId: "00027111",
    name: "Slice name 3",
    date: null,
    status: "Pending",
    n_inst: 0
  }
]

const toogleFilter = item => {
  fakeTitle.map((obj)=>{
    obj.filter = !obj.filter
    return obj
  })
  console.log(item);
}

const exmapleOne = () => (
  <div style={bStyle}>
    <List 
      titles={fakeTitles} 
      data={fakeData} 
      iconFilter={(title)=>toogleFilter(title)}
      removeSlice={(item)=>console.log(item)}
      editSlice={(item)=>console.log(item)}
      viewSlice={(item)=>console.log(item)}
      
    />
  </div>
)

storiesOf('List', module)
  .add('primary', exmapleOne)