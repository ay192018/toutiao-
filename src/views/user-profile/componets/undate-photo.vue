<template>
  <div class="undate-photo">
      <img :src="image">
      <van-nav-bar 
      left-text="取消"
      right-text="确认"
      class="toolbar"
      @click-left="$emit('close')"
      @click-right="onConfirm"
      />
  </div>
</template>

<script>
import {changeuserphoto} from '@/Api/user.js'
export default {
    name:"undatephoto",
    props:{
        file:{
            required:true,
        },
 
    },
       data() {
    return {
        image:window.URL.createObjectURL(this.file)
    }
},
    methods:{
       async onConfirm(){//确认要做的事
        //    console.log(this.image);
           this.$toast.loading({
               message:'保存中',
               forbidClick:true
           })
           const fd =new FormData();
           fd.append("photo",this.file)
           await changeuserphoto(fd)
           this.$toast.success('保存成功')

        this.$emit('undate-photo',this.image)
        this.$emit("close")
    }
}
}
</script>

<style lang="less" scoped>
.toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>