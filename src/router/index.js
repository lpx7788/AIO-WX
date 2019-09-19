import Vue from 'vue'
import Router from 'vue-router'
import getWxLogin from '../utils/authorization'
import {projectConfig} from '@/utils/projectConfig'
import { Toast } from 'vant';
import {httpClient} from '@/utils/httpClient';
import store from '../store/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.DIR_NAME=='dev'?'':(process.env.PATH_LENGTH=='2'?'/'+process.env.DIR_NAME:''),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '聚点商城',
        keepAlive: true,
        keepAlive: true,
        requireArth: true
      },
      component: resolve => require(['../views/Home/index'],resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        title: '我的',
        keepAlive: false,
        requireArth: true
      },
      component: resolve => require(['../views/Mine/index'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        keepAlive: false,
        requireArth: false
      },
      component: resolve => require(['../views/Register/index'],resolve)
    }
  ]
})

//进行登录拦截
router.beforeEach((to, from, next) => {
  store.commit('showLoading')
  // if(to.meta.requireArth){
  //   var userInfo = localStorage.getItem('userInfo');
  //   if(userInfo){ 
  //       next();
  //   } else {
  //     if(!to.query.openid){
  //       getWxLogin.request(projectConfig.WECHAT_LOGIN,'','get')
  //       getWxLogin.request(projectConfig.WECHAT_LOGIN,'','get')
  //     }else{
  //       // 获取用户信息
  //       httpClient.request(projectConfig.GET_USERINFO,{openid:to.query.openid},'post')
  //       .then(res => {
  //         if(res.returnObject){
  //           Toast("登录成功");
  //           localStorage.setItem('userInfo',JSON.stringify(res.returnObject))
  //           setTimeout(function(){
  //             next()
  //           },1000)
  //         }
  //       })
  //     }
  //   }
  // }else{
  //   next();
  // }
  next()
})
router.afterEach((to, from) => {
  store.commit('hideLoading')
})

export default router;
