<template>
    <div>
        <el-select v-model="form.condition" placeholder="请选择">
    <el-option style="width:200px"
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-input ></el-input>
  <el-button type="primary" @click="returndevice">退货</el-button>
  <el-table>
      <el-table-item>
          
      </el-table-item>
  </el-table>
    </div>
</template>
<script >


export default {
     data() {
      return {
          form:{
              option:'',
              value:''
          },
        options: [{
          value: '选项1',
          label: '入库时间'
        }, {
          value: '选项2',
          label: '入库批次'
        }, {
          value: '选项3',
          label: '仓库'
        }, {
          value: '选项4',
          label: '货柜'
        }],
        value: ''
      }
    },
    methods:{
        //弹窗原因
        returndevice(){

        }
    }
}

</script>
