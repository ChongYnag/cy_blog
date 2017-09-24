import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import contactMe from '@/components/contactMe'
import login from '@/components/login'
import regist from '@/components/regist'

//后台页面的路由
import edit from '@/components/back/edit'

Vue.use(Router);

export default new Router({
	mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/contactMe',
      component: contactMe
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/regist',
      component: regist
    },
    //登录后台路由
    {
      path: '/edit',
      component: edit
    }
  ]
})
