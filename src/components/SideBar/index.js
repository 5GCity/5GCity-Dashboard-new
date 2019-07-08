/**
 * SideBar Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import styled from 'styled-components'


const SideBar = styled.nav`
  position: absolute;
  margin:0;
  width: 120px;
  display: block;
  background-color: ${({ theme }) => theme.bodyBackground};
  box-shadow: -5px 0 20px 0 rgba(0,0,0,0.5);
  height: 100%;
`
const Container = styled.ul`
  color: white;
  text-align: center;
  cursor: pointer;
  margin: 0;
  padding:0;
  list-style: none;
`
const Menu = styled.li`
  text-transform: capitalize;
  display: flex;
  justify-content:center;
  align-content:center;
  flex-direction:column;
  padding: 14px 16px;
  height: ${({height}) => height}px;
  box-shadow: inset 0 -1px 0 0 rgba(137,151,159,0.15);
  &:hover {
    border-right: 3px solid ${({ theme }) => theme.primaryColor};
  }
  ${({active, theme }) => active && `
    border-right: 3px solid ${theme.primaryColor};
  `}
  ${({disabled}) => disabled && `
    cursor: not-allowed;
    color: rgba(255,255,255,0.3);
  `}
`
const SubMenu = styled.ul`
  text-transform: capitalize;
  box-shadow: inset 0 -1px 0 0 rgba(137,151,159,0.15);
  cursor: pointer;
  margin: 0;
  padding:0;
  list-style: none;
  display: flex;
  justify-content:center;
  align-content:center;
  flex-direction:column;
  width: 100%;
  background-color: rgba(0,0,0,0.1);
  ${({show}) => !show &&`
    visibility: hidden;
    opacity: 0;
    left: 0;
    transition: opacity 0.5s ease;
    height: 0px;
  `}
  ${({show}) => show &&`
  visibility: visible;
  opacity: 1;
  transition: opacity 0.5s ease;
  height: 40px;
`}
  &:hover {
    border-right: 3px solid ${({ theme }) => theme.primaryColor};
  }
  ${({disabled}) => disabled && `
  cursor: not-allowed;
  color: rgba(255,255,255,0.3);
`}
${({active, theme }) => active && `
  border-right: 3px solid ${theme.primaryColor};
`}
`

const Link = styled.a`
  display:block;
  font-size: 14px;
  font-weight: bold;
  font-family:${({ theme }) => theme.fontDin};
  position: relative;
`

const Icon = styled.i`
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
  top: 40%;
  cursor: pointer;
  transform: rotate(90deg);
  color: #fff;
`

SideBar.Container = Container
SideBar.Menu = Menu
SideBar.SubMenu = SubMenu
SideBar.Link = Link
SideBar.Icon = Icon
SideBar.UserInfo = UserInfo
SideBar.UserName = UserName
SideBar.UserRole = UserRole
SideBar.IconUser = IconUser

export default SideBar
