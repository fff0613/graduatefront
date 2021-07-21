<template>
  <div>
      <el-menu
            :default-active="$route.path"
            class="detail-menu"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :default-openeds='["0"]'
          >
            <el-menu-item index="/basis-ifo">基本信息</el-menu-item>
             <el-menu-item index="2">关联组织</el-menu-item>
  <el-menu-item index="3">设备位置</el-menu-item>
  <el-menu-item index="4">维保计划</el-menu-item>
  <el-menu-item index="5">维保记录</el-menu-item>
  <el-menu-item index="6">关联人员</el-menu-item>
  <el-menu-item index="7">保修期</el-menu-item>
  <el-menu-item index="8">性能提示</el-menu-item>
  <el-menu-item index="3">设备日志</el-menu-item>
           </el-menu>
           <div class="detail-ifo">
             <router-view></router-view>
           </div>
  </div>
</template>
<script>

export default{

}
</script>
