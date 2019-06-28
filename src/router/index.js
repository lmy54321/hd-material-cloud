import Vue from 'vue'
import Router from 'vue-router'

/**
 * author：李茂源
 * time：2019-04-23
 * description：配置路由地址
 */
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../views/home'], resolve), // 路由懒加载
      meta: { title: '主页' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../views/Dashboard'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/s_message',
          component: resolve => require(['../views/supplier/s_message'], resolve),
          meta: { title: '供应商消息' }
        },
        {
          path: '/institution',
          component: resolve => require(['../views/supplier/institution/institution'], resolve),
          meta: { title: '组织机构' }
        },
        {
          path: '/invitation',
          component: resolve => require(['../views/supplier/invitation/invitation'], resolve),
          meta: { title: '邀请函列表' }
        },
        {
          path: '/roleinfo',
          component: resolve => require(['../views/supplier/roleinfo/roleinfo'], resolve),
          meta: { title: '角色信息' }
        },
        {
          path: '/PositionManagement',
            component: resolve => require(['../views/supplier/PositionManagement/PositionManagement'], resolve),
          meta: { title: '职位管理' }
        },
        {
          path: '/resourceManagement',
          component: resolve => require(['../views/supplier/resourceManagement/resourceManagement'], resolve),
          meta: { title: '资源管理' }
        },
        {
          path: '/PeopleManagement',
          component: resolve => require(['../views/supplier/PeopleManagement/PeopleManagement'], resolve),
          meta: { title: '人员信息管理' }
        },
        {
          path: '/supplierinfomodify',
          component: resolve => require(['../views/supplier/supplierinfo/supplierinfomodify'], resolve),
          meta: { title: '信息修改' }
        },
        {
          path: '/showinfo',
          component: resolve => require(['../views/supplier/supplierinfo/showinfo'], resolve),
          meta: { title: '信息查看' }
        },
        {
          path: '/bid_bond_payment_certificate',
          component: resolve => require(['../views/supplier/bondPaymentManagement/bidBondPayment'], resolve),
          meta: { title: '投标保证金上传' }
        },
        {
          path: '/performance_bond_payment_certificate',
          component: resolve => require(['../views/supplier/bondPaymentManagement/performanceBondPayment'], resolve),
          meta: { title: '履约保证金上传' }
        },
        {
          // 合格供应商设置
          path: '/qualified_supplier_settings',
          component: resolve => require(['../views/purchaser/qualified_supplier_settings/qualified_supplier_settings'], resolve),
          meta: { title: '合格供应商设置' }
        },
        {
          // 合格供应商预设列表
          path: '/qualified_suppliers_list',
          component: resolve => require(['../views/purchaser/qualified_suppliers_list'], resolve),
          meta: { title: '合格供应商预设列表' }
        },
        {
          path: '/404',
          component: resolve => require(['../views/404'], resolve),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: resolve => require(['../views/403'], resolve),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../views/login'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../views/403'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../views/404'], resolve)
    },
    {
      path: '/forget_password',
      component: resolve => require(['../views/forget_password'], resolve)
    },
    {
      path: '/supplier_apply',
      component: resolve => require(['../views/supplier_apply'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  // 去掉地址栏的"/#/"
  mode: 'history'
})
