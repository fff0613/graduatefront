<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-card class="card-num">
                    <el-row ><span class="card-title">平均维修时效</span></el-row>
            <el-row ><span class="card-num">{{avgTime}}</span></el-row>
                </el-card>
            
        </el-col>
        <el-col :span="6">
            <el-card class="card-num">
                <el-row ><span class="card-title">平均故障时间</span></el-row>
            <el-row ><span class="card-num">{{avgbroken}}</span></el-row>
            </el-card>
        </el-col>
        </el-row>
        
        
    </div>
</template>
<style>
.card-num{
    width:200px;
    height:180px;
}
.card-title{
    height: 30px;
}
</style>
<script>
export default {
    data(){
        return{
            avgTime:1.01,
            avgbroken:18.17
        }
    }
}
</script>