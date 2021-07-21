<template>
  <el-container>
    <el-header>
      <el-input v-model="codebarid" placeholder="请输入"></el-input>
      <el-button @click="query()">查询条形码</el-button>
    </el-header>
  <el-main >
    <el-row v-for="(sublist,i) in list" :key="{sublist,i}">
      <!-- <el-col v-for="(item,i) in item" :key="{item,i}"> -->
        <div>
          <img id="barcode" />
        </div>
      <!-- </el-col> -->
    </el-row>
  </el-main>
  <el-footer>
    
    <el-button @click="download()">下载条形码</el-button>
    <el-button @click="print()">打印条形码</el-button>
    <el-button @click="storage()">存储条形码</el-button>
    <el-button @click="addcontent()">条形码内容新增</el-button>
    <el-button @click="editcintent()">条形码内编辑</el-button>
    </el-footer>
    
    
    <div></div>
    
  </el-container>
</template>
<script>
import JsBarcode from "jsbarcode";
JsBarcode(".barcode").init();
export default {
  data() {
    return { 
         row:1,
        deviceid:'',
        codebarid: "dsdsd" ,
        list:[{
          deviceName:'asdhsg',
          deviceid:'121'
        },
        {
          deviceName:'fff',
          deviceid:'12'
        }]
        };
  },
  methods: {
    query() {
    //   this.$http({
    //   url: this.$http.adornUrl("/codebar/ifo/"+this.deviceid),
    //   method: "get",
    //   params: this.$http.adornParams(),
    // }).then(({ data }) => {
    //     this.codebarid = data.data
    // });
      JsBarcode("#barcode", this.codebarid, {
        format: "CODE128", //选择要使用的条形码类型
        width: 2, //设置条之间的宽度
        height: 40, //高度
        displayValue: true, //是否在条形码下方显示文字
        textAlign: "center", //文字所在位置,默认中间
        text: this.codebarid, //覆盖显示的文本
        lineColor: "#000", //设置条和文本的颜色。
      });
      console.log(this.codebarid);
    },
    download(){

    },
    print(){

    },
    storage(){

    },
    addcontent(){

    },
    editcontent(){

    }
  }
};
</script>
