<template>
  <div>
    <el-row gutter="10">
        <el-col :span="6">
            <el-select v-model="type">
                <el-option v-for="item in typeOption" :key="item.key" :label="item.label"></el-option>
            </el-select>
        </el-col>
      <el-col :span="6">
        <el-input v-model="condition" placeholder="名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新建</el-button>
      </el-col>
    </el-row>
    <el-table :data="tabledata">
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
            type: "sdfs",
            orgName: "",
            deviceLoc: "",
            addr: ""
            },
        ]
    };
  },
};
</script>