<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input v-model="condition" placeholder="任务名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tabledata">
      <el-table-column label="任务项编号" prop="itemId"> </el-table-column>
      <el-table-column label="任务项名称" prop="itemName"> </el-table-column>
      <el-table-column label="任务项描述" prop="itemDescr"> </el-table-column>
      <el-table-column label="状态" prop="state" width="100px"> </el-table-column>
      <el-table-column label="方法" prop="method" width="100px"> </el-table-column>
      <el-table-column label="结果类型" prop="result" width="100px"> </el-table-column>
      <el-table-column label="预计工时" prop="hours" width="100px"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
           <el-button v-if="scope.row.state == '启用'"
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >禁用</el-button
          >
          <el-button v-else
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >应用</el-button
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
            deviceType: "sdfs",
            descr: "",
            state:""
            },
        ]
    };
  },
};
</script>