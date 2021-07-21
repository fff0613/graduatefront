<template>
    <div>
        <el-row >
            <!-- <el-col :span="8" > -->
                <el-input v-model="condition" placeholder="名称"  style="width:250px">
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    style="width: 50"
                    type="primary"
                    @click="search()"
                  ></el-button>
                </el-input>
            <!-- </el-col>
            <el-col :span="6"> -->
            <el-button type="primary" @click="addStock()">新建</el-button>
            <!-- </el-col> -->
        </el-row>
        <el-dialog title="添加库房" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" size="medium" label-width="100px" :rules="rules">
        <el-form-item label="库房名称" prop="stockname">
          <el-input v-model="form.stockname"></el-input>
        </el-form-item>
        <el-form-item label="所属组" prop="orgname">
          <el-select v-model="form.orgname">
              <el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行人" prop="executor">
          <!-- <el-input v-model="form.executor" style="width:50%"></el-input> -->
          <el-select v-model="form.executor" @change="exechange">
              <el-option v-for="item in exeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        
        <!-- <el-row> -->
            <!-- <el-col :span="12"> -->
                 <el-form-item label="状态" prop="state">
          <el-select v-model="form.state">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
            <!-- </el-col> -->
        <!-- </el-row> -->
        <!-- <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所处国家" prop="country">
              <el-input v-model="form.country" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所处省份" prop="province">
              <el-input v-model="form.province" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所处市县" prop="city">
              <el-input v-model="form.city" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所处区" prop="district">
              <el-input v-model="form.district" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-form-item label="地址" prop="province">
            <el-cascader
          size="large"
          :options="options"
          v-model="form.selectedOptions"
          @change="handleChange"
          >
        </el-cascader> 
        </el-form-item>
        <!-- <el-row :gutter="5">
          <el-col :span="12"> -->
            <el-form-item label="所处街道" prop="street">
              <el-input v-model="form.street"></el-input>
            </el-form-item>
          <!-- </el-col>
          <el-col :span="12"> -->
            <el-form-item label="所处街道号" prop="streetnumber">
              <el-input
                v-model="form.streetnumber"
                
              ></el-input>
            </el-form-item>
          <!-- </el-col>
        </el-row> -->
        <el-form-item label="使用位置" prop="stockdetailloc">
          <el-input v-model="form.stockdetailloc" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑库房" :visible.sync="editdialogVisible">
      <el-form ref="form" :model="form" size="medium" label-width="100px" :rules="rules">
        <el-form-item label="库房名称" prop="stockname">
          <el-input v-model="form.stockname" ></el-input>
        </el-form-item>
        <el-form-item label="所属组" prop="orgname">
          <el-select v-model="form.orgname">
              <el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行人" prop="executor">
          <!-- <el-input v-model="form.executor"></el-input> -->
          <el-select v-model="form.executor" @change="exechange">
              <el-option v-for="item in exeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
      
        <!-- <el-row> -->
            <!-- <el-col :span="12"> -->
                 <el-form-item label="状态" prop="state">
          <el-select v-model="form.state">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
            <!-- </el-col> -->
        <!-- </el-row> -->
         <el-form-item label="地址" prop="addr">
            <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
         >
        </el-cascader> 
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" disabled ></el-input>
        </el-form-item>
        <!-- <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所处国家" prop="country">
              <el-input v-model="form.country" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所处省份" prop="province">
              <el-input v-model="form.province" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所处市县" prop="city">
              <el-input v-model="form.city" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所处区" prop="district">
              <el-input v-model="form.district" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row :gutter="5">
          <el-col :span="12"> -->
            <el-form-item label="所处街道" prop="street">
              <el-input v-model="form.street" ></el-input>
            </el-form-item>
          <!-- </el-col>
          <el-col :span="12"> -->
            <el-form-item label="所处街道号" prop="streetnumber">
              <el-input
                v-model="form.streetnumber"
                
              ></el-input>
            </el-form-item>
          <!-- </el-col>
        </el-row> -->
         <el-form-item label="使用位置" prop="stockdetailloc">
          <el-input v-model="form.stockdetailloc" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
        <el-table :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)" border style="margin-top:20px">
            <el-table-column label="库房名称" prop="stockname">
            </el-table-column>
            <el-table-column label="所属组" prop="orgname">
            </el-table-column>
            <el-table-column label="使用位置" prop="stockloc">
            </el-table-column>
            <el-table-column label="执行人" prop="executor">
            </el-table-column>
            <el-table-column label="地址" prop="addr">
            </el-table-column>
            <el-table-column label="状态" prop="state">
            </el-table-column>
            <el-table-column  label="操作" width="150" >
           
               <template  slot-scope="scope">
        <el-button 
          size="mini" type="text"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini" type="text" 
          @click="$router.push({
                  name: 'stock-ifo',
                  query: {
                    stockname:scope.row.stockname
                  },
                })">库存</el-button>
          <!-- <el-button
          size="mini" type="text" :disabled="scope.row.state == '启用' ? false:true"
          @click="handleBan(scope.$index, scope.row)">禁用</el-button> -->
          <!-- <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
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
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    </div>
</template>
<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
    data(){
        return{

           options:regionDataPlus,
           selectedOptions:[],
           pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            condition: "",
            dialogVisible: false,
            editdialogVisible: false,
            orgOptions:[],
            exeOptions:[],
            stateOptions:[{
                value: "启用",
                label: "启用",
                },
                {
                value: "禁用",
                label: "禁用",
                },],
            tabledata:[],
            tabledataRe:[],
            form:{
                stockname:"",
                stockroom:"",
                stocktype:"",
                stockdetailloc:"",
                stockcontainer:"",
                orgname:"",
                companyname:"",
                country:"",
                province: "",
                city: "",
                district: "",
                street: "",
                streetnumber: "",
                state: "",
                executor:"",
                executorid:"",
                selectedOptions:'',
                addr:''
            },
            rules: {
          stockname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // stocktype: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          orgname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // companyname: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // country: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          province: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // city: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // district: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // street: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // streetnumber: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // executorid: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          executor: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // addr: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ]
        }
             
        }
    },
    activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tabledata = []
      this.$http({
        url: this.$http.adornUrl("/stock/ifo"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledataRe = data.data;
          for (let item of this.tabledataRe) {
            let t = {
               stockname:item.stockname,
                orgname:item.orgname,
                stockloc:item.stockdetailloc,
                executor:item.executor,
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
            this.tabledata.push(t);
          }
          console.log(this.tabledata);
          // console.log(data.data)
          this.totalPage = this.tabledata.length;
          // console.log(this.tabledata.length)
        } else {
          this.tabledata = [];
          this.totalPage = 0;
        }
      });
      this.orgOptions = []
      this.$http({
        url: this.$http.adornUrl("/organization/actorglist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          for(let item of data.data.data){
            let t = {
              label:item.orgname,
              value:item.orgname
            }
            this.orgOptions.push(t)
          }
          // this.orgOptions = data.data.data;
          console.log(data.data)
        })
        .catch(() => {
          console.log("error");
        });
      //   this.$http({
      //   url: this.$http.adornUrl("/sys/user/list"),
      //   method: "get",
      //   params: this.$http.adornParams(),
      // })
      //   .then((data) => {
      //     this.exeOptions = data.data.data;
      //     // console.log(data.data.data)
      //   })
      //   .catch(() => {
      //     console.log("error");
      //   });
    },
    getfellowlist(){
      this.exeOptions = []
      this.$http({
        url: this.$http.adornUrl("/sys/user/fellowlist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          // this.deviceTypeOption = data.data.data;
          for(let item of data.data.data){
            let t = {
              value:item.userId,
              label:item.username
            }
            this.exeOptions.push(t)
          }
        
          console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
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
    search(condition) {
      if (condition == "" || condition == undefined || condition == null)
        this.getDataList();
    },
    addStock() {
      this.dialogVisible = true;
      this.getfellowlist()
      this.form = {
        stockname:"",
        stockroom:"",
        stocktype:"",
        stockdetailloc:"",
        stockcontainer:"",
                orgname:"",
                companyname:"",
                country:"",
                province: "",
                city: "",
                district: "",
                street: "",
                streetnumber: "",
                state: "",
                executor:""
      };
    },
    submit() {
      this.dialogVisible = false;
      console.log("submit")
      // console.log(this.form.addr)
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/stock/add"),
            method: "post",
            data: this.$http.adornData({
              'stockname': this.form.stockname,
              'stockroom':"",
              'stocktype':"",
              'stockcontainer':"",
              'companyname':"",
              'executorid':this.form.executorid,
              'orgname': this.form.orgname,
              'executor': this.form.executor,
              'stockdetailloc': this.form.stockdetailloc,
              'country': this.form.country,
              'province': this.form.province,
              'city': this.form.city,
              'district': this.form.district,
              'street': this.form.street,
              'streetnumber': this.form.streetnumber,
              'state': this.form.state,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              console.log(data.data);
            //   if (data.data == "insert success") {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getDataList();
                  },
                });
            //   }
            //    else if (data.data == "cpyname exist") {
            //     alert("添加失败!组织已存在");
            //   } else alert("添加失败!");
            } else {
              alert("添加失败!");
              this.$message.error(data.msg);
            }
          }).catch((err)=>{
            console.log(err)
          });
        }
      });
      this.form = {
      stockname:"",
                stockroom:"",
                stocktype:"",
                stockdetailloc:"",
                stockcontainer:"",
                orgname:"",
                companyname:"",
                country:"",
                province: "",
                city: "",
                district: "",
                street: "",
                streetnumber: "",
                state: "",
                executor:""
      };
    },
    handleBan(index, row) {
      console.log(this.tabledata[index].state === "启用");
      if (
        this.tabledata[index].state == "启用" ||
        this.tabledata[index].state == "on"
      ) {
        this.tabledata[index].state == "禁用";
      } else {
        this.tabledata[index].state == "启用";
      }
      this.$http({
        url: this.$http.adornUrl("/company/updateState/"),
        method: "post",
        data: this.$http.adornData({
           'stockname': this.form.stockname,
              'orgname': this.form.orgname,
              'executor': this.form.executor,
              'stockdetailloc': this.form.stockdetailloc,
              'country': this.form.country,
              'province': this.form.province,
              'city': this.form.city,
              'district': this.form.district,
              'street': this.form.street,
              'streetnumber': this.form.streetnumber,
              'state': this.form.state,
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
        } else this.$message.error(data.msg);
      });
    },
    handleEdit(index, row) {
      this.form = this.tabledataRe[index];
      this.editdialogVisible = true;
      this.getfellowlist()
      this.form.addr = this.getAddr(this.form.country,this.form.province,this.form.city,this.form.district)
    },
    submitEdit() {
      this.editdialogVisible = false;
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          // alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/stock/update"),
            method: "post",
            data: this.$http.adornData({
              'stockname': this.form.stockname,
              'stockroom':"",
              'stocktype':"",
              'stockcontainer':"",
              'companyname':"",
              'executorid':this.form.executorid,
              'orgname': this.form.orgname,
              'executor': this.form.executor,
              'stockdetailloc': this.form.stockdetailloc,
              'country': this.form.country,
              'province': this.form.province,
              'city': this.form.city,
              'district': this.form.district,
              'street': this.form.street,
              'streetnumber': this.form.streetnumber,
              'state': this.form.state,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
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
              alert("操作失败!");
              this.$message.error(data.msg);
            }
          });
        }
      });
      this.form = {
        stockname:"",
                stockroom:"",
                stocktype:"",
                stockdetailloc:"",
                stockcontainer:"",
                orgname:"",
                companyname:"",
                country:"",
                province: "",
                city: "",
                district: "",
                street: "",
                streetnumber: "",
                state: "",
                executor:"",
                executorid:""
      };
    },
    stockcontent(index,row){

    },
    search() {
       this.tabledata = []
      if (this.condition == "" || this.condition == undefined || this.condition == null)
        this.getDataList();
      else{
        this.$http({
              url: this.$http.adornUrl(`/stock/search/${this.condition}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledataRe = data.data;
                for (let item of this.tabledataRe) {
                  let t = {
                    stockname:item.stockname,
                      orgname:item.orgname,
                      stockloc:item.stockdetailloc,
                      executor:item.executor,
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
                  this.tabledata.push(t);
                }
                this.totalPage = this.tabledata.length;
                // console.log(this.tabledata.length);
              } else {
                this.dataList = [];
                this.totalPage = 0;
              }
            });
      }
    },
     handleChange(val){
      console.log(val)
      this.getCodeToText(val)
    },
    getCodeToText(codeArray) {
      console.log(codeArray)
  
      if (null === codeArray) {
        return null;
      } 

      let area = "";
      this.form.country = "中国"
      switch (codeArray.length) {
        case 1:
          area += CodeToText[codeArray[0]];
          this.form.province = CodeToText[codeArray[0]]
          break;
        case 2:
          area += CodeToText[codeArray[0]] + CodeToText[codeArray[1]];
          this.form.province = CodeToText[codeArray[0]]
          this.form.city = CodeToText[codeArray[1]];
          break;
        case 3:
          area +=
            CodeToText[codeArray[0]] +
           
            CodeToText[codeArray[1]] +
          
            CodeToText[codeArray[2]];
            this.form.province = CodeToText[codeArray[0]];
            this.form.city = CodeToText[codeArray[1]];
            this.form.district =  CodeToText[codeArray[2]];
          break;
        default:
          break;
      }
      console.log(this.form)
      return area;
    },
    exechange(val){
      this.form.executorid = val
    },
     handleDelete(index, row) {
      var userIds = [row.stockname];
      this.$confirm(
        `确定对[库房=${userIds.join(",")}]进行[${
          row.stockname ? "删除" : "批量删除"
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
            url: this.$http.adornUrl("/stock/delete"),
            method: "post",
            data: this.$http.adornData(userIds, false),
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
  }
}
</script>