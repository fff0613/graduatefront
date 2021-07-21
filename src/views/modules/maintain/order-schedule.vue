<template>
   <el-container>
       <el-header>
            <el-select v-model="condition.keyword">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.velue">
                </el-option>
            </el-select>
             <span>发起时间:</span>
      <el-date-picker
      v-model="condition.startDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
      <span>至</span>
      <el-date-picker
      v-model="condition.endDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="query">新建工单</el-button>
       </el-header>
       <el-main>
           <el-table :data="tabledata">
               <el-table-column label="维修人员" prop="executor">
               </el-table-column>
               <el-table-column v-for="date in calender" :key="date.date" :label="date.date" prop=""></el-table-column>
           </el-table>
       </el-main>
   </el-container>
</template>
<script>
export default{
    data(){
        return{
            options:[{
                value:"13-103",
                label:'13-103'
            }],
            condition:{
                keyword:'所有地址',
                startDate:'',
                endDate:''
            },
            tabledata:[{
                executor:'xxx'
            }],
            calender:[]
        }
    },
    mounted(){
        this.getAll(this.condition.startDate,this.condition.endDate)
    },
    methods:{
        query(){
            this.getAll(this.condition.startDate,this.condition.endDate)
        },
        
	  // 计算续住的总日期列表
      getAll(begin, end) {
         let data=[]
            this.start= begin == '' ? this.getDay(+7):begin;
            this.end= end == '' ?this.getDay():end;
            console.log(begin)
            for(let i=6;i>=0;i--){
            data.push(this.getDay(+i))
            }
        var date=data.reverse()//得出一周的日期进行排序
        this.week=date;
        var date=this.week;
        var pkc=[];/* 用于存储展示的日期数据 */
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        date.forEach((item,index)=>{//循坏日期
            var f=new Date(item);
            var week=f.getDay()//计算出星期几
            var str1=item.split('/');
            var strs=str1[1]+'/'+str1[2];

            var weeks=weekday[week]/* 将计算出来的时间带入数字得出中文 */
            var time= Math.round(new Date(item) / 1000)//时间戳转换
            var s={}//用于存储每个日期对象
            s.date=item;
            s.name=strs;
            s.week=weeks;
            s.times=time;
            pkc.push(s)
        })
        // for(item of pkc){
            
        // }
        this.calender=pkc;
        console.log(this.calender)
      },
      getDay(day){
     　　var today = new Date();
     　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
     　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
     　　var tYear = today.getFullYear();
     　　var tMonth = today.getMonth();
     　　var tDate = today.getDate();
     　　tMonth = this.doHandleMonth(tMonth + 1);
     　　tDate =  this.doHandleMonth(tDate);
     　　return tYear+"/"+tMonth+"/"+tDate;
     },
     doHandleMonth(month){
     　　var m = month;
     　　if(month.toString().length == 1){
       　　m =month;
     　　}
     　　return m;
     　　
     },

    }
}
</script>