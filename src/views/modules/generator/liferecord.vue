<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('generator:liferecord:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:liferecord:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="recordid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="recordtype"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="organizationname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="deviceid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="happentime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="storagetype"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="storagebatch"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="originorganizationname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="deliverybatch"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="lenttime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="givebacktime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="lentuserid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="givebackuserid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="lentstate"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="givebackstate"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="beforeimg"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="afterimg"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="descrimg"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="allocationtime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="tuneintime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="tuneincompanyname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="tuneindepartment"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="residualvaule"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="moneysum"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="returncompanyname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="oldstockcontainer"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="oldstockroom"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="oldstockname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="oldcompanyname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="oldorgname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="stockcontainer"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="stockroom"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="stockname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="companyname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="orgname"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="reporterid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="executorid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="responsibleuserid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="allocationuserid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="tuneinuserid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="checkuserid"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="reason"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="descr"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="afterdescr"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.recordid)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.recordid)">删除</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './liferecord-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/liferecord/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.recordid
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/liferecord/delete'),
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
      }
    }
  }
</script>
