<template>
     <div>
       <el-table :data="tabledata">
        <el-table-column label="厂商名称" prop="manuName">
        </el-table-column>
        <el-table-column label="类型" prop="manuType">
        </el-table-column>
        <el-table-column label="地址" prop="manuAddr">
        </el-table-column>
         <!-- <el-table-column label="操作" width="100px">
             <template slot-scope="scope"><el-button type="text" @click="look(scope.$index, scope.row)">查看</el-button>
            </template>
        </el-table-column> -->
    </el-table>
   
    </div>
</template>
<script>
export default {
    props: {
    itemName: {
      type: String,
      default: "",
    },
    itemId: { type:String, default: "" }
  },
     data(){
        return{
          deviceid:this.itemId,
            dialogVisible:false,
            manutypeoption:[],
            tabledata:[],
            dataForm:{
              manuName:'',
              manuType:'',
              manuAddr:'',
              country: "",
              province: "",
              city: "",
              district: "",
              street: "",
              streetnumber: "",
            }
        }
    },
    created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
        console.log("itemid")
        console.log(this.itemId)
      this.tabledata=[]
      this.$http({
        url: this.$http.adornUrl("/detail/complist"),
        method: 'post',
        params: this.$http.adornParams({
          'deviceid':this.deviceid
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabledataRe = data.data;
          console.log(data.data);
          
          for(let item of this.tabledataRe){
            let t={
              // isselect:false,
              manuName:item.companyname,
              manuType:item.companytype,
              manuAddr: this.getAddr(
                item.country,
                item.province,
                item.city,
                item.district,
                item.street,
                item.streetnumber
              )
            }
            this.tabledata.push(t)
          }
         
          // console.log(this.tabledata.length);
        } else {
          this.tabledata= [];
        //   this.totalPage = 0;
        }
      }).catch((err)=>{
            console.log(err)
      });
    //   this.totalPage = this.tabledata.length;
    //  console.log(this.tabledata.length);
     
    },
    getAddr(country, province, city, district, street, streetnumber) {
      console.log(country);
      if (country == null || country == "") return "";
      else if(street != null && streetnumber != null)
        return (
          country + province + city + district + street + streetnumber + "号"
        );
      else if(street != null){
        return (
          country + province + city + district + street 
        );
      }
      else
        return (
          country + province + city + district
        );
    },
  },
}
</script>