<template>
  <div>
    <el-row>
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
        <el-button type="primary" @click="addModel()">新增</el-button>
      <!-- </el-col> -->
    </el-row>
    <el-dialog title="添加新型号" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="form.model" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="modelname">
          <el-input v-model="form.modelname" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="部件类型" prop="type">
          <el-select v-model="form.type">
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
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑型号" :visible.sync="editdialogVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="form.model" style="width: 50%" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="modelname">
          <el-input v-model="form.modelname" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="部件类型" prop="type">
          <el-select v-model="form.type">
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
      :data="tabledata.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)" border
      style="margin-top:20px"
    >
      <el-table-column label="部件型号" prop="model"> </el-table-column>
      <el-table-column label="名称" prop="modelname"> </el-table-column>
      <el-table-column label="部件类型" prop="type" width="400px">
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
            @click="handleDelete(scope.row.model)"
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
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      editdialogVisible: false,
      dialogVisible: false,
      options: [],
      condition: "",
      type: "全部类型",
      tabledata: [],
      form: {
        model: "",
        modelname: "",
        type: "",
      },
      rules: {
        model: [{ required: true, message: "请输入设备型号", trigger: "blur" }],
        modelname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
      },
      deleteArray: [],
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/devicemodel/ifo"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledata = data.data;
          console.log(data.data);
          this.totalPage = this.tabledata.length;
          console.log(this.tabledata.length);
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
      });
      this.$http({
        url: this.$http.adornUrl("/devicetype/typelist"),
        method: "get",
        params: this.$http.adornParams(),
      })
        .then((data) => {
          this.options = data.data.data;
          // console.log(data.data.data)
        })
        .catch(() => {
          console.log("error");
        });
    },
    search(condition) {
      if (condition == "" || condition == undefined || condition == null)
        this.getDataList();
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
    addModel() {
      this.dialogVisible = true;
      this.form = {
        model: "",
        modelname: "",
        type: "",
      };
      console.log("options");
      console.log(this.options);
    },
    submitAdd() {
      this.dialogVisible = false;
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          // alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/devicemodel/add"),
            method: "post",
            data: this.$http.adornData({
              model: this.form.model,
              modelname: this.form.modelname,
              type: this.form.type,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              // getDataList()
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
        model: "",
        modelname: "",
        type: "",
      };
    },
    handleEdit(index, row) {
      this.editdialogVisible = true;
      this.form = {
        model: row.model,
        modelname: row.modelname,
        type: row.type,
      };
    },
    submitEdit() {
      this.editdialogVisible = false;
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          // alert('输入错误!');
          return;
        } else {
          this.$http({
            url: this.$http.adornUrl("/devicemodel/update"),
            method: "post",
            data: this.$http.adornData({
              model: this.form.model,
              modelname: this.form.modelname,
              type: this.form.type,
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
        model: "",
        modelname: "",
        type: "",
      };
    },
    handleDelete(id) {
      var userIds = [id];
      this.$confirm(
        `确定对[设备型号=${userIds.join(",")}]进行[${
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
            url: this.$http.adornUrl("/devicemodel/delete"),
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
    search() {
       this.tabledata = []
      if (this.condition == "" || this.condition == undefined || this.condition == null)
        this.getDataList();
      else{
        this.$http({
              url: this.$http.adornUrl(`/devicemodel/search/${this.condition}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.tabledata = data.data;
                console.log(data.data);
                this.totalPage = this.tabledata.length;
                // console.log(this.tabledata.length);
              } else {
                this.dataList = [];
                this.totalPage = 0;
              }
            });
      }
    },
  },
};
</script>