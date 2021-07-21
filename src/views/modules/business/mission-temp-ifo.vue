<template>
  <div>
      <!-- 未完成 -->
    <!-- <div>
        <span>任务名称</span><el-input v-model="missionId"></el-input>
    </div> -->
    <!-- <el-table :data="tabledata">
      <el-table-column label="设备位置" prop="deviceLoc"> </el-table-column>
      <el-table-column label="类型" prop="type"> </el-table-column>
      <el-table-column label="所属组织" prop="orgName"> </el-table-column>
      <el-table-column label="地址" prop="addr"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
export default {
    // props:{
    //     missionId:{
    //         type:int,
    //         default:''
    //     }
    // },
  data() {
    return {
        // type:'全部类型',
        // missionId:'',
        // tabledata: [
        //     {
        //       missionName:'',
        //       missionId:''
        //     },
        // ]
    };
  },
};
</script>