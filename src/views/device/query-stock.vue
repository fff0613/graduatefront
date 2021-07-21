<template>
  <div>
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="仓库">
                <el-input v-model="form.stock" style="width:30"></el-input>
            </el-form-item>
             <el-form-item label="货位">
                <el-input v-model="form.container" style="width:30"></el-input>
            </el-form-item>
        </el-form>
        <el-table>
            <el-table-column
        fixed
        prop="name"
        label="名称"
        width="100"
      ></el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="位置"
        width="100"
      ></el-table-column>
        </el-table>
  </div>
</template>
<style>
.el-input{
    width:300
}
</style>
<script >
export default {
  data() {
    return {
      options: [
        {
          value: "devicetype",
          label:'设备型号',
        },
        {
            value:'storagebatch',
            label:'入库批号'
        },
        {
            value:'stock',
            label:'仓库'
        },
        {
            value:'container',
            label:'货柜'
        }
      ],
      form:{
          content:'',
          stock:'',
          container:''
      },
      tableid:'',
      tabledata:{
          deviceName:'',
          deviceid:'',
          storageloc:''
      }
    };
  },
  methods:{
      query(){

      }
  }
};
</script>
