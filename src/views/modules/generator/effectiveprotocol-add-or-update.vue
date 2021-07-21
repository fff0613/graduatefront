<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="deviceid">
      <el-input v-model="dataForm.deviceid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="proname">
      <el-input v-model="dataForm.proname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="protype">
      <el-input v-model="dataForm.protype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="manufacture">
      <el-input v-model="dataForm.manufacture" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="starttime">
      <el-input v-model="dataForm.starttime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="endtime">
      <el-input v-model="dataForm.endtime" placeholder=""></el-input>
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
          proid: 0,
          deviceid: '',
          proname: '',
          protype: '',
          manufacture: '',
          starttime: '',
          endtime: ''
        },
        dataRule: {
          deviceid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          proname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          protype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          manufacture: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.proid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.proid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/effectiveprotocol/info/${this.dataForm.proid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deviceid = data.effectiveProtocol.deviceid
                this.dataForm.proname = data.effectiveProtocol.proname
                this.dataForm.protype = data.effectiveProtocol.protype
                this.dataForm.manufacture = data.effectiveProtocol.manufacture
                this.dataForm.starttime = data.effectiveProtocol.starttime
                this.dataForm.endtime = data.effectiveProtocol.endtime
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
              url: this.$http.adornUrl(`/generator/effectiveprotocol/${!this.dataForm.proid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'proid': this.dataForm.proid || undefined,
                'deviceid': this.dataForm.deviceid,
                'proname': this.dataForm.proname,
                'protype': this.dataForm.protype,
                'manufacture': this.dataForm.manufacture,
                'starttime': this.dataForm.starttime,
                'endtime': this.dataForm.endtime
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
