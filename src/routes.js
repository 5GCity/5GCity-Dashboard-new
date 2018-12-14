/**
 * Router
 * Add new routes here
 */

//@flow
import toArray from 'lodash/toArray'

// Import page components bellow here
// Keep them organized as the routes object
// import SamplePage from 'scenes/SamplePage'
import NotFound from 'scenes/NotFound'
import Dashboard from 'scenes/Dashboard'
import Slices from 'scenes/Slices'
import SliceDetail from 'scenes/SliceDetail'
import SliceNew from 'scenes/SliceNew'
import Network from 'scenes/Network'
import NetworkNew from 'scenes/NetworkNew'

// Define routes here
export const Routes: any = {
    Dashboard: {
        key: 'Dashboard',
        name: 'Dashboard',
        path: '/',
        navbar:true,
        component: Dashboard,
        crumb: ['Slices'],
        exact:true
    },
  
  
    Slices: {
        key: 'Slices',
        name: 'Slices',
        path: '/slices',
        component: Slices,
        crumb: ['inicio']
    },


  SliceDetail: {
      key: 'SliceDetail',
      name: 'SliceDetail',
      path: '/slice/:id',
      component: SliceDetail,
      crumb: ['Slices']
  },


  SliceNew: {
      key: 'SliceNew',
      name: 'SliceNew',
      path: '/slices/new',
      component: SliceNew,
      crumb: ['Slices']
  },


  Network: {
      key: 'Network',
      name: 'Network',
      path: '/network',
      component: Network,
      crumb: ['Slices']
  },


  NetworkNew: {
      key: 'NetworkNew',
      name: 'NetworkNew',
      path: '/network/new',
      component: NetworkNew,
      crumb: ['Slices']
  },

  notfound: {
    key: 'notfound',
    name: 'Página não encontrada',
    path: '/404',
    component: NotFound,
    crumb: ['Slices']
  }
}

// Maps don't work on object convert it to an array
export default toArray(Routes)
