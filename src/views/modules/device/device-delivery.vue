<template>
  <div>
    <el-row>
      <!-- <el-col > -->
      <el-select v-model="option.stock" class="select"  @change="selectchanged">
        <el-option
          v-for="item in stockOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="select"
        ></el-option>
      </el-select>
      <!-- </el-col> -->

      <!-- <el-col> -->
      <el-select v-model="option.state" class="select"  @change="selectchanged">
        <el-option
          v-for="item in stateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="selct"
        ></el-option>
      </el-select>
      <!-- </el-col> -->
      <!-- <el-col > -->
      <el-input v-model="input" placeholder="执行人" style="width:250px">
        <el-button
          slot="append"
          icon="el-icon-search"
          
          type="primary"
          @click="search()"
        ></el-button>
      </el-input>
      <el-button
        size="small"
        type="primary"
        @click="$router.push({ name: 'device-delivery' })"
        >出库</el-button
      >
      <!-- </el-col> -->
    </el-row>

    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
    <el-table
      :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      style="width: 100%;margin-top:20px" border height="550"
    >
      <el-table-column fixed prop="deliveryid" label="出库单号"
        ><template slot-scope="scope"
          ><el-button
            v-model="scope.row.deliveryid"
            type="text"
            @click="
              $router.push({
                name: 'life-ifo',
                query: { recordid: scope.row.deliveryid, type: 'delivery' },
              })
            "
            >{{ scope.row.deliveryid }}</el-button
          ></template
        >
      </el-table-column>
      <el-table-column prop="stock" label="原库房" 
        ><template slot-scope="scope"
          ><el-button
            v-model="scope.row.stock"
            type="text"
            @click="$router.push({ name: 'stock-manage' })"
            >{{ scope.row.stock }}</el-button
          ></template
        >
      </el-table-column>
      <!-- <el-table-column
        prop="organization"
        label="所属组"
        
      ></el-table-column> -->
      <el-table-column
        prop="mount"
        label="出库数量"
        
      ></el-table-column>
      <el-table-column
        prop="reporter"
        label="申请人员"
       
      ></el-table-column>
      <el-table-column
        prop="executor"
        label="执行人员"
       
      ></el-table-column>
      <el-table-column
        prop="happentime"
        label="出库时间"
       
      ></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <!-- <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              $router.push({
                name: 'life-ifo',
                query: {recordid: scope.row.deliveryid, type: 'delivery' },
              })
            "
            >详情</el-button
          >
        </template>
      </el-table-column> -->
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
.select .el-input__inner {
  width: 200px;
}
.select .el-input.el-input--medium.el-input--suffix {
  width: 200px;
}
</style>
<script>
import axios from "axios";

export default {
  data() {
    return {
      //type:'设备ID',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      input: "",
      option: {
        stock: "全部库房",
        state: "全部状态",
      },
      stockOptions: [],
      stateOptions: [
        {
          value: "待确认",
          label: "待确认",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "全部状态",
          label: "全部状态",
        }
      ],
      tabledata: [],
      tabledataRe: [],
    };
  },
  created: function () {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tabledata = [];
      this.$http({
        url: this.$http.adornUrl("/liferecord/delivery"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.tabledataRe = data.data;
            console.log(data.data);

            for (let item of this.tabledataRe) {
              let t = {
                deliveryid: item.recordid,
                stock: item.oldstockname,
                organization: item.oldorgname,
                mount: item.amount,
                reporter: item.reportername,
                happentime: item.happentime,
                state: item.state,
                executor: item.executorname,
              };
              this.tabledata.push(t);
            }
            this.totalPage = this.tabledata.length;
            // console.log(this.tabledata.length);
          } else {
            this.tabledata = [];
            this.totalPage = 0;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.totalPage = this.tabledata.length;
      console.log(this.tabledata.length);

      this.$http({
        url: this.$http.adornUrl("/stock/stocklist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.stockOptions = data.data.data;
          console.log(data.data.data);
          this.stockOptions.push({
            value:'全部库房',
            label:'全部库房'
          })
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
    search() {
      this.tabledata = []
      if(this.option.state == '全部状态' && this.option.stock == '全部库房' && this.input =='')
      {
         this.getDataList()
         return;
      }
      console.log(this.option.stock)
      console.log(this.option.state)
      // console.log(this.option.executor)
      this.$http({
              url: this.$http.adornUrl("/liferecord/delivery/search"),
              method: "post",
              data: this.$http.adornData({
                'state' :this.option.state == '全部状态' ? null : this.option.state,
                'stock' :this.option.stock == '全部库房' ? null : this.option.stock,
                'executor' : this.input =='' ? null :this.input
              }),
            }).then(({ data }) => {
               if (data && data.code === 0) {
            this.tabledataRe = data.data;
            console.log(data.data);

            for (let item of this.tabledataRe) {
              let t = {
                deliveryid: item.recordid,
                stock: item.oldstockname,
                organization: item.oldorgname,
                mount: item.amount,
                reporter: item.reportername,
                happentime: item.happentime,
                state: item.state,
                executor: item.executorname,
              };
              this.tabledata.push(t);
            }
            this.totalPage = this.tabledata.length;
            // console.log(this.tabledata.length);
          } else {
            this.tabledata = [];
            this.totalPage = 0;
          }
            
            });
    },
    // getStorageTime(index){
    //   return this.tabledata[index].storagedate+""+this.tabledata[index].storagetime;
    // },
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
    selectchanged(val){
      this.search()
    }
  },
};
</script>
