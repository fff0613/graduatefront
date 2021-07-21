<template>
  <div>
    <div>
      <p class="table-title">基本信息</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>设备编号&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.deviceId"
              ></el-input></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>设备名称&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.deviceName"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>设备类型&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.deviceType"
              ></el-input></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>设备型号&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.deviceModel"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>设备来源&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.deviceSourse"
              ></el-input></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>保质期&nbsp;</span
              ><el-date-picker
                v-model="form.effectiveDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker></div
          ></el-col>
        </el-row>
      </div>
    </div>
    <div>
      <p class="table-title">采购信息</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>购买日期&nbsp;</span
              ><el-date-picker
                v-model="form.buyDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>税率&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.taxRate"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>税前价格&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.beforeTax"
              ></el-input></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>税费&nbsp;</span
              ><el-input style="width: 50%" v-model="form.tax"></el-input></div
          ></el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>供应商&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.support"
              ></el-input></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>制造商&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.manufacture"
              ></el-input></div
          ></el-col>
        </el-row>
      </div>
    </div>
    <div>
      <p class="table-title">安装信息</p>
      <div class="table-block">
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>安装日期&nbsp;</span
              ><el-date-picker
                v-model="form.buyDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker></div
          ></el-col>
          <el-col :span="12" class="table-inline"
            ><div>
              <span>启用日期&nbsp;</span
              ><el-date-picker
                v-model="form.buyDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker></div
          ></el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :span="12" class="table-inline"
            ><div>
              <span>安装位置&nbsp;</span
              ><el-input
                style="width: 50%"
                v-model="form.mountLoc"
              ></el-input></div
          ></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style>
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
  props: {
    itemName: {
      type: String,
      default: "",
    },
    itemId: { type: String, default: "" },
  },
  data() {
    return {
      form: {
        deviceName: "",
        deciveId: "",
        deviceModel: "",
        deviceType: "",
        deviceSourse: "",
        manufacture: "",
        buyDate: "",
        effectiveDate: "",
        taxRate: "",
        tax: "",
        beforeTax: "",
        support: "",
        mountLoc: "",
        mountDate: "",
        startDate: "",
      },
    };
  },
};
</script>