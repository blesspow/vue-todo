import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/boards/Main'
import CreateBoard from '@/components/CreateBoard'
import PrivacyPolicy from '@/components/PrivacyPolicy'

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
      path: '/privacy',
      name: 'Privacy Policy',
      component: PrivacyPolicy
    },
    {
      path: '*',
      redirect: '/welcome'
    }
  ]
})
