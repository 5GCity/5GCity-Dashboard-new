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

/* Components */
import Brand from 'components/Brand'
// import { MapIcon } from 'components/Icons'
import Modal from 'components/Modal'
import Button from 'components/Button';


const LINKS = [
  { id: 1, path: '/infoManagement', name: 'Info Management', icon: null, disabled: false , show: ['Inf. Owner'] ,active: false},
  { id: 2, path: '/slices', name: 'Slices', icon:/*<MapIcon />*/ null, disabled: false , show: ['Inf. Owner','Slice Requester'] ,active: false},
  { id: 3, path: '/network', name: 'Network Services', icon: null, disabled:false , show: ['Inf. Owner','Slice Requester'] ,active: false},
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
]
let lastPath = null
class Navbar extends Component {


  activeNavItem = (path) => {
    if(lastPath){
      const link = LINKS.find((x) =>x.path === lastPath)
      if(link !== -1)
        link.active = false
        lastPath = path
    }else{
      lastPath = path
    }
    const link = LINKS.find((x) =>x.path === path)
    if(link !== -1)
      link.active = true
  }

  linksRole = () => {
    const { userRole }= this.props
    return LINKS.filter(link => link.show.find(user => user === userRole))
  }
  navigate = (path) => {
    const { history } = this.props
    this.activeNavItem(path)
    history.push(path)
  }

  render () {
    const {  modalChangeStatus, logout } = this.actions
    const { userName, userRole, modalStatus }= this.props
    return (
      <Wrapper>
      <Modal
       visible={modalStatus}
       title={'Are you sure you want to leave?'}
       size={'tiny'}
       showClose={false}
       onCancel={modalChangeStatus}
      >
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button text={'Yes'} type={'primary'} onClick={logout}/>
          <Button text={'No'} type={'danger'} onClick={modalChangeStatus}/>
        </Modal.Footer>
      </Modal>
      <Brand />
      {this.linksRole().map(el =>
        el.show ?
        <ContainerMenu
          active={el.active}
          key={el.id}
          disabled={el.disabled}
          onClick={() => !el.disabled ? this.navigate(el.path) : null}>
          {el.icon &&
          <IconItem>{el.icon}</IconItem>
          }
          <ItemLabel>{el.name}</ItemLabel>
        </ContainerMenu>
        : null
      )}
        <UserInfo>
          <UserName>{userName}</UserName>
          <UserRole>{userRole}</UserRole>
          <IconUser
            className="el-icon-more"
            onClick={modalChangeStatus}></IconUser>
        </UserInfo>
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
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bodyBackground};
  box-shadow: -5px 0 20px 0 rgba(0,0,0,0.5);
  z-index: 1000;
`
const ContainerMenu = styled.div`
  text-decoration: none;
  color: white;
  text-align: center;
  cursor: pointer;
  height: 60px;
  padding: 14px 16px;
  box-shadow: inset 0 -1px 0 0 rgba(137,151,159,0.15);

${({ active }) => active &&`
  border-right: 3px solid #8CC14E;
`}

${({ active }) => !active &&`
  border-right: none;
`}
`

const ItemLabel = styled.div`
  line-height: 15px;
  padding-top: 8px;
  font-size: 14px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fontDin};
`

const IconItem = styled.i`
  font-size: 32px;
`

const UserInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 18px 8px;
  background-color: rgba(255,255,255,0.02);
  box-shadow: inset 0 1px 0 0 rgba(137,151,159,0.15);
`
const UserName = styled.p`
  font-family: "Open Sans";
  margin: 0 0 6px 0;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 12px;
`
const UserRole = styled.p`
  font-family: "Open Sans";
  margin: 0;
  font-size: 12px;
  line-height: 12px;
  color: #8CC14E;
  font-weight: bold;
`
const IconUser = styled.i`
  position: absolute;
  right: 0;
  top: 45%;
  margin-right: 8px;
  cursor: pointer;
  transform: rotate(90deg);
  color: #fff;
`
