<template>
  <div class="post-comment">
  <van-field
  v-model="message"
  autosize
  label="留言"
  maxlength="100"
  type="textarea"
  placeholder="请输入留言"
/>
<van-button size="small" @click="onpost" :disabled='!message' >发布</van-button>
  </div>
</template>

<script>
import { addcomment } from "@/Api/comment.js";
export default {
  props: {
    target: {
      type:[Number,Object,String],
      required:true,
    },
    articleId:{
      type:[String,Object,String],
      required:false,
    }
  },
    name:"PostComment",
data() {
    return {
      message:''//输入框内容
    }
    
  },
  methods: {
    async onpost(){
      this.$toast.loading({
        message:'发布中',
        forbidClick:true
      })
      //找到数据接口 
      const {data}=await addcomment({
        target:this.target.toString(),
        content:this.message,
        art_id:this.articleId? this.articleId.toString():null,
      })
      this.$emit("post-success",data.data.new_obj)
      this.$toast.success('发布成功')
      this.message=""
      //封装请求方法
      //请求提交数据
    }
  }
};

</script>

<style lang="less" scoped>
.post-comment{
  padding:0.4rem;
  display: flex;
  align-items: center;
}
</style>