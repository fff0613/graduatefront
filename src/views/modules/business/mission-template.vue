<template>
  <div>
    <el-row gutter="10">
      <el-col :span="8">
        <el-input v-model="condition" placeholder="任务模板名称"></el-input>
      </el-col>
      <!-- <el-col :span="6"> -->
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增</el-button>
      <!-- </el-col> -->
    </el-row>
    <el-table :data="tabledata">
      <el-table-column label="模板编号" prop="tempId">
          <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'mission-temp-ifo',query:{tempId:scope.row.tempId}})"></el-button>
          </template>
      </el-table-column>
      <el-table-column label="模板名称" prop="tempName"> </el-table-column>
      <el-table-column label="状态" prop="state" width="400px"> </el-table-column>
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
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
        type:'全部类型',
        tabledata: [
            {
            tempId:'',
            tempName:'',
            state:""
            },
        ]
    };
  },
};
</script>