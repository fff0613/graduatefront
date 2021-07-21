<template>
  <div>
    <el-row >
      <!-- <el-col :span="4"> -->
        <el-select v-model="option.type" class="select2" @change="selectchanged">
          <el-option
            v-for="item in typeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="select2"
          ></el-option>
        </el-select>
      <!-- </el-col>
       <el-col :span="4"> -->
        <el-select v-model="option.state" class="select2" @change="selectchanged">
          <el-option
            v-for="item in stateoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="select2"
          ></el-option>
        </el-select>
      <!-- </el-col>
      <el-col :span="13" class="date-domain"> -->
        <!-- <span>发起时间:</span>
        <el-date-picker v-model="option.startdate" type="date" placeholder="选择日期" class="date-picker">
        </el-date-picker>
        <span>至</span>
        <el-date-picker v-model="option.enddate" type="date" placeholder="选择日期" class="date-picker">
        </el-date-picker> -->
      <!-- </el-col> -->
      <el-input v-model="input" placeholder="搜索计划名称" style="width: 250px">
           <el-button
        slot="append"
        icon="el-icon-search"
        type="primary"
        @click="search()"
      ></el-button>
      </el-input>
      <el-button type="primary" @click="$router.push({name:'add-maintain-project'})">新建计划</el-button>
    </el-row>
    <!-- <el-table :data="tabledata" border style="margin-top:20px">
        <el-table-column prop="proName" label="计划名称">
            <template slot-scope="scope">
                <el-button v-model="scope.row.proName" type="text" @click="$router.push({name:'detail-maintain-project',query:{deviceName:scope.row.proName}})">{{scope.row.proName}}</el-button></template>
        </el-table-column>
        <el-table-column prop="proLoc" label="位置"></el-table-column>
        <el-table-column prop="proType" label="工单类型"></el-table-column>
        <el-table-column prop="startDate" label="开始日期"></el-table-column>
        <el-table-column prop="endDate" label="截止日期"></el-table-column>
        <el-table-column prop="proState" label="状态"></el-table-column>
        <el-table-column label="操作" width="150">
        <template slot-scope="scope">
        <el-button
          size="mini" type="text"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini" type="text"
          @click="handleBan(scope.$index, scope.row)">禁用</el-button>
          <el-button
          size="mini" type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           <el-button
          size="mini" type="text"
          @click="handleEdit(scope.$index, scope.row)">添加</el-button>
      </template>
    </el-table-column>
    </el-table> -->
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;margin-top:20px">
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="projectid"
        header-align="center"
        align="center"
        label="计划编号">
        <template slot-scope="scope"
          ><el-button
            v-model="scope.row.projectid"
            type="text"
            @click="
              $router.push({
                name: 'maintain-ifo',
                query: {
                  projectid: scope.row.projectid
                },
              })
            "
            >{{ scope.row.projectid }}</el-button
          ></template
        >
      </el-table-column>
      <el-table-column
        prop="projectname"
        header-align="center"
        align="center"
        label="计划名称">
      </el-table-column>
      <!-- <el-table-column
        prop="projectloc"
        header-align="center"
        align="center"
        label="位置">
      </el-table-column> -->
      <el-table-column
        prop="projecttype"
        header-align="center"
        align="center"
        label="工单类型">
      </el-table-column>
      <el-table-column
        prop="starttime"
        header-align="center"
        align="center"
        label="开始日期">
      </el-table-column>
      <el-table-column
        prop="endtime"
        header-align="center"
        align="center"
        label="截止日期">
      </el-table-column>
      <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push({name:'update-maintain-project',query:{projectid:scope.row.projectid}})">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.projectid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>
<style>
.date-domain{
    margin-left:10px;
}
.search-row{
    margin-top:10px;
}
.select2 .el-input__inner {
  width: 120px;
}
.select2 .el-input.el-input--medium.el-input--suffix {
  width: 120px;
}
.date-picker .el-input__inner {
  width: 130px;
}
.el-date-editor.el-input,.el-date-editor.el-input__inner{
 width: 130px;
}
</style>
<script>
export default {
  data() {
    return {
      input: "",
      option: {
        state: "全部状态",
        type:"全部类型",
        startdate:'',
        enddate:''
      },
      stateoptions: [{
        value:'禁用',
        label:'禁用'
      },{
        value:'启用',
        label:'启用'
      },{
        value:'全部状态',
        label:'全部状态'
      }],
       typeoptions:[{
        value:'维修',
        label:'维修'
      },
      {
        value:'保养',
        label:'保养'
      },
      {
        value:'全部类型',
        label:'全部类型'
      }],
      tabledata:[{
          proName:'aaa',
          proLoc:'sdff',
          proType:'保养',
          proState:'启用',
          startDate:'2020-2-2',
          endDate:'2021-3-4'
      }],
      dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
    };
  },
  activated () {
      this.getDataList()
  },
  methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/maintainproject/ifo'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data
            this.totalPage = this.dataList.length
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.projectid
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/maintainproject/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
       search() {
        this.tabledata = []
        // console.log("start ")
        // console.log(this.option.happentimeend == '')
        
        if(this.option.device == '全部设备' && this.option.state == '全部状态' && this.option.type == '全部类型' && this.input ==''
        && this.option.happentimestart == '' && this.option.happentimeend == '')
          this.getDataList()
        else
        this.$http({
                url: this.$http.adornUrl("/maintainproject/search"),
                method: "post",
                data: this.$http.adornData({
                  'state' :this.option.state == '全部状态' ? null : this.option.state,
                  'type' :this.option.type == '全部类型' ? null : this.option.type,
                  'theme' : this.input =='' ? null :this.input
                }),
              }).then(({ data }) => {
                  if (data && data.code === 0) {
                    this.dataList = data.data
                    this.totalPage = this.dataList.length
                  } else {
                    this.dataList = []
                    this.totalPage = 0
                  }
                  this.dataListLoading = false
              }).catch((err)=>{
                console.log(err)
              })
      },
      selectchanged(){
        this.search()
      }
    }
};
</script>