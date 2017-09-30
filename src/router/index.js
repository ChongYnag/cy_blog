import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import contactMe from '@/components/contactMe'
import login from '@/components/login'
import regist from '@/components/regist'
import articles from '@/components/articles'
import userinfo from '@/components/userinfo'
import picture from '@/components/picture'
import uploadImg from '@/components/uploadImg'

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
    {
      path:'/articles',
      component:articles
    },
    {
      path:'/userinfo',
      component:userinfo
    },
    {
      path:'/picture',
      component:picture
    },
    {
      path:'/uploadImg',
      component:uploadImg
    },
    //登录后台路由
    {
      path: '/edit',
      component: edit
    }
  ]
})
