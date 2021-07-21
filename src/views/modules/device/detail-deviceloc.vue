<template>
    <div>
        <el-row>
            <el-col :span="12">
                <span class="label">仓库名称</span>
                <el-input disabled v-model="location.stockname" style="width:55%"></el-input>
            </el-col>
            <el-col :span="12">
                <span class="label">地址</span>
                <!-- <span class="content">{{location.addr}}</span> -->
                <el-input disabled v-model="location.addr" style="width:55%"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                <span class="label">所在省</span>
                <!-- <span class="content">{{location.province}}</span> -->
                <el-input disabled v-model="location.province" style="width:55%"></el-input>
            </el-col>
            <el-col :span="12">
                <span class="label">所在市</span>
                <!-- <span class="content">{{location.province}}</span> -->
                <el-input disabled v-model="location.province" style="width:55%"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                <span class="label">所在区</span>
                <!-- <span class="content">{{location.district}}</span> -->
                <el-input disabled v-model="location.district" style="width:55%"></el-input>
            </el-col>
            <el-col :span="12">
                <span class="label">所在街道</span>
                <!-- <span class="content">{{location.street}}</span> -->
                <el-input disabled v-model="location.street" style="width:55%"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                <span class="label">所在街道号</span>
                <!-- <span class="content">{{location.streetnumber}}</span> -->
                <el-input disabled v-model="location.streetnumber" style="width:55%"></el-input>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        itemName: {
        type: String,
        default: "",
        },
        itemId: { type: Number, default: "" }
    },
    data(){
        return{
            deviceid:this.itemId,
            location:{
                stockname:'',
                stockroom:'',
                stockcontainer:'',
                stocktype:'',
                stockdetailloc:'',
                country:'',
                province:'',
                city:'',
                district:'',
                street:'',
                streetnumber:'',
                addr:''
            }
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        getdata(){
            this.$http({
              url: this.$http.adornUrl(`/detail/location/${this.deviceid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              if (data && data.code === 0) {
                
                console.log(data.data)
              }
            }).catch((err)=>{
                console.log(err)
            });
        }
    }
}
</script>