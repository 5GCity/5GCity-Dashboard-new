/**
 * SideBar Component Stories
 * Please write a description or remove this line
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import { Icon } from 'element-react'
import { MapIcon } from 'components/Icons'
import Brand from 'components/Brand'

import SideBar from './index'

const LINKS = [
  { id: 1, path: '/infoManagement', name: 'Info Management', icon: null, disabled: false , show: ['Inf. Owner'] ,active: false},
  { id: 2, path: '/slices', name: 'Slices', icon:/*<MapIcon />*/ null, disabled: false , show: ['Inf. Owner','Slice Requester'] ,active: true},
  { id: 3, path: '/network', name: 'Network Services', icon: null, disabled:true , show: ['Inf. Owner','Slice Requester'] ,active: false},
  { id: 4, path: '/catalogue', name: 'Catalogue', icon: null, disabled:false , show: ['Inf. Owner','Slice Requester'] ,active: false},
  { id: 5, path: '/sdk/services', name: 'SDK', icon: null, disabled:false , show: ['Slice Requester'] ,children: [
    {
    path: '/sdk/services',
    name: 'service'
  },
  {
    path: '/sdk/functions',
    name: 'function'
  }
] ,active: false
},
{ id: 6, path: '/sdk/other', name: 'My Repository', icon: null, disabled:false , show: ['Slice Requester'] ,children: [
  {
  path: '/sdk/wazaaa',
  name: 'services',
},
{
  path: '/sdk/wazaaa',
  name: 'functions',
}
] ,active: false
},
]


class SideBarComponent extends Component {

  state = {
    data: LINKS
  }


  toogleList = item => {
    const dataCopy = this.state.data
    dataCopy.map(obj => {
      if(obj.id === item.id){
        obj.active = !obj.active
      } else if (item.disabled) {
        obj.active = false
      } else {
        obj.active = false
      }
    })
    this.setState({data: dataCopy})
  }
  render () {
    return(
      <SideBar>
      <Brand />
      {this.state.data && this.state.data.map(menu =>
      <SideBar.Container key={menu.id}>
        <SideBar.Menu
          height={60}
          onClick={() => this.toogleList(menu) }
          active={menu.active}
          disabled={menu.disabled}
        >
          {menu.icon &&
          <SideBar.Icon>{menu.icon}</SideBar.Icon>
          }
          <SideBar.Link>{menu.name}</SideBar.Link>
          {menu.children && !menu.active &&
          <Caret name={'caret-bottom'} />
          }
          {menu.children && menu.active &&
          <Caret name={'caret-top'} />
          }
        </SideBar.Menu>
        {menu.children && menu.children.map((submenu, i) =>
        <SideBar.SubMenu
          key={i}
          show={menu.active}
        >
            <SideBar.Link>{submenu.name}</SideBar.Link>
        </SideBar.SubMenu>
        )}
      </SideBar.Container>
      )}
      <SideBar.UserInfo>
      <SideBar.UserName>Name Name</SideBar.UserName>
            <SideBar.UserRole>Slice Requester</SideBar.UserRole>
            <SideBar.IconUser
              className="el-icon-more">
            </SideBar.IconUser>
      </SideBar.UserInfo>
    </SideBar>
    )
  }
}

const componentSidebar = () => (
  <SideBarComponent />
  )

storiesOf('SideBar', module)
  .add('default', componentSidebar)


const Caret = styled(Icon)`
  padding-top: 2px;
  color:white;
  font-size: 12px;
`
