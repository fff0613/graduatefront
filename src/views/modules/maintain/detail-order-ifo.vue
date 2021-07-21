<template>
  <div>
      <div>
        <p class="text">历史记录</p>
         <div class="table-block">
            <el-timeline  class="table-row">
    <el-timeline-item 
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
         </div>   
    </div>
    <div>
      <p class="text">基本信息</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>工单号:&nbsp;</span>{{ maintain.workorderid }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>主题:&nbsp;</span>{{ maintain.theme }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>工单类型:&nbsp;</span>{{ maintain.ordertype }}
          </el-col>
         <el-col :span="12" class="table-inline">
            <span v-if="maintain.urgency == '1'">紧急程度:高&nbsp;</span>
            <span v-else-if="maintain.urgency == '2'">紧急程度:中&nbsp;</span>
            <span v-else>紧急程度:低&nbsp;</span>
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>设备:&nbsp;</span>{{ maintain.deviceid }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>运行状态:&nbsp;</span>{{ maintain.runtimestate }}
          </el-col>
        </el-row>
       
        <!-- <el-row class="table-row">
          <el-col> <span>照片:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row> -->
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>上报人:&nbsp;</span>{{ username.report }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>执行人:&nbsp;</span>{{ username.execute }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>发生时间:&nbsp;</span>{{ maintain.reporthappentime }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>截止时间:&nbsp;</span>{{ maintain.limittime }}
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <p class="text">执行过程</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>故障描述:&nbsp;</span>{{ maintain.faultdescr}}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>状态:&nbsp;</span>{{ maintain.state }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>故障原因:&nbsp;</span>{{ maintain.faultreason }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>维修类别:&nbsp;</span>{{ maintain.maintaintype }}
          </el-col>
        </el-row>
         <!-- <el-row class="table-row">
          <el-col> <span>事前描述:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row> -->
        
       <!-- <el-row class="table-row">
          <el-col> <span>事后描述:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row> -->
        
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>预防措施:&nbsp;</span>{{ maintain.preventmeasure }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>维修时效:&nbsp;</span>{{ maintain.repairTime }}
          </el-col>
        </el-row>
         <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>开始时间:&nbsp;</span>{{ maintain.executehappentime }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>分配时间:&nbsp;</span>{{ maintain.distributiontime }}
          </el-col>
        </el-row>
         <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>完成时间:&nbsp;</span>{{ maintain.completetime }}
          </el-col>
          <!-- <el-col :span="12" class="table-inline">
            <span>到场时效:&nbsp;</span>{{ form.arrivalTime }}
          </el-col> -->
        </el-row>
      </div>
    </div>
    <p class="text">过程描述</p>
    <div class="table">
       <el-row class="table-row" style="margin-left:80px">
          <el-col> <span>申请描述:&nbsp;</span>{{ maintain.descr }} </el-col>
        </el-row>
      <el-row class="table-row"  style="margin-left:80px">
          <el-col> <span>事前描述:&nbsp;</span>{{ maintain.beforedescr }} </el-col>
        </el-row>
        <el-row class="table-row"  style="margin-left:80px">
          <el-col> <span>事后描述:&nbsp;</span>{{ maintain.afterdescr}} </el-col>
        </el-row>
    </div>
  </div>
</template>
<style>
@import url('../../../../static/plugins/timeline/timeline.css');
@import url('../../../../static/plugins/timeline-item/timeline-item.css');
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
      workorderid: this.$route.query.workorderid,
      username:{
        report:'',
        execute:'',
        distribute:'',
        complete:''
      },
      reverse: true,
        activities: [{
          content: '',
          timestamp:'',
          size: '',
          type: '',
          icon: ''
        },
        {
          content: '',
          timestamp:'',
          color: ''
        },
        {
          content: '',
          timestamp:'',
          color: ''
        },
        {
          content: '',
          timestamp:'',
          color: ''
        },
        {
          content: '',
          timestamp:'',
          color: ''
        }],
      maintain:{}
    };
  },
  created(){
    this.getData()
  },
  methods:{
    getData() {
        this.$http({
          url: this.$http.adornUrl(`/generator/maintain/info/${this.workorderid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
              console.log(data.maintain)
              this.maintain = data.maintain
              this.getUserName(data.maintain.reporterid,data.maintain.executorid,data.maintain.distributeid,data.maintain.completeid)
              console.log('report'+this.username.report)
              
          }
        })
        
      },
      getUserName(reportid,exeid,disid,compid){
        this.$http({
          url: this.$http.adornUrl(`/sys/user/name/${reportid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
            this.username.report = data.username
            console.log('report'+this.username.report)
            this.activities[0]={
                content: '人员'+this.username.report+'申请了'+this.maintain.ordertype+'工单',
                timestamp:this.maintain.reporthappentime,
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
              }
          } 
        })
        if(disid != null){
           this.$http({
            url: this.$http.adornUrl(`/sys/user/name/${disid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log(data)
              this.username.distribute = data.username
              this.activities[1]={
                content: '调度人员'+this.username.distribute+'完成了分配工单给相关人员',
                timestamp:this.maintain.distributiontime,
                color: '#0bbd87'
              }
            } 
          })
        }
        if(exeid != null){
           this.$http({
            url: this.$http.adornUrl(`/sys/user/name/${exeid}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log(data)
              this.username.execute = data.username
              if(disid != null ){
                this.activities[2]={
                  content: '人员'+this.username.distribute+'分配工单给了人员'+this.username.execute,
                  timestamp:'',
                  color: '#0bbd87'
                }
              }
              if(this.maintain.executehappentime != null){
                 this.activities[3]={
                  content: '人员'+this.username.execute+'完成执行'+this.maintain.ordertype+'工单任务',
                  timestamp:this.maintain.executehappentime,
                  color: '#0bbd87'
                }
              } 
             
            } 
          })
        }
       if(compid != null){
         this.$http({
          url: this.$http.adornUrl(`/sys/user/name/${compid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
            this.username.complete = data.username
            this.activities[4]={
                content: '人员'+this.username.complete+'对该'+this.maintain.ordertype+'工单进行了确认',
                timestamp:this.maintain.completetime,
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
              }
          } 
        })
       }
    
      }
  }
};
</script>