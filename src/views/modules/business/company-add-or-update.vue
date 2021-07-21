<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="companyid">
      <el-input v-model="dataForm.companyid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="innerid">
      <el-input v-model="dataForm.innerid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="shortname">
      <el-input v-model="dataForm.shortname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="companytype">
      <el-input v-model="dataForm.companytype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="country">
      <el-input v-model="dataForm.country" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="province">
      <el-input v-model="dataForm.province" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="city">
      <el-input v-model="dataForm.city" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="district">
      <el-input v-model="dataForm.district" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="street">
      <el-input v-model="dataForm.street" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="streetnumber">
      <el-input v-model="dataForm.streetnumber" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="state">
      <el-input v-model="dataForm.state" placeholder=""></el-input>
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
          companyid: '',
          innerid: '',
          companyname: 0,
          shortname: '',
          companytype: '',
          country: '',
          province: '',
          city: '',
          district: '',
          street: '',
          streetnumber: '',
          state: ''
        },
        dataRule: {
          companyid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          innerid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          shortname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          companytype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          district: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          street: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          streetnumber: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.companyname = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.companyname) {
            this.$http({
              url: this.$http.adornUrl(`/generator/company/info/${this.dataForm.companyname}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.companyid = data.company.companyid
                this.dataForm.innerid = data.company.innerid
                this.dataForm.shortname = data.company.shortname
                this.dataForm.companytype = data.company.companytype
                this.dataForm.country = data.company.country
                this.dataForm.province = data.company.province
                this.dataForm.city = data.company.city
                this.dataForm.district = data.company.district
                this.dataForm.street = data.company.street
                this.dataForm.streetnumber = data.company.streetnumber
                this.dataForm.state = data.company.state
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
              url: this.$http.adornUrl(`/generator/company/${!this.dataForm.companyname ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'companyid': this.dataForm.companyid,
                'innerid': this.dataForm.innerid,
                'companyname': this.dataForm.companyname || undefined,
                'shortname': this.dataForm.shortname,
                'companytype': this.dataForm.companytype,
                'country': this.dataForm.country,
                'province': this.dataForm.province,
                'city': this.dataForm.city,
                'district': this.dataForm.district,
                'street': this.dataForm.street,
                'streetnumber': this.dataForm.streetnumber,
                'state': this.dataForm.state
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
