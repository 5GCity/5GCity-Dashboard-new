/**
 * Navbar Container Logic
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import { kea } from 'kea'
import { put, call } from 'redux-saga/effects'
import PropTypes from 'prop-types'
import { LINKS, ChangeLink, ChangeSubMenuLink } from './utils'

/* Logic */
import AppLogic from 'containers/App/logic'

export default kea({
  path: () => ['scenes', 'containers', 'Navbar'],

  connect: {
    props: [
      AppLogic, [
        'keycloak',
        'userName',
        'userRole',
      ]
    ],
  },

  actions: () => ({
    modalChangeStatus:() => ({ }),
    logout: () => ({ }),
    changeLink: (menu) => ({ menu }),
    setlinks: (links) => ({ links }),
    changeLastLink: (path) => ({ path }),
    getLocation: () => ({}),

    reset: () => ({}),
  }),

  reducers: ({ actions }) => ({
    modalStatus: [false, PropTypes.boolean,{
      [actions.modalChangeStatus]: (state, payload) => !state,
      [actions.reset]: () => false,
    }],
    allLinks: [LINKS, PropTypes.array,{
      [actions.setlinks]: (state, payload) => payload.links,
    }],
  }),

  selectors: ({ selectors }) => ({
    links: [
      () => [selectors.allLinks, selectors.userRole],
      (allLink, userRole) => allLink.filter(link => link.show.find(user => user === userRole)),
      PropTypes.array
    ],
  }),

  start: function * () {
    const { getLocation } = this.actions

    yield put(getLocation())
  },

  stop: function * () {
    const { reset } = this.actions

    yield put(reset())
  },

  takeLatest: ({ actions, workers }) => ({
    [actions.logout]:workers.logout,
    [actions.changeLink]: workers.changeLink,
    [actions.getLocation]: workers.getLocation,
  }),

  workers: {
    *getLocation() {
      const { setlinks }= this.actions
      const path = this.props.location.pathname
      const links = yield this.get('links')
      let menu = null
      let subMenu = null
      links.forEach(link => {
        if (link.path === path) {
          menu = link
        }
        link.children && link.children.forEach(child => {
          if (child.path === path) {
            menu = link
            subMenu = child
          }
        })
      })
      if (menu && !subMenu) {
        const newLinks = ChangeLink(menu)
        yield put(setlinks(newLinks))
        yield call(this.props.history.push, menu.path)
      } else if (menu && subMenu) {
        const newLinks = ChangeSubMenuLink(menu, subMenu)
        yield put(setlinks(newLinks))
        yield call(this.props.history.push, menu.path)
      }
    },

    * logout(){
      const { modalChangeStatus } = this.actions
      yield put(modalChangeStatus())
      const keycloak = yield this.get('keycloak')
      keycloak.logout()
    },

    * changeLink(action) {
      const { setlinks }= this.actions
      const menu = action.payload.menu

      if(menu.path === undefined && menu.children){
        const newLinks = ChangeLink(menu)
        yield put(setlinks(newLinks))
        yield call(this.props.history.push, menu.path)
      } else if(menu.path && !menu.disabled){
        yield call(this.props.history.push, menu.path)
      }
    }
  }
})

