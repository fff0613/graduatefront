<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="人员姓名" prop="username">
      <el-input v-model="dataForm.username" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="到岗时间" prop="arrivaltime">
      <el-input v-model="dataForm.arrivaltime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="到达位置" prop="arrivalloc">
      <el-input v-model="dataForm.arrivalloc" placeholder=""></el-input>
    </el-form-item>
    <!-- <el-form-item label="" prop="country">
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
    </el-form-item> -->
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
          userid: 0,
          username: '',
          arrivaltime: '',
          arrivalloc: '',
          country: '',
          province: '',
          city: '',
          district: '',
          street: '',
          streetnumber: ''
        },
        dataRule: {
          username: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          arrivaltime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          arrivalloc: [
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
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/fellowarrival/info/${this.dataForm.userid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.fellowarrival.username
                this.dataForm.arrivaltime = data.fellowarrival.arrivaltime
                this.dataForm.arrivalloc = data.fellowarrival.arrivalloc
                this.dataForm.country = data.fellowarrival.country
                this.dataForm.province = data.fellowarrival.province
                this.dataForm.city = data.fellowarrival.city
                this.dataForm.district = data.fellowarrival.district
                this.dataForm.street = data.fellowarrival.street
                this.dataForm.streetnumber = data.fellowarrival.streetnumber
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
              url: this.$http.adornUrl(`/generator/fellowarrival/${!this.dataForm.userid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userid': this.dataForm.userid || undefined,
                'username': this.dataForm.username,
                'arrivaltime': this.dataForm.arrivaltime,
                'arrivalloc': this.dataForm.arrivalloc,
                'country': this.dataForm.country,
                'province': this.dataForm.province,
                'city': this.dataForm.city,
                'district': this.dataForm.district,
                'street': this.dataForm.street,
                'streetnumber': this.dataForm.streetnumber
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
