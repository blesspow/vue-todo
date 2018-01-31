import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/boards/Main'
import CreateBoard from '@/components/CreateBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/boards/:boardToken',
      name: 'Boards',
      component: Main
    },
    {
      path: '/welcome',
      name: 'Create Board',
      component: CreateBoard
    },
    {
      path: '*',
      redirect: '/welcome'
    }
  ]
})
