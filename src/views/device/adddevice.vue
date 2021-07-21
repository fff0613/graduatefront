<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="设备ID">
        <el-input v-model="form.deviceid"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
       <el-form-item label="设备类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="所属厂商">
        <el-input v-model="form.manufacture"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option label="正常" value="normal"></el-option>
          <el-option label="异常" value="strange"></el-option>
          <el-option label="维修中" value="strange"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birthdate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="安装位置">
         <el-col :span="12">
            <el-autocomplete
              class="inline-input"
              v-model="storageloc"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
        </el-col>
      </el-form-item>
      <el-form-item label="有效日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.effctivedate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
      </el-form-item>
      <el-form-item label="维护保养周期">
          <el-input :model="cycle"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button >取消</el-button>
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
#addbutton {
  /* display: block; */
  margin: 0 auto;
  margin-top: 60px;
}
.keepadding {
  /* display: block; */
  margin: 0 auto;
  width: 100px;
  margin-top: 20px;
}
</style>
<script>
export default {
  data() {
      return {
        storageloc:'',
        restaurants:[],
        form: {
          deciveid:'',
          name: '',
          state: '',
          type:'',
          manufacture:'',
          birthdate: '',
          storageorder:'',
          storagedate: '',
          storagetime:'',
          effectivedate:'',
          cycle:''
        }
      }
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
      }
  },
  mounted() {
      this.restaurants = this.loadAll();
    }
};
</script>
<style>
</style>