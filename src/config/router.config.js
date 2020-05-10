// eslint-disable-next-line
import HomePage from '@/views/homePage'
export const asyncRouterMap = [
  {
    path: '*', redirect: '/404', hidden: true
  }

]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/homePage',
    component: HomePage,
    hidden: true
  },
  {
    path: '/', redirect: '/homePage', hidden: true
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
