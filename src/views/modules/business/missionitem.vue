<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="任务项名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search()">查询</el-button>
        <el-button type="primary" @click="addHandle()">新增</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        prop="itemid"
        header-align="center"
        align="center"
        label="任务项编号">
      </el-table-column>
      <el-table-column
        prop="itemname"
        header-align="center"
        align="center"
        label="任务项名称">
      </el-table-column>
      <el-table-column
        prop="itemdescr"
        header-align="center"
        align="center"
        label="任务项描述">
      </el-table-column>
      <el-table-column
        prop="state"
        header-align="center"
        align="center"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="method"
        header-align="center"
        align="center"
        label="方法">
      </el-table-column>
      <el-table-column
        prop="result"
        header-align="center"
        align="center"
        label="结果类型">
      </el-table-column>
      <el-table-column
        prop="hours"
        header-align="center"
        align="center"
        label="预计工时">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="init(scope.$index,scope.row.itemid)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.itemid)">删除</el-button>
          <!-- <el-button
            size="small"
            type="text"
            :disabled="scope.row.state == '启用' ? false: true"
            @click="handleEdit(scope.$index, scope.row)"
            >禁用</el-button
          > -->
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
    <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="addOrUpdateVisible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="任务项名称" prop="itemname">
      <el-input v-model="dataForm.itemname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="任务项描述" prop="itemdescr">
      <el-input v-model="dataForm.itemdescr" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-select v-model="dataForm.state">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
    </el-form-item>
    <el-form-item label="方法" prop="method">
      <el-input v-model="dataForm.method" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="结果" prop="result">
      <el-input v-model="dataForm.result" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="预计工时" prop="hours">
      <el-input v-model="dataForm.hours" placeholder=""></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addOrUpdateVisible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" ></add-or-update> -->
  </div>
</template>

<script>
  import AddOrUpdate from './missionitem-add-or-update'
  export default {
    data () {
      return {
        // dataForm: {
        //   key: ''
        // },
          stateOptions:[{
          value: "启用",
          label: "启用",
        },
        {
          value: "禁用",
          label: "禁用",
        },],
        visible: false,
        // id:'',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        dataForm: {
          itemid: 0,
          itemname: '',
          itemdescr: '',
          state: '',
          method: '',
          result: '',
          hours: ''
        },
        dataRule: {
          itemname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          itemdescr: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          method: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          hours: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      search(){
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/missionitem/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'itemname': this.dataForm.key
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/missionitem/ifo'),
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.id = id
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      init (index,id) {
        this.dataForm.itemid = id || 0
        this.addOrUpdateVisible = true
        // this.$nextTick(() => {
          // this.$refs['dataForm'].resetFields()
          // if (this.dataForm.itemid) {
          //   this.$http({
          //     url: this.$http.adornUrl(`/generator/missionitem/info/${this.dataForm.itemid}`),
          //     method: 'get',
          //     params: this.$http.adornParams()
          //   }).then(({data}) => {
          //     if (data && data.code === 0) {
                this.dataForm.itemname =this.dataList[index].itemname
                this.dataForm.itemdescr =this.dataList[index].itemdescr
                this.dataForm.state = this.dataList[index].state
                this.dataForm.method = this.dataList[index].method
                this.dataForm.result = this.dataList[index].result
                this.dataForm.hours = this.dataList[index].hours
              // }
            // })
          // }
        // })
      },
      addHandle(){
        this.addOrUpdateVisible = true
        this.dataForm = {
          itemid: 0,
          itemname: '',
          itemdescr: '',
          state: '',
          method: '',
          result: '',
          hours: ''
        }
      },
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/missionitem/${!this.dataForm.itemid ? 'add' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'itemid': this.dataForm.itemid || undefined,
                'itemname': this.dataForm.itemname,
                'itemdescr': this.dataForm.itemdescr,
                'state': this.dataForm.state,
                'method': this.dataForm.method,
                'result': this.dataForm.result,
                'hours': this.dataForm.hours
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.addOrUpdateVisible  = false
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.itemid
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/missionitem/delete'),
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
