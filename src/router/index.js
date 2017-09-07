import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Channel from 'components/channel/channel'
import Play from 'base/video'
import User from 'base/user'
import login from 'base/user/login'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/channel',
      component: Channel
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }, {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
