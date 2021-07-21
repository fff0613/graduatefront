<template>
     <el-table :data="tabledata">
         <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="计划名称" prop="proName">
        </el-table-column>
        <el-table-column label="开始日期" prop="startDate">
        </el-table-column>
        <el-table-column label="截止日期" prop="endDate">
        </el-table-column>
        <el-table-column label="预计(天)" prop="estimate">
        </el-table-column>
        <!-- <el-table-column label="设备位置" prop="deviceLoc">
        </el-table-column> -->
        <el-table-column label="状态" prop="state">
        </el-table-column>
         <!-- <el-table-column label="操作" width="100px">
             <template slot-scope="scope"><el-button type="text" @click="deleteorg(scope.$index, scope.row)">编辑</el-button>
             <el-button type="text" @click="deleteorg(scope.$index, scope.row)">禁用</el-button>
             </template>
        </el-table-column> -->
    </el-table>
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
            tabledata:[
            ]
        }
    },
    created(){
        this.getDataList()
    },
    methods:{
        getDataList(){
             this.$http({
              url: this.$http.adornUrl(`/detail/maintainPorject/${this.itemId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                  console.log(data.prolist)
                for(let item of data.prolist){
                    let temp = {
                        id:item.projectid,
                        proName:item.projectname,
                        startDate:item.starttime,
                        endDate:item.endtime,
                        estimate:item.estimate,
                        state:item.state
                    }
                    this.tabledata.push(temp)
                }
              }
            }).catch((err)=>{
                console.log(err)
            });
        }
    }
}
</script>