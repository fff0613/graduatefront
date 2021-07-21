<template>
  <div>
    <!-- <el-container>
          <el-main> -->
    <el-container>
      <el-aside width="30%">
        <el-form ref="ref" :model="form">
          <el-form-item label="地址名称">
            <el-input v-model="form.addrName"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.addr"></el-input>
            <!-- <el-button @click="query"></el-button></el-row> -->

            <!-- <el-select v-model="condition.country">
                            <el-option v-for="item in "></el-option>
                        </el-select> -->
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="form.province" id="latitude"></el-input>
          </el-form-item>
          <el-form-item label="市">
            <el-input v-model="form.city" id="longitude"></el-input>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main style="height: 100%">
        <div class="map-area" :id="mapId"></div>
      </el-main>
    </el-container>
    <!-- </el-main>
            <el-footer> -->
  </div>
  <!-- </el-footer> -->
  <!-- </el-container> -->
</template>
<script>
import loadBMap from "../state/loadmap";
export default {
  data() {
    return {
      mapId: "BMap-" + parseInt(Date.now() + Math.random()),
      allmap: "1",
      myMap: null,
      geoc: null,
      addrDialogVisible: false,
      type: "全部类型",
      city:"北京",
        province:"beijing",
      tabledata: [
        {
          addrName: "",
          addr: "",
        },
      ],
      form: {
        addrName: "sdsfdsf",
        addr: "adssff",
        latitude: "",
        longitude: "",
        // city:'',
        // province:''
      }
    };
  },
  mounted() {
    loadBMap("x81ob0tOCZgrZdDQhimR3b3tlxWeICrU")
      .then(() => {
        // 百度地图API功能
        this.myMap = new BMap.Map(this.mapId); // 创建Map实例
        this.myMap.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        this.myMap.addControl(
          new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
          })
        );
        this.myMap.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        this.myMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        var marker = new BMap.Marker(new BMap.Point(116.404, 39.915));
        this.myMap.addOverlay(marker);
        var gc = new BMap.Geocoder();
        console.log("地图加载");
        // console.log(this.geoc)
        let that = this;
        this.myMap.addEventListener("click", function (e) {
          //通过点击百度地图，可以获取到对应的point, 由point的lng、lat属性就可以获取对应的经度纬度
          var pt = e.point;
          // gc.getLocation(pt, function(rs){
          //         var addComp = rs.addressComponents;
          //         //alert(addComp.city);
          //        alert(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
          //     });
          
          gc.getLocation(pt,  function(rs){
            //addressComponents对象可以获取到详细的地址信息
            var addComp = rs.addressComponents;
            var site =
              addComp.province +
              ", " +
              addComp.city +
              ", " +
              addComp.district +
              ", " +
              addComp.street +
              ", " +
              addComp.streetNumber;
              
            //   $("#longitude").val(pt.lng);
            // $("#latitude").val(pt.lat);
            //将对应的HTML元素设置值
           that.form.city = addComp.city;
           that.form.province =addComp.province;
           setiii(addComp.city,addComp.province)
           console.log(that.form.province)
        //    this.province = addComp.province;
            // console.log(this.lo);
            // console.log(this.latitude);
          });
        });
      })
      .catch((err) => {
        console.log("地图加载失败");
      });
  },
  methods: {
      setiii(c,p){
          this.province = p
          console.log(this.province)
      },
    handleEdit(index, row) {
      this.addrDialogVisible = true;
    },
  },
};
</script>
<style>
.map-area {
  width: 100%;
  height: 300px;
}
</style>