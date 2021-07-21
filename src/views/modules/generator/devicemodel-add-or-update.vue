<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="modename">
      <el-input v-model="dataForm.modename" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="type">
      <el-input v-model="dataForm.type" placeholder=""></el-input>
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
    data () {
      return {
        visible: false,
        dataForm: {
          model: 0,
          modename: '',
          type: ''
        },
        dataRule: {
          modename: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.model = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.model) {
            this.$http({
              url: this.$http.adornUrl(`/generator/devicemodel/info/${this.dataForm.model}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.modename = data.deviceModel.modename
                this.dataForm.type = data.deviceModel.type
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
              url: this.$http.adornUrl(`/generator/devicemodel/${!this.dataForm.model ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'model': this.dataForm.model || undefined,
                'modename': this.dataForm.modename,
                'type': this.dataForm.type
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
