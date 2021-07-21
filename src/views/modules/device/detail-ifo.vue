<template>
  <el-container>
    <el-header>
      <!-- <el-container>
        <el-aside> -->
          <el-row>
            <el-col :span="4">
               <div class="qrcode" ref="qrCodeUrl" style="padding-left:30px;padding-top:20px"></div>
            </el-col>
            <el-col :span="20">
              <el-form ref="form" :model="form" :rules="rules" style="padding-top:20px">
            <el-row >
            <el-col :span="12">
              <el-form-item prop="devicename">
                <span>设备名称&nbsp;&nbsp;</span>
              <el-input
                v-model="form.devicename"
                style="width: 70%"
              ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="deviceid">
                <span>设备编号&nbsp;&nbsp;</span
              ><el-input
                disabled
                v-model="form.deviceid"
                style="width: 70%"
              ></el-input>
               </el-form-item>
            </el-col>
</el-row>
            <el-row >
            <el-col :span="12">
              <el-form-item prop="devicestate">
                <span>设备状态&nbsp;&nbsp;</span>
                  <el-input disabled v-model="form.devicestate" style="width: 70%"></el-input>
              </el-form-item>
              
            </el-col>
            <el-col :span="12">
              <el-button class="save-button" size="medium" type="primary" @click="save">保存</el-button>
            </el-col>
          </el-row>
          </el-form>
            </el-col>
          </el-row>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="detail-menu">
    <el-tab-pane label="基本信息" name="basis"><basis  v-if="isone" :itemName="form.devicename" :itemId="form.deviceid"></basis></el-tab-pane>
    <el-tab-pane label="关联组织" name="organization"><organization v-if="istwo" :itemName="form.devicename" :itemId="form.deviceid"></organization></el-tab-pane>
    <el-tab-pane label="关联厂商" name="manufacture"><manufacture v-if="isthree" :itemName="form.devicename" :itemId="form.deviceid" ></manufacture></el-tab-pane>
    <el-tab-pane label="关联人员" name="fellow"><fellow v-if="isfour" :itemName="form.devicename" :itemId="form.deviceid"></fellow></el-tab-pane>
    <!-- <el-tab-pane label="设备位置" name="deviceloc"><deviceloc :itemName="form.devicename" :itemId="form.deviceid"></deviceloc></el-tab-pane> -->
    <el-tab-pane label="设备日志" name="devicelog"><devicelog v-if="isfive" :itemName="form.devicename" :itemId="form.deviceid"></devicelog></el-tab-pane>
    <el-tab-pane label="维修计划" name="maintainpro"><maintainpro v-if="issix" :itemName="form.devicename" :itemId="form.deviceid"></maintainpro></el-tab-pane>
    <el-tab-pane label="维保日志" name="maintainlog"><maintainlog  v-if="isseven" :itemName="form.devicename" :itemId="form.deviceid"></maintainlog></el-tab-pane>
    <!-- <el-tab-pane label="保修协议" name="effective"><effective :itemName="form.devicename" :itemId="form.deviceid"></effective></el-tab-pane> -->
    <!-- <el-tab-pane label="性能提示" name="ability"><ability :itemName="form.devicename" :itemId="form.deviceid"></ability></el-tab-pane> -->
  </el-tabs>
          
    </el-main> 
  </el-container>
</template>
<style>
.detail-menu {
  margin-top: 70px;
  /* height: 100px; */
}
.detail-ifo{
  margin-top:20px
}
</style>
<script>
import basis from '@/views/modules/device/detail-basisifo'
import devicelog from "@/views/modules/device/detail-devicelog";
import deviceloc from "@/views/modules/device/detail-deviceloc";
import effective from "@/views/modules/device/detail-effective";
import maintainlog from "@/views/modules/device/detail-maintainlog";
import fellow from "@/views/modules/device/detail-fellow";
import organization from "@/views/modules/device/detail-organization";
import maintainpro from "@/views/modules/device/detail-maintainproject";
import ability from "@/views/modules/device/detail-ability";
import manufacture from "@/views/modules/device/detail-manufacture";
import QRCode from 'qrcodejs2'
export default {
  components: {
    basis,
    devicelog,
    deviceloc,
    effective,
    maintainlog,
    fellow,
    organization,
    maintainpro,
    ability,
    manufacture,
    // QRCode
  },
  data() {
    return {
      isone:true,
      istwo:false,
      isthree:false,
      isfour:false,
      isfive:false,
      issix:false,
      isseven:false,
      iseight:false,
      isnine:false,
      isten:false,
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
     activeName: "basis",
      form: {
        devicename: this.$route.query.deviceName,
        deviceid: '',
        devicestate: this.$route.query.state,
      },
      rules: {
        devicename: [
          {
            require: true,
            message: '请输入设备名称',
            trigger: 'blur',
          }
        ],
        devicestate:[{required: true,
                  message: '设备状态不能为空',
                  trigger: 'blur'}]
      }
    };
  },
  mounted() {
   this.createQrCode()
   
  },
  created(){
    this.form.deviceid = this.$route.query.deviceId + ''
    
  },
  methods:{
    createQrCode() {
      console.log('deviceid '+this.$route.query.deviceId)
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: this.$route.query.deviceId+'', // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
    },
     handleClick(tab, event) {
        if(tab.name==='basis'){
          this.isone=true
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'organization'){
          this.isone=false
          this.istwo=true
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'manufacture'){
          this.isone=false
          this.istwo=false
          this.isthree=true
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'fellow'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=true
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'devicelog'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=true
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'maintainpro'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=true
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'maintainlog'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=true
          this.iseight=false
          this.isnine=false
          this.isten=false
        }
      },
      setchildform(){
        
      },
      save() {
      this.$refs["form"].validate((valid) => {
        if(!valid){
          alert('输入错误!');
          return;
        }else{
            this.$http({
              url: this.$http.adornUrl("/device/updatebrief"),
              method: "post",
              data: this.$http.adornData({
                'id':this.form.deviceid,
                'name': this.form.devicename,
                'state':this.form.devicestate,
              }),
            }).then(({ data }) => {
              if (data && data.code === 0) {
                alert('保存成功!')
              } else {
                alert('保存失败!')
                this.$message.error(data.msg);
              }
            });
        }
      });
    },
  }
};
</script>
