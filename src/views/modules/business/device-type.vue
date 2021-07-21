<template>
  <div>
    <el-row >
      <el-input v-model="condition" placeholder="名称" style="width:250px">
          <el-button
          slot="append"
          icon="el-icon-search"
          style="width: 50"
          type="primary"
          @click="search()"
        ></el-button>
        </el-input>
      <!-- <el-col :span="6"> -->
        <el-button type="primary" @click="addType()">新增</el-button>
      <!-- </el-col> -->
    </el-row>
    <el-dialog
      title="添加新类型"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="typeform"
        :model="typeform"
        :rules="rules"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="设备类型" prop="type">
          <el-input v-model="typeform.type" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="descr">
          <el-input v-model="typeform.descr" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="typeform.state">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑类型" :visible.sync="editdialogVisible">
      <el-form
        ref="typeform"
        :model="typeform"
        :rules="rules"
        label-position="right"
      >
        <el-form-item label="设备类型" prop="type">
          <el-input
            v-model="typeform.type"
            disabled
            style="width: 50%"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="descr">
          <el-input v-model="typeform.descr" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="typeform.state">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      border
      style="margin-top:20px"
    >
      <el-table-column label="设备类型" prop="type" sortable> </el-table-column>
      <el-table-column label="描述" prop="descr"> </el-table-column>
      <el-table-column label="状态" prop="state" >
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row.type)"
            >删除</el-button
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
          <!-- 删除需要级联型号 -->
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
export default {
  data() {
    return {
      condition: "",
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      editdialogVisible: false,
      dialogVisible: false,
      type: "全部类型",
      state: "",
      options: [
        {
          value: "启用",
          label: "启用",
        },
        {
          value: "禁用",
          label: "禁用",
        },
      ],
      tabledata: [],
      typeform: {
        type: "",
        descr: "",
        state: "",
      },
      rules: {
        type: [
          { required: true, message: "请输入设备类型名称", trigger: "blur" },
        ],
        state: [{ required: true, message: "请输入状态", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/devicetype/ifo"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledata = data.data;
          this.totalPage = this.tabledata.length;
          console.log(this.tabledata.length);
        } else {
          this.dataList = [];
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
    addType() {
      this.dialogVisible = true;
      this.typeform = {
        type: "",
        descr: "",
        state: "",
      };
    },
    handleEdit(index, row) {
      this.editdialogVisible = true;
      this.typeform = this.tabledata[index];
    },
    submitEdit() {
      this.editdialogVisible = false;
      this.$refs["typeform"].validate((valid) => {
        if (!valid) {
          alert("输入错误!");
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/devicetype/updatetype"),
            method: "post",
            data: this.$http.adornData({
              type: this.typeform.type,
              descr: this.typeform.descr,
              state: this.typeform.state,
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
              alert("更新失败!");
              this.$message.error(data.msg);
            }
          });
        }
      });
      this.form = {
        type: "",
        descr: "",
        state: "",
      };
    },
    //未解决==
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
          type: this.tabledata[index].type,
          state: this.tabledata[index].state,
          descr: this.tabledata[index].descr,
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
    search(condition) {
      if (condition == "" || condition == undefined || condition == null)
        this.getDataList();
      else {
        this.$http({
          url: this.$http.adornUrl(`/devicetype/search/${this.condition}`),
          method: "get",
          params: this.$http.adornParams(),
        }).then((data) => {
          if (data && data.code === 0) {
            this.tabledata = data.data;
            this.totalPage = this.tabledata.length;
            console.log(data.data);
            this.pageIndex = 1;
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              },
            });
          } else {
            this.tabledata = [];
            this.totalPage = 0;
            this.pageIndex = 1;
          }
        });
      }
    },
    submit() {
      this.$refs["typeform"].validate((valid) => {
        if (!valid) {
          alert("输入错误!");
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/devicetype/add"),
            method: "post",
            data: this.$http.adornData({
              type: this.typeform.type,
              descr: this.typeform.descr,
              state: this.typeform.state,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  // this.visible = false
                  this.dialogVisible = false;
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
      this.typeform = {
        type: "",
        descr: "",
        state: "",
      };
    },
     search() {
       this.tabledata = []
      if (this.condition == "" || this.condition == undefined || this.condition == null)
        this.getDataList();
      else{
        this.$http({
              url: this.$http.adornUrl(`/devicetype/search/${this.condition}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledata = data.data;
                this.totalPage = this.tabledata.length;
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
    handleDelete(id) {
      var userIds = [id];
      this.$confirm(
        `确定对[设备类型=${userIds.join(",")}]进行[${
          id ? "删除" : "批量删除"
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
            url: this.$http.adornUrl("/devicetype/delete"),
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
  },
};
</script>