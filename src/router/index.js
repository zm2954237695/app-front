import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'
import User from "@/views/User";
import Home from "@/views/Home"
import store from "@/store";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: ()=>import('../views/Manage'),
    redirect:"/home",
    children:[
      {
        path: 'user',
        name: '用户管理',
        component: ()=>import('../views/User'),
      },
      {
        path: 'home',
        name: '首页',
        component: ()=>import('../views/Home'),
      },
      {
        path: 'person',
        name: '个人信息',
        component: ()=>import('../views/Person'),
      },
      {
        path: 'file',
        name: '文件管理',
        component: ()=>import('../views/File'),
      },

    ]
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:() =>import('../views/Login')
  },
  {
    path:'/register',
    name:'Register',
    component:() =>import('../views/Register')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to ,from,next)=>{
  localStorage.setItem("currentPathName",to.name)
  store.commit("setPath")
  next()
})
export default router
