<template>
  <div>
     <div>
      <p class="text">基本信息</p>
      <div class="table-block">
          <el-row class="table-row">
            <el-col :span="12" class="table-inline">
              <span>计划编号:&nbsp;</span>{{ project.projectid }}
            </el-col>
            <el-col :span="12" class="table-inline">
              <span>计划名称:&nbsp;</span>{{ project.projectname }}
            </el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="12" class="table-inline">
              <span>计划类型:&nbsp;</span>{{ project.projecttype }}
            </el-col>
            <el-col :span="12" class="table-inline">
              <span>状态:&nbsp;</span>{{ project.state }}
            </el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="12" class="table-inline">
              <span>预计时长:&nbsp;</span>{{ project.estimate }}
            </el-col>
            <el-col :span="12" class="table-inline">
              <span>单位:天&nbsp;</span>
            </el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="12" class="table-inline">
              <span>开始时间:&nbsp;</span>{{ project.starttime }}
            </el-col>
            <el-col :span="12" class="table-inline">
              <span>结束时间:&nbsp;</span>{{ project.endtime }}
            </el-col>
          </el-row>
      </div>
    </div>
     <div>
       <p class="text">任务项</p>
       <div class="table-block">
          <el-table :data="missiontable">
          <el-table-column label="任务项编号" prop="itemid"> </el-table-column>
          <el-table-column label="任务项名称" prop="name"> </el-table-column>
          <el-table-column label="任务项描述" prop="itemdescr"> </el-table-column>
          <el-table-column label="方法" prop="method"> </el-table-column>
          <el-table-column label="结果类型" prop="result"> </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="deleteMission(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
    <div>
        <p class="text">维保对象</p>
         <div class="table-block">
             <el-table :data="device" style="width: 100%">
            <el-table-column prop="devicename" label="部件名称">
            </el-table-column>
            <el-table-column prop="deviceid" label="部件编码"> </el-table-column>
            <el-table-column prop="devicetype" label="部件类型"></el-table-column>
            <el-table-column
              prop="devicemodel"
              label="部件型号"
            ></el-table-column>
            <el-table-column prop="supporter" label="供应商"></el-table-column>
            <el-table-column prop="manufacture" label="制造商"></el-table-column>
          </el-table>
         </div>   
    </div>
    <div>
       <!-- <p class="text">触发条件</p>
       <el-form ref="triggerform" :model="form.trigger" :rules="triggerrules" style="margin-bottom:40px">
            <el-form-item label="" prop="unit">
              <el-radio-group v-model="form.trigger.unit">
                <el-radio label="天">按天</el-radio>
                 <el-row><el-col :span="6"></el-col><el-col :span="18"><el-input></el-input></el-col></el-row>
                <el-radio label="月">按月</el-radio>
                <el-radio label="年">按年</el-radio>
              </el-radio-group>
              <template ><span style="margin-left:50px">每 </span><el-input type="number" style="width:100px" v-model="form.trigger.num" min="1"></el-input><span> {{form.trigger.unit}}执行一次</span></template>
            </el-form-item>
        </el-form>
        <el-button size="mini" @click="addconditon" style="margin-left:10px">+</el-button>
      <el-table :data="form.trigger">
        <el-table-column prop="descr" label="触发条件" style="width: 70%">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteTrigger(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table> -->
      
      <!-- <el-dialog title="触发条件" :visible.sync="triggerVisible" 
        width="70%">
        <el-form ref="triggerform" :model="form.trigger" :rules="triggerrules">
            <el-form-item label="" prop="unit">
              <el-radio-group v-model="form.trigger.unit">
                <el-radio label="天">按天</el-radio>
                <el-row><el-col :span="6"></el-col><el-col :span="18"><el-input></el-input></el-col></el-row>
                <el-radio label="月">按月</el-radio>
                <el-radio label="年">按年</el-radio>
              </el-radio-group>
              <template ><span style="margin-left:50px">每 </span><el-input type="number" style="width:100px" v-model="form.trigger.num"></el-input><span> {{form.trigger.unit}}执行一次</span></template>
            </el-form-item>
        </el-form> 
        <span slot="footer" class="dialog-footer">
            <el-button @click="triggerVisible = false">取 消</el-button>
            <el-button type="primary" @click="submittrigger">确 定</el-button>
          </span>
      </el-dialog> -->

     
      
      <!-- <el-dialog
      title="任务项" :visible.sync="missionDialogVisible" >
        <el-table :data="missiontable" ref="missiontable"
        @selection-change="missionselectionChangeHandle">
          <el-table-column type="selection" ></el-table-column>
          <el-table-column label="任务项编号" prop="itemid"> </el-table-column>
          <el-table-column label="任务项名称" prop="itemname"> </el-table-column>
          <el-table-column label="任务项描述" prop="itemdescr"> </el-table-column>
          <el-table-column label="方法" prop="method" width="100px"> </el-table-column>
          <el-table-column label="结果类型" prop="result" width="100px"> </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="missionDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitmission">确 定</el-button>
          </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer" style="float:right">
            <el-button type="primary" @click="submit">确 定</el-button>
      </span> -->
    </div>
  </div>
</template>
<style>
.text{
    font-size: 1.2em;
    padding-left: 5px;
    border-left: 4px solid #408aeb;
    border-bottom: 1px solid #eeeeee;
}
.table-inline {
  text-align: center;
}
/* .table-row {
  margin-top: 15px;
  margin-bottom: 15px;
} */
.table-block {
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  box-shadow: 0 1 0 0;
  margin-bottom: 15px;
}
.table-title {
  margin-bottom: 5px;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 4px 7px;
}
/* .dialog-footer::after{
  content:'';
  display: table;
  clear: both;
} */
</style>
<script>
import addO from "@/views/modules/maintain/add-objects";
export default {
  components: {
    addO,
  },
  data() {
  
    return {
      projectid:this.$route.query.projectid,
      missiontable:[],
      device:[],
      missiontableRe:[],
      missionDialogVisible: false,
      triggerVisible:false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      addDialogVisible: false,
      project:{}
    };
  },
  created(){
    this.getDataList()
  },
  methods: {
     getDataList() {
        this.$http({
          url: this.$http.adornUrl(`/maintainproject/info/${this.projectid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
              console.log(data.maintainproject)
              this.project = data.maintainproject
          }
        })
       this.getMissionList()
       this.getDeviceList()
    },
    
    getMissionList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/missiontemp/ifo/${this.projectid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.missiontable = data.data
            console.log(this.missiontable)
            this.totalPage = this.missiontable.length
          } else {
            this.missiontable = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    // selectionChangeHandle(val) {
    //   this.dataListSelections = val;
    // },
  
    getDeviceList(){
    
          this.$http({
            url: this.$http.adornUrl(`/maintainproject/devicelist/${this.projectid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.device = data.devicelist;
              // this.device.push(this.deviceRec)
              console.log(data)
            } 
          }).catch((err)=>{
            console.log(err)
          });
    },
    
  },
  
};
</script>
