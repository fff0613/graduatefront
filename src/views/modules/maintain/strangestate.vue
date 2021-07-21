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
      <el-button @click="addmaintainorder()">添加维修计划</el-button>
     <el-dialog title="维修计划" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="设备名称">
            <el-input :model="form.deviceName" placeholder="deviceNameList" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="出库日期">
       
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.deliverydate"
              style="width: 55%"
            ></el-date-picker>
            </el-form-item>
        <el-form-item label="出库时间">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.deliverytime"
            style="width: 55%"
          ></el-time-picker>
      </el-form-item>
      <el-form-item label="数量">
         <el-input-number v-model="form.amount" controls-position="right" :min="1"></el-input-number>
      </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="delivery">确 定</el-button>
  </div>
      </el-dialog>
      </el-header>
      <el-main>
<el-table :data="tabledata" style="width: 100%" height="550"  @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
   <el-table-column fixed label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">添加维修计划</el-button>
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
            multipleselection:[],
            deviceNameList:'',
            options:[{
              value:"strange",
              label:'异常'
            },
            {
              value:'maintaining',
              label:'维修中'
            }],
            form:{
              reason:'',
              deliverytime:'',
              deliverydate:'',
              amout:1
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
        }
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
    delivery(){
      this.dialogFormVisible = false
    },
    handleEdit(index,row){
      this.dialogFormVisible = true
    },
    handleSelectionChange(){
        this.multipleselection = val
    },
    addmaintainorder(){
        for(let i of multipleselection){
            this.deviceNameList += this.tabledata[i].name
        }
        console.log(this.deviceNameList)
    }
    }
}

</script>
<style>

</style>
