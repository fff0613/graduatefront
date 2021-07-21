<template>
  <el-dialog
    title="新增"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="dialogClose">
    <div v-if="preprocess">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="主题" prop="theme">
      <el-input v-model="dataForm.theme" placeholder=""></el-input>
    </el-form-item>
    <!-- <el-form-item label="" prop="reporthappentime">
      <el-date-picker
      v-model="dataForm.reporthappentime"
      type="date"
      placeholder="选择日期时间"
      value-format="timestamp" 
      >
    </el-date-picker>
    </el-form-item> -->
    <!-- <el-form-item label="故障描述" prop="faultreason">
      <el-input v-model="dataForm.faultreason" placeholder=""></el-input>
    </el-form-item> -->
    <el-form-item label="运行状态" prop="runtimestate">
      <el-input v-model="dataForm.runtimestate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="desrc">
      <el-input v-model="dataForm.desrc" placeholder=""></el-input>
    </el-form-item>
    
   
    <el-form-item label="执行人" prop="executorid">
      <el-select v-model="dataForm.executorid" @change="selectchanged">  
        <el-option  v-for="item in useroptions" :key="item.key" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="" prop="reporterid">
      <el-input v-model="dataForm.reporterid" placeholder=""></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="故障描述" prop="faultdescr">
      <el-input v-model="dataForm.faultdescr" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="faulttype">
      <el-input v-model="dataForm.faulttype" placeholder=""></el-input>
    </el-form-item> -->
    <el-form-item label="维修类别" prop="maintaintype">
      <el-select v-model="dataForm.maintaintype">
        <el-option v-for="item in manoptions" :key="item.key" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
   
 
         <el-form-item label="申请时间" prop="reporthappentime">
          <el-date-picker
          v-model="dataForm.reporthappentime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="timestamp" 
          >
        </el-date-picker>
        </el-form-item>
    <el-row>
      <el-col :span="10">
        <el-form-item label="紧急程度" prop="urgency">
      <el-select v-model="dataForm.urgency"  class="select">
        <el-option  class="select" v-for="item in urgencyoptions" :key="item.key" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
      </el-col>
      <el-col :span="10">
         <el-form-item label="截止时间" prop="limittime">
          <el-date-picker
          v-model="dataForm.limittime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="timestamp" 
          >
        </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-form-item label="" prop="beforedescr">
      <el-input v-model="dataForm.beforedescr" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="afterdescr">
      <el-input v-model="dataForm.afterdescr" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="preventmeasure">
      <el-input v-model="dataForm.preventmeasure" placeholder=""></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="" prop="distributiontime">
      <el-input v-model="dataForm.distributiontime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="executehappentime">
      <el-input v-model="dataForm.executehappentime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="completetime">
      <el-input v-model="dataForm.completetime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="checkadice">
      <el-input v-model="dataForm.checkadice" placeholder=""></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="" prop="state">
      <el-input v-model="dataForm.state" placeholder=""></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="" prop="timelimit">
      <el-input v-model="dataForm.timelimit" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="unit">
      <el-input v-model="dataForm.unit" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="arrivallimit">
      <el-input v-model="dataForm.arrivallimit" placeholder=""></el-input>
    </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dataCancel">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </div>
    <div v-else>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="设备编号" prop="deviceid">
          <el-input v-model="dataForm.deviceid" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="工单种类" prop="ordertype">
          <el-select v-model="dataForm.ordertype" @change="orderselectchange">
            <el-option v-for="item in typeoptions" :key="item.key" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataCancel">取消</el-button>
        <el-button type="primary" @click="preSubmit()">确定</el-button>
      </span>
    </div>
  </el-dialog>
</template>
<style>
.select.el-input__inner {
  width: 105px;
}
.select.el-input.el-input--medium.el-input--suffix {
  width: 105px;
}
</style>
<script>
  export default {
    data () {
      return {
        manoptions:[{
          value:'暂停使用',
          label:'暂停使用'
        },
        {
          value:'不暂停使用',
          label:'不暂停使用'
        }],
        typeoptions:[{
          value:'维修',
          label:'维修'
        },
        {
          value:'保养',
          label:'保养'
        }],
        urgencyoptions:[{
          value:1,
          label:"高"
        },
        {
          value:2,
          label:"中"
        },
        {
          value:3,
          label:"低"
        }],
        useroptions:[],
        visible: false,
        preprocess:false,
        dataForm: {
          workorderid: 0,
          deviceid: '',
          reporthappentime: '',
          faultreason: '',
          runtimestate: '',
          desrc: '',
          urgency: '',
          limittime: '',
          executorid: '',
          reporterid: '',
          faultdescr: '',
          faulttype: '',
          maintaintype: '',
          beforedescr: '',
          afterdescr: '',
          preventmeasure: '',
          distributiontime: '',
          executehappentime: '',
          completetime: '',
          checkadice: '',
          state: '',
          timelimit: '',
          unit: '',
          arrivallimit: '',
          ordertype:'',
          theme:''
        },
        dataRule: {
          deviceid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          reporthappentime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
         
          limittime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          executorid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // reporterid: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          theme: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          ordertype: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          // maintaintype: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // beforedescr: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // afterdescr: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // preventmeasure: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // distributiontime: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // executehappentime: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // completetime: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // checkadice: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // timelimit: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // unit: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // arrivallimit: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    // created(){
    //   this.getfellowlist()
     
    // },
    methods: {
      dialogClose(){
        this.visible = false
        this.preprocess = false
      },
      dataCancel(){
        this.visible = false
        this.preprocess = false
      },
      preSubmit(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid){
              this.preprocess = true
              this.getfellowlistTwo()
          }
        })   
      },
      init (id) {
        // this.getfellowlist()
        this.dataForm.workorderid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.workorderid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/maintain/info/${this.dataForm.workorderid}`),
              method: 'post',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deviceid = data.maintain.deviceid
                this.dataForm.reporthappentime = data.maintain.reporthappentime
                this.dataForm.faultreason = data.maintain.faultreason
                this.dataForm.runtimestate = data.maintain.runtimestate
                this.dataForm.desrc = data.maintain.desrc
                this.dataForm.urgency = data.maintain.urgency
                this.dataForm.limittime = data.maintain.limittime
                this.dataForm.executorid = data.maintain.executorid
                this.dataForm.reporterid = data.maintain.reporterid
                this.dataForm.faultdescr = data.maintain.faultdescr
                this.dataForm.faulttype = data.maintain.faulttype
                this.dataForm.maintaintype = data.maintain.maintaintype
                this.dataForm.beforedescr = data.maintain.beforedescr
                this.dataForm.afterdescr = data.maintain.afterdescr
                this.dataForm.preventmeasure = data.maintain.preventmeasure
                this.dataForm.distributiontime = data.maintain.distributiontime
                this.dataForm.executehappentime = data.maintain.executehappentime
                this.dataForm.completetime = data.maintain.completetime
                this.dataForm.checkadice = data.maintain.checkadice
                this.dataForm.state = data.maintain.state
                this.dataForm.timelimit = data.maintain.timelimit
                this.dataForm.unit = data.maintain.unit
                this.dataForm.arrivallimit = data.maintain.arrivallimit
              }
            })
          }
        })
      },
      orderselectchange(){
        if(this.dataForm.deviceid != null && this.dataForm.deviceid != ''){
            this.getfellowlistTwo()
        }
      },
      selectchanged(){
        console.log("select")
        if(this.dataForm.deviceid == null || this.dataForm.deviceid == ''){
          alert("请输入设备编号")
          this.dataForm.executorid = ''
        }else if(this.dataForm.ordertype == null || this.dataForm.ordertype == ''){
          alert("请选择工单类型")
          this.dataForm.executorid = ''
        }else{
          this.getfellowlistTwo()
        }
      },
      getfellowlist() {
      this.useroptions = [{
        value:'调度人员',
        label:'调度人员'
      }];
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
            this.useroptions.push(t);
          }

          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    },
     getfellowlistTwo() {
      this.useroptions = [{
        value:'调度人员',
        label:'调度人员'
      }];
      let type = ''
      if(this.dataForm.ordertype == '维修')
          type = '维修人员'
      else
          type = '保养人员'
      console.log(type)
      if(this.dataForm.deviceid != null){
        this.$http({
        url: this.$http.adornUrl(`/deviceuser/userlist/${this.dataForm.deviceid}/${type}`),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          console.log(data.data)
          // this.deviceTypeOption = data.data.data;
          for (let item of data.data.data) {
            let t = {
              value: item.userId,
              label: item.username,
            };
            this.useroptions.push(t);
          }

          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
      }
    },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/generator/maintain/add'),
              method: 'post',
              data: this.$http.adornData({
                'workorderid': this.dataForm.workorderid || undefined,
                'deviceid': this.dataForm.deviceid,
                'reporthappentime': this.dataForm.reporthappentime,
                'faultreason': this.dataForm.faultreason,
                'runtimestate': this.dataForm.runtimestate,
                'desrc': this.dataForm.desrc,
                'urgency': this.dataForm.urgency,
                'limittime': this.dataForm.limittime,
                'executorid': this.dataForm.executorid == '调度人员' ? null: this.dataForm.executorid,
                'reporterid': this.dataForm.reporterid,
                'faultdescr': this.dataForm.faultdescr,
                'faulttype': this.dataForm.faulttype,
                'maintaintype': this.dataForm.maintaintype,
                'beforedescr': this.dataForm.beforedescr,
                'afterdescr': this.dataForm.afterdescr,
                'preventmeasure': this.dataForm.preventmeasure,
                'distributiontime': this.dataForm.distributiontime,
                'executehappentime': this.dataForm.executehappentime,
                'completetime': this.dataForm.completetime,
                'checkadice': this.dataForm.checkadice,
                'state': this.dataForm.state,
                'timelimit': this.dataForm.timelimit,
                'unit': this.dataForm.unit,
                'arrivallimit': this.dataForm.arrivallimit,
                'ordertype':this.dataForm.ordertype
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
