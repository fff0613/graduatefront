<template>
  <div>
    <div>
        <p class="text">设备记录</p>
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
            <el-table-column prop="stockdetailloc" label="盘点结果"></el-table-column>
          </el-table>
         </div>   
    </div>
    <div>
      <p class="text">基本信息</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>工单号:&nbsp;</span>{{ liferecord.recordid }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>工单类型:&nbsp;</span>{{ liferecord.recordtype }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>所属组织:&nbsp;</span>{{ liferecord.orgname }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>所属厂商:&nbsp;</span>{{ liferecord.companyname }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>目标库房:&nbsp;</span>{{ liferecord.stockname }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>目标库房位置:&nbsp;</span>{{ loc.newstockloc }}
          </el-col>
        </el-row>
         <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>原库房:&nbsp;</span>{{ liferecord.oldstockname }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>原库房位置:&nbsp;</span>{{ loc.originstockloc }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>上报人编号:&nbsp;</span>{{ liferecord.reporterid }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>上报人名称:&nbsp;</span>{{ liferecord.reportername }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="table-inline">
            <span>执行人编号:&nbsp;</span>{{ liferecord.executorid }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>执行人:&nbsp;</span>{{ liferecord.executorname }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>发生时间:&nbsp;</span>{{ liferecord.happentime }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>状态:&nbsp;</span>{{ liferecord.state }}
          </el-col>
        </el-row>
        <!-- <el-row class="table-row">
          <el-col> <span>描述:&nbsp;</span>{{ form.descr }} </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col> <span>照片:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row> -->
        
      </div>
    </div>
    <div>
      <p class="text">过程描述</p>
      <div class="table">
        <el-row class="table-row" style="margin-left:80px">
            <el-col> <span>描述:&nbsp;</span>{{ liferecord.descr }} </el-col>
          </el-row>
      </div>
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
.table{
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  box-shadow: 0 1 0 0;
  margin-bottom: 15px;
}
.table-inline {
  text-align: center;
}
.table-row {
  margin-top: 15px;
  margin-bottom: 15px;
}
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
</style>
<script>
export default {
  data() {
    return {
      workorderid: this.$route.query.recordid,
      loc:{
        newstockloc:'',
        originstockloc:''
      },
      username:{
        report:'',
        execute:'',
        distribute:'',
        complete:''
      },
      orderId: this.$route.orderId,
      reverse: true,
        // activities: [{
        //   content: '支持使用图标',
        //   timestamp: '2018-04-12 20:46',
        //   size: 'large',
        //   type: 'primary',
        //   icon: 'el-icon-more'
        // }, {
        //   content: '支持自定义颜色',
        //   timestamp: '2018-04-03 20:46',
        //   color: '#0bbd87'
        // }, {
        //   content: '支持自定义尺寸',
        //   timestamp: '2018-04-03 20:46',
        //   size: 'large'
        // }, {
        //   content: '默认样式的节点',
        //   timestamp: '2018-04-03 20:46'
        // }],
      form: {
        table: [
          {
            devicename: "",
            deviceid: "",
            devicetype: "",
            devicemodel: "",
            manufacture: "",
            amount: 0,
            support:''
          },
        ]
      },
      liferecord:{
        afterdescr:'',
        amount: '',
        companyname: '',
        descr:'',
        deviceid: '',
        devicename: '',
        executorid: '',
        executorname: '',
        happentime: '',
        oldcompanyname: '',
        oldorgname: '',
        oldstockname: '',
        stockname:'',
        organizationname: '',
        orgname:'',
        reason: '',
        recordid: '',
        recordtype:'',
        reporterid:'',
        reportername:'',
        state:'',
      },
      device:[],
      deviceRec:{
        devicename: '',
        deviceid: '',
        devicemodel: "",
        devicetype: "",
        devicesourse: "",
        devicestate:"",
        manufacture: "",
        buydate: "",
        effectivedate: "",
        taxrate: "",
        tax: "",
        beforetax: "",
        supporter: "",
        storagedate:"",
        storagebatch:"",
        stockdetailloc:"",
        stockcontainer:"",
        stockroom:"",
        stockname:"",
        stockid:"",
        effectivedate:"",
        startdate: ""
      }
    };
  },
  created(){
    this.getData()
  },
  methods:{
     getData() {
        this.$http({
          url: this.$http.adornUrl(`/liferecord/info/${this.workorderid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
              console.log(data.liferecord)
              this.liferecord = data.liferecord
              // this.liferecord = {
              //   afterdescr:data.liferecord.afterdescr,
              //   amount: data.liferecord.amount,
              //   companyname: data.liferecord.companyname,
              //   descr:data.liferecord.descr,
              //   deviceid: data.liferecord.deviceid,
              //   devicename: data.liferecord.devicename,
              //   executorid: data.liferecord.executorid,
              //   executorname: data.liferecord.executorname,
              //   happentime: data.liferecord.happentime,
              //   oldcompanyname: data.liferecord.oldcompanyname,
              //   oldorgname: data.liferecord.oldorgname,
              //   oldstockname: data.liferecord.oldstockname,
              //   stockname:data.liferecord.stockname,
              //   orgname:data.liferecord.orgname,
              //   reason: data.liferecord.reason,
              //   recordid: data.liferecord.recordid,
              //   recordtype:data.liferecord.recordtype,
              //   reporterid:data.liferecord.reporterid,
              //   reportername:data.liferecord.reportername,
              //   state:data.liferecord.state,
              // }
              this.getDevice()
              this.getUserName(data.liferecord.reporterid,data.liferecord.executorid)
              console.log('report'+this.username.report)           
          }
          //不能在这获取device的值，因为http是异步的，此时liferecord.deviceid没有值
        })
        
      },
      getDevice(){
        if(this.liferecord.recordtype != '盘点'){
          console.log("liferecord")
          console.log(this.liferecord)
          console.log("devceid "+this.liferecord.deviceid)
          this.$http({
            url: this.$http.adornUrl(`/device/info/${this.liferecord.deviceid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.deviceRec = data.device;
              this.device.push(this.deviceRec)
              console.log(data)
            } 
          }).catch((err)=>{
            console.log(err)
          });
        }else{
          console.log("liferecord-inventory")
          console.log(this.liferecord)
          console.log("devceid "+this.liferecord.deviceid)
          this.$http({
            url: this.$http.adornUrl(`/liferecord/inventory/devicelist/${this.liferecord.recordid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.device = data.data;
              // this.device.push(this.deviceRec)
              console.log(data)
            } 
          }).catch((err)=>{
            console.log(err)
          });
        }
      },
      getUserName(reportid,exeid){
        this.$http({
          url: this.$http.adornUrl(`/sys/user/name/${reportid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
            this.username.report = data.username
            console.log('report'+this.username.report)
          } 
        })
        if(exeid != null){
           this.$http({
            url: this.$http.adornUrl(`/sys/user/name/${exeid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log(data)
              this.username.execute = data.username
            } 
          })
        }
    
      }
  }
};
</script>