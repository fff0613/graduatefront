<template>
    <div>
        <!-- <el-button type="primary" @click="add">添加组织</el-button> -->
        <el-table :data="tabledata">
        <el-table-column label="组织名称" prop="orgname">
        </el-table-column>
        <el-table-column label="组织编码" prop="orgid">
        </el-table-column>
        <el-table-column label="组织位置" prop="orgloc">
        </el-table-column>
         <el-table-column label="操作"  width="100px">
             <template slot-scope="scope"> <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button></template>
        </el-table-column>
    </el-table>
    <el-button size="small" type="primary" @click="addorg()" id="add">+</el-button>
    <el-dialog title="选择组织" :visible.sync="dialogVisible">
       <el-table
      :data="datatable.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      border
      style="margin-top:20px"
      ref="multipletable"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column type="selection" width="30px" ></el-table-column>
      <el-table-column label="编码" prop="orgid"> </el-table-column>
      <el-table-column label="内部编码" prop="innerid"> </el-table-column>
      <el-table-column label="组织名称" prop="orgname"> </el-table-column>
      <el-table-column label="简称" prop="shortname"> </el-table-column>
      <el-table-column label="地址" prop="addr"> </el-table-column>
      <el-table-column label="状态" prop="state"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
     <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<style>
 #add{
   position:fixed;
right:90px;
bottom:50px;
 }
</style>
<script>
export default {
     props: {
    itemName: {
      type: String,
      default: "",
    },
    itemId: { type: String, default: "" }
  },
    data(){
        return{
            can:true,
            deviceid:this.itemId,
            multipletable:"",
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            dataListSelections: [],
            dialogVisible:false,
            tabledata:[  
            ],
            tabledataRe:[],
            datatable:[{
              orgid: '',
              innerid: '',
              orgname: '',
              shortname: '',
              addr:'',
              state: '',
            }
            ],
            datatableRe:[],
            selectdata:[]
            
        }
    },
    created() {
    this.getDataList();
  },
  methods: {
   
    getDataList() {
        console.log("itemid")
        console.log(this.itemId)
      this.tabledata=[]
      this.$http({
        url: this.$http.adornUrl("/detail/orglist"),
        method: 'post',
        params: this.$http.adornParams({
          'deviceid':this.itemId
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledataRe = data.data;
          console.log(data.data);
          
          for(let item of this.tabledataRe){
            let t={
              // isselect:false,
              orgname:item.orgname,
              orgid:item.orgid,
              orgloc: this.getAddr(
                item.country,
                item.province,
                item.city,
                item.district,
                item.street,
                item.streetnumber
              )
            }
            this.tabledata.push(t)
          }
         
          // console.log(this.tabledata.length);
        } else {
          this.tabledata = [];
        //   this.totalPage = 0;
        }
      }).catch((err)=>{
            console.log(err)
      });
    //   this.totalPage = this.tabledata.length;
    //  console.log(this.tabledata.length);
    },
    getAddr(country, province, city, district, street, streetnumber) {
      console.log(country);
      if (country == null || country == "") return "";
      else if(street != null && streetnumber != null)
        return (
          country + province + city + district + street + streetnumber + "号"
        );
      else if(street != null){
        return (
          country + province + city + district + street 
        );
      }
      else
        return (
          country + province + city + district
        );
    },
    addorg(){
      this.dialogVisible = true
      this. getorglist()
    },
     currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    submit() {
      this.dialogVisible = false
      // this.selectdata=[]
      console.log("deviceid "+this.deviceid)
      for(let item of this.dataListSelections){
            // thi/s.selectdata.push(item.orgname)
             this.$http({
              url: this.$http.adornUrl("/generator/deviceorg/addorg"),
              method: "post",
              params: this.$http.adornParams({
                'deviceid':this.deviceid,
                'orgname':item.orgname
              }),
            }).then(({ data }) => {
              if (data && data.code === 0) {
                alert('添加成功!')
                
              } else {
                alert('添加失败!')
                this.$message.error(data.msg);
              }
            });
      }
      this.getDataList()
    },
    getorglist(){
       this.datatable = []
      this.$http({
        url: this.$http.adornUrl("/organization/actorglist"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.datatableRe = data.data;
          for (let item of this.datatableRe) {
            let t = {
              orgid: item.orgid,
              innerid: item.innerid,
              orgname: item.orgname,
              shortname: item.shortname,
              addr: this.getAddr(
                item.country,
                item.province,
                item.city,
                item.district,
                item.street,
                item.streetnumber
              ),
              state: item.state,
            };
            this.datatable.push(t);
          }
          console.log(this.datatable);
          // console.log(data.data)
          this.totalPage = this.datatable.length;
          // console.log(this.tabledata.length)
        } else {
          this.datatable = [];
          this.totalPage = 0;
        }
      });
    },
    selectionChangeHandle(val){
      // this.form.table=[]
      console.log("select")
      this.dataListSelections = this.$refs.multipletable.selection
      console.log(val)
      
      // this.form.tabledata=[]
      // this.form.tabledata.push(val)
    },
    handleDelete(index,row){
      this.$confirm(`确定对[id=${row.orgname}]进行[${row.orgname ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/deviceorg/delete'),
            method: 'post',
            params: this.$http.adornParams({
                'deviceid':this.deviceid,
                'orgname':row.orgname
            }),
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
        }).catch(() => {})
    }
  },
}
</script>