<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="devicename">
      <el-input v-model="dataForm.devicename" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="devicetype">
      <el-input v-model="dataForm.devicetype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="devicemodel">
      <el-input v-model="dataForm.devicemodel" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="devicesourse">
      <el-input v-model="dataForm.devicesourse" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="devicestate">
      <el-input v-model="dataForm.devicestate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="buydate">
      <el-input v-model="dataForm.buydate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="taxrate">
      <el-input v-model="dataForm.taxrate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="beforetax">
      <el-input v-model="dataForm.beforetax" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="tax">
      <el-input v-model="dataForm.tax" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="manufacture">
      <el-input v-model="dataForm.manufacture" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="supporter">
      <el-input v-model="dataForm.supporter" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="storagedate">
      <el-input v-model="dataForm.storagedate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="storagebatch">
      <el-input v-model="dataForm.storagebatch" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockdetailloc">
      <el-input v-model="dataForm.stockdetailloc" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockcontainer">
      <el-input v-model="dataForm.stockcontainer" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockroom">
      <el-input v-model="dataForm.stockroom" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockname">
      <el-input v-model="dataForm.stockname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="stockid">
      <el-input v-model="dataForm.stockid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="effectivedate">
      <el-input v-model="dataForm.effectivedate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="amount">
      <el-input v-model="dataForm.amount" placeholder=""></el-input>
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
          deviceid: 0,
          devicename: '',
          devicetype: '',
          devicemodel: '',
          devicesourse: '',
          devicestate: '',
          buydate: '',
          taxrate: '',
          beforetax: '',
          tax: '',
          manufacture: '',
          supporter: '',
          storagedate: '',
          storagebatch: '',
          stockdetailloc: '',
          stockcontainer: '',
          stockroom: '',
          stockname: '',
          stockid: '',
          effectivedate: '',
          amount: ''
        },
        dataRule: {
          devicename: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          devicetype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          devicemodel: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          devicesourse: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          devicestate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          buydate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          taxrate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          beforetax: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          tax: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          manufacture: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          supporter: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          storagedate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          storagebatch: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockdetailloc: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockcontainer: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockroom: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          stockid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          effectivedate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.deviceid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.deviceid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/device/info/${this.dataForm.deviceid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.devicename = data.device.devicename
                this.dataForm.devicetype = data.device.devicetype
                this.dataForm.devicemodel = data.device.devicemodel
                this.dataForm.devicesourse = data.device.devicesourse
                this.dataForm.devicestate = data.device.devicestate
                this.dataForm.buydate = data.device.buydate
                this.dataForm.taxrate = data.device.taxrate
                this.dataForm.beforetax = data.device.beforetax
                this.dataForm.tax = data.device.tax
                this.dataForm.manufacture = data.device.manufacture
                this.dataForm.supporter = data.device.supporter
                this.dataForm.storagedate = data.device.storagedate
                this.dataForm.storagebatch = data.device.storagebatch
                this.dataForm.stockdetailloc = data.device.stockdetailloc
                this.dataForm.stockcontainer = data.device.stockcontainer
                this.dataForm.stockroom = data.device.stockroom
                this.dataForm.stockname = data.device.stockname
                this.dataForm.stockid = data.device.stockid
                this.dataForm.effectivedate = data.device.effectivedate
                this.dataForm.amount = data.device.amount
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
              url: this.$http.adornUrl(`/generator/device/${!this.dataForm.deviceid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'deviceid': this.dataForm.deviceid || undefined,
                'devicename': this.dataForm.devicename,
                'devicetype': this.dataForm.devicetype,
                'devicemodel': this.dataForm.devicemodel,
                'devicesourse': this.dataForm.devicesourse,
                'devicestate': this.dataForm.devicestate,
                'buydate': this.dataForm.buydate,
                'taxrate': this.dataForm.taxrate,
                'beforetax': this.dataForm.beforetax,
                'tax': this.dataForm.tax,
                'manufacture': this.dataForm.manufacture,
                'supporter': this.dataForm.supporter,
                'storagedate': this.dataForm.storagedate,
                'storagebatch': this.dataForm.storagebatch,
                'stockdetailloc': this.dataForm.stockdetailloc,
                'stockcontainer': this.dataForm.stockcontainer,
                'stockroom': this.dataForm.stockroom,
                'stockname': this.dataForm.stockname,
                'stockid': this.dataForm.stockid,
                'effectivedate': this.dataForm.effectivedate,
                'amount': this.dataForm.amount
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
