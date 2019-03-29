/**
 * SideBar Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Layout, Menu } from 'element-react'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
  <Layout.Col>
  <Menu defaultActive="2">
    <Menu.SubMenu index="1" title="My Repository">
      <Menu.ItemGroup>
        <Menu.Item index="1-1">Services</Menu.Item>
        <Menu.Item index="1-2">Functions</Menu.Item>
      </Menu.ItemGroup>
    </Menu.SubMenu>
    <Menu.Item index="3">Settings</Menu.Item>
  </Menu>
  </Layout.Col>
</Wrapper>
)

const Wrapper = styled(Layout.Row)`
  width: 120px;
  .el-menu {
    background-color: #37474F;
  }
  .el-submenu__title {
    color: blue;
  }
  `

