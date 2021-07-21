<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属库房">
        <el-select v-model="form.stock">
          <el-option
            v-for="item in stockOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属货柜">
          <el-select v-model="form.container">
          <el-option
            v-for="item in containerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量">
        <el-input disabled type="number" v-model="form.mount" min="1"></el-input>
      </el-form-item>
      <el-form-item label="转移时间">
        <el-date-picker
          v-model="form.storageTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="转移设备">
        <div>
          <el-button type="primary" style="float: right" @click="addObjects"
            >添加</el-button
          >
        </div>
        <el-table :data="form.tabledata" style="width: 100%" height="550">
          <el-table-column fixed prop="deviceName" label="部件名称">
          </el-table-column>
          <el-table-column prop="deviceid" label="部件编码"> </el-table-column>
          <el-table-column prop="devicetype" label="部件类型"></el-table-column>
          <el-table-column prop="manufacture" label="供应商"></el-table-column>
          <el-table-column
            prop="deviceModel"
            label="部件型号"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="deleteObject(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script >
export default {
  data() {
    return {
      stockOptions: [],
      containerOptions:[],
      form: {
       tabledata:[{
           deviceName:'',
          deviceId:'',
          deviceType:'',
          deviceMOdel:'',
          manufacture:''
       }],
        stock: "",
        container: "",
        mount:1,
      },
    };
  },
  methods: {
    submit() {},
  },
};
</script>
