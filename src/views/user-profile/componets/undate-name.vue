<template>
  <div class="undate-name">
    <van-nav-bar 
    left-text="返回"
    right-text="完成"
    @click-right="onConfrm"
    @click-left="$emit('close')"
      title="更新昵称"
 />
 <div class="name-wrap">
 <van-field
  v-model="nameValue"
  rows="2"
  autosize
  type="textarea"
  maxlength="10"
  placeholder="请输入要修改的昵称"
  show-word-limit
/>
</div>
  </div>
</template>

<script>
import {changeusername} from '@/Api/user.js';
export default {
name:"Undatename",
methods:{
   async onConfrm(){
       this.$toast.loading({
           message: "保存中",
           forbidClick:true
       })
     try {
            //请求提交更新用户昵称 
        await changeusername({
            name:this.nameValue
        })
        //更新成功 覆盖父组件的name 、
        this.$toast.success('保存成功')
        //关闭弹出层
        this.$emit("undate-name",this.nameValue)
      this.$emit('close')
     } catch (err) {
       if(err&&err.response&&err.status===409){
           this.$toast.fail("昵称已经存在")
       }
     }
    },
},
data() {
    return {
        nameValue:this.userId,
    }
},
props: {
    userId:{
        type:[String],
        required:true,
    }
}
}
</script>

<style lang="less" scoped>
    .name-wrap{
        padding:.125rem
    }
</style>