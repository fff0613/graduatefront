<template>
    <div>
        <el-button type="primary" @click="add">添加</el-button>
        <el-dialog title="添加协议" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form"  :rules="rules" label-position="right"> 
                <el-form-item label="协议名称" prop="proname">
                    <el-input v-model="form.proname" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="协议类型" prop="protype">
                    <el-select v-model="form.protype" placeholder="请输入">
                        <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务商" prop="manufacture">
                    <el-select v-model="form.manufacture" placeholder="请输入">
                        <el-option v-for="item in manufactureOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="starttime">
                    <el-date-picker
                    v-model="form.starttime"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" prop="endtime">
                    <el-date-picker
                    v-model="form.endtime"
                    type="date"
                    placeholder="选择日期"
                     value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog title="编辑协议" :visible.sync="editdialogVisible">
            <el-form ref="form" :model="form"  :rules="rules" label-position="right"> 
                <el-form-item label="协议名称" prop="proname">
                    <el-input v-model="form.proname" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="协议类型" prop="protype">
                    <el-select v-model="form.protype" placeholder="请输入">
                        <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务商" prop="manufacture">
                    <el-select v-model="form.manufacture" placeholder="请输入">
                        <el-option v-for="item in manufactureOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="starttime">
                    <el-date-picker
                    v-model="form.starttime"
                    type="date"
                    :placeholder="form.starttime == null ? '选择日期':form.starttime"
                    value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" prop="endtime">
                    <el-date-picker
                    v-model="form.endtime"
                    type="date"
                    :placeholder="form.endtime == null ? '选择日期':form.endtime"
                     value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
    <el-table :data="tabledata">
        <el-table-column label="协议名称" prop="proname">
        </el-table-column>
        <el-table-column label="协约类型" prop="protype">
        </el-table-column>
        <el-table-column label="服务商" prop="manufacture">
        </el-table-column>
        <el-table-column label="开始时间" prop="starttime">
        </el-table-column>
        <el-table-column label="结束时间" prop="endtime">
        </el-table-column>
         <el-table-column label="操作" width="100px">
             <template slot-scope="scope">
                 <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                 <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default {
     props: {
                itemName: {
                type: String,
                default: "",
                },
                itemId: { type: Number, default: "" }
            },
    data(){
        return{
            typeOption:[{
                value:"维修",
                label:"维修"
            },
            {
                value:"保修",
                label:"保修"
            },
            {
                value:"巡检",
                label:"巡检"
            }],
            manufactureOption:[],
            editdialogVisible:false,
            dialogVisible:false,
            tabledata:[
            ],
            tabledataRe :[],
            form:{
                proid:"",
                deviceid:this.itemId,
                proname:"",
                protype:"",
                manufacture:"",
                starttime:"",
                endtime:""
            },
            rules:{
                proname:[{required:true,message:"请输入名称",trigger:"blur"}],
                protype:[{required:true,message:"请输入类型",trigger:"blur"}],
                manufacture:[{required:true,message:"请输入厂商",trigger:"blur"}],
                starttime:[{required:true,message:"请输入开始时间",trigger:"blur"}],
                endtime:[{required:true,message:"请输入结束时间",trigger:"blur"}],
            }
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
        url: this.$http.adornUrl("/effectiveprotocol/prolist"),
        method: 'post',
        params: this.$http.adornParams({
          'deviceid':this.itemId
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledata = data.data;
          console.log(data.data);
          
        //   for(let item of this.tabledataRe){
        //     let t={
        //       // isselect:false,
        //         protocolName:item.proname,
        //             protocolType:item.protype,
        //             manufacture:item.manufacture,
        //             startDate:item.starttime,
        //             endDate:item.endtime
        //     }
        //     this.tabledata.push(t)
        //   }
         
          // console.log(this.tabledata.length);
        } else {
          this.tabledata= [];
          console.log(err)
        //   this.totalPage = 0;
        }
      }).catch((err)=>{
            console.log(err)
      });
    //   this.totalPage = this.tabledata.length;
    //  console.log(this.tabledata.length);
     
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
    selectcheck(index, row) {
      console.log("before" + index + " " + row.state + " " + row.isselect);
      this.tabledata[index].isselect = false ? true : false;
      console.log("after" + index + " " + row.state + " " + row.isselect);
      //this.tabledata[index].isselect = !this.tabledata[index].isselect
    },
    handleCheckAllChange(val) {
      this.tabledatanull = val ? this.tabledata : [];
      this.tabledata.isselect = true;
    },
    handleCommand(command) {
      this.option = command;
    },
    handleEdit(index, row) {
        this.getCom()
      this.editdialogVisible = true
      this.form = {
           proid:this.tabledata[index].proid,
                deviceid:this.tabledata[index].deviceid,
                proname:row.proname,
                protype:row.protype,
                manufacture:row.manufacture,
                starttime:row.starttime,
                endtime:row.endtime
      }
    },
    add() {
      this.dialogVisible = true;
       this.getCom()
    },
    getCom(){
        this.$http({
        url: this.$http.adornUrl("/company/cpylist"),
        method: 'get',
        params: this.$http.adornParams(),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.manufactureOption = data.data
          // console.log(this.tabledata.length);
        } else {
          this.manufactureOption= [];
        //   this.totalPage = 0;
        }
      }).catch((err)=>{
            console.log(err)
      });
    },
    submit() {
      this.dialogVisible = false
      this.$refs["form"].validate((valid) => {
        if(!valid){
          alert('输入错误!');
          return;
        }else{
            this.$http({
              url: this.$http.adornUrl("/effectiveprotocol/add"),
              method: "post",
              data: this.$http.adornData({
                   proid:this.form.proid,
                deviceid:this.form.deviceid,
                proname:this.form.proname,
                protype:this.form.protype,
                manufacture:this.form.manufacture,
                starttime:this.form.starttime,
                endtime:this.form.endtime
              }),
            }).then(({ data }) => {
              if (data.code === 0) {
                  console.log(data)
                this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  // this.visible = false
                  this.getDataList();
                },
              });
              } else {
                alert('添加失败!')
                this.$message.error(data.msg);
              }
            });
        }
      });
     this.form={
          proid:"",
                deviceid:this.itemId,
                proname:"",
                protype:"",
                manufacture:"",
                starttime:"",
                endtime:""
      }
    },
    submitEdit(){
        this.editdialogVisible = false
      this.$refs["form"].validate((valid) => {
        if(!valid){
          alert('输入错误!');
          return;
        }else{
            this.$http({
              url: this.$http.adornUrl("/effectiveprotocol/update"),
              method: "post",
              data: this.$http.adornData({
                   proid:this.form.proid,
                deviceid:this.form.deviceid,
                proname:this.form.proname,
                protype:this.form.protype,
                manufacture:this.form.manufacture,
                starttime:this.form.starttime,
                endtime:this.form.endtime
              }),
            }).then(({ data }) => {
              if (data.code === 0) {
                  console.log(data)
                this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  // this.visible = false
                  this.getDataList();
                },
              });
              } else {
                alert('添加失败!')
                this.$message.error(data.msg);
              }
            });
        }
      });
      this.form={
          proid:this.form.proid,
                deviceid:this.itemId,
                proname:"",
                protype:"",
                manufacture:"",
                starttime:"",
                endtime:""
      }
    },
    selectionChangeHandle (val) {
        this.dataListSelections = val
    },
    handel(){},
    handleQRcode(index, row) {},
    handleDelete(index, row) {
        var userIds = this.tabledata[index];
        var name = userIds.proname
      this.$confirm(
        `确定对[保修协议=${name}]进行[${
          name ? "删除" : "批量删除"
        }]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/effectiveprotocol/delete"),
            method: "post",
            data: this.$http.adornData({
                 proid:userIds.proid,
                deviceid:userIds.deviceid,
                proname:userIds.proname,
                protype:userIds.protype,
                manufacture:userIds.manufacture,
                starttime:userIds.starttime,
                endtime:userIds.endtime
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                },
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    },
  },
}
</script>