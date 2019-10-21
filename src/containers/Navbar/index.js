/**
 * Navbar Container
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Icon } from 'element-react'

/* Components */
import Brand from 'components/Brand'
import Modal from 'components/Modal'
import Button from 'components/Button'
import SideBar from 'components/SideBar'
import { CheckIcon, CloseIcon } from 'components/Icons'

class Navbar extends Component {
  render () {
    const { modalChangeStatus, logout, changeLink } = this.actions
    const { userName, userRole, modalStatus, links } = this.props
    return (
      <Wrapper>
        <Modal
          visible={modalStatus}
          title={'Are you sure you want to leave?'}
          size={'tiny'}
          showClose={false}
          onCancel={modalChangeStatus}
        >
          <Modal.Body />
          <Modal.Footer>
            <Button
              text={'Yes'}
              type={'primary'}
              svg={<CheckIcon />}
              onClick={logout}
            />
            <Button
              text={'No'}
              type={'danger'}
              svg={<CloseIcon />}
              onClick={modalChangeStatus}
            />
          </Modal.Footer>
        </Modal>
        <SideBar>
          <Brand />
          {links && links.map(menu =>
            <SideBar.Container key={menu.id}>
              <SideBar.Menu
                height={96}
                onClick={() => changeLink(menu)}
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
                  onClick={() => changeLink(submenu)}
                  disabled={submenu.disabled}
                  active={submenu.active}
                >
                  <SideBar.Link>{submenu.name}</SideBar.Link>
                </SideBar.SubMenu>
              )}
            </SideBar.Container>
          )}
          <SideBar.UserInfo>
            <SideBar.UserName>{userName}</SideBar.UserName>
            <SideBar.UserRole>{userRole}</SideBar.UserRole>
            <SideBar.IconUser
              className='el-icon-more'
              onClick={modalChangeStatus}
             />
          </SideBar.UserInfo>
        </SideBar>
      </Wrapper>
    )
  }
}

export default withRouter(Logic(Navbar))

const Wrapper = styled.div`
position: fixed;
left: 0;
top: 0;
height: 100vh;
width: 120px;
z-index: 1000;
`
const Caret = styled(Icon)`
  padding-top: 2px;
  color:white;
  font-size: 12px;
`
