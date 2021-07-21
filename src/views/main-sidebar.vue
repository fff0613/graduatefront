<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner" >
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <el-menu-item index="demo-echarts" @click="$router.push({ name: 'mission-item' })">
            <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">任务项管理</span>
          </el-menu-item>
        <el-submenu index="demo">
          <template slot="title">
            <icon-svg name="shoucang" class="site-sidebar__menu-icon"></icon-svg>
            <span>demo</span>
          </template>
          <el-menu-item index="demo-echarts" @click="$router.push({ name: 'demo-echarts' })">
            <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">echarts</span>
          </el-menu-item>
          <el-menu-item index="demo-ueditor" @click="$router.push({ name: 'demo-ueditor' })">
            <icon-svg name="editor" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">ueditor</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="device">
          <template slot="title">
            <icon-svg name="device" class="site-sidebar__menu-icon"></icon-svg>
            <span>设备管理</span>
          </template>
          <el-menu-item index="device-ifo" @click="$router.push({name:'device'})">
             <icon-svg name="look" class="site-sidebar__menu-icon"></icon-svg>
             <span slot="title">设备查看</span>
          </el-menu-item>
            <el-menu-item index="device-codebar-query" @click="$router.push({name:'life-manage'})">
                <icon-svg name="life" class="site-sidebar__menu-icon"></icon-svg>
                <span slot="title">设备生命周期</span>
            </el-menu-item>
            <el-menu-item index="device-transfer" @click="$router.push({name:'device-storage-mannual'})">
            <icon-svg name="storage" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">设备入库</span>
          </el-menu-item>
          <el-menu-item index="device-transfer" @click="$router.push({name:'device-storage-mannual'})">
            <icon-svg name="transfer4" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">设备转移</span>
          </el-menu-item>
          <el-menu-item index="device-delivery" @click="$router.push({name:'device-delivery'})">
            <icon-svg name="delivery2" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">设备出库</span>
          </el-menu-item>
          <el-menu-item index="device-stockreturn" @click="$router.push({name:'device-storage-mannual'})">
            <icon-svg name="stockreturn2" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">设备退库</span>
          </el-menu-item>
          <el-menu-item index="device-return" @click="$router.push({name:'device-return'})">
            <icon-svg name="return" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">设备退货</span>
          </el-menu-item>
          
            <el-menu-item index="device-query-single" @click="$router.push({name:'device-query-double'})">
              <icon-svg name="query3" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">货位查询</span>
            </el-menu-item>
            <el-menu-item index="device-query-double" @click="$router.push({name:'device-query-single'})">
              <icon-svg name="query3" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">其他查询</span>
            </el-menu-item>
          
          <el-menu-item index="device-inventory" @click="$router.push({name:'device-inventory'})">
            <icon-svg name="Inventory" class="site-sidebar__menu-icon"></icon-svg>
            <span slot="title">业务盘点</span>
          </el-menu-item>
        </el-submenu>
        <el-sub-menu index="state">
          <template slot="title">
            <icon-svg name="device" class="site-sidebar__menu-icon"></icon-svg>
            <span>状态管理</span>
          </template>
          <el-menu-item index="state-statemonitor" @click="$router.push({name:'state-statemonitor'})">
             <icon-svg name="look" class="site-sidebar__menu-icon"></icon-svg>
             <span slot="title">状态监测</span>
          </el-menu-item>
          <el-menu-item index="state-gis-system" @click="$router.push({name:'state-gis-system'})">
             <icon-svg name="look" class="site-sidebar__menu-icon"></icon-svg>
             <span slot="title">GIS</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="maintain">
          <template slot="title">
            <icon-svg name="device" class="site-sidebar__menu-icon"></icon-svg>
            <span>维护保养管理</span>
          </template>
          <el-menu-item index="orderlist" @click="$router.push({name:'device'})">
             <icon-svg name="look" class="site-sidebar__menu-icon"></icon-svg>
             <span slot="title">维修工单查询</span>
          </el-menu-item>
        </el-sub-menu> -->
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>
<style>
/* .el-submenu.is-active .el-submenu__title{
  width:10px;
}
.site-sidebar__menu.el-menu{
  width:10px;
} */
</style>
<script>
  import SubMenu from './main-sidebar-sub-menu'
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {
        dynamicMenuRoutes: []
      }
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      }
    }
  }
</script>
