<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="任务项名称" prop="itemname">
      <el-input v-model="dataForm.itemname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="任务项描述" prop="itemdescr">
      <el-input v-model="dataForm.itemdescr" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-select v-model="dataForm.state">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
    </el-form-item>
    <el-form-item label="方法" prop="method">
      <el-input v-model="dataForm.method" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="结果" prop="result">
      <el-input v-model="dataForm.result" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="预计工时" prop="hours">
      <el-input v-model="dataForm.hours" placeholder=""></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    // props:{
    //   id:{ type: Number, default: "" }
    // },
    data () {
      return {
         stateOptions:[{
          value: "启用",
          label: "启用",
        },
        {
          value: "禁用",
          label: "禁用",
        },],
        visible: false,
        dataForm: {
          itemid: 0,
          itemname: '',
          itemdescr: '',
          state: '',
          method: '',
          result: '',
          hours: ''
        },
        dataRule: {
          itemname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          itemdescr: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          method: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          hours: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.itemid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.itemid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/missionitem/info/${this.dataForm.itemid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.itemname = data.missionitem.itemname
                this.dataForm.itemdescr = data.missionitem.itemdescr
                this.dataForm.state = data.missionitem.state
                this.dataForm.method = data.missionitem.method
                this.dataForm.result = data.missionitem.result
                this.dataForm.hours = data.missionitem.hours
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/missionitem/${!this.dataForm.itemid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'itemid': this.dataForm.itemid || undefined,
                'itemname': this.dataForm.itemname,
                'itemdescr': this.dataForm.itemdescr,
                'state': this.dataForm.state,
                'method': this.dataForm.method,
                'result': this.dataForm.result,
                'hours': this.dataForm.hours
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
