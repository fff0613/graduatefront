<template>
  <div>
      <el-dialog
    title="新增"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="设备编号" prop="deviceid">
      <el-input v-model="dataForm.deviceid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="工单种类" prop="ordertype">
      <el-select v-model="dataForm.ordertype" @change="orderselectchange">
        <el-option v-for="item in typeoptions" :key="item.key" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="addOrUpdateHandle()">确定</el-button>
    </span>
  </el-dialog>
  <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>
<style>
.select.el-input__inner {
  width: 105px;
}
.select.el-input.el-input--medium.el-input--suffix {
  width: 105px;
}
</style>
<script>
import AddOrUpdate from './maintain-add-or-update'
  export default {
     components: {
      AddOrUpdate
    },
    data () {
      return {
        manoptions:[{
          value:'暂停使用',
          label:'暂停使用'
        },
        {
          value:'不暂停使用',
          label:'不暂停使用'
        }],
        typeoptions:[{
          value:'维修',
          label:'维修'
        },
        {
          value:'保养',
          label:'保养'
        }],
        urgencyoptions:[{
          value:1,
          label:"高"
        },
        {
          value:2,
          label:"中"
        },
        {
          value:3,
          label:"低"
        }],
        useroptions:[],
        visible: false,
        dataForm: {
          workorderid: 0,
          deviceid: '',
          reporthappentime: '',
          faultreason: '',
          runtimestate: '',
          desrc: '',
          urgency: '',
          limittime: '',
          executorid: '',
          reporterid: '',
          faultdescr: '',
          faulttype: '',
          maintaintype: '',
          beforedescr: '',
          afterdescr: '',
          preventmeasure: '',
          distributiontime: '',
          executehappentime: '',
          completetime: '',
          checkadice: '',
          state: '',
          timelimit: '',
          unit: '',
          arrivallimit: '',
          ordertype:'',
          theme:''
        },
        dataRule: {
          deviceid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          reporthappentime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
         
          limittime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          executorid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // reporterid: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          theme: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // faulttype: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // maintaintype: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // beforedescr: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // afterdescr: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // preventmeasure: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // distributiontime: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // executehappentime: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // completetime: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // checkadice: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // timelimit: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // unit: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ],
          // arrivallimit: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
        addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/generator/maintain/add'),
              method: 'post',
              data: this.$http.adornData({
                'workorderid': this.dataForm.workorderid || undefined,
                'deviceid': this.dataForm.deviceid,
                'reporthappentime': this.dataForm.reporthappentime,
                'faultreason': this.dataForm.faultreason,
                'runtimestate': this.dataForm.runtimestate,
                'desrc': this.dataForm.desrc,
                'urgency': this.dataForm.urgency,
                'limittime': this.dataForm.limittime,
                'executorid': this.dataForm.executorid == '调度人员' ? null: this.dataForm.executorid,
                'reporterid': this.dataForm.reporterid,
                'faultdescr': this.dataForm.faultdescr,
                'faulttype': this.dataForm.faulttype,
                'maintaintype': this.dataForm.maintaintype,
                'beforedescr': this.dataForm.beforedescr,
                'afterdescr': this.dataForm.afterdescr,
                'preventmeasure': this.dataForm.preventmeasure,
                'distributiontime': this.dataForm.distributiontime,
                'executehappentime': this.dataForm.executehappentime,
                'completetime': this.dataForm.completetime,
                'checkadice': this.dataForm.checkadice,
                'state': this.dataForm.state,
                'timelimit': this.dataForm.timelimit,
                'unit': this.dataForm.unit,
                'arrivallimit': this.dataForm.arrivallimit,
                'ordertype':this.dataForm.ordertype
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
