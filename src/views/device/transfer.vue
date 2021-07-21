<template>
    <!-- 出库 -->
    <el-container>
      <el-header>
         <el-select v-model="option">
        <el-option v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value"></el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入" style="width:300px">
        <el-button
        slot="append"
        icon="el-icon-search"
        style="width: 50"
        type="primary"
        @click="search()"
      ></el-button>
      </el-input>
     <el-dialog title="转移" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="目标仓库">
            <el-input :model="form.stock" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出库日期">
              <el-input :model="form.container" auto-complete="off"></el-input>
            </el-form-item>
        <el-form-item label="数量">
         <el-input-number v-model="form.amount" controls-position="right" :min="1"></el-input-number>
      </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="transfer">确 定</el-button>
  </div>
      </el-dialog>
      </el-header>
      <el-main>
<el-table :data="tabledata" style="width: 100%" height="550">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column fixed label="操作" width="100">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">转移</el-button>
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
      </el-main>
        
    </el-container>
</template>
<script >


export default {
    data(){
        return{
            option:'',
            input:'',
            dialogFormVisible: false,
            options:[{
              value:"deviceid",
              label:'设备型号'
            },
            {
              value:'devicename',
              label:'设备名称'
            },
            {
              value:'storagetime',
              label:'入库时间'
            },
            {
              value:'storagebatch',
              label:'入库批次'
            }],
            form:{
              stock:'',
              container:'',
              amount:''
            },
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
        }
    },
    methods:{
        //选择筛选信息
        handleCommand(command) {
      this.option = command;
    },
    // 查找货品信息
    search(){

    },
    //出库，并且记录当前操作，出库货品数量等
    transfer(){
        this.dialogFormVisible = false
    },
    handleEdit(index,row){
      this.dialogFormVisible = true
    }
    }
}

</script>
<style>


</style>
