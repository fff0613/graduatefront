<template>
  
</template>
<script >
export default {
  data() {
    return {
      options: [
        {
          value: "devicetype",
          label:'设备型号',
        },
        {
            value:'storagebatch',
            label:'入库批号'
        },
        {
            value:'stock',
            label:'仓库'
        },
        {
            value:'container',
            label:'货柜'
        }
      ],
      form:{
          content:''
      }
    };
  },
  methods:{
      query(){

      }
  }
};
</script>

