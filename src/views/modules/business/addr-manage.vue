<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="condition" placeholder="地址名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新建</el-button>
      </el-col>
    </el-row>
    <el-table :data="tabledata">
      <el-table-column label="地址名称" prop="addrName"> </el-table-column>
      <el-table-column label="地址" prop="addr"> </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="地址" :visible.sync="addrDialogVisible" width="70%">
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
      <el-main >
        <div class="map-area" :id="mapId"></div>
      </el-main>
    </el-container>
         <span slot="footer" class="dialog-footer">
    <el-button @click="addrDialogVisible= false">取 消</el-button>
    <el-button type="primary" @click="addrDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<style>
.map-area {
  width: 100%;
  height: 300px;
}
</style>
<script>
import loadBMap from "../state/loadmap";
import addr from '@/views/modules/business/address-manage'
// let Map = new BMap.Map(this.mapId); 
export default {
  components:{
    addr
  },
  data() {
    return {
      mapId: "BMap-" + parseInt(Date.now() + Math.random()),
      allmap:"1",
      myMap:Map,
      condition:'',
        addrDialogVisible:false,
        type:'全部类型',
        latitude:'',
            longitude:'',
            city:"北京",
        province:"beijing",
        tabledata: [
            {
            addrName:'',
            addr: ''
            }
        ],
        form:{
            addrName:'sdsfdsf',
            addr:'adssff',
            latitude:'',
            longitude:'',
            city:"北京",
        province:"beijing",
        }
    };
  },
  mounted(){
    
  },
  methods:{
      query(){
          
      },
      
      lm(index,row){
        loadBMap("x81ob0tOCZgrZdDQhimR3b3tlxWeICrU")
      .then(() => {
        // 百度地图API功能
        // 创建Map实例
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
        // let that = this;
        this.myMap.addEventListener("click", (e)=> {
          //通过点击百度地图，可以获取到对应的point, 由point的lng、lat属性就可以获取对应的经度纬度
          var pt = e.point;
          // gc.getLocation(pt, function(rs){
          //         var addComp = rs.addressComponents;
          //         //alert(addComp.city);
          //        alert(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
          //     });
          
          gc.getLocation(pt, (rs)=>{
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
              
              // $("#longitude").val(addComp.city);
            // $("#latitude").val(addComp.province);
            //将对应的HTML元素设置值
           this.form.city = addComp.city;
           this.form.province =addComp.province;
          //  setiii(addComp.city,addComp.province)
          //  console.log(this.form.province)
        //    this.province = addComp.province;
            // console.log(this.lo);
            // console.log(this.latitude);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
      },
      handleEdit(index,row){
        this.addrDialogVisible= true
        // this.lm(index,row);
      }

  }
};
</script>