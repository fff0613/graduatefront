<template>
  <span>device</span>
  <!-- <div>
    <el-select v-model="option.organization">
        <el-option v-for="item in organizationoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"></el-option>
      </el-select>
      <el-select v-model="option.loc">
        <el-option v-for="item in locoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"></el-option>
      </el-select>
      <el-select v-model="option.state">
        <el-option v-for="item in stateoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"></el-option>
      </el-select>
      <el-select v-model="option.type">
        <el-option v-for="item in typeoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"></el-option>
      </el-select>
    <el-input v-model="input" placeholder="请输入">
      <el-button
        slot="append"
        icon="el-icon-search"
        style="width: 50"
        type="primary"
        @click="search()"
      ></el-button>
    </el-input>

    <el-button
      size="small"
      slot="append"
      type="primary"
      @click="$router.push({ name: 'device-add' })"
      >新增</el-button
    >
    <el-button size="small" slot="append" type="primary" @click="deletecol()"
      >删除</el-button
    >
    <el-table :data="tabledata" style="width: 100%" height="550">
      <el-table-column
      type="selection"
      width="55"
     >
    </el-table-column>
    <el-table-column fixed label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini" type="text"
          @click="handleEdit(scope.$index, scope.row)">print</el-button>
      </template>
    </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="名称"
        width="100"
      ></el-table-column>
      <el-table-column prop="state" label="状态" width="100"></el-table-column>
      <el-table-column
        prop="deviceid"
        label="设备ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="devicetype"
        label="设备型号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="manufacture"
        label="所属厂商"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="birthday"
        label="生产日期"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="storagebatch"
        label="入库批次"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="storagedate"
        label="入库日期"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="storagetime"
        label="入库时间"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="storageloc"
        label="入库位置"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="depositoryloc"
        label="仓库位置"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="effectivedate"
        label="有效使用日期"
        width="150"
      ></el-table-column>
       <el-table-column
        prop="effectivetime"
        label="有效使用时间"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="cycle"
        label="维修保护周期(天)"
        width="150"
      ></el-table-column>
    </el-table>
  </div> -->
</template>
<style>
.el-dropdown-link {
  width: 200px;
}

</style>
<script>
import axios from "axios";

export default {
  data() {
    return {
      //type:'设备ID',
      isIndeterminate: false,
      option: {
        organization:'全部组织',
        loc:'全部位置',
        state:'全部状态',
        type:'所有类型'
      },
      select: "",
      input: "",
      checkAll: false,
      organizationoptions:[],
      locoptions:[],
      stateoptions:[],
      typeoptions:[],
      tabledatanull:[],
      tabledata: [
        {
          isselect:"",
          deviceid: "",
          name: "",
          devicetype: "",
          manufacture: "",
          state: "",
          birthday: "",
          storagedate: "",
          storagetime: "",
          storagebatch: "",
          storageloc: "",
          depositoryloc: "",
          effectivedate: "",
          effectivetime: "",
          cycle: "",
          amout:""
        },
      ]
    };
  },
  mounted: function () {
    this.$http({
      url: this.$http.adornUrl("/device/ifo"),
      method: "get",
      params: this.$http.adornParams(),
    }).then(({ data }) => {
      console.log(data);
      //console.log(this.tabledata)
      // for(let item of data.data){
      //   console.log(item);
      // }
      this.tabledata = data.data;
      //console.log(this.tabledata);
      for(let item of this.tabledata){
        item.isselect = false;

      }
    });
    // axios({
    //     method:'post',
    //     url:'http://localhost:8001/login/device'
    // }).then(function(response){
    //     console.log(response.data)
    // }).catch(function(){
    //     console.log("error")
    // })
  },
  methods: {
    search(){
      this.$http({
      url: this.$http.adornUrl("/device/info/"+this.input),
      method: "get",
      params: this.$http.adornParams(),
    }).then(({ data }) => {
      console.log(data);
      //console.log(this.tabledata)
      // for(let item of data.data){
      //   console.log(item);
      // }
      this.tabledata = data.data;
      //console.log(this.tabledata);
      for(let item of this.tabledata){
        item.isselect = false;

      }
    });
    },
    // getStorageTime(index){
    //   return this.tabledata[index].storagedate+""+this.tabledata[index].storagetime;
    // },
    selectcheck(index, row) {
      console.log("before" + index + " " + row.state+" "+row.isselect);
      this.tabledata[index].isselect = false ? true:false;
      console.log("after" + index + " " + row.state+" "+row.isselect);
      //this.tabledata[index].isselect = !this.tabledata[index].isselect 
    },
    handleCheckAllChange(val) {
        this.tabledatanull = val ? this.tabledata : [];
        this.tabledata.isselect = true;
      },
    handleCommand(command) {
      this.option = command;
    },
    handleEdit(index,row){
      console.log(row)
    }
  }
};
</script>
<style>
.el-input {
  width: 300px;
}

</style>