import Vue from 'vue'
import Router from 'vue-router'
import Tutorial from '../components/Tutorial/'
import Create from '../components/create/'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tutorial
    },
    {
      path: '/',
      name: 'create',
      component: Create
    }
  ]
})
