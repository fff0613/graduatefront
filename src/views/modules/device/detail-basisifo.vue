<template>
  <div>
      <el-form ref="form" :model="form" :rules="rules">
        <!-- <p class="table-title">基本信息</p> -->
        <div class="table-block">
          <el-card>
            <el-row class="table-row">
            <el-col :span="12" class="table-inline"
              ><el-form-item
                prop="devicename"
                label="设备名称"
              >
                <el-input
                  style="width: 50%"
                  v-model="form.devicename"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row  class="table-row">
            <el-col :span="12"
              ><el-form-item
                label="设备类型"
                prop="devicetype"
              >
                <el-select v-model="form.devicetype" class="form">
                  <el-option
                    v-for="item in deviceTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="form"
                  >
                  </el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label="设备型号"
                prop="devicemodel"
              >
                <el-select v-model="form.devicemodel" class="form">
                  <el-option
                    v-for="item in deviceModelOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="form"
                  >
                  </el-option>
                </el-select> </el-form-item
            ></el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="12" class="table-inline"
              ><el-form-item label="设备来源" prop="deviceourse">
                <el-input
                  style="width: 50%"
                  v-model="form.devicesourse"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="table-inline"
              ><el-form-item label="保质期" prop="effectivedate">
                <el-date-picker
                  v-model="form.effectivedate"
                  type="date"
                  :placeholder="form.effectivedate == null ? '选择日期':form.effectivedate"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          </el-card>
        </div>
        <!-- <p class="table-title">采购信息</p> -->
        <div class="table-block">
          <el-card>
            <el-row class="table-row">
            <el-col :span="12" class="table-inline">
              <el-form-item prop="buydate" label="购买日期">
                <el-date-picker
                  v-model="form.buydate"
                  type="date"
                  :placeholder="form.buydate == '' ? '选择日期':form.buydate"
                  value-format="timestamp"
                >
                </el-date-picker> </el-form-item
            ></el-col>
            <el-col :span="12" class="table-inline"
              ><el-form-item prop="taxrate" label="税率">
                <el-input
                  oninput = "value=value.replace(/[^0-9.]/g,'')"
                  style="width: 50%"
                  v-model="form.taxrate"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row  class="table-row">
            <el-col :span="12"
              ><el-form-item prop="beforetax" label="税前价格">
                <el-input
                  oninput = "value=value.replace(/[^0-9.]/g,'')"
                  style="width: 50%"
                  v-model="form.beforetax"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item prop="tax" label="税费">
                <el-input
                  oninput = "value=value.replace(/[^0-9.]/g,'')"
                  style="width: 50%"
                  v-model="form.tax"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="12" class="table-inline"
              ><el-form-item label="供应商" prop="supporter">
                <el-select v-model="form.supporter" class="form">
                  <el-option
                    v-for="item in supporterOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="form"
                  >
                  </el-option>
                </el-select> 
              </el-form-item>
            </el-col>
            <el-col :span="12" class="table-inline"
              ><el-form-item label="制造商" prop="manufacture">
                <el-select v-model="form.manufacture" class="form">
                  <el-option
                    v-for="item in manufactureOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="form"
                  >
                  </el-option>
                </el-select> 
              </el-form-item>
            </el-col>
          </el-row>
          </el-card>
        </div>
        <!-- <p class="table-title">安装信息</p> -->
        <div class="table-block">
          <el-card>
            <el-row class="table-row">
            <el-col :span="12" class="table-inline">
              <el-form-item prop="storagedate" label="安装日期">
                <el-date-picker
                  v-model="form.storagedate"
                  type="date"
                  :placeholder="form.storagedate == null ? '选择日期':form.storagedate"
                  value-format="timestamp"
                >
                </el-date-picker> </el-form-item
            ></el-col>
            <!-- <el-col :span="12" class="table-inline"
              ><el-form-item prop="startDate" label="启用日期">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker> </el-form-item
            ></el-col> -->
          </el-row>
          </el-card>

        </div>
        <!-- <div class="table-block">
          <el-card>
            <deviceloc :itemName="form.devicename" :itemId="form.deviceid"></deviceloc>
          </el-card>
        </div> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" style="float:right">修改</el-button>
      </span>
  </div>
</template>
<style>
.table-inline {
  text-align: center;
}
.table-row {
  margin-top: 15px;
  margin-left:5px;
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
.form .el-input__inner {
  width: 100%;
}
.form .el-input.el-input--medium.el-input--suffix {
  width: 100%;
}
</style>
<script>
import deviceloc from "@/views/modules/device/detail-deviceloc";  
export default {
  components:{
    deviceloc
  },
  props: {
    itemName: {
      type: String,
      default: "",
    },
    itemId: { type: String, default: "" }
  },
  data() {
    return {
      organizationoptions: [],
      locoptions: [],
      stateoptions: [{
        value:"已录入",
        label:"已录入"
      },
      {
          value:"在库中",
          label:"在库中"
      },
      {
          value:"出库",
          label:"出库"
      },
      {
          value:"调拨",
          label:"调拨"
      },
      {
          value:"退库",
          label:"退库"
      },{
          value:"借出",
          label:"借出"
      },
      {
          value:"退货",
          label:"退货"
      },
      {
          value:"转移",
          label:"转移"
      },
      {
          value:"报废",
          label:"报废"
      }],
      typeoptions: [],
      supporterOption:[],
      manufactureOption:[],
      deviceTypeOption: [],
      deviceModelOption: [],
      form: {
        devicename: this.itemName,
        deviceid: this.itemId,
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
      },
      rules: {
        devicename: [
          {
            require: true,
            message: '请输入设备名称',
            trigger: 'blur',
          }
        ]
      }
    };
  },
  created() {
    this.getDataList();
  },
  methods:{
     getDataList() {
      // this.tabledata=[]
      console.log(this.itemId)
      this.$http({
        url: this.$http.adornUrl("/device/info"),
        method: 'post',
        params: this.$http.adornParams({
          'deviceid':this.form.deviceid
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.form = data.data;
          console.log(data.data)
        } 
      }).catch((err)=>{
        console.log(err)
      });
     this.gettype()
    this.getmodel()
       this.getstock()
      this.getorg()
      this.getSup()
      this.getMan()
    },
    getSup(){
      this.$http({
        url: this.$http.adornUrl("/company/suplist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.supporterOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMan(){
      this.$http({
        url: this.$http.adornUrl("/company/manlist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.manufactureOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gettype(){
       this.$http({
        url: this.$http.adornUrl("/devicetype/typelist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.deviceTypeOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getmodel(){
              this.$http({
        url: this.$http.adornUrl("/devicemodel/modellist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.deviceModelOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
    },
    getstock(){
        this.$http({
        url: this.$http.adornUrl("/stock/stocklist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.locoptions = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
    },
    getorg(){
      this.$http({
        url: this.$http.adornUrl("/organization/orglist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.organizationoptions = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
    },
    submit() {
      console.log(this.form.deviceid)
      // this.dialogVisible = false
      this.$refs["form"].validate((valid) => {
        if(!valid){
          alert('输入错误!');
          return;
        }else{
            this.$http({
              url: this.$http.adornUrl("/device/update"),
              method: "post",
              data: this.$http.adornData({
                'deviceid':this.form.deviceid,
                'devicename': this.form.devicename,
                'devicemodel': this.form.devicemodel,
                'devicetype': this.form.devicetype,
                'devicesourse': this.form.devicesourse,
                'devicestate':this.form.devicestate,
                'manufacture': this.form.manufacture,
                'buydate': this.form.buydate,
                'effectivedate': this.form.effectivedate,
                'taxrate': this.form.taxrate,
                'tax': this.form.tax,
                'beforetax': this.form.beforetax,
                'supporter': this.form.supporter,
                'stockdetailloc': this.form.stockdetailloc,
                'stockcontainer':this.form.stockcontainer,
                'storagebatch':this.form.storagebatch,
                'stockroom':this.form.stockroom,
                'stockname':this.form.stockname,
                'stockid':this.form.stockid,
                'storagedate': this.form.storagedate ,
                'startdate': this.form.startdate,
              }),
            }).then(({ data }) => {
              if (data && data.code === 0) {
                alert('修改成功!')
              } else {
                alert('修改失败!')
                this.$message.error(data.msg);
              }
            });
        }
      });
    }
  }
};
</script>