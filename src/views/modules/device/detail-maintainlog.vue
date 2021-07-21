<template>
<div>
 <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="维修" name="repair">
                         <el-table :data="repairdata">
         <el-table-column label="工单编号" prop="proId"></el-table-column>
        <el-table-column label="工单名称" prop="proName">
        </el-table-column>
        <el-table-column label="工单类型" prop="proType">
        </el-table-column>
        <el-table-column label="上报时间" prop="reportDate">
        </el-table-column>
        <el-table-column label="申请人" prop="executor">
        </el-table-column>
        <el-table-column label="状态" prop="state">
        </el-table-column>
    </el-table>
            </el-tab-pane>
            <el-tab-pane label="保养" name="maintain">
                 <el-table :data="maintaindata">
         <el-table-column label="工单编号" prop="proId"></el-table-column>
        <el-table-column label="工单名称" prop="proName">
        </el-table-column>
        <el-table-column label="工单类型" prop="proType">
        </el-table-column>
        <el-table-column label="上报时间" prop="reportDate">
        </el-table-column>
        <el-table-column label="申请人" prop="executor">
        </el-table-column>
    
        <el-table-column label="状态" prop="state">
        </el-table-column>
    </el-table>
            </el-tab-pane>
        </el-tabs>

</div>
    <!-- <el-card> -->
       
    <!-- </el-card> -->
    
</template>
<script>
export default {
     props: {
        itemName: {
        type: String,
        default: "",
        },
        itemId: { type: String, default: '' }
    },
    data(){
        return{
            activeName:'repair',
            repairdata:[{
                proId:'1',
                proName:'asd',
                proType:'维修',
                reportDate:'2021-04-04 00:00:00',
                executor:'xxx',
                completeDate:'2021-04-04 00:00:00',
                state:'待确认'
            }
            ],
            maintaindata:[{
                proId:'1',
                proName:'asd',
                proType:'保养',
                reportDate:'2021-04-04 00:00:00',
                executor:'xxx',
                completeDate:'2021-04-04 00:00:00',
                state:'待确认'
            }
            ]
        }
    },
    created(){
        this.getDataList()
    },
    methods:{
        getDataList(){
            console.log("maintainlog")
             this.$http({
              url: this.$http.adornUrl(`/detail/maintainlog/${this.itemId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.maintaindata = data.data
                console.log(data.data)
              }
            }).catch((err)=>{
                console.log(err)
            });
             this.$http({
              url: this.$http.adornUrl(`/detail/repairlog/${this.itemId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.repairdata = data.data
                console.log(data.data)
              }
            }).catch((err)=>{
                console.log(err)
            });
        }
    }
}
</script>