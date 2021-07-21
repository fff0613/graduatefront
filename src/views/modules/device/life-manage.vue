<template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
    <el-tab-pane label="设备入库" name="storage" ><storage v-if="isone"></storage></el-tab-pane>
    <el-tab-pane label="设备转移" name="transfer" ><transfer v-if="istwo"></transfer></el-tab-pane>
    <el-tab-pane label="设备出库" name="delivery"><delivery  v-if="isthree"></delivery></el-tab-pane>
    <!-- <el-tab-pane label="设备退库" name="stockreturn" ><stockreturn v-if="isfour"></stockreturn></el-tab-pane> -->
    <el-tab-pane label="设备调拨" name="allocation"><allocation  v-if="isfive"></allocation></el-tab-pane>
    <!-- <el-tab-pane label="设备借出" name="lent"><lent  v-if="issix"></lent></el-tab-pane> -->
    <!-- <el-tab-pane label="设备归还" name="giveback" ><giveback v-if="isseven"></giveback></el-tab-pane> -->
    <el-tab-pane label="设备报废" name="scrap" ><scrap v-if="iseight"></scrap></el-tab-pane>
    <!-- <el-tab-pane label="设备退货" name="returndevice" ><returndevice v-if="isnine"></returndevice></el-tab-pane> -->
    <el-tab-pane label="设备盘点" name="inventory" ><inventory v-if="isten"></inventory></el-tab-pane>
  </el-tabs>
          
</template>
<style>

</style>
<script>
import storage from '@/views/modules/device/device-storage'
import transfer from "@/views/modules/device/device-transfer";
import delivery from "@/views/modules/device/device-delivery";
import stockreturn from "@/views/modules/device/device-stock-return";
import allocation from "@/views/modules/device/device-allocation";
import scrap from "@/views/modules/device/device-scrap";
import returndevice from "@/views/modules/device/device-return";
import inventory from "@/views/modules/device/device-inventory";
import lent from "@/views/modules/device/device-lent";
import giveback from "@/views/modules/device/device-giveback";

export default {
  components: {
    storage,
    transfer,
    delivery,
    stockreturn,
    allocation,
    scrap ,
    returndevice,
    inventory,
    lent,
    giveback
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
     activeName: "storage",
      basis_ifo_form: {
        deviceName: this.$route.query.deviceName,
        deviceid: this.$route.query.deviceid,
        state: this.$route.query.state,
      },
      form: {}
    };
  },
  mounted() {
    // JsBarcode("#barcode", "sjhds", {
    //   format: "CODE128", //选择要使用的条形码类型
    //   width: 2, //设置条之间的宽度
    //   height: 40, //高度
    //   displayValue: true, //是否在条形码下方显示文字
    //   textAlign: "center", //文字所在位置,默认中间
    //   text: "helloworld", //覆盖显示的文本
    //   lineColor: "#000", //设置条和文本的颜色。
    // });
  },
  methods:{
    
    handleClick(tab, event) {
        if(tab.name==='storage'){
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
        }else if(tab.name === 'transfer'){
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
        }else if(tab.name === 'delivery'){
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
        }else if(tab.name === 'stockreturn'){
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
        }else if(tab.name === 'allocation'){
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
        }else if(tab.name === 'lent'){
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
        }else if(tab.name === 'giveback'){
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
        }else if(tab.name === 'scrap'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=true
          this.isnine=false
          this.isten=false
        }else if(tab.name === 'returndevice'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=true
          this.isten=false
        }else if(tab.name === 'inventory'){
          this.isone=false
          this.istwo=false
          this.isthree=false
          this.isfour=false
          this.isfive=false
          this.issix=false
          this.isseven=false
          this.iseight=false
          this.isnine=false
          this.isten=true
        }
      },
      setchildform(){
        
      }
  }
};
</script>
