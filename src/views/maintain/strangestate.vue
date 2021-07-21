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
      <el-button type="primary" @click="addmaintainorder">添加维修计划</el-button>
     <el-dialog title="维修计划" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="设备名称">
            <el-input :model="form.deviceName" :disabled="true" v-model="deviceNameList" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.deliverydate"
              style="width: 55%"
            ></el-date-picker>
          </el-form-item>
      <el-form-item label="时间周期">
        <el-radio-group v-model="form.cycle">
           <el-radio  label="1">周期(天) </el-radio>
           <el-input type="number" style="width:50%" placeholder="0"></el-input><br>
           <el-radio label="2">一周</el-radio>
           <el-checkbox-group v-model="form.checkList" @change="handleCheckedCycleChange">
    <el-checkbox label="一"></el-checkbox>
    <el-checkbox label="二"></el-checkbox>
    <el-checkbox label="三"></el-checkbox>
    <el-checkbox label="四"></el-checkbox>
    <el-checkbox label="五"></el-checkbox>
    <el-checkbox label="六"></el-checkbox>
    <el-checkbox label="七"></el-checkbox>
  </el-checkbox-group>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="负责人员">
        <el-input v-model="form.fellow" ></el-input>
      </el-form-item>
      <el-form-item label="负责单位">
        <el-input v-model="form.organization"></el-input>
      </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
    <el-button @click="cancelorder()">取 消</el-button>
    <el-button type="primary" @click="commit">确 定</el-button>
  </div>
      </el-dialog>
      </el-header>
      <el-main>
<el-table :data="tabledata" style="width: 100%" height="550"  @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
   <el-table-column fixed label="操作" width="150">
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
              deviceNameList:'',
              startname:'',
              cycletype:'',
              fellow:'',
              organization:'',
              cycle:'',
              checkList:[]
            },
            tabledata: [
        {
          isselect:"",
          deviceid: "",
          name: "adb",
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
    commit(){
      this.dialogFormVisible = false
      this.deviceNameList = ''
      this.multipleselection = []
    },
    handleEdit(index,row){
      this.dialogFormVisible = true
    },
    handleSelectionChange(val){
        this.multipleselection = val
    },
    addmaintainorder(){
      if(this.multipleselection.length == 0){
        this.$alert('未选择相关设备')
      }else{
          for(let item of this.multipleselection){
          // console.log(item.name)
            this.deviceNameList += item.name
            this.deviceNameList += ' '
        }
        console.log(1+this.deviceNameList)
        this.dialogFormVisible = true
      }
      
    },
    handleCheckedCycleChange(){

    },
    cancelorder(){
      this.dialogFormVisible = false
      this.deviceNameList = ''
      this.multipleselection = []
    }
    }
}

</script>
<style>

</style>
