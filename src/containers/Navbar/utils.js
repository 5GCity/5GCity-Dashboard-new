/**
 * Navbar Container Utils
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import React from 'react'
import { MapIcon, NetworkServicesIcon, ServiceIcon, AlertIcon } from 'components/Icons'

export const LINKS = [
  {id: 1, path: '/infManagementView', name: 'Inf. Management Overview', icon: <MapIcon fill={'white'} width={32} height={32} />, disabled: false, show: ['Inf. Owner'], active: false},
  {id: 2, path: '/infManagement', name: 'Inf. Management', icon: <MapIcon fill={'white'} width={32} height={32} />, disabled: false, show: ['Inf. Owner'], active: false},
  {id: 3, path: '/slices', name: 'Slices', icon: <MapIcon fill={'white'} width={32} height={32} />, disabled: false, show: ['Inf. Owner', 'Slice Requester'], active: true},
  {id: 4, path: '/alerts', name: 'Alerts', icon: <AlertIcon fill={'white'} />, disabled: false, show: ['Inf. Owner'], active: true},
  {id: 5, path: '/network', name: 'Network Services', icon: <NetworkServicesIcon fill={'white'} />, disabled: false, show: ['Inf. Owner', 'Slice Requester'], active: false},
  {id: 6, path: '/catalogue', name: 'Catalogue', icon: <NetworkServicesIcon fill={'white'} />, disabled: false, show: ['Inf. Owner', 'Slice Requester'], active: false},
  {id: 7,
    name: 'SDK',
    icon: <ServiceIcon fill={'white'} />,
    disabled: false,
    show: ['Inf. Owner','Slice Requester'],
    children: [
      {
        path: '/sdk/organisation',
        name: 'Repositories',
        disabled: false,
        active: false
      },
      {
        path: '/sdk/services',
        name: 'service',
        disabled: false,
        active: false
      },
      {
        path: '/sdk/functions',
        name: 'function',
        disabled: false,
        active: false
      },
      {
        path: '/sdk/descriptors',
        name: 'descriptors',
        disabled: false,
        active: false
      }
    ],
    active: false
  }
]

export const ChangeLink = menu => {
  const linksCopy = [ ...LINKS ]
  for (let i = 0; i < linksCopy.length; i++) {
    const element = linksCopy[i]
    if (element.id === menu.id) {
      element.active = true
    } else if (menu.disabled) {
      element.active = false
    } else {
      element.active = false
    }
    element.children && element.children.forEach(child => child.active = false)
  }
  return linksCopy
}

export const ChangeSubMenuLink = (menu, subMenu) => {
  const linksCopy = [ ...LINKS ]
  linksCopy.forEach(link => {
    link.active = false
    if (link === menu) {
      link.active = true
      link.children.forEach(child => {
        if (child === subMenu) {
          child.active = true
        }
      })
    }
  })
  return linksCopy
}
