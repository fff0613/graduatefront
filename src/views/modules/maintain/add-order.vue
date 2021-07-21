<template>
  <div>
    <p class="table-title">基本信息</p>

    <el-form ref="form" label-position="right" inline="true">
      <el-form-item label="工单号">
        <el-input v-model="form.orderId"></el-input>
      </el-form-item>
      <el-form-item label="主题">
        <el-input v-model="form.theme"></el-input>
      </el-form-item>
      <el-form-item label="工单类型">
        <el-select v-model="form.orderType">
          <el-option label="维修" key="repair" value="repair"></el-option>
          <el-option label="保养" key="maintain" value="maintain"></el-option>
          <el-option
            label="巡检"
            key="inspection"
            value="inspection"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属组织">
        <el-input v-model="form.organization"></el-input>
      </el-form-item>
      <el-form-item label="设备">
        <el-input v-model="form.device"></el-input>
      </el-form-item>
      <el-form-item label="运行状态">
        <el-input v-model="form.runtimeState"></el-input>
      </el-form-item>
      <el-form-item label="所属组织">
        <el-input v-model="form.organization"></el-input>
      </el-form-item>
      <el-form-item label="发生时间">
        <el-date-picker
          v-model="form.happenTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="紧急程度">
        <el-input v-model="form.rank"></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="描述" inline="false">
        <el-input v-model="form.descr" type="textarea" :rows="4"></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="照片" >
        <el-row gutter="20">
          <el-col :span="12"><el-input v-model="form.descr" :rows="4"></el-input></el-col>
          <el-col :span="12"><el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload></el-col>
        </el-row>
        
        
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="上报人">
        <el-input v-model="form.reporter"></el-input>
      </el-form-item>
      <el-form-item label="执行人">
        <el-select :model="form.executor">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button  @click="$router.push({name:'device'})">取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<style>
@import url("../../../../static/plugins/timeline/timeline.css");
@import url("../../../../static/plugins/timeline-item/timeline-item.css");
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
      form: {
        orderId: "",
        theme: "",
        orderType: "",
        organization: "",
        device: "",
        runtimestate: "",
        happenTime: "",
        endTime: "",
        rank: "",
        descr: "",
        reporter: "",
        executor: "",
        brokeType: "",
        brokeDescr: "",
        repairType: "",
        state: "",
        beforeDescr: "",
        afterDescr: "",
        precaution: "",
        deliveryTime: "",
        startTime: "",
        completeTime: "",
        repairTime: "",
        arrivalTime: "",
      },
    };
  },
};
</script>