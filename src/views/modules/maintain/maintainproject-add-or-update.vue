<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="projectname">
      <el-input v-model="dataForm.projectname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="projectloc">
      <el-input v-model="dataForm.projectloc" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="projecttype">
      <el-input v-model="dataForm.projecttype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="starttime">
      <el-input v-model="dataForm.starttime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="endtime">
      <el-input v-model="dataForm.endtime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="state">
      <el-input v-model="dataForm.state" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="estimate">
      <el-input v-model="dataForm.estimate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="isdelivery">
      <el-input v-model="dataForm.isdelivery" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="con">
      <el-input v-model="dataForm.con" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="contype">
      <el-input v-model="dataForm.contype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="conproject">
      <el-input v-model="dataForm.conproject" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="unit">
      <el-input v-model="dataForm.unit" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="cycle">
      <el-input v-model="dataForm.cycle" placeholder=""></el-input>
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
          projectid: 0,
          projectname: '',
          projectloc: '',
          projecttype: '',
          starttime: '',
          endtime: '',
          state: '',
          estimate: '',
          isdelivery: '',
          con: '',
          contype: '',
          conproject: '',
          unit: '',
          cycle: ''
        },
        dataRule: {
          projectname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          projectloc: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          projecttype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          estimate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          isdelivery: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          con: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          contype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          conproject: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cycle: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.projectid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.projectid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/maintainproject/info/${this.dataForm.projectid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.projectname = data.maintainproject.projectname
                this.dataForm.projectloc = data.maintainproject.projectloc
                this.dataForm.projecttype = data.maintainproject.projecttype
                this.dataForm.starttime = data.maintainproject.starttime
                this.dataForm.endtime = data.maintainproject.endtime
                this.dataForm.state = data.maintainproject.state
                this.dataForm.estimate = data.maintainproject.estimate
                this.dataForm.isdelivery = data.maintainproject.isdelivery
                this.dataForm.con = data.maintainproject.con
                this.dataForm.contype = data.maintainproject.contype
                this.dataForm.conproject = data.maintainproject.conproject
                this.dataForm.unit = data.maintainproject.unit
                this.dataForm.cycle = data.maintainproject.cycle
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
              url: this.$http.adornUrl(`/generator/maintainproject/${!this.dataForm.projectid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'projectid': this.dataForm.projectid || undefined,
                'projectname': this.dataForm.projectname,
                'projectloc': this.dataForm.projectloc,
                'projecttype': this.dataForm.projecttype,
                'starttime': this.dataForm.starttime,
                'endtime': this.dataForm.endtime,
                'state': this.dataForm.state,
                'estimate': this.dataForm.estimate,
                'isdelivery': this.dataForm.isdelivery,
                'con': this.dataForm.con,
                'contype': this.dataForm.contype,
                'conproject': this.dataForm.conproject,
                'unit': this.dataForm.unit,
                'cycle': this.dataForm.cycle
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
