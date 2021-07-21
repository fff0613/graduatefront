<template>
  <el-container>
    <el-header>
      <el-select v-model="option">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入" style="width: 300px">
        <el-button
          slot="append"
          icon="el-icon-search"
          style="width: 50"
          type="primary"
          @click="search()"
        ></el-button>
      </el-input>
    </el-header>
    <el-main>
      <el-row gutter="20" v-for="(item, index) in datas" :key="index" class="state-card">
        <div v-if="index % 2 == 0" >
          <el-col :span="12">
            <el-col :span="15">
              <el-card >
                <div
                  :id="index+'-img'"
                  style="height: 200px"
                ></div>
              </el-card>
              </el-col >
              <el-col :span="9">
                <el-card>
                 <div style="height: 200px">
                    <el-row>{{ datas[index].devicename }}</el-row>
                  <el-row>{{ datas[index].deviceloc }}</el-row>
                  <el-row>
                    <img v-if="item.state == '离线'" src="/src/icons/" alt="" />
                  </el-row>
                 </div>
                </el-card>
              </el-col>

          </el-col>
          <el-col :span="12" v-if="index + 1 < datas.length">
            <el-col :span="15">
              <el-card>
                <div
                  :id="index+1+'-img'"
                  style="height: 200px"
                ></div>
              </el-card>
            </el-col>
              <el-col :span="9">
                <el-card >
                   <div style="height: 200px">
                  <el-row>{{ datas[index + 1].devicename }}</el-row>
                  <el-row>{{ datas[index + 1].deviceloc }}</el-row>
                  <el-row>
                    <img v-if="item.state == '离线'" src="/src/icons/" alt="" />
                  </el-row>
                   </div>
                </el-card>
              </el-col>
            </el-col>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>
<style>
.state-card{
  margin-bottom: 20px;
}
</style>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      option: "",
      input: "",
      options: [
        {
          value: "deviceid",
          label: "设备型号",
        },
        {
          value: "stockname",
          label: "仓库名称",
        },
        {
          value: "type",
          label: "devicetype",
        },
        {
          value: "state",
          label: "设备状态",
        },
      ],

      datas: [
        {
          deviceid: "123",
          devicename: "东风asdfg",
          devicetype: "路由器",
          deviceloc: "13-301",
          state: "离线",
          fourgsignal: "强",
          monitornum: [1, 2, 3, 4, 5, 3, 2],
          devicemaxlimit: 8,
          deviceminlimit: 0,
        },
        {
          deviceid: "123",
          devicename: "东风asdfg",
          devicetype: "路由器",
          deviceloc: "13-301",
          state: "离线",
          fourgsignal: "强",
          monitornum: [1, 2, 3, 4, 5, 3, 2],
          devicemaxlimit: 8,
          deviceminlimit: 0,
        },
        {
          deviceid: "123",
          devicename: "东风asdfg",
          devicetype: "路由器",
          deviceloc: "13-301",
          state: "离线",
          fourgsignal: "强",
          monitornum: [1, 2, 3, 4, 5, 3, 2],
          devicemaxlimit: 8,
          deviceminlimit: 0,
        },
        {
          deviceid: "123",
          devicename: "东风asdfg",
          devicetype: "路由器",
          deviceloc: "13-301",
          state: "离线",
          fourgsignal: "强",
          monitornum: [1, 2, 3, 4, 5, 3, 2],
          devicemaxlimit: 8,
          deviceminlimit: 0,
        },
        {
          deviceid: "123",
          devicename: "东风asdfg",
          devicetype: "路由器",
          deviceloc: "13-301",
          state: "离线",
          fourgsignal: "强",
          monitornum: [1, 2, 3, 4, 5, 3, 2],
          devicemaxlimit: 8,
          deviceminlimit: 0,
        },
      ],
      option: {
            // title: {
            //     text: 'ECharts 入门示例',
            //     fontSize:5
            // },
            tooltip: {},
            legend: {
                data:['状态']
            },
            xAxis: {
                data: ["1","2","3","4","5","6","7"]
            },
            yAxis: {},
            series: [{
                name: '状态',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20,1]
            }]
        }
    };
  },
  mounted(){
     var myChart = echarts.init(document.getElementById("1-img"));
      myChart.setOption(this.option);
      // }
  },
  methods: {
    search() {
      for(let i = 0;i < 7;i++){
        var myChart = echarts.init(document.getElementById(i+"-img"));
        console.log(i+"-img");
      myChart.setOption(this.option);
      }
      
    },
    getName(index){
      console.log(index+"-"+img)
      return index+"-"+img
    }
  },
};
</script>
