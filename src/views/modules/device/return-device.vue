<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属库房">
        <el-select v-model="form.stock">
          <el-option v-for="item in stockOptions" :key="item.value" 
          :label="item.label"
          :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量">
        <el-input disabled type="number" v-model="form.mount" min="1"></el-input>
      </el-form-item>
      <el-form-item label="退货时间">
         <el-date-picker
      v-model="form.returnTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      </el-form-item>
       <el-form-item  label="说明">
        <el-input  type="textarea" v-model="form.descr" :row="4"></el-input>
      </el-form-item>
      <el-form-item label="退货设备"> 
          <div>
            <el-button type="primary" style="float:right" @click="addObjects">添加</el-button>
          </div>
         <el-table :data="form.tabledata" style="width: 100%" height="550">
      <el-table-column
        fixed
        prop="deviceName"
        label="部件名称"
        
      >
      </el-table-column>
      <el-table-column
        prop="deviceid"
        label="部件编码"
       
      >
      </el-table-column>
      <el-table-column
        prop="devicetype"
        label="部件类型"
        
      ></el-table-column>
      <el-table-column
        prop="manufacture"
        label="供应商"
       
      ></el-table-column>
       <el-table-column
        prop="deviceModel"
        label="部件型号"
        
      ></el-table-column>
      <el-table-column label="操作" >
          <template slot-scope="scope">
              <el-button type="text" @click="deleteObject(scope.$index,scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<style>
.span {
  margin-right: 25px;
}
.el-row {
  margin-bottom: 20px;
}
.force {
  color: red;
}
/* .twobutton{
    position:absolute;
    width:100%;
    top:0;
	bottom:0;
	left: 0;
    margin: auto;
    right: 0;
} */
#addbutton {
  /* display: block; */
  margin: 0 auto;
  margin-top: 60px;
  /* background-color:rgb(69, 194, 181);
    color:rgb(255,255,255); */
}
.keepadding {
  /* display: block; */
  margin: 0 auto;
  width: 100px;
  margin-top: 20px;
}
</style>
<script>
import storageBatchVue from '../../device/storage-batch.vue';
export default {
  data() {
      return {
        storageloc:'',
        storageTypeOptions:[],
        stockOptions:[{
          value:'库房1',
          label:'库房1'
        }],
        form: {
          stock:'',
          returnTime:'',
          descr:'',
          mount:1,
          tabledata:[{
          deviceName:'',
          deviceId:'',
          deviceType:'',
          deviceMOdel:'',
          manufacture:''
        
        }]
        }
        
      }
    // return {
    //   deviceid: "",
    //   name: "",
    //   type: "",
    //   manufacture: "",
    //   birth: "",
    //   storageorder: "",
    //   storagedate: "",
    //   storageloc: "",
    //   effectivetime: "",
    //   cycle: "",
    // };
  },
  methods:{
    onsubmit:function(){
      
    },
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll(){
        return[
          { value:"仓库1",address:"stock1"},
          { value:"仓库2",address:"stock2"},
          { value:"仓库3",address:"stock3"},
          { value:"仓库4",address:"stock4"}
        ]
      },
       handleSelect(item) {
        console.log(item);
      },
      deleteObject(index,row){

      }
  },
  mounted() {
      this.restaurants = this.loadAll();
    }
};
</script>
<style>
</style>