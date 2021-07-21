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
          class="select"
        ></el-option>
      </el-select>
      <!-- </el-col> -->
      <!-- <el-col > -->
      <el-input v-model="option.executor" placeholder="执行人姓名" style="width:250px">
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
        @click="$router.push({ name: 'device-storage-mannual' })"
        >入库</el-button
      >
      <!-- </el-col> -->
    </el-row>

    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
    <el-table border :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)" style="width: 100%;margin-top:20px" height="550">
      <el-table-column fixed label="入库单号" prop="storageid"
        ><template slot-scope="scope"
          ><el-button
            v-model="scope.row.storageid"
            type="text"
            @click="
              $router.push({
                name: 'life-ifo',
                query: {
                  recordid: scope.row.storageid
                },
              })
            "
            >{{ scope.row.storageid }}</el-button
          ></template
        >
      </el-table-column>
      <el-table-column label="所属库房" prop="stockname"
        ><template slot-scope="scope"
          ><el-button
            v-model="scope.row.stockname"
            type="text"
            @click="$router.push({ name: 'stock-manage' })"
            >{{ scope.row.stockname }}</el-button
          ></template
        >
      </el-table-column>
      <el-table-column
        prop="oraganization"
        label="所属组"
       
      ></el-table-column>
      <el-table-column
        prop="mount"
        label="入库数量"
       
      ></el-table-column>
      <el-table-column
        prop="executor"
        label="执行人员"
        
      ></el-table-column>
      <el-table-column
        prop="happentime"
        label="入库时间"
        
      ></el-table-column>
      <el-table-column prop="state" label="状态" ></el-table-column>
      <!-- <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              $router.push({
                name: 'life-ifo',
                query: { recordid: scope.row.strorageid },
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
  width: 150px;
}
.select .el-input.el-input--medium.el-input--suffix {
  width: 150px;
}
</style>
<script>

export default {
  data() {
    return {
      //type:'设备ID',
       pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      option: {
        stock: "全部库房",
        state: "全部状态",
        executor:""
      },
     stockOptions: [],
       stateOptions:[{
        value:"待确认",
        label:"待确认"
      },
      {
        value:"已完成",
        label:"已完成"
      },
      {
          value: "全部状态",
          label: "全部状态",
      }
      ],
      tabledata: [
        {
          storageid: "",
          stockname: "",
          oraganization: "",
          mount: "",
          reporter: "",
          happentime: "",
          state: ""
        }
      ],
    };
  },
  created: function () {
    this.getDataList()
  },
  methods: {
   getDataList() {
      this.tabledata=[]
      this.$http({
        url: this.$http.adornUrl("/liferecord/storage"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledataRe = data.data;
          // console.log(data.data);
          
          for(let item of this.tabledataRe){
            let t={
              // isselect:false,
              storageid: item.recordid,
              stockname: item.stockname,
              oraganization: item.orgname,
              mount: item.amount,
              reporter: item.reportername,
              happentime: item.happentime,
              executor:item.executorname,
              state: item.state,
            }
            this.tabledata.push(t)
          }
          this.totalPage = this.tabledata.length
          // console.log(this.tabledata.length);
        } else {
          this.tabledata = [];
          this.totalPage = 0;
        }
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
          console.log(data.data.data)
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
      if(this.option.state == '全部状态' && this.option.stock == '全部库房' && this.option.executor =='')
      {
         this.getDataList()
         return;
      }
      console.log(this.option.stock)
      console.log(this.option.state)
      console.log(this.option.executor)
      this.$http({
              url: this.$http.adornUrl("/liferecord/storage/search"),
              method: "post",
              data: this.$http.adornData({
                'state' :this.option.state == '全部状态' ? null : this.option.state,
                'stock' :this.option.stock == '全部库房' ? null : this.option.stock,
                'executor' : this.input =='' ? null :this.option.executor
              }),
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledataRe = data.data;
                // console.log(data.data);
                
                for(let item of this.tabledataRe){
                  let t={
                    // isselect:false,
                    storageid: item.recordid,
                    stockname: item.stockname,
                    oraganization: item.orgname,
                    mount: item.amount,
                    reporter: item.reportername,
                    happentime: item.happentime,
                    executor:item.executorname,
                    state: item.state,
                  }
                  this.tabledata.push(t)
                }
                this.totalPage = this.tabledata.length
                // console.log(this.tabledata.length);
              } else {
                this.tabledata = [];
                this.totalPage = 0;
              }
            
            });
    },
    selectchanged(val){
      this.search()
    }
  },
};
</script>
