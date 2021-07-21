<template>
   <div>
     <el-table :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)">
        <el-table-column label="操作日期" prop="happenDate" width="200px">
        </el-table-column>
        <el-table-column label="操作人" prop="fellow" width="150px">
        </el-table-column>
        <el-table-column label="描述" prop="descr">
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
<script>
export default {
    props: {
    itemName: {
      type: String,
      default: "",
    },
    itemId: { type: String, default: '' }
  },
    data(){ 
        return{
            tabledata:[],
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            dataListLoading: false,
            dataListSelections: [],
        }
    },
    created(){
       this.getDataList();
    },
    methods:{
        getDataList(){
          console.log("devicelog")
             this.$http({
              url: this.$http.adornUrl(`/detail/devicelog/${this.itemId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledata = data.data
                console.log(data.data)
                this.totalPage = this.tabledata.length
              }else{
                this.tabledata = []
                this.totalPage = 0
              }
            }).catch((err)=>{
                console.log(err)
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
    }
}
</script>