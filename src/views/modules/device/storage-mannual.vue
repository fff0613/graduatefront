<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="目标库房" prop="stock">
        <el-select v-model="form.stock">
          <el-option
            v-for="item in stockOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入库类型" prop="storagetype">
        <el-select v-model="form.storagetype" @change="selectchange">
          <el-option
            v-for="item in storageTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入库时间" prop="storagetime">
        <el-date-picker
          v-model="form.storagetime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="入库批次" prop="stockbatch" style="width: 28%">
        <el-input type="number" v-model="form.stockbatch" min="1"></el-input>
      </el-form-item>
      <el-form-item label="原库房" prop="originstock">
        <el-select v-model="form.originstock" :disabled="origindisable">
          <el-option
            v-for="item in stockOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请人" prop="reporter">
        <el-select v-model="form.reporter">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="执行人" prop="executor">
        <el-select v-model="form.executor">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="descr">
        <el-input type="textarea" v-model="form.descr" :row="4"></el-input>
      </el-form-item>
       <!-- <p class="text" >入库设备 <el-button size="mini" type="primary" style="float: right" @click="addObjects"
            >添加</el-button
          ></p> -->
      <el-form-item label="入库设备">
        <div>
          <el-button type="primary" style="float: right" @click="addObjects"
            >添加</el-button
          >
        </div>
        <el-table :data="form.table" style="width: 100%">
          <el-table-column prop="devicename" label="部件名称">
          </el-table-column>
          <el-table-column prop="deviceid" label="部件编码"> </el-table-column>
          <el-table-column prop="devicetype" label="部件类型"></el-table-column>
          <el-table-column prop="supporter" label="供应商"></el-table-column>
          <el-table-column
            prop="devicemodel"
            label="部件型号"
          ></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="deleteObject(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </el-form-item>

      <el-form-item style="margin-top:20px">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择部件" :visible.sync="dialogVisible">
      <el-input v-model="input" placeholder="请输入设备名称">
        <el-button
          slot="append"
          icon="el-icon-search"
          style="width: 50"
          type="primary"
          @click="search()"
        ></el-button>
      </el-input>
      <el-table
        ref="multipletable"
        :data="
          tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        "
        @selection-change="selectionChangeHandle"
      >
        <el-table-column type="selection" width="30"> </el-table-column>
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
        :page-sizes="[5, 10, 15, 20]"
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
.span {
  margin-right: 25px;
}
.el-row {
  margin-bottom: 20px;
}
.force {
  color: red;
}
#addbutton {
  margin: 0 auto;
  margin-top: 60px;
}
.keepadding {
  margin: 0 auto;
  width: 100px;
  margin-top: 20px;
}
</style>
<script>
import storageBatchVue from "../../device/storage-batch.vue";
export default {
  data() {
    return {
      multipletable: "",
      input: "",
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      dialogVisible: false,
      origindisable: true,
      storageloc: "",
      storageTypeOptions: [
        {
          value: "入库",
          label: "入库",
        },
        {
          value: "退库",
          label: "出库后退库",
        },
        {
          value: "转移",
          label: "转移至其他仓库入库",
        },
        {
          value: "归还",
          label: "调拨后归还",
        },
      ],
      stockOptions: [],
      userOptions: [],
      form: {
        stock: "",
        storagetype: "",
        storagetime: "",
        stockbatch: 1,
        descr: "",
        originstock: "",
        reporter: "",
        executor:'',
        table: [
          {
            devicename: "",
            deviceid: "",
            devicetype: "",
            devicemodel: "",
            manufacture: "",
            amount: 0,
          },
        ]
      },
      tabledata: [],
      tabledataRe: [],
      rules:{
          stock:[{required:true,message:'请选择库房',trigger:'blur'}],
          storagetype:[{required:true,message:'请输入入库类型',trigger:'blur'}],
          storagetime:[{required:true,message:'请输入时间信息',trigger:'blur'}],
          reporter:[{required:true,message:'请选择申请人',trigger:'blur'}],
          executor:[{required:true,message:'请选择执行人',trigger:'blur'}],
          descr:[{required:true,message:'请输入调拨信息',trigger:'blur'}],
        }
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.getStock();
      this.getdevice();
      this.getfellowlist();
    },
    getStock() {
      this.$http({
        url: this.$http.adornUrl("/stock/stocklist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.stockOptions = data.data.data;
          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    },
    getdevice() {
      console.log(this.form.originstock)
      //入库，选择已录入设备
      this.tabledata = [];
      if (this.form.storagetype == "入库") {
        this.$http({
          url: this.$http.adornUrl("/device/state"),
          method: "post",
          params: this.$http.adornParams({
            state: "已录入",
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
      } else if (this.form.storagetype == "退库") {
        this.$http({
          url: this.$http.adornUrl("/device/state"),
          method: "post",
          params: this.$http.adornParams({
            state: "已出库",
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
      } else if (this.form.storagetype == "转移") {
        this.$http({
          url: this.$http.adornUrl("/device/origin"),
          method: "post",
          params: this.$http.adornParams({
            stock: this.form.originstock,
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
      } else {
        this.$http({
          url: this.$http.adornUrl("/device/state"),
          method: "post",
          params: this.$http.adornParams({
            state: "已出库",
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
      }

      this.totalPage = this.tabledata.length;
      //退库，选择已出库设备
      //转移,根据originstock，查询内部设备
      //归还,选择借出设备
    },
    getfellowlist() {
      this.userOptions = [];
      this.$http({
        url: this.$http.adornUrl("/sys/user/fellowlist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          // this.deviceTypeOption = data.data.data;
          for (let item of data.data.data) {
            let t = {
              value: item.userId,
              label: item.username,
            };
            this.userOptions.push(t);
          }

          console.log(data.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    },
    selectchange(val) {
      console.log(val);
      if (val == "入库" || val == "退库" || val == "归还")
        this.origindisable = true;
      else this.origindisable = false;
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
    cancel() {
      this.form = {
        stock: "",
        storagetype: "",
        storagetime: "",
        stockbatch: 1,
        descr: "",
        originstock: "",
        reporter: "",
        table: [
          {
            devicename: "",
            deviceid: "",
            devicetype: "",
            devicemodel: "",
            manufacture: "",
            amount: 0,
          },
        ],
      };
    },
    onSubmit() {
      let amount = this.form.table.length;
      if (this.form.storagetype == null || this.form.storagetype == "") {
        alert("请选择入库类型");
        return;
      }
      if (
        this.form.storagetype == "转移" &&
        (this.form.originstock == null || this.form.originstock == "")
      ) {
        alert("请选择原库房");
        return;
      }
      if (amount == 0) {
        alert("请选择设备");
        return;
      }
      console.log("len " + amount);
      console.log(this.form.storagetime);
      this.$refs["form"].validate((valid) => {
        if(!valid){
          alert('输入错误!');
          return;
        }else{
            for (let item of this.form.table) {
        console.log(item.deviceid);
        this.$http({
          url: this.$http.adornUrl("/liferecord/add"),
          method: "post",
          data: this.$http.adornData({
            stockname: this.form.stock,
            stockbatch: this.form.stockbatch,
            storagetype: this.form.storagetype,
            storagetime: this.form.storagetime,
            descr: this.form.descr,
            originstock: this.form.originstock,
            reporterid: this.form.reporter,
            devicename: item.devicename,
            deviceid: item.deviceid,
            devicetype: item.devicetype,
            devicemodel: item.devicemodel,
            manufacture: item.manufacture,
            amount: amount,
            executorid:this.form.executor
          }),
        })
          .then((data) => {
            
               this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
              });
             
          })
          .catch((err) => {
            console.log(err)
            this.$message({
                message: "操作失败",
                type: "success",
                duration: 1500,
              });
          });
      }
        }
      })
      this.cancel()
    },
    addObjects() {
      this.dialogVisible = true;
      this.getdevice();
    },
    deleteObject(index, row) {
      this.form.table.slice(index, 1);
      console.log(this.form.table);
    },
    submit() {
      this.dialogVisible = false;
      this.form.table = [];
      for (let item of this.dataListSelections) {
        let t = {
          // isselect:false,
          devicetype: item.devicetype,
          devicestate: item.devicestate,
          devicename: item.devicename,
          deviceid: item.deviceid,
          supporter: item.supporter,
          devicemodel: item.devicemodel,
        };
        this.form.table.push(t);
      }
    },
    //checkbox
    selectionChangeHandle(val) {
      // this.form.table=[]
      console.log("select");
      this.dataListSelections = this.$refs.multipletable.selection;
      console.log(val);

      // this.form.tabledata=[]
      // this.form.tabledata.push(val)
    },
  },
};
</script>
<style>
</style>