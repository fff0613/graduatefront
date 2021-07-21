<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="所属库房" prop="stock">
        <el-select v-model="form.stock">
          <el-option v-for="item in stockOptions" :key="item.value" 
          :label="item.label"
          :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="数量 ">
        <el-input disabled type="number" v-model="form.mount" min="1"></el-input>
      </el-form-item> -->
      <el-form-item label="申请时间" prop="allocationTime">
         <el-date-picker
      v-model="form.allocationTime"
      type="datetime"
      placeholder="选择日期时间"
      value-format="timestamp">
    </el-date-picker>
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
       <el-form-item  label="说明" prop="descr">
        <el-input  type="textarea" v-model="form.descr" :row="4"></el-input>
      </el-form-item>
      <el-form-item label="盘点设备"> 
          <div>
            <el-button type="primary" style="float:right" @click="addObjects">添加</el-button>
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择设备" :visible.sync="dialogVisible">
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
  /* display: block; */
  margin: 0 auto;
  margin-top: 60px;
  /* background-color:rgb(69, 194, 181);
    color:rgb(255,255,255); */
}
.keepadding {
  /* display: block; */
  margin: 0 auto;
  width: 100px;
  margin-top: 20px;
}
</style>
<script>
import storageBatchVue from '../../device/storage-batch.vue';
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
        tabledata: [],
        tabledataRe: [],
        userOptions:[],
        storageloc:'',
        storageTypeOptions:[],
        stockOptions:[{
          value:'库房1',
          label:'库房1'
        }],
        form: {
          stock:'',
          allocationTime:'',
          storageBatch: 1,
          descr:'',
          mount:0,
          reporter:'',
          executor:'',
          tabledata:[{
          deviceName:'',
          deviceId:'',
          deviceType:'',
          deviceMOdel:'',
          manufacture:''
        
        }]
        },
        rules:{
          stock:[{required:true,message:'请选择库房',trigger:'blur'}],
          allocationTime:[{required:true,message:'请输入时间信息',trigger:'blur'}],
          reporter:[{required:true,message:'请选择申请人',trigger:'blur'}],
          descr:[{required:true,message:'请输入调拨信息',trigger:'blur'}],
        }
        
      }
  },
 activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.getStock();
      // this.getdevice();
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
          // this.stockOptions.push({
          //   value:'全部设备',
          //   label:'全部设备'
          // })
        })
        .catch(() => {
          console.log("error");
        });
    },
    stockchange(){
      this.getdevice()
    },
    getdevice() {
      //入库，选择已录入设备
      this.tabledata = [];
        this.$http({
          url: this.$http.adornUrl("/device/origin"),
          method: "post",
          params: this.$http.adornParams({
            stock:this.form.stock
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
    // selectchange(val) {
    //   console.log(val);
    //   if (val == "入库" || val == "退库" || val == "归还")
    //     this.origindisable = true;
    //   else this.origindisable = false;
    // },
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
        stock:'',
          allocationTime:'',
          storageBatch: 1,
          descr:'',
          mount:0,
          reporter:'',
          tabledata:[{
          deviceName:'',
          deviceId:'',
          deviceType:'',
          deviceMOdel:'',
          manufacture:''
        
        }]
      };
    },
    onSubmit() {
      let amount = this.form.table.length;
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

        }
      })
      let device = []
      for (let item of this.form.table) {
        device.push(item.deviceid);
      }
      console.log(device)
        this.$http({
          url: this.$http.adornUrl("/liferecord/addinventory"),
          method: "post",
          data: this.$http.adornData({
            stockname: this.form.stock,
            stockbatch: this.form.stockbatch,
            storagetype: null,
            storagetime: this.form.allocationTime,
            descr: this.form.descr,
            originstock: null,
            reporterid: this.form.reporter,
            devicename: null,
            deviceid:null,
            devicemodel:null,
            devicetype:null,
            manufacture:null,
            // deviceid: item.deviceid,
            // devicetype: item.devicetype,
            // devicemodel: item.devicemodel,
            // manufacture: item.manufacture,
            amount: amount,
            executorid:this.form.executor,
            device:device
          }),
        })
          .then((data) => {
            
               this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
              })
          })
          .catch((err) => {
            console.log("error");
            console.log(err)
            this.$message({
                message: "操作失败",
                type: "success",
                duration: 1500,
              });
          });
      // }
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
  }
};
</script>
<style>
</style>