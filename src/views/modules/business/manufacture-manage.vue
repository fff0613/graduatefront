<template>
  <div>
    <el-row :gutter="10">
        <el-input v-model="condition" placeholder="名称" style="width:250px">
          <el-button
          slot="append"
          icon="el-icon-search"
          style="width: 50"
          type="primary"
          @click="search()"
        ></el-button>
        </el-input>
      
        <el-button type="primary" @click="addCom">新建</el-button>
    </el-row>
    <el-dialog title="添加厂商" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="厂商编码" prop="companyid">
          <el-input v-model="form.companyid" ></el-input>
        </el-form-item>
        <el-form-item label="厂商名称" prop="companyname">
          <el-input v-model="form.companyname" ></el-input>
        </el-form-item>
        <el-form-item label="厂商内部编号" prop="innerid">
          <el-input v-model="form.innerid"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortname">
          <el-input v-model="form.shortname"></el-input>
        </el-form-item>
        <!-- <el-row>
            <el-col :span="12"> -->
                <el-form-item label="类型" prop="companytype">
          <el-select v-model="form.companytype" >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
            ></el-option>
          </el-select>
        </el-form-item>
            <!-- </el-col>
            <el-col :span="12"> -->
                 <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" >
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            
            ></el-option>
          </el-select>
        </el-form-item>
            <!-- </e w> -->
        <el-form-item label="地址" prop="addr">
            <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
         >
        </el-cascader> 
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑厂商" :visible.sync="editdialogVisible">
      <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="厂商编码" prop="companyid">
          <el-input v-model="form.companyid" ></el-input>
        </el-form-item>
        <el-form-item label="厂商名称" prop="companyname">
          <el-input v-model="form.companyname" ></el-input>
        </el-form-item>
        <el-form-item label="厂商内部编号" prop="innerid">
          <el-input v-model="form.innerid"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortname">
          <el-input v-model="form.shortname" ></el-input>
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="类型" prop="companytype">
          <el-select v-model="form.companytype">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
            </el-col>
            <el-col :span="12">
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
            </el-col>
        </el-row>
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
          <el-input v-model="form.addr" disabled></el-input>
        </el-form-item>
        <!-- <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所处国家" prop="country">
              <el-input disabled v-model="form.country" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所处省份" prop="province">
              <el-input disabled v-model="form.province" style="width: 50%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所处市县" prop="city">
              <el-input disabled v-model="form.city" style="width: 50%"></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table border :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)" style="margin-top:20px">
      <el-table-column label="编码" prop="companyid"> </el-table-column>
      <el-table-column label="内部编码" prop="innerid"> </el-table-column>
      <el-table-column label="厂商名称" prop="companyname">
      </el-table-column>
      <el-table-column label="简称" prop="shortname"> </el-table-column>
      <el-table-column label="类型" prop="companytype"> </el-table-column>
      <el-table-column label="地址" prop="addr">
    </el-table-column>
      <el-table-column label="状态" prop="state"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            @click="handleBan(scope.$index, scope.row)"
            ><span v-if="scope.row.state == '启用' || scope.row.state == 'on'"
              >禁用</span
            >
            <span v-else>启用</span></el-button
          > -->
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
<style>
.manselect .el-input__inner {
  width: 210px;
}
.manselect .el-input.el-input--medium.el-input--suffix {
  width: 210px;
}
.addr .el-input__inner {
  width: 250px;
}
.addr .el-input.el-input--medium.el-input--suffix {
  width: 250px;
}
</style>
<script>
import AddOrUpdate from './company-add-or-update'
import 'element-ui/lib/theme-chalk/index.css' //cascader样式
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  data() {
    return {
          pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      condition: "",
      dialogVisible: false,
      editdialogVisible: false,
      options:regionDataPlus,
      selectedOptions:[],
      typeOptions:[{
          value: "制造商",
          label: "制造商",
        },
        {
          value: "供应商",
          label: "供应商",
        },],
      stateOptions:[{
          value: "启用",
          label: "启用",
        },
        {
          value: "禁用",
          label: "禁用",
        },],
      tabledata: [],
      tabledataRe:[],
      form: {
        companyid: "",
        innerid: "",
        companyname: "",
        shortname: "",
        companytype: "",
        state: "",
        country: "",
        province: "",
        city: "",
        district: "",
        street: "",
        streetnumber: "",
        state: "",
        addr:''
      },
      rules: {
        companyid: [{ required: true, message: "请输入组织编号", trigger: "blur" }],
        companyname: [{ required: true, message: "请输入组织名", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }],
         companytype:[{ required: true, message: "请选择类型", trigger: "blur" }]
      }
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tabledata = []
      this.$http({
        url: this.$http.adornUrl("/company/ifo"),
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
              companyid: item.companyid,
              innerid: item.innerid,
              companyname: item.companyname,
              shortname: item.shortname,
              companytype:item.companytype,
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
    search() {
       this.tabledata = []
      if (this.condition == "" || this.condition == undefined || this.condition == null)
        this.getDataList();
      else{
        this.$http({
              url: this.$http.adornUrl(`/company/search/${this.condition}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledataRe = data.data;
                for (let item of this.tabledataRe) {
                  let t = {
                    companyid: item.companyid,
                    innerid: item.innerid,
                    companyname: item.companyname,
                    shortname: item.shortname,
                    companytype:item.type,
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
                // console.log(this.tabledata.length);
              } else {
                this.dataList = [];
                this.totalPage = 0;
              }
            });
      }
    },
    addCom() {
      this.dialogVisible = true;
      this.form = {
        orgid: "",
        innerid: "",
        orgname: "",
        shortname: "",
        type:"",
        country: "",
        province: "",
        city: "",
        district: "",
        street: "",
        streetnumber: "",
        state: "",
      };
    },
    submit() {
      console.log("form")
      console.log(this.form)
      this.dialogVisible = false;
      // console.log(this.form)
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          // alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/company/add"),
            method: "post",
            data: this.$http.adornData({
              'companyid': this.form.companyid,
              'innerid': this.form.innerid+"",
              'companyname': this.form.companyname,
              'shortname': this.form.shortname+"",
              'companytype':this.form.companytype,
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
          });
        }
      });
      this.form = {
       companyid: "",
          innerid: "",
          companyname: "",
          shortname: "",
          companytype: "",
          state: "",
            country: "",
            province: "",
        city: "",
        district: "",
        street: "",
        streetnumber: "",
        state: "",
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
           'companyid': this.form.companyid,
              'innerid': this.form.innerid,
              'companyname': this.form.companyname,
              'shortname': this.form.shortname,
              'companytype':this.form.companytype,
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
            url: this.$http.adornUrl("/company/update"),
            method: "post",
            data: this.$http.adornData({
               'companyid': this.form.companyid,
              'innerid': this.form.innerid,
              'companyname': this.form.companyname,
              'shortname': this.form.shortname,
              'companytype':this.form.companytype,
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
        companyid: "",
          innerid: "",
          companyname: "",
          shortname: "",
          companytype: "",
          state: "",
            country: "",
            province: "",
        city: "",
        district: "",
        street: "",
        streetnumber: "",
        state: "",
      };
    },
    handleDelete(index, row) {
      var userIds = [row.companyname];
      this.$confirm(
        `确定对[厂商=${userIds.join(",")}]进行[${
          row.orgName ? "删除" : "批量删除"
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
            url: this.$http.adornUrl("/company/delete"),
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
    }

  },
};
</script>