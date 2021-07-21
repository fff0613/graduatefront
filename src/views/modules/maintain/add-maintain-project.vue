<template>
  <div>
    <div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划名称" prop="proname">
              <el-input
                  v-model="form.proname"
                  placeholder="请输入计划名称"
                ></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="计划类型" prop="proType">
               <el-select v-model="form.proType">
              <el-option v-for="item in typeoptions" :key="item.key" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划有效期" prop="startDate">
          <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              value-format="timestamp"
            >
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              value-format="timestamp"
            >
            </el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="预计(天)" prop="estimate">
               <el-input
               type="number"
              style="width: 50%"
              v-model="form.estimate"
            ></el-input>
        </el-form-item>
          </el-col>
        </el-row>
       <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
          <el-switch
              v-model="form.state"
              active-text="启用"
              inactive-text="禁止"
            >
            </el-switch>
        </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
             <el-form-item label="是否分配" prop="delivery">
                <el-switch
              v-model="form.delivery"
              active-text="分配"
              inactive-text="不分配"
            >
            </el-switch>
        </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <div>
      <p class="text">维保对象<el-button size="mini" style="margin-left:10px" @click="addObject" class="probutton">+</el-button></p>
      <el-table :data="form.table" style="width: 100%">
          <el-table-column prop="devicename" label="部件名称">
          </el-table-column>
          <el-table-column prop="deviceid" label="部件编码"> </el-table-column>
          <el-table-column prop="devicetype" label="部件类型"></el-table-column>
          <el-table-column prop="supporter" label="供应商"></el-table-column>
          <el-table-column
            prop="devicemodel"
            label="部件型号"
          ></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="deleteObject(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      
      <el-dialog
        title="添加对象"
        :visible.sync="addDialogVisible"
        :before-close="handleClose"
        width="70%"
      >
        <div>
          <!-- <div> -->
            <el-select v-model="stock" class="select" @change="selectchanged">
              <el-option
                v-for="item in stockOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="select"
              ></el-option>
            </el-select>
            <el-input
              v-model="input"
              placeholder="请输入设备名称"
              style="width: 300px"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                type="primary"
                @click="search()"
              ></el-button>
            </el-input>
            <el-table
              ref="multipletable"
              :data="
                tabledata.slice(
                  (pageIndex - 1) * pageSize,
                  pageIndex * pageSize
                )
              "
              border
              v-loading="dataListLoading"
              @selection-change="selectionChangeHandle"
              style="margin-top: 20px"
            >
              <el-table-column type="selection" width="30"> </el-table-column>
              <el-table-column fixed prop="devicename" label="设备名称">
              </el-table-column>
              <el-table-column prop="deviceid" label="设备编号">
              </el-table-column>
              <el-table-column
                prop="devicetype"
                label="设备类型"
              ></el-table-column>
              <el-table-column
                prop="devicemodel"
                label="设备型号"
              ></el-table-column>
              <el-table-column
                prop="supporter"
                label="供应商"
              ></el-table-column>
            </el-table>
            <el-pagination
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
            <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submit">确 定</el-button>
                </span> -->
            <!-- </el-main>
            </el-container> -->
          <!-- </div> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitObject">确 定</el-button>
          </span>
        </div>
      </el-dialog>
       <!-- <p class="text">触发条件</p>
       <el-form ref="triggerform" :model="form.trigger" :rules="triggerrules" style="margin-bottom:40px">
            <el-form-item label="" prop="unit">
              <el-radio-group v-model="form.trigger.unit">
                <el-radio label="天">按天</el-radio>
               
                <el-radio label="月">按月</el-radio>
                <el-radio label="年">按年</el-radio>
              </el-radio-group>
              <template ><span style="margin-left:50px">每 </span><el-input type="number" style="width:100px" v-model="form.trigger.num" min="1"></el-input><span> {{form.trigger.unit}}执行一次</span></template>
            </el-form-item>
        </el-form> -->
        <!-- <el-button size="mini" @click="addconditon" style="margin-left:10px">+</el-button> -->
      <!-- <el-table :data="form.trigger">
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
      
      <el-dialog title="触发条件" :visible.sync="triggerVisible" 
        width="70%">
        <!-- <el-form ref="triggerform" :model="form.trigger" :rules="triggerrules">
            <el-form-item label="" prop="unit">
              <el-radio-group v-model="form.trigger.unit">
                <el-radio label="天">按天</el-radio>
                <el-row><el-col :span="6"></el-col><el-col :span="18"><el-input></el-input></el-col></el-row> -->
                <!-- <el-radio label="月">按月</el-radio>
                <el-radio label="年">按年</el-radio>
              </el-radio-group>
              <template ><span style="margin-left:50px">每 </span><el-input type="number" style="width:100px" v-model="form.trigger.num"></el-input><span> {{form.trigger.unit}}执行一次</span></template>
            </el-form-item>
        </el-form> --> 
        <span slot="footer" class="dialog-footer">
            <el-button @click="triggerVisible = false">取 消</el-button>
            <el-button type="primary" @click="submittrigger">确 定</el-button>
          </span>
      </el-dialog>

     
       <p class="text">任务项<el-button size="mini"  style="margin-left:10px" @click="addmission" >+</el-button></p>
      <el-table :data="form.missiontable">
        <el-table-column label="任务项编号" prop="itemid"> </el-table-column>
        <el-table-column label="任务项名称" prop="itemname"> </el-table-column>
        <el-table-column label="任务项描述" prop="itemdescr"> </el-table-column>
        <el-table-column label="方法" prop="method" width="100px"> </el-table-column>
        <el-table-column label="结果类型" prop="result" width="100px"> </el-table-column>
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
      
      <el-dialog
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
      </span>
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
    const data = [
      {
        id: 1,
        value: "1",
        label: "库房1",
       
      },
      {
        id: 2,
        value: "库房2",
        label: "库房2",
        
      },
      {
        id: 3,
        value: "库房3",
        label: "库房3",
      },
    ];
    return {
      pickerOptions0: {
                disabledDate: (time) => {
                    if (this.form.endDate != "") {
                        return new Date(this.form.endDate).getTime() < time.getTime()
                    } else {
                        // return time.getTime() > Date.now();
                    }

                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                     if (this.form.startDate != "") {
                        return new Date(this.form.startDate).getTime() > time.getTime()
                    } else {
                        // return time.getTime() > Date.now();
                    }
                }
            },
      missiontable:[],
      missiontableRe:[],
      missionDialogVisible: false,
      triggerVisible:false,
      typeoptions:[{
          value:'维修',
          label:'维修'
        },
        {
          value:'保养',
          label:'保养'
        }],
      stock: "全部库房",
      input: "",
      tabledata: [],
      tabledataRe: [],
      stockOptions: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      data: JSON.parse(JSON.stringify(data)),
      addDialogVisible: false,
      form: {
        proname: '',
        proType: "",
        startDate: "",
        endDate: "",
        state: "启用",
        delivery: "分配",
        estimate:'',
        table: [
          // {
          //   devicename: "",
          //   deviceid: "",
          //   devicetype: "",
          //   devicemodel: "",
          //   manufacture: "",
          //   amount: '',
          // },
        ],
        trigger:
          {
            unit:'天',
            num:'',
           descr:''
        },
        missiontable:[]
      },
      rules:{
        proname:[{required:'true',message:'请输入计划名称',trigger:'blur'}],
        proType:[{required:'true',message:'请选择计划类型',trigger:'blur'}],
        startDate:[{required:'true',message:'请输入计划开始时间',trigger:'blur'}],
        endDate:[{required:'true',message:'请输入计划结束时间',trigger:'blur'}],
        state:[{required:'true',message:'请选择计划状态',trigger:'blur'}],
        delivery:[{required:'true',message:'请选择是否分配',trigger:'blur'}]
      },
      triggerrules:{
        unit:[{required:'true',message:'请选择单位',trigger:'blur'}],
        num:[{required:'true',message:'请输入数量',trigger:'blur'}]
      }
    };
  },
  methods: {
     getDataList() {
      this.tabledata=[]
      this.$http({
        url: this.$http.adornUrl("/device/brief"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledataRe = data.data;
          // console.log(data.data);
          
          for(let item of this.tabledataRe){
            let t={
              // isselect:false,
              devicetype:item.devicetype,
              devicestate:item.devicestate,
              devicename:item.devicename,
              devicemodel:item.devicemodel,
              deviceid:item.deviceid,
              supporter:item.supporter,
              startdate:item.startdate,
              stockdetailloc:item.stockdetailloc
            }
            this.tabledata.push(t)
          }
          this.totalPage = this.tabledata.length
          // console.log(this.tabledata.length);
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
      });
      this.totalPage = this.tabledata.length;
     console.log(this.tabledata.length);
     
    },
    getStock() {
      this.$http({
        url: this.$http.adornUrl("/stock/stocklist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.stockOptions = data.data.data;
          this.stockOptions.push({
            value:"全部库房",
            label:"全部库房"
          })
          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    },
    getMissionList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/missionitem/ifo'),
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
    search() {
      this.tabledata = [];
      console.log("start ");
      console.log(this.stock);
      console.log(this.input == '')
      if (this.stock == '' && this.input == '' ){
        console.log("if")
          this.getDataList();
      }
      else{
        console.log("else")
        this.$http({
          url: this.$http.adornUrl("/maintainproject/device/search"),
          method: "post",
          params: this.$http.adornParams({
            'stock': this.stock == '全部库房' ? null : this.stock,
            'device': this.input == '' ? null : this.input,
          }),
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.tabledataRe = data.data;
            // console.log(data.data);

            for (let item of this.tabledataRe) {
              let t = {
                // isselect:false,
                devicetype: item.devicetype,
                devicestate: item.devicestate,
                devicename: item.devicename,
                deviceid: item.deviceid,
                supporter: item.supporter,
                startdate: item.startdate,
                stockdetailloc: item.stockdetailloc,
              };
              this.tabledata.push(t);
            }
            this.totalPage = this.tabledata.length;
            // console.log(this.tabledata.length);
          } else {
            this.tabledata = [];
            this.totalPage = 0;
          }
        });
      }
        
    },
    submit() {
      let templatelist = this.getMissionItemList(this.form.missiontable)
      let objectlist = this.getDeviceList(this.form.table)
      console.log(this.form.proName);
      this.dialogVisible = false;
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          alert("输入错误!");
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/maintainproject/add"),
            method: "post",
            data: this.$http.adornData({
              'projectid':null,
              'projectname':this.form.proname,
              'projectloc':null,
              'projecttype':this.form.proType,
              'starttime':this.form.startDate,
              'endtime':this.form.endDate,
              'state':this.form.state,
              'estimate':this.form.estimate,
              'isdelivery':this.form.delivery,
              'con':null,
              'contype':null,
              'conproject':null,
              'unit':this.form.trigger.unit,
              'cycle':this.form.trigger.num,
              'template':templatelist,
              'deviceid':objectlist
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              alert("添加成功!");
              this.getDataList()
            } else {
              alert("添加失败!");
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    getDeviceList(table){
      if(table == [])
        return null
      else{
        let idlist=[]
        for(let item of table){
          idlist.push(item.deviceid)
        }
        return idlist
      }
      
    },
    getMissionItemList(table){
      if(table == [])
        return null
      else{
        let idlist=[]
        for(let item of table){
          idlist.push(item.itemid)
        }
        return idlist
      }
      
    },
    missionselectionChangeHandle(){
      this.dataListSelections = this.$refs.missiontable.selection;
    },
    //checkbox
    selectionChangeHandle(val) {
      // this.form.table=[]
      console.log("select");
      this.dataListSelections = this.$refs.multipletable.selection;
      console.log(val);

      // this.form.tabledata=[]
      // this.form.tabledata.push(val)
    },
    deleteObject(index, row) {
      this.form.table.slice(index, 1);
      console.log(this.form.table);
    },
    deleteMission(index,row){
      this.form.missiontable.slice(index,1)
    },
    deleteTrigger(){
      this.form.trigger = {}
    },
    addObject() {
      this.addDialogVisible = true;
      this.getStock()
      this.getDataList()
    },
    addconditon() {
      this.triggerVisible = true
    },
    addmission() {
      this.missionDialogVisible = true
      this.getMissionList()
    },
    submitmission(){
      this.missionDialogVisible = false;
      this.form.missiontable = []
      for (let item of this.dataListSelections) {
        let t = {
          // isselect:false,
          itemid: item.itemid,
          itemname: item.itemname,
          itemdescr: item.itemdescr,
          state: item.state,
          method: item.method,
          result: item.result,
          hours: item.hours
        };
        this.form.missiontable.push(t);
      }
    },
    submitObject() {
      this.addDialogVisible = false;
      this.form.table = [];
      for (let item of this.dataListSelections) {
        let t = {
          // isselect:false,
          devicetype: item.devicetype,
          devicestate: item.devicestate,
          devicename: item.devicename,
          deviceid: item.deviceid,
          supporter: item.supporter,
          devicemodel: item.devicemodel,
        };
        this.form.table.push(t);
      }
    },
    submittrigger(){
      this.triggerVisible = false
      this.form.trigger.descr= "每"+this.form.trigger.num+this.form.trigger.unit+"执行一次"
    },
    handleNodeClick(data) {
      console.log(data.value);
    },
    handleClose() {
      this.addDialogVisible = false;
    },
    selectchanged(val){
      this.search()
    }
  },
  
};
</script>
