<template>
  <div class="undate-gender">
  <van-picker
  title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    :default-index="defaultgender"
    @change="onGebderchange"
  />
  </div>
</template>

<script>
import {changeusername} from '@/Api/user.js';
export default {
    name:"undategender",
    data() {
      return {
         columns: ['男','女'],
         defaultgender:this.gender
      }
    },
    methods:{
      onGebderchange(picker,value,index) {
        this.defaultgender=index
      },
     async onConfirm(){
        // console.log('onConfirm');
          this.$toast.loading({
           message: "保存中",
           forbidClick:true
       })
            //请求提交更新用户昵称 
        await changeusername({
            gender:this.defaultgender
        })
        //更新成功 覆盖父组件的name 、
        this.$toast.success('保存成功')
        //关闭弹出层
        this.$emit("undate-gender",this.defaultgender)
      this.$emit('close')
    
      }
    },
    props:{
      gender:{
        type:[Number],
        required: true,
      }
    }
}
</script>

<style>

</style>