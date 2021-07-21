<template>
  <div>
    <el-row>
      <el-select
        v-model="option.organization"
        class="select"
        @change="orgchanged"
      >
        <el-option
          v-for="item in organizationoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="select"
        ></el-option>
      </el-select>
      <!-- <el-select v-model="option.loc" class="select" >
        <el-option
          v-for="item in locoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="select"
        ></el-option>
      </el-select> -->
      <el-select v-model="option.state" class="select" @change="statechanged">
        <el-option
          v-for="item in stateoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="select"
        ></el-option>
      </el-select>
      <el-select v-model="option.type" class="select" @change="typechanged">
        <el-option
          v-for="item in deviceTypeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="select"
        ></el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入设备名称">
        <el-button
          slot="append"
          icon="el-icon-search"
          style="width: 50"
          type="primary"
          @click="search()"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="addDevice()">新增</el-button>
      <!-- <el-button size="small" type="primary" :disabled="dataListSelections.length <= 0" @click="deleteHandle()"
        >删除</el-button
      > -->
      <!-- <el-button size="small" type="primary" @click="batchAdd()"
        >批量导入</el-button
      > -->
    </el-row>
    <el-dialog
      title="添加设备"
      :visible.sync="dialogVisible"
      class="bootstrap-frm"
    >
      <el-form ref="form" :model="form" :rules="rules"  size="medium" label-width="100px">
        <p class="table-title">基本信息</p>
        <div class="table-block" style="padding:8px">
         <el-row :gutter="15">
           <el-col :span="24">
            <el-form-item label="设备名称" prop="devicename">
              <el-input v-model="form.devicename" placeholder="请输入手机号设备名称设备名称" show-word-limit clearable
                :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备来源" prop="devicesourse">
              <el-input v-model="form.devicesourse" placeholder="请输入设备来源" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备类型" prop="devicetype">
              <el-select v-model="form.devicetype" placeholder="请选择设备类型" @change="typechanged2" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in deviceTypeOption" :key="index" :label="item.label"
                  :value="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备型号" prop="devicemodel">
              <el-select v-model="form.devicemodel" placeholder="请选择设备型号" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in deviceModelOption" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保质期" prop="effectivedate">
              <el-date-picker v-model="form.effectivedate"  value-format="timestamp"
                :style="{width: '100%'}" placeholder="请选择保质期" clearable></el-date-picker>
            </el-form-item>
          </el-col>
         </el-row>
        </div>
        <p class="table-title">采购信息</p>
        <div class="table-block" style="padding:8px">
          <el-form-item label="购买日期" prop="buydate">
          <el-date-picker v-model="form.buydate" value-format="timestamp"
            :style="{width: '100%'}" placeholder="请选择购买日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="税率" prop="taxrate">
          <el-input v-model="form.taxrate" placeholder="请输入税率" :style="{width: '100%'}" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="税前价格" prop="beforetax">
          <el-input v-model="form.beforetax" placeholder="请输入税前价格" clearable :style="{width: '100%'}" oninput="value=value.replace(/[^0-9.]/g,'')">
          </el-input>
        </el-form-item>
        <el-form-item label="税费" prop="tax">
          <el-input v-model="form.tax" placeholder="请输入税费" :style="{width: '100%'}" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supporter">
          <el-select v-model="form.supporter" placeholder="请选择供应商" :style="{width: '100%'}">
            <el-option v-for="(item, index) in supporterOption" :key="index" :label="item.label"
              :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制造商" prop="manufacture">
          <el-select v-model="form.manufacture" placeholder="请选择制造商" :style="{width: '100%'}">
            <el-option v-for="(item, index) in manufactureOption" :key="index" :label="item.label"
              :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        </div>
        <p class="table-title">安装信息</p>
        <div class="table-block" style="padding:8px">
          <el-form-item  prop="storagedate" label="安装日期">
          <el-date-picker v-model="form.storagedate" value-format="timestamp"
            :style="{width: '100%'}" placeholder="选择日期"></el-date-picker>
        </el-form-item>
          <el-form-item  prop="startDate" label="启用日期">
          <el-date-picker v-model="form.startDate" value-format="timestamp"
            :style="{width: '100%'}" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      border
      :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      style="margin-top: 20px"
    >
      <!-- <el-table-column type="selection" width="30"> </el-table-column> -->
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-row>
            <el-button
              size="mini"
              type="text"
              @click="
                $router.push({
                  name: 'device-ifo',
                  query: {
                    deviceName: scope.row.devicename,
                    deviceId: scope.row.deviceid,
                    state: scope.row.devicestate,
                  },
                })
              "
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="
                $router.push({
                  name: 'device-ifo',
                  query: {
                    deviceName: scope.row.devicename,
                    deviceId: scope.row.deviceid,
                    state: scope.row.devicestate,
                  },
                })
              "
              >二维码</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="deleteHandle(scope.row.deviceid)"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="devicename" label="设备名称" sortable
        ><template slot-scope="scope"
          ><el-button
            v-model="scope.row.devicename"
            type="text"
            @click="
              $router.push({
                name: 'device-ifo',
                query: {
                  deviceName: scope.row.devicename,
                  deviceId: scope.row.deviceid,
                  state: scope.row.devicestate,
                },
              })
            "
            >{{ scope.row.devicename }}</el-button
          ></template
        >
      </el-table-column>
      <el-table-column prop="deviceid" label="设备编号" sortable
        ><template slot-scope="scope"
          ><el-button
            v-model="scope.row.deviceid"
            type="text"
            @click="
              $router.push({
                name: 'device-ifo',
                query: {
                  deviceName: scope.row.devicename,
                  deviceId: scope.row.deviceid,
                  state: scope.row.devicestate,
                },
              })
            "
            >{{ scope.row.deviceid }}</el-button
          ></template
        >
      </el-table-column>
      <el-table-column prop="devicetype" label="设备类型"></el-table-column>
      <el-table-column
        prop="stockname"
        label="所处库房"
        sortable
      ></el-table-column>
      <el-table-column prop="supporter" label="供应商"></el-table-column>
      <el-table-column prop="manufacture" label="制造商"></el-table-column>
      <el-table-column prop="devicestate" label="设备状态"></el-table-column>
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


.el-form-item__content {
  margin-left: 5px;
}
.select .el-input__inner {
  width: 110px;
}
.select .el-input.el-input--medium.el-input--suffix {
  width: 110px;
}
.table-inline {
  text-align: center;
}
.table-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
.table-block {
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  box-shadow: 0 1 0 0;
  margin-bottom: 15px;
}
.table-title {
  margin-bottom: 5px;
}
.el-input {
  width: 300px;
}
</style>
<script>
import add from "@/views/modules/device/adddevice";
export default {
  components: {
    add,
  },
  data() {
    return {
      //type:'设备ID',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      editdialogVisible: false,
      dialogVisible: false,
      deviceDialogVisible: false,
      isIndeterminate: false,
      dataListSelections: [],
      multipletable: "",
      option: {
        organization: "全部厂商",
        loc: "全部位置",
        state: "全部状态",
        type: "全部类型",
      },
      select: "",
      input: "",
      checkAll: false,
      organizationoptions: [
        {
          value: "",
          label: "",
        },
      ],
      locoptions: [],
      stateoptions: [
        {
          value: "已录入",
          label: "已录入",
        },
        {
          value: "在库中",
          label: "在库中",
        },
        {
          value: "已出库",
          label: "已出库",
        },
        // {
        //     value:"调拨",
        //     label:"已调拨"
        // },
        // {
        //     value:"退货",
        //     label:"已退货"
        // },
        {
          value: "已报废",
          label: "已报废",
        },
        {
          value: "全部状态",
          label: "全部状态",
        },
      ],
      typeoptions: [],
      deviceTypeOption: [],
      deviceModelOption: [],
      supporterOption: [],
      manufactureOption: [],
      tabledataRe: [],
      tabledata: [],
      form: {
        devicename: "",
        deviceid: "",
        devicemodel: "",
        devicetype: "",
        devicesourse: "",
        devicestate: "",
        manufacture: "",
        buydate: "",
        effectivedate: "",
        taxrate: "",
        tax: "",
        beforetax: "",
        supporter: "",
        storagedate: "",
        storagebatch: "",
        stockdetailloc: "",
        stockcontainer: "",
        stockroom: "",
        stockname: "",
        stockid: "",
        effectivedate: "",
        startdate: "",
      },
      rules: {
        devicename: [
          {
            required: true,
            message: "设备名称不能为空",
            trigger: "blur",
          },
        ],
        devicetype: [
          {
            required: true,
            message: "设备类型不能为空",
            trigger: "blur",
          },
        ],
        devicemodel: [
          {
            required: true,
            message: "设备型号不能为空",
            trigger: "blur",
          },
        ],
        devicestate: [
          { required: true, message: "设备状态不能为空", trigger: "blur" },
        ],
      },
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tabledata = [];
      this.$http({
        url: this.$http.adornUrl("/device/brief"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledataRe = data.data;
          console.log(data.data);

          for (let item of this.tabledataRe) {
            let t = {
              // isselect:false,
              devicetype: item.devicetype,
              devicestate: item.devicestate,
              devicename: item.devicename,
              deviceid: item.deviceid,
              supporter: item.supporter,
              manufacture:item.manufacture,
              startdate: item.startdate,
              stockdetailloc: item.stockdetailloc,
              stockname:item.stockname
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
      this.totalPage = this.tabledata.length;
      console.log(this.tabledata.length);
      this.$http({
        url: this.$http.adornUrl("/devicetype/typelist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.deviceTypeOption = data.data.data;
          this.deviceTypeOption.push({
            value: "全部类型",
            label: "全部类型",
          });
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
      this.$http({
        url: this.$http.adornUrl("/devicemodel/modellist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.deviceModelOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });

      this.$http({
        url: this.$http.adornUrl("/stock/stocklist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.locoptions = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
      this.$http({
        url: this.$http.adornUrl("/company/suplist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.organizationoptions = data.data.data;
          // console.log(data.data.data)
          this.organizationoptions.push({
            value: "全部厂商",
            label: "全部厂商",
          });
        })
        .catch(() => {
          console.log("error");
        });
    },
    getSup() {
      this.$http({
        url: this.$http.adornUrl("/company/suplist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.supporterOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMan() {
      this.$http({
        url: this.$http.adornUrl("/company/manlist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.manufactureOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gettype() {
      this.$http({
        url: this.$http.adornUrl("/devicetype/typelist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.deviceTypeOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getmodel() {
      console.log(this.form.devicetype)
      if(this.form.devicetype == ''){
        alert("请选择设备类型")
      }else{  
        this.$http({
        url: this.$http.adornUrl(`/devicemodel/modellist/${this.form.devicetype}`),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.deviceModelOption = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
      }
      
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
    search() {
      this.tabledata = [];
      if (
        this.option.organization == "全部厂商" &&
        this.option.state == "全部状态" &&
        this.option.type == "全部类型" &&
        this.input == ""
      )
        this.getDataList();
      this.$http({
        url: this.$http.adornUrl("/device/search"),
        method: "post",
        data: this.$http.adornData({
          org:
            this.option.organization == "全部厂商"
              ? null
              : this.option.organization,
          state: this.option.state == "全部状态" ? null : this.option.state,
          type: this.option.type == "全部类型" ? null : this.option.type,
          devicename: this.input == "" ? null : this.input,
        }),
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
              startdate: item.startdate,
              stockdetailloc: item.stockdetailloc,
              manufacture:item.manufacture,
              stockname:item.stockname
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
      console.log(row);
    },
    addDevice() {
      this.dialogVisible = true;
      this.getMan();
      this.getSup();
    },
    submit() {
      console.log(this.form.deviceid);
      this.dialogVisible = false;
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          alert("输入错误!");
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/device/add"),
            method: "post",
            data: this.$http.adornData({
              deviceid: this.form.deviceid,
              devicename: this.form.devicename,
              devicemodel: this.form.devicemodel,
              devicetype: this.form.devicetype,
              devicesourse: this.form.devicesourse,
              devicestate: this.form.devicestate,
              manufacture: this.form.manufacture,
              buydate: this.form.buydate,
              effectivedate: this.form.effectivedate,
              taxrate: this.form.taxrate,
              tax: this.form.tax,
              beforetax: this.form.beforetax,
              supporter: this.form.supporter,
              stockdetailloc: this.form.stockdetailloc,
              stockcontainer: this.form.stockcontainer,
              storagebatch: this.form.storagebatch,
              stockroom: this.form.stockroom,
              stockname: this.form.stockname,
              stockid: this.form.stockid,
              storagedate: this.form.storagedate,
              startdate: this.form.startdate,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              alert("添加成功!");
              this.getDataList()
            } else {
              alert("添加失败!");
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    selectionChangeHandle(val) {
      this.dataListSelections = this.$refs.multipletable.selection;
    },
    deleteHandle(id) {
      var userIds = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.deviceid;
          });
      this.$confirm(
        `确定对[id=${userIds.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/device/delete"),
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
    handleQRcode(index, row) {},
    // deleteHandle() {
    //   console.log(this.dataListSelections);
    // },
    selectionChangeHandle(val) {
      console.log("select");
      this.dataListSelections = this.$refs.multipletable.selection;
      console.log(val);
    },
    orgchanged(val) {
      console.log(this.option.organization == "全部组织");
      this.search();
      // this.tabledata = []
      //  this.$http({
      //         url: this.$http.adornUrl("/device/search"),
      //         method: "post",
      //         data: this.$http.adornData({
      //           "org": this.option.organization == '全部厂商' ? null: this.option.organization,
      //           'state' :this.option.state == '全部状态' ? null : this.option.state,
      //           'type' :this.option.type == '全部类型' ? null : this.option.type,
      //           'devicename' : this.input =='' ? null :this.input
      //         }),
      //       }).then(({ data }) => {
      //         if (data && data.code === 0) {
      //           this.tabledataRe = data.data;
      //           // console.log(data.data);

      //           for(let item of this.tabledataRe){
      //             let t={
      //               // isselect:false,
      //               devicetype:item.devicetype,
      //               devicestate:item.devicestate,
      //               devicename:item.devicename,
      //               deviceid:item.deviceid,
      //               supporter:item.supporter,
      //               startdate:item.startdate,
      //               stockdetailloc:item.stockdetailloc
      //             }
      //             this.tabledata.push(t)
      //           }
      //           this.totalPage = this.tabledata.length
      //           // console.log(this.tabledata.length);
      //         } else {
      //           this.dataList = [];
      //           this.totalPage = 0;
      //         }
      //       });
    },
    statechanged(val) {
      console.log(this.option.state == "全部状态");
      this.search();
      // this.tabledata = []
      //  this.$http({
      //         url: this.$http.adornUrl("/device/search"),
      //         method: "post",
      //         data: this.$http.adornData({
      //           'org': this.option.organization == '全部厂商' ? null: this.option.organization,
      //           'state' :this.option.state == '全部状态' ? null : this.option.state,
      //           'type' :this.option.type == '全部类型' ? null : this.option.type,
      //           'devicename' : this.input =='' ? null :this.input
      //         }),
      //       }).then(({ data }) => {
      //         if (data && data.code === 0) {
      //           this.tabledataRe = data.data;
      //           // console.log(data.data);

      //           for(let item of this.tabledataRe){
      //             let t={
      //               // isselect:false,
      //               devicetype:item.devicetype,
      //               devicestate:item.devicestate,
      //               devicename:item.devicename,
      //               deviceid:item.deviceid,
      //               supporter:item.supporter,
      //               startdate:item.startdate,
      //               stockdetailloc:item.stockdetailloc
      //             }
      //             this.tabledata.push(t)
      //           }
      //           this.totalPage = this.tabledata.length
      //           // console.log(this.tabledata.length);
      //         } else {
      //           this.dataList = [];
      //           this.totalPage = 0;
      //         }
      //       });
    },
    modelchanged(){
      
    },
    typechanged2(){
      console.log(this.form.devicetype)
      this.getmodel()
    },
    typechanged(val) {
      console.log(this.option.type == "全部类型");
      this.search();
      
      // this.tabledata = []
      //  this.$http({
      //         url: this.$http.adornUrl("/device/search"),
      //         method: "post",
      //         data: this.$http.adornData({
      //           'org': this.option.organization == '全部厂商' ? null: this.option.organization,
      //           'state' :this.option.state == '全部状态' ? null : this.option.state,
      //           'type' :this.option.type == '全部类型' ? null : this.option.type,
      //           'devicename' : this.input =='' ? null :this.input
      //         }),
      //       }).then(({ data }) => {
      //         if (data && data.code === 0) {
      //           this.tabledataRe = data.data;
      //           // console.log(data.data);

      //           for(let item of this.tabledataRe){
      //             let t={
      //               // isselect:false,
      //               devicetype:item.devicetype,
      //               devicestate:item.devicestate,
      //               devicename:item.devicename,
      //               deviceid:item.deviceid,
      //               supporter:item.supporter,
      //               startdate:item.startdate,
      //               stockdetailloc:item.stockdetailloc
      //             }
      //             this.tabledata.push(t)
      //           }
      //           this.totalPage = this.tabledata.length
      //           // console.log(this.tabledata.length);
      //         } else {
      //           this.dataList = [];
      //           this.totalPage = 0;
      //         }
      //       });
    },
  },
};
</script>
