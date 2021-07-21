<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="stockroom">
      <el-input v-model="dataForm.stockroom" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stocktype">
      <el-input v-model="dataForm.stocktype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockdetailloc">
      <el-input v-model="dataForm.stockdetailloc" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockcontainer">
      <el-input v-model="dataForm.stockcontainer" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="orgname">
      <el-input v-model="dataForm.orgname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="companyname">
      <el-input v-model="dataForm.companyname" placeholder=""></el-input>
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
          stockname: 0,
          stockroom: '',
          stocktype: '',
          stockdetailloc: '',
          stockcontainer: '',
          orgname: '',
          companyname: '',
          country: '',
          province: '',
          city: '',
          district: '',
          street: '',
          streetnumber: '',
          state: ''
        },
        dataRule: {
          stockroom: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stocktype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockdetailloc: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockcontainer: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          orgname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          companyname: [
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
        this.dataForm.stockname = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.stockname) {
            this.$http({
              url: this.$http.adornUrl(`/generator/stock/info/${this.dataForm.stockname}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.stockroom = data.stock.stockroom
                this.dataForm.stocktype = data.stock.stocktype
                this.dataForm.stockdetailloc = data.stock.stockdetailloc
                this.dataForm.stockcontainer = data.stock.stockcontainer
                this.dataForm.orgname = data.stock.orgname
                this.dataForm.companyname = data.stock.companyname
                this.dataForm.country = data.stock.country
                this.dataForm.province = data.stock.province
                this.dataForm.city = data.stock.city
                this.dataForm.district = data.stock.district
                this.dataForm.street = data.stock.street
                this.dataForm.streetnumber = data.stock.streetnumber
                this.dataForm.state = data.stock.state
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
              url: this.$http.adornUrl(`/generator/stock/${!this.dataForm.stockname ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'stockname': this.dataForm.stockname || undefined,
                'stockroom': this.dataForm.stockroom,
                'stocktype': this.dataForm.stocktype,
                'stockdetailloc': this.dataForm.stockdetailloc,
                'stockcontainer': this.dataForm.stockcontainer,
                'orgname': this.dataForm.orgname,
                'companyname': this.dataForm.companyname,
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
