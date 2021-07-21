<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" 
    label-width="125px">
      <el-form-item label="工号" prop="staffId">
        <el-input v-model="dataForm.staffId" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item label="连续签到天数" prop="consecutiveCheckDays">
        <el-input v-model="dataForm.consecutiveCheckDays" placeholder="连续签到天数"></el-input>
      </el-form-item>
      <el-form-item label="累计签到天数" prop="cumulativeCheckDays">
        <el-input v-model="dataForm.cumulativeCheckDays" placeholder="累计签到天数"></el-input>
      </el-form-item>
      <el-form-item label="完成签到的时间" prop="finishedTime">
        <el-date-picker type="date" placeholder="完成签到的时间" v-model="dataForm.finishedTime"   value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="今日签到完成评级" prop="finishedStar">
        <el-input v-model="dataForm.finishedStar" placeholder="今日签到完成评级"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
      watch: {
    "$route.path": function () {
      this.visible = false;
    },
  },
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        staffId: '',
        consecutiveCheckDays: '',
        cumulativeCheckDays: '',
        finishedTime: '',
        finishedStar: '',
        creator: '',
        createDate: '',
        updator: '',
        updateDate: '',
      },
      // todayList: [],
    }
  },
  computed: {
    dataRule () {
      return {
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.getInfo();
        }
        // this.getTodayList();
      })
    },
    // 获取信息
    getInfo () {
      this.$http.get('/SafeTrain/trainsignrecord/' + this.dataForm.id).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('/SafeTrain/trainsignrecord/', this.dataForm).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false }),
    // 获取今日签到
    // getTodayList () {
    //   return this.$http.get('/SafeTrain/trainsignrecord/statisticList').then(({ data: res }) => {
    //     if (res.code !== 0) {
    //       return this.$message.error(res.msg)
    //     }
    //     this.todayList = res.data;
    //     console.log(this.todayList);
    //   }).catch(() => {})
    // },
  }
}
</script>
