<template>
  <div>
    <el-row  style="overflow-x:auto">
      
<!-- <el-select v-model="option.organization" class="select">
        <el-option v-for="item in organizationoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         class="select"></el-option>
      </el-select> -->
      
        <!-- <el-select v-model="option.loc" class="select">
        <el-option v-for="item in locoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         class="select"></el-option>
      </el-select> -->
      
     
<el-select v-model="option.state" class="select" @change="selectchanged">
        <el-option v-for="item in stateoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         class="select"></el-option>
      </el-select>
      
      <el-select v-model="option.type" class="select" @change="selectchanged">
        <el-option v-for="item in typeoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         class="select"></el-option>
      </el-select>
      <el-select v-model="option.device" class="select" @change="selectchanged">
        <el-option v-for="item in deviceoptions"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         class="select"></el-option>
      </el-select>
      <!-- <span>发起时间:</span>
      <el-date-picker
      v-model="option.happentimestart"
      type="date"
      placeholder="选择日期"
      class="date-picker"
      value-format="timestamp"
      :picker-options="pickerOptions0">
    </el-date-picker>
      <span>至</span>
      <el-date-picker
      v-model="option.happentimeend"
      type="date"
      placeholder="选择日期"
      class="date-picker"
      value-format="timestamp"
      :picker-options="pickerOptions1">
    </el-date-picker> -->
      <div style="float:right"> 
     <el-input v-model="input" placeholder="请输入工单主题" style="width:250px">
      <el-button
        slot="append"
        icon="el-icon-search"
        type="primary"
        @click="search()"
      ></el-button>
     
    </el-input>
     <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </div>
    <!-- <el-button size="small" slot="append" type="primary" @click="$router.push({name:'add-order'})"
      >新建</el-button
    >
   <el-button size="small" slot="append" type="primary" @click="exportExcel()"
      >导出</el-button
    > -->
    </el-row>
    
    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
    <el-table  ref="multipletable" :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)" border style="width: 100%;margin-top:10px" >
      <el-table-column
        fixed
        prop="workorderid"
        label="工单编号"
      
      ><template slot-scope="scope"><el-button v-model="scope.row.workorderid" type="text" @click="$router.push({name:'detail-order-ifo',query:{workorderid:scope.row.workorderid}})">{{scope.row.workorderid}}</el-button></template>
      </el-table-column>
      <!-- <el-table-column
        prop="orderLoc"
        label="所属位置"
      
      > -->
      <!-- </el-table-column> -->
      <el-table-column
        prop="deviceid"
        label="设备编码"
      ></el-table-column>
      <el-table-column
        prop="devicename"
        label="设备名称"
      ></el-table-column>
       <el-table-column
        prop="devicetype"
        label="设备类型"
       
      ></el-table-column>
      <el-table-column
        prop="ordertype"
        label="工单类型"
     
      ></el-table-column>
      <el-table-column
        prop="theme"
        label="工单主题"
     
      ></el-table-column>
      <el-table-column
        prop="urgency"
        label="优先级"
     
      ></el-table-column>
      <el-table-column
        prop="executor"
        label="执行人"
    
      ></el-table-column>
      <el-table-column
        prop="reporthappentime"
        label="发生时间"
    
      ></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column  label="操作" width="150" >
          <template  slot-scope="scope">
        <el-button 
          size="mini" type="text"
           @click="$router.push({name:'detail-order-ifo',query:{workorderid:scope.row.workorderid}})">查看</el-button>
          <!-- <el-button
          size="mini" type="text" :disabled="scope.row.state == '已完成' ? true:scope.row.state =='待确认'? true:false"
          @click="handleEdit(scope.$index, scope.row)">处理</el-button> -->
          <!-- <el-button
          size="mini" type="text" :disabled="scope.row.state == '已完成' ? true:false"
          @click="handleEdit(scope.$index, scope.row)">作废</el-button> -->
          <!-- <el-button
          size="mini" type="text"
          @click="handleEdit(scope.$index, scope.row)">添加</el-button> -->
      </template>
       
    </el-table-column>
    </el-table>
     <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

  </div>
</template>
<style>
.select .el-input__inner {
  width: 105px;
}
.select .el-input.el-input--medium.el-input--suffix {
  width: 105px;
}
.date-picker .el-input__inner {
  width: 130px;
}
.el-date-editor.el-input,.el-date-editor.el-input__inner{
 width: 130px;
}
</style>
<script>
import AddOrUpdate from './maintain-add-or-update'

export default {
  data() {
    return {
       pickerOptions0: {
                disabledDate: (time) => {
                    if (this.option.happentimeend != "") {
                        return new Date(this.option.happentimeend).getTime() < time.getTime()
                    } else {
                        // return time.getTime() > Date.now();
                    }

                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                     if (this.option.happentimestart != "") {
                        return new Date(this.option.happentimestart).getTime() > time.getTime()
                    } else {
                        // return time.getTime() > Date.now();
                    }
                }
            },
      dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        
        addOrUpdateVisible: false,
      
      //type:'设备ID',
      isIndeterminate: false,
      option: {
        organization:'全部组织',
        loc:'全部位置',
        state:'全部状态',
        type:'全部类型',
        order:'全部类型',
        device:'全部设备',
        happentimeend:'',
        happentimestart:''
      },
      select: "",
      input: "",
      checkAll: false,
      orderoptions:[],
      deviceoptions:[],
      organizationoptions:[],
      locoptions:[],
      userOptions:[],
      stateoptions:[
      {
        value:'待处理',
        label:'待处理'
      },
      {
        value:'待执行',
        label:'待执行'
      },
      {
        value:'待确认',
        label:'待确认'
      },
      {
        value:'已完成',
        label:'已完成'
      },
      {
        value:'全部状态',
        label:'全部状态'
      }],
      typeoptions:[{
        value:'维修',
        label:'维修'
      },
      {
        value:'保养',
        label:'保养'
      },
      {
        value:'全部类型',
        label:'全部类型'
      }],
      tabledataRe:[],
      tabledata: [
        
      ]
    };
  },
  components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      
    },
  methods: {
      getDataList () {
        this.tabledata = []
          this.dataListLoading = true
          this.$http({
            url: this.$http.adornUrl('/generator/maintain/ifo'),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
            for(let item of data.data){
              let temp = {
                  workorderid:item.workorderid,
                  deviceid:item.deviceid,
                  devicename:'',
                  devicetype:'',
                  ordertype:item.ordertype,
                  theme:item.theme,
                  urgency:item.urgency,
                  executor:item.executorid,
                  reporthappentime:item.reporthappentime,
                  state:item.state
              }
              this.tabledata.push(temp)
            }
              // this.tabledata = data.data
             console.log("data ")
             console.log(data)
            this.totalPage = this.tabledata.length;
              // this.totalPage = data.page.totalCount
            } else {
              this.dataList = []
              this.totalPage = 0
            }
            this.dataListLoading = false
            this.getdevicelist()
            this.getdevice()
          })
          
        },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
       addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      getdevicelist(){
        this.deviceoptions = []
          this.$http({
            url: this.$http.adornUrl('/device/devicelist'),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            console.log(data)
            if (data && data.code === 0) {
              for(let item of data.data){
                  let temp = {
                    value:item.id,
                    label:this.getlabel(item.id,item.name)
                  }
                  this.deviceoptions.push(temp)
              }
              this.deviceoptions.push({
                value:'全部设备',
                label:'全部设备'
              })
            }
          })
      },
      getlabel(id,name){
        return ""+name+"("+id+")"
      },
      getdevice(){
        for(let i =0 ;i < this.tabledata.length;i++){
          console.log(this.tabledata[i])
            this.$http({
            url: this.$http.adornUrl(`/device/ifo/${this.tabledata[i].deviceid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.tabledata[i].devicename = data.data.devicename
              this.tabledata[i].devicetype = data.data.devicetype
            }
          })
        }
        console.log(this.tabledata)
        
        
      },
       getfellowlist() {
      this.userOptions = [];
      this.$http({
        url: this.$http.adornUrl("/sys/user/fellowlist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          // this.deviceTypeOption = data.data.data;
          for (let item of data.data.data) {
            let t = {
              value: item.userId,
              label: item.username,
            };
            this.userOptions.push(t);
          }

          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    },
    search() {
      this.tabledata = []
      console.log("start ")
      console.log(this.option.happentimeend == '')
      
      if(this.option.device == '全部设备' && this.option.state == '全部状态' && this.option.type == '全部类型' && this.input ==''
       && this.option.happentimestart == '' && this.option.happentimeend == '')
        this.getDataList()
      else
       this.$http({
              url: this.$http.adornUrl("/generator/maintain/search"),
              method: "post",
              data: this.$http.adornData({
                'device':this.option.device == '全部设备'? null:this.option.device,
                'state' :this.option.state == '全部状态' ? null : this.option.state,
                'type' :this.option.type == '全部类型' ? null : this.option.type,
                'start':this.option.happentimestart == ''?null : this.option.happentimestart,
                 'end':this.option.happentimeend == ''?null : this.option.happentimeend,
                'theme' : this.input =='' ? null :this.input
              }),
            }).then(({ data }) => {
              if (data && data.code === 0) {
                console.log("data ")
                console.log(data.data)
              for(let item of data.data){
              let temp = {
                  workorderid:item.workorderid,
                  deviceid:item.deviceid,
                  devicename:'',
                  devicetype:'',
                  ordertype:item.ordertype,
                  theme:item.theme,
                  urgency:item.urgency,
                  executor:item.executorid,
                  reporthappentime:item.reporthappentime,
                  state:item.state
              }
              this.tabledata.push(temp)
            }
                // this.tabledata = data.data
                console.log(data.data)
              this.totalPage = this.tabledata.length;
                // this.totalPage = data.page.totalCount
              } else {
                this.dataList = []
                this.totalPage = 0
              }
              this.dataListLoading = false
              this.getdevicelist()
              this.getdevice()
            }).catch((err)=>{
              console.log(err)
            })
    },
    add(){

    },
    exportExcel(){

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
    },
    selectchanged(){
      this.search()
    }
  }
};
</script>
<style>
.el-input {
  width: 300px;
}

</style>