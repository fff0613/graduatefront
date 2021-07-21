<template>
  <div>
    <el-row :gutter="10">
      <!-- <el-col :span="8"> -->
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
        <el-button type="primary" @click="addOrg">新建</el-button>
      <!-- </el-col> -->
    </el-row>
    <el-dialog title="添加组织" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="组织编号" prop="orgid">
          <el-input v-model="form.orgid" ></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgname">
          <el-input v-model="form.orgname"></el-input>
        </el-form-item>
        <el-form-item label="组件内部编号" prop="innerid">
          <el-input v-model="form.innerid" ></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortname">
          <el-input v-model="form.shortname" ></el-input>
        </el-form-item>
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
    <el-dialog title="编辑组织" :visible.sync="editDialogVisible">
      <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="组织编号" prop="orgid">
          <el-input v-model="form.orgid" ></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgname">
          <el-input v-model="form.orgname"></el-input>
        </el-form-item>
        <el-form-item label="组件内部编号" prop="innerid">
          <el-input v-model="form.innerid" ></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortname">
          <el-input v-model="form.shortname" ></el-input>
        </el-form-item>
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
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      border
      style="margin-top:20px"
    >
      <!-- <el-table-column type="selection" width="30px"></el-table-column> -->
      <el-table-column label="编码" prop="orgid"> </el-table-column>
      <el-table-column label="内部编码" prop="innerid"> </el-table-column>
      <el-table-column label="组织名称" prop="orgname"> </el-table-column>
      <el-table-column label="简称" prop="shortname"> </el-table-column>
      <el-table-column label="地址" prop="addr"> </el-table-column>
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
<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  data() {
    return {
      options:regionDataPlus,
      selectedOptions:[],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      condition: "",
      dialogVisible: false,
      editDialogVisible: false,
      tabledata: [],
      tabledataRe: [],
      stateOptions: [
        {
          value: "启用",
          label: "启用",
        },
        {
          value: "禁用",
          label: "禁用",
        },
      ],
      form: {
        orgid: "",
        innerid: "",
        orgname: "",
        shortname: "",
        country: "",
        province: "",
        city: "",
        district: "",
        street: "",
        streetnumber: "",
        state: "",
        addr:'',
        selectedOptions:[]
      },
      rules: {
        orgid: [{ required: true, message: "请输入组织编号", trigger: "blur" }],
        orgname: [{ required: true, message: "请输入组织名", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }],
        province: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
      },
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tabledata = []
      this.$http({
        url: this.$http.adornUrl("/organization/ifo"),
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
              url: this.$http.adornUrl(`/organization/search/${this.condition}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledataRe = data.data;
                for (let item of this.tabledataRe) {
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
    addOrg() {
      this.dialogVisible = true;
      this.form = {
        orgid: "",
        innerid: "",
        orgname: "",
        shortname: "",
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
      this.dialogVisible = false;
      // console.log(this.form)
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          // alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/organization/add"),
            method: "post",
            data: this.$http.adornData({
              orgid: this.form.orgid,
              innerid: this.form.innerid,
              orgname: this.form.orgname,
              shortname: this.form.shortname,
              country: this.form.country,
              province: this.form.province,
              city: this.form.city,
              district: this.form.district,
              street: this.form.street,
              streetnumber: this.form.streetnumber,
              state: this.form.state,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              // console.log(data.data);
            //   if (data.data == "insert success") {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getDataList();
                  },
                });
            //   } else if (data.data == "orgname exist") {
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
        orgid: "",
        innerid: "",
        orgname: "",
        shortname: "",
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
        url: this.$http.adornUrl("/devicetype/updateState/"),
        method: "post",
        data: this.$http.adornData({
              orgid: this.form.orgid,
              innerid: this.form.innerid,
              orgname: this.form.orgname,
              shortname: this.form.shortname,
              country: this.form.country,
              province: this.form.province,
              city: this.form.city,
              district: this.form.district,
              street: this.form.street,
              streetnumber: this.form.streetnumber,
              state: this.form.state,

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
      this.editDialogVisible = true;
      this.form.addr = this.getAddr(this.form.country,this.form.province,this.form.city,this.form.district)
    },
    submitEdit() {
      this.editDialogVisible = false;
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          // alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/organization/update"),
            method: "post",
            data: this.$http.adornData({
              orgid: this.form.orgid,
              innerid: this.form.innerid,
              orgname: this.form.orgname,
              shortname: this.form.shortname,
              country: this.form.country,
              province: this.form.province,
              city: this.form.city,
              district: this.form.district,
              street: this.form.street,
              streetnumber: this.form.streetnumber,
              state: this.form.state,
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
              alert("添加失败!");
              this.$message.error(data.msg);
            }
          });
        }
      });
      this.form = {
        orgid: "",
        innerid: "",
        orgname: "",
        shortname: "",
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
      var userIds = [row.orgname];
      this.$confirm(
        `确定对[组织=${userIds.join(",")}]进行[${
          row.orgname ? "删除" : "批量删除"
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
            url: this.$http.adornUrl("/organization/delete"),
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
      console.log("form")
      console.log(this.form)
      return area;
    }
  },
};
</script>