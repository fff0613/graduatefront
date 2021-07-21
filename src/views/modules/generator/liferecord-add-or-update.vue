<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="recordtype">
      <el-input v-model="dataForm.recordtype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="organizationname">
      <el-input v-model="dataForm.organizationname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="deviceid">
      <el-input v-model="dataForm.deviceid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="happentime">
      <el-input v-model="dataForm.happentime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="storagetype">
      <el-input v-model="dataForm.storagetype" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="storagebatch">
      <el-input v-model="dataForm.storagebatch" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="originorganizationname">
      <el-input v-model="dataForm.originorganizationname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="deliverybatch">
      <el-input v-model="dataForm.deliverybatch" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="lenttime">
      <el-input v-model="dataForm.lenttime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="givebacktime">
      <el-input v-model="dataForm.givebacktime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="lentuserid">
      <el-input v-model="dataForm.lentuserid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="givebackuserid">
      <el-input v-model="dataForm.givebackuserid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="lentstate">
      <el-input v-model="dataForm.lentstate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="givebackstate">
      <el-input v-model="dataForm.givebackstate" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="beforeimg">
      <el-input v-model="dataForm.beforeimg" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="afterimg">
      <el-input v-model="dataForm.afterimg" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="descrimg">
      <el-input v-model="dataForm.descrimg" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="allocationtime">
      <el-input v-model="dataForm.allocationtime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="tuneintime">
      <el-input v-model="dataForm.tuneintime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="tuneincompanyname">
      <el-input v-model="dataForm.tuneincompanyname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="tuneindepartment">
      <el-input v-model="dataForm.tuneindepartment" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="residualvaule">
      <el-input v-model="dataForm.residualvaule" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="moneysum">
      <el-input v-model="dataForm.moneysum" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="returncompanyname">
      <el-input v-model="dataForm.returncompanyname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="oldstockcontainer">
      <el-input v-model="dataForm.oldstockcontainer" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="oldstockroom">
      <el-input v-model="dataForm.oldstockroom" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="oldstockname">
      <el-input v-model="dataForm.oldstockname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="oldcompanyname">
      <el-input v-model="dataForm.oldcompanyname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="oldorgname">
      <el-input v-model="dataForm.oldorgname" placeholder=""></el-input>
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
    <el-form-item label="" prop="companyname">
      <el-input v-model="dataForm.companyname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="orgname">
      <el-input v-model="dataForm.orgname" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="reporterid">
      <el-input v-model="dataForm.reporterid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="executorid">
      <el-input v-model="dataForm.executorid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="responsibleuserid">
      <el-input v-model="dataForm.responsibleuserid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="allocationuserid">
      <el-input v-model="dataForm.allocationuserid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="tuneinuserid">
      <el-input v-model="dataForm.tuneinuserid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="checkuserid">
      <el-input v-model="dataForm.checkuserid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="reason">
      <el-input v-model="dataForm.reason" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="amount">
      <el-input v-model="dataForm.amount" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="state">
      <el-input v-model="dataForm.state" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="descr">
      <el-input v-model="dataForm.descr" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="afterdescr">
      <el-input v-model="dataForm.afterdescr" placeholder=""></el-input>
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
          recordid: 0,
          recordtype: '',
          organizationname: '',
          deviceid: '',
          happentime: '',
          storagetype: '',
          storagebatch: '',
          originorganizationname: '',
          deliverybatch: '',
          lenttime: '',
          givebacktime: '',
          lentuserid: '',
          givebackuserid: '',
          lentstate: '',
          givebackstate: '',
          beforeimg: '',
          afterimg: '',
          descrimg: '',
          allocationtime: '',
          tuneintime: '',
          tuneincompanyname: '',
          tuneindepartment: '',
          residualvaule: '',
          moneysum: '',
          returncompanyname: '',
          oldstockcontainer: '',
          oldstockroom: '',
          oldstockname: '',
          oldcompanyname: '',
          oldorgname: '',
          stockcontainer: '',
          stockroom: '',
          stockname: '',
          companyname: '',
          orgname: '',
          reporterid: '',
          executorid: '',
          responsibleuserid: '',
          allocationuserid: '',
          tuneinuserid: '',
          checkuserid: '',
          reason: '',
          amount: '',
          state: '',
          descr: '',
          afterdescr: ''
        },
        dataRule: {
          recordtype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          organizationname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          deviceid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          happentime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          storagetype: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          storagebatch: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          originorganizationname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          deliverybatch: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          lenttime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          givebacktime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          lentuserid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          givebackuserid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          lentstate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          givebackstate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          beforeimg: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          afterimg: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          descrimg: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          allocationtime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          tuneintime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          tuneincompanyname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          tuneindepartment: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          residualvaule: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          moneysum: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          returncompanyname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          oldstockcontainer: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          oldstockroom: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          oldstockname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          oldcompanyname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          oldorgname: [
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
          companyname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          orgname: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          reporterid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          executorid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          responsibleuserid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          allocationuserid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          tuneinuserid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          checkuserid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          descr: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          afterdescr: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.recordid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.recordid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/liferecord/info/${this.dataForm.recordid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.recordtype = data.liferecord.recordtype
                this.dataForm.organizationname = data.liferecord.organizationname
                this.dataForm.deviceid = data.liferecord.deviceid
                this.dataForm.happentime = data.liferecord.happentime
                this.dataForm.storagetype = data.liferecord.storagetype
                this.dataForm.storagebatch = data.liferecord.storagebatch
                this.dataForm.originorganizationname = data.liferecord.originorganizationname
                this.dataForm.deliverybatch = data.liferecord.deliverybatch
                this.dataForm.lenttime = data.liferecord.lenttime
                this.dataForm.givebacktime = data.liferecord.givebacktime
                this.dataForm.lentuserid = data.liferecord.lentuserid
                this.dataForm.givebackuserid = data.liferecord.givebackuserid
                this.dataForm.lentstate = data.liferecord.lentstate
                this.dataForm.givebackstate = data.liferecord.givebackstate
                this.dataForm.beforeimg = data.liferecord.beforeimg
                this.dataForm.afterimg = data.liferecord.afterimg
                this.dataForm.descrimg = data.liferecord.descrimg
                this.dataForm.allocationtime = data.liferecord.allocationtime
                this.dataForm.tuneintime = data.liferecord.tuneintime
                this.dataForm.tuneincompanyname = data.liferecord.tuneincompanyname
                this.dataForm.tuneindepartment = data.liferecord.tuneindepartment
                this.dataForm.residualvaule = data.liferecord.residualvaule
                this.dataForm.moneysum = data.liferecord.moneysum
                this.dataForm.returncompanyname = data.liferecord.returncompanyname
                this.dataForm.oldstockcontainer = data.liferecord.oldstockcontainer
                this.dataForm.oldstockroom = data.liferecord.oldstockroom
                this.dataForm.oldstockname = data.liferecord.oldstockname
                this.dataForm.oldcompanyname = data.liferecord.oldcompanyname
                this.dataForm.oldorgname = data.liferecord.oldorgname
                this.dataForm.stockcontainer = data.liferecord.stockcontainer
                this.dataForm.stockroom = data.liferecord.stockroom
                this.dataForm.stockname = data.liferecord.stockname
                this.dataForm.companyname = data.liferecord.companyname
                this.dataForm.orgname = data.liferecord.orgname
                this.dataForm.reporterid = data.liferecord.reporterid
                this.dataForm.executorid = data.liferecord.executorid
                this.dataForm.responsibleuserid = data.liferecord.responsibleuserid
                this.dataForm.allocationuserid = data.liferecord.allocationuserid
                this.dataForm.tuneinuserid = data.liferecord.tuneinuserid
                this.dataForm.checkuserid = data.liferecord.checkuserid
                this.dataForm.reason = data.liferecord.reason
                this.dataForm.amount = data.liferecord.amount
                this.dataForm.state = data.liferecord.state
                this.dataForm.descr = data.liferecord.descr
                this.dataForm.afterdescr = data.liferecord.afterdescr
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
              url: this.$http.adornUrl(`/generator/liferecord/${!this.dataForm.recordid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'recordid': this.dataForm.recordid || undefined,
                'recordtype': this.dataForm.recordtype,
                'organizationname': this.dataForm.organizationname,
                'deviceid': this.dataForm.deviceid,
                'happentime': this.dataForm.happentime,
                'storagetype': this.dataForm.storagetype,
                'storagebatch': this.dataForm.storagebatch,
                'originorganizationname': this.dataForm.originorganizationname,
                'deliverybatch': this.dataForm.deliverybatch,
                'lenttime': this.dataForm.lenttime,
                'givebacktime': this.dataForm.givebacktime,
                'lentuserid': this.dataForm.lentuserid,
                'givebackuserid': this.dataForm.givebackuserid,
                'lentstate': this.dataForm.lentstate,
                'givebackstate': this.dataForm.givebackstate,
                'beforeimg': this.dataForm.beforeimg,
                'afterimg': this.dataForm.afterimg,
                'descrimg': this.dataForm.descrimg,
                'allocationtime': this.dataForm.allocationtime,
                'tuneintime': this.dataForm.tuneintime,
                'tuneincompanyname': this.dataForm.tuneincompanyname,
                'tuneindepartment': this.dataForm.tuneindepartment,
                'residualvaule': this.dataForm.residualvaule,
                'moneysum': this.dataForm.moneysum,
                'returncompanyname': this.dataForm.returncompanyname,
                'oldstockcontainer': this.dataForm.oldstockcontainer,
                'oldstockroom': this.dataForm.oldstockroom,
                'oldstockname': this.dataForm.oldstockname,
                'oldcompanyname': this.dataForm.oldcompanyname,
                'oldorgname': this.dataForm.oldorgname,
                'stockcontainer': this.dataForm.stockcontainer,
                'stockroom': this.dataForm.stockroom,
                'stockname': this.dataForm.stockname,
                'companyname': this.dataForm.companyname,
                'orgname': this.dataForm.orgname,
                'reporterid': this.dataForm.reporterid,
                'executorid': this.dataForm.executorid,
                'responsibleuserid': this.dataForm.responsibleuserid,
                'allocationuserid': this.dataForm.allocationuserid,
                'tuneinuserid': this.dataForm.tuneinuserid,
                'checkuserid': this.dataForm.checkuserid,
                'reason': this.dataForm.reason,
                'amount': this.dataForm.amount,
                'state': this.dataForm.state,
                'descr': this.dataForm.descr,
                'afterdescr': this.dataForm.afterdescr
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
