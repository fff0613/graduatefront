<template>
  <div class="mod-config">
    <p class="text">库存详情</p>
    <el-table
        ref="multipletable"
        :data="
          tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        "
        border
      >
        <el-table-column fixed prop="devicename" label="设备名称">
        </el-table-column>
        <el-table-column prop="deviceid" label="设备编号"> </el-table-column>
        <el-table-column prop="devicetype" label="设备类型"></el-table-column>
        <el-table-column prop="devicemodel" label="设备型号"></el-table-column>
        <el-table-column prop="supporter" label="供应商"></el-table-column>
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
.text{
    font-size: 1.2em;
    padding-left: 5px;
    border-left: 4px solid #408aeb;
    border-bottom: 1px solid #eeeeee;
}
</style>
<script>
  import AddOrUpdate from './stock-add-or-update'
  export default {
    data () {
      return {
        stockname:this.$route.query.stockname,
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        tabledata:[]
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
        this.getdevice()
      },
      getdevice() {
      //入库，选择已录入设备
      this.tabledata = [];
      console.log(this.stockname)
       this.$http({
          url: this.$http.adornUrl(`/device/${this.stockname}`),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.tabledataRe = data.data;
            // console.log(data.data);

            for (let item of this.tabledataRe) {
              let t = {
                // isselect:false,
                devicetype: item.devicetype,
                devicestate: item.devicestate,
                devicename: item.devicename,
                deviceid: item.deviceid,
                supporter: item.supporter,
                devicemodel: item.devicemodel,
              };
              this.tabledata.push(t);
            }
            this.totalPage = this.tabledata.length;
            // console.log(this.tabledata.length);
          } else {
            // this.dataList = [];
            this.totalPage = 0;
          }
        });
      this.totalPage = this.tabledata.length;
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
          return item.stockname
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/stock/delete'),
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
