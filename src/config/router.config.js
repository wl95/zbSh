// eslint-disable-next-line
// /* jshint esversion: 6 */
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import HomePage from '@/views/homePage'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/maintenance/userIndex', // 修改登录之后的首页
    children: [
      // 代码生成
      {
        path: '/codeTemplate',
        name: 'codeTemplate',
        redirect: '/codeTemplate/codeTemplateIndex',
        component: RouteView,
        meta: { title: '代码模板', keepAlive: true, icon: bxAnaalyse, permission: ['support111'] },
        children: [
          {
            path: '/codeTemplate/TemplateClass',
            name: 'TemplateClass',
            component: () => import('@/views/codeTemplate/TemplateClass'),
            meta: { title: '模板分类', keepAlive: false }
          },
          {
            path: '/codeTemplate/tag',
            name: 'tag',
            component: () => import('@/views/codeTemplate/tag'),
            meta: { title: '标签分类', keepAlive: false }
          },
          {
            path: '/codeTemplate/codeTemplateIndex',
            name: 'codeTemplateIndex',
            component: () => import('@/views/codeTemplate/codeTemplateIndex'),
            meta: { title: '代码生成设置', keepAlive: false }
          },
          {
            path: '/codeTemplate/GetEfModelList',
            name: 'GetEfModelList',
            component: () => import('@/views/codeTemplate/GetEfModelList'),
            meta: { title: '代码生成后台', keepAlive: false }
          }
        ]
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: '监控页（外部）', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: '表单页', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      },
      // 首页
      {
        path: '/home/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage'),
        meta: { title: '首页', keepAlive: true, icon: 'radar-chart', permission: ['Home'] }
      },
      // 项目管理
      {
        path: '/home/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage'),
        meta: { title: '项目管理', keepAlive: true, icon: 'book', permission: ['Home'] }
      },
      // 数据维护
      {
        path: '/maintenance',
        name: 'maintenance',
        redirect: '/maintenance/departmentIndex',
        component: RouteView,
        meta: { title: '数据维护', keepAlive: true, icon: 'form', permission: ['Department', 'Role', 'User', 'Project'] },
        children: [
          {
            path: '/maintenance/departmentIndex',
            name: 'departmentIndex',
            component: () => import('@/views/maintenance/departmentIndex'),
            meta: { title: '部门维护', keepAlive: false, icon: 'team', permission: ['Department'] }
          },
          {
            path: '/maintenance/departmentModel',
            name: 'departmentModel',
            hidden: true,
            component: () => import('@/views/maintenance/departmentModel'),
            meta: { title: '部门维护', keepAlive: false }
          },
          {
            path: '/maintenance/RoleIndex',
            name: 'RoleIndex',
            component: () => import('@/views/maintenance/RoleIndex'),
            meta: { title: '角色维护', keepAlive: false, icon: 'solution', permission: ['Role'] }
          },
          {
            path: '/maintenance/RoleModel',
            name: 'RoleModel',
            hidden: true,
            component: () => import('@/views/maintenance/RoleModel'),
            meta: { title: '角色维护', keepAlive: false }
          },
          {
            path: '/maintenance/userIndex',
            name: 'userIndex',
            component: () => import('@/views/maintenance/userIndex'),
            meta: { title: '用户维护', keepAlive: false, icon: 'user', permission: ['User'] }
          },
          {
            path: '/maintenance/userModel',
            name: 'userModel',
            hidden: true,
            component: () => import('@/views/maintenance/userModel'),
            meta: { title: '用户维护', keepAlive: false }
          },
          {
            path: '/maintenance/projectIndex',
            name: 'projectIndex',
            component: () => import('@/views/maintenance/projectIndex'),
            meta: { title: '项目维护', keepAlive: false, icon: 'container', permission: ['Project'] }
          },
          {
            path: '/maintenance/projectModel',
            name: 'projectModel',
            hidden: true,
            component: () => import('@/views/maintenance/projectModel'),
            meta: { title: '项目维护', keepAlive: false }
          },
          {
            path: '/maintenance/projectTouser',
            name: 'projectTouser',
            hidden: true,
            component: () => import('@/views/maintenance/projectTouser'),
            meta: { title: '项目分配人员', keepAlive: false }
          }
        ]
      },
      // 故障电站
      {
        path: '/faultStation/faultStationIndex',
        name: 'faultStationIndex',
        component: () => import('@/views/faultStation/faultStationIndex'),
        meta: { title: '故障电站', keepAlive: true, icon: 'exclamation-circle', permission: ['FaultStation'] }
      },
      // 故障电站
      {
        path: '/faultStation/faultStationDetail',
        name: 'faultStationDetail',
        hidden: true,
        component: () => import('@/views/faultStation/faultStationDetail'),
        meta: { title: '故障电站', keepAlive: true, icon: 'form' }
      },
      // 模型
      {
        path: '/projectModel/projectModelIndex',
        name: 'projectModelIndex',
        component: () => import('@/views/projectModel/projectModelIndex'),
        meta: { title: '项目资产管理', keepAlive: true, icon: 'bank', permission: ['ProjectModel'] }
      },
      // 模型预览
      {
        path: '/projectModel/modelRead',
        name: 'modelRead',
        hidden: true,
        component: () => import('@/views/projectModel/modelRead'),
        meta: { title: '模型预览', keepAlive: true, icon: 'bank' }
      },
      // 模型详情
      {
        path: '/projectModel/modelDetail',
        name: 'modelDetail',
        hidden: true,
        component: () => import('@/views/projectModel/modelDetail'),
        meta: { title: '模型详情', keepAlive: true, icon: 'bank' }
      },
      // 模型维护记录
      {
        path: '/projectModel/modelRecord',
        name: 'modelRecord',
        hidden: true,
        component: () => import('@/views/projectModel/modelRecord'),
        meta: { title: '设备维护记录', keepAlive: true, icon: 'bank' }
      },
      // 模型维护记录详情
      {
        path: '/projectModel/modelRecordDetail',
        name: 'modelRecordDetail',
        hidden: true,
        component: () => import('@/views/projectModel/modelRecordDetail'),
        meta: { title: '单个设备维护记录', keepAlive: true, icon: 'bank' }
      },
      // 项目文档
      {
        path: '/projectFile/projectFileIndex',
        name: 'projectFileIndex',
        component: () => import('@/views/projectFile/projectFileIndex'),
        meta: { title: '项目文档管理', keepAlive: true, icon: 'file', permission: ['ProjectFile'] }
      },
      // 前台电站管理
      {
        path: '/powerStation/powerStationIndex',
        name: 'powerStationIndex',
        hidden: true,
        component: () => import('@/views/powerStation/powerStationIndex'),
        meta: { title: '前台电站管理', keepAlive: true, icon: 'file' }
      },
      // 前台电站详情
      {
        path: '/powerStation/powerStationDetail',
        name: 'powerStationDetail',
        hidden: true,
        component: () => import('@/views/powerStation/powerStationDetail'),
        meta: { title: '电站详情', keepAlive: true, icon: 'file' }
      },
      // 物料编号
      {
        path: '/MaterialNumber/MaterialNumberIndex',
        name: 'MaterialNumberIndex',
        component: () => import('@/views/MaterialNumber/MaterialNumberIndex'),
        meta: { title: '物料编号管理', keepAlive: true, icon: 'hdd', permission: ['MaterialNumber'] }
      },
      // 物料编号
      {
        path: '/MaterialNumber/MaterialNumberModel',
        name: 'MaterialNumberModel',
        hidden: true,
        component: () => import('@/views/MaterialNumber/MaterialNumberModel'),
        meta: { title: '物料编号维护', keepAlive: true, icon: 'bank' }
      },
      // 操作日志
      {
        path: '/operationLog',
        name: 'operationLog',
        redirect: '/operationLog/operationLogTeam',
        component: RouteView,
        meta: { title: '日志管理', keepAlive: true, icon: 'clock-circle', permission: ['OperationLog', 'OperationLog.Team', 'OperationLog.Date'] },
        children: [
          {
            path: '/operationLog/operationLogTeam',
            name: 'operationLogTeam',
            component: () => import('@/views/operationLog/operationLogTeam'),
            meta: { title: '施工队修改记录', keepAlive: false, icon: 'team', permission: ['OperationLog.Team'] }
          },
          {
            path: '/operationLog/operationLogDate',
            name: 'operationLogDate',
            component: () => import('@/views/operationLog/operationLogDate'),
            meta: { title: '施工日期修改记录', keepAlive: false, icon: 'dashboard', permission: ['OperationLog.Date'] }
          }
        ]
      }
    ]
  },
  // 创建自动生成代码
  {
    path: '/gnerate',
    name: 'gnerate',
    redirect: '/gnerate/generateAllForm',
    component: BlankLayout,
    meta: { title: '首页', keepAlive: true },
    children: [
      {
        path: '/gnerate/generateAllForm',
        name: 'GenerateAllForm',
        component: () => import('@/views/gnerate/generateAllForm'),
        meta: { title: '从entity生成代码', keepAlive: true }
      }
    ]
  },
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
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
