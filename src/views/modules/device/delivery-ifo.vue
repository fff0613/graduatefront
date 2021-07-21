<template>
  <div>
      <div>
        <p>历史记录</p>
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
      <p class="table-title">基本信息</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>工单号:&nbsp;</span>{{ form.orderId }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>主题:&nbsp;</span>{{ form.theme }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>工单类型:&nbsp;</span>{{ form.orderType }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>所属组织:&nbsp;</span>{{ form.organization }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>设备:&nbsp;</span>{{ form.device }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>运行状态:&nbsp;</span>{{ form.runtimeState }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>发生时间:&nbsp;</span>{{ form.happenTime }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>截止时间:&nbsp;</span>{{ form.endTime }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>紧急程度:&nbsp;</span>{{ form.rank }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col> <span>描述:&nbsp;</span>{{ form.descr }} </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col> <span>照片:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>上报人:&nbsp;</span>{{ form.reporter }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>执行人:&nbsp;</span>{{ form.executor }}
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <p class="table-title">执行过程</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>故障描述:&nbsp;</span>{{ form.brokeDescr}}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>状态:&nbsp;</span>{{ form.state }}
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>故障类型:&nbsp;</span>{{ form.brokeType }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>维修类别:&nbsp;</span>{{ form.repairType }}
          </el-col>
        </el-row>
         <el-row class="table-row">
          <el-col> <span>事前照片:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col> <span>描述:&nbsp;</span>{{ form.beforeDescr }} </el-col>
        </el-row>
       <el-row class="table-row">
          <el-col> <span>事后照片:&nbsp;</span><img src="" alt="" /> </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col> <span>描述:&nbsp;</span>{{ form.afterDescr}} </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>预防措施:&nbsp;</span>{{ form.precaution }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>分配时间:&nbsp;</span>{{ form.deliveryTime }}
          </el-col>
        </el-row>
         <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>开始时间:&nbsp;</span>{{ form.startTime }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>完成时间:&nbsp;</span>{{ form.completeTime }}
          </el-col>
        </el-row>
         <el-row class="table-row">
          <el-col :span="12" class="table-inline">
            <span>维修时效:&nbsp;</span>{{ form.repairTime }}
          </el-col>
          <el-col :span="12" class="table-inline">
            <span>到场时效:&nbsp;</span>{{ form.arrivalTime }}
          </el-col>
        </el-row>
      </div>
    </div>
    
  </div>
</template>
<style>
@import url('../../../../static/plugins/timeline/timeline.css');
@import url('../../../../static/plugins/timeline-item/timeline-item.css');
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
.save-button {
}
</style>
<script>
export default {
  data() {
    return {
      orderId: this.$route.orderId,
      reverse: true,
        activities: [{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }],
      form: {
        orderId:'',
        theme:'',
        orderType:'',
        organization:'',
        device:'',
        runtimestate:'',
        happenTime:'',
        endTime:'',
        rank:'',
        descr:'',
        reporter:'',
        executor:'',
        brokeType:'',
        brokeDescr:'',
        repairType:'',
        state:'',
        beforeDescr:'',
        afterDescr:'',
        precaution:'',
        deliveryTime:'',
        startTime:'',
        completeTime:'',
        repairTime:'',
        arrivalTime:''
      }
    };
  },
};
</script>