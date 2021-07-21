<template>
   <div>
      <el-table :data="tabledata" id="table">
        <el-table-column label="维保人" prop="username">
        </el-table-column>
        <el-table-column label="职责" prop="role">
        </el-table-column>
        <el-table-column label="电话" prop="mobile">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="描述" prop="descr">
        </el-table-column>
         <el-table-column label="操作" prop="orgLoc" width="100px">
             <template slot-scope="scope"><el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button></template>
        </el-table-column>
    </el-table>
    <el-button size="small" type="primary" @click="addFellow()" id="add">+</el-button>
     <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogVisible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <!-- <el-form-item label="人员名称" prop="username">
      <el-input v-model="dataForm.username" placeholder="请输入人员名称"></el-input>
    </el-form-item> -->
    <el-form-item label="人员名称" prop="username">
        <el-select v-model="dataForm.username">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="人员职责" prop="role">
      <el-select v-model="dataForm.role">
        <el-option v-for="item in roleoption" :key="item.key" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="电话" prop="mobile" >
       <el-input v-model="dataForm.mobile" placeholder="请输入手机号码" disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="请输入邮箱" disabled="true"></el-input>
    </el-form-item> -->
    <el-form-item label="描述" prop="descr">
      <el-input v-model="dataForm.descr" placeholder="请输入描述"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
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
import { isEmail, isMobile } from '@/utils/validate'
export default {
     props: {
    itemName: {
      type: String,
      default: "",
    },
    itemId: { type: String, default: '' }
  },
    data(){
       var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
        return{
            fellowlist:[],
            userOptions:[],
            tabledata:[],
            dialogVisible:false,
            deviceid:this.itemId,
            roleoption:[{
              value:'维修人员',
              label:'维修人员'
            },
            {
              value:'保养人员',
              label:'保养人员'
            }],
            dataForm:{
              username:'',
              role:'',
              mobile:'',
              email:'',
              descr:''
            },
            dataRule:{
              username:[{
                required: true,
                message: '人员名称不能为空',
                trigger: 'blur',
              }],
              role:[{
                required: true,
                message: '人员职责不能为空',
                trigger: 'blur',
              }],
               email: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { validator: validateEmail, trigger: 'blur' }
              ],
              mobile: [
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { validator: validateMobile, trigger: 'blur' }
              ]
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
        url: this.$http.adornUrl("/deviceuser/fellowlist"),
        method: 'post',
        params: this.$http.adornParams({
          'deviceid':this.deviceid
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledata = data.data;
            console.log(data.data)
        } else {
          this.tabledata = [];
        //   this.totalPage = 0;
        }
      }).catch((err)=>{
            console.log(err)
      });
      this.getfellowlist()
    },
    // selectchanged(val){
    //   this.dataForm.mobile = 
    // },
    getfellowlist() {
      this.userOptions = [];
      this.$http({
        url: this.$http.adornUrl("/sys/user/fellowlist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          // this.deviceTypeOption = data.data.data;
          this.fellowlist = data.data.data
          console.log(this.fellowlist)
          for (let item of data.data.data) {
            let t = {
              value: item.userId,
              label: item.username+'('+item.mobile+')',
            };
            this.userOptions.push(t);
          }

          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    },
    addFellow() {
      this.dialogVisible = true;
    //  this.$http({
    //       url: this.$http.adornUrl('/sys/user/fellowlist'),
    //       method: 'get',
    //       params: this.$http.adornParams()
    //     }).then(({data}) => {
    //       if (data && data.code === 0) {
    //         console.log(data.data)
    //       } else {
    //         console.log("fellowlist fail")
    //       }
          
    //     })
    },
    dataFormSubmit() {
      this.dialogVisible = false
      this.$refs["dataForm"].validate((valid) => {
        if(!valid){
          alert('输入错误!');
          return;
        }else{
            this.$http({
              url: this.$http.adornUrl("/deviceuser/add"),
              method: "post",
              data: this.$http.adornData({
                'deviceid':this.itemId,
                'userid':null,
                'username':this.dataForm.username,
                'mobile':this.dataForm.mobile,
                'email':this.dataForm.email,
                'role':this.dataForm.role,
                'descr':this.dataForm.descr
              }),
            }).then(({ data }) => {
              if (data && data.code === 0) {
                alert('添加成功!')
                this.getDataList()
              } else {
                alert('添加失败!')
                this.$message.error(data.msg);
              }
            });
        }
      });
      this.dataForm = {
        username:'',
        role:'',
              mobile:'',
              email:'',
              descr:''
      }
    },
    handleDelete(index,row){
       this.$confirm(`确定对[id=${row.username}]进行[${row.username ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/deviceuser/delete'),
            method: 'post',
            data: this.$http.adornData({
                'deviceid':this.itemId,
                'userid':row.userid,
                'username':row.username,
                'mobile':row.mobile,
                'email':row.email,
                'role':row.role,
                'descr':row.descr
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