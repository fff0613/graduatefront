/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } },
    { path:'/device',
      component: _import('modules/device/device'),
      name: 'device',
      meta:{title:'设备查看',isTab:true}
      
    },
    { path: '/device-ifo',
     component: _import('modules/device/detail-ifo'), 
     name: 'device-ifo',
      meta: { title: '详细信息', isTab:true},
      children:[
      {
        path:'/basis-ifo',
        name:'basis-ifo',
        component:_import('device/adddevice'),
        meta:{ isTab:true}
      }]
    },
    //{ path: '/device-add', component: _import('device/adddevice'), name: 'device-add', meta: { title: '添加设备', isTab:true}},
    // { path: '/device-batchadd', component: _import('device/storage-batch'), name: 'device-batchadd', meta: { title: '批量添加设备', isTab:true}},
    { path: '/device-add', component: _import('modules/device/adddevice'), name: 'device-add', meta: { title: '添加设备', isTab:true}},
    { path:'/device-storage-mannual',component:_import('modules/device/storage-mannual'),name:'device-storage-mannual',meta:{title:"输入入库", isTab:true}},
    { path:'/device-storage-scan',component:_import('modules/device/storage-scan'),name:'device-codebar-scan' ,meta:{title:"扫码入库", isTab:true}},
    // { path:'/device-storage-batch',component:_import('modules/device/storage-batch'),name:'device-storage-batch' ,meta:{title:"批量入库", isTab:true}},
    { path:'/device-delivery',component:_import('modules/device/delivery'),name:'device-delivery' ,meta:{title:"设备出库", isTab:true}},
    { path:'/device-allocation',component:_import('modules/device/allocation'),name:'device-allocation' ,meta:{title:"设备调拨", isTab:true}},
    { path:'/device-scrap',component:_import('modules/device/scrap'),name:'device-scrap' ,meta:{title:"设备报废", isTab:true}},
    { path:'/device-transfer',component:_import('modules/device/transfer'),name:'device-transfer' ,meta:{title:"设备转移", isTab:true}},
    { path:'/device-return',component:_import('modules/device/return-device'),name:'device-return' ,meta:{title:"设备退货", isTab:true}},
    { path:'/device-stockreturn',component:_import('modules/device/stock-return'),name:'device-stockreturn' ,meta:{title:"设备退库", isTab:true}},
    // { path:'/device-query',component:_import('device/query-stock'),name:'device-query' ,meta:{title:"查询库存", isTab:true}},
    { path:'/device-inventory',component:_import('modules/device/inventory'),name:'inventory' ,meta:{title:"设备盘点", isTab:true}},
    { path:'/device-lent',component:_import('modules/device/lent'),name:'lent' ,meta:{title:"设备借出", isTab:true}},
    { path:'/device-giveback',component:_import('modules/device/giveback'),name:'giveback' ,meta:{title:"设备归还", isTab:true}},
    // { path:'/device-codebar-query',component:_import('device/codebarquery'),name:'device-codebar-query',meta:{title:'条形码查询',isTab:true}},
    // { path:'/device-query-stock',component:_import('device/query-stock'),name:'device-query-double' ,meta:{title:"货位查询", isTab:true}},
    // { path:'/device-query-other',component:_import('device/query-other'),name:'device-query-single' ,meta:{title:"其他查询", isTab:true}},
    { path:'/device-history',component:_import('modules/history/history'),name:'device-history' ,meta:{title:"历史查询", isTab:true}},
    { path:'/maintain-strangestate',component:_import('modules/maintain/strangestate'),name:'maintain-strangestate' ,meta:{title:"异常查看", isTab:true}},
    // { path:'/maintain-contract',component:_import('modules/maintain/contract'),name:'maintain-contract' ,meta:{title:"合同管理", isTab:true}},
    // { path:'/maintain-add',component:_import('modules/maintain/strangestate'),name:'maintain-strangestate' ,meta:{title:"异常查看", isTab:true}},
    { path:'/state-gis-system',component:_import('modules/state/gis-system'),name:'state-gis-system' ,meta:{title:"GIS定位", isTab:true}},
    { path:'/state-statemonitor',component:_import('modules/state/statemonitor'),name:'state-statemonitor' ,meta:{title:"状态监测", isTab:true}},
    { path:'/add-maintain-project',component:_import('modules/maintain/add-maintain-project'),name:'add-maintain-project' ,meta:{title:"添加维保计划", isTab:true}},
    { path:'/detail-maintain-project',component:_import('modules/maintain/detail-maintain-project'),name:'detail-maintain-project' ,meta:{title:"详细维保计划", isTab:true}},
    { path:'/detail-order-ifo',component:_import('modules/maintain/detail-order-ifo'),name:'detail-order-ifo' ,meta:{title:"工单详细信息", isTab:true}},
    { path:'/add-order',component:_import('modules/maintain/add-order'),name:'add-order' ,meta:{title:"添加工单", isTab:true}},
    { path:'/life-ifo',component:_import('modules/device/life-ifo'),name:'life-ifo' ,meta:{title:"详细信息", isTab:true}},
    { path:'/mission-temp-ifo',component:_import('modules/business/mission-temp-ifo'),name:'mission-temp-ifo' ,meta:{title:"任务模板信息", isTab:true}},
    { path:'/stock-manage',component:_import('modules/business/stock-manage'),name:'stock-manage' ,meta:{title:"库房管理", isTab:true}},
    { path:'/life-manage',component:_import('modules/device/life-manage'),name:'life-manage' ,meta:{title:"设备生命周期", isTab:true}},
    { path:'/misssionitem',component:_import('modules/business/missionitem'),name:'mission-item' ,meta:{title:"任务项管理", isTab:true}},
    { path:'/stock-ifo',component:_import('modules/business/stock'),name:'stock-ifo' ,meta:{title:"库存详情", isTab:true}},
    { path:'/maintain-ifo',component:_import('modules/maintain/maintain-ifo'),name:'maintain-ifo' ,meta:{title:"计划详情", isTab:true}},
    { path:'/update-maintain-project',component:_import('modules/maintain/update-maintain-project'),name:'update-maintain-project' ,meta:{title:"修改维保计划", isTab:true}},
    { path:'/inventory-ifo',component:_import('modules/device/inventory-ifo'),name:'inventory-ifo' ,meta:{title:"详细信息", isTab:true}},
    { path:'/app-user',component:_import('modules/generator/user'),name:'app-user' ,meta:{title:"app管理", isTab:true}},
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
