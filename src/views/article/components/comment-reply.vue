<template>
  <div class="comment-reply">
      <!-- 头部信息 -->
      <van-nav-bar :title="`${comment.reply_count}条回复`">
          <van-icon n
          ame="cross" 
          slot="left"
           @click="$emit('close')"></van-icon>
      </van-nav-bar>
      <!-- 当前评论项 -->
      <commentitem 
      :comment="comment"       
    ></commentitem>

<!-- 评论的内置评论 -->
  <van-cell title="所有回复"/>
      <CommentList 
      :source="comment.com_id"               
      type="c"
      :List="commentList"
      />
      <div class="article-button">
      <van-button
       class="comment-btn" 
       type="default" 
       round 
       size="small"
      @click="ispostshoow=true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论 -->
    <!-- 评论回复 -->
    <van-popup 
    position="bottom" 
    v-model="ispostshoow">
    <PostComment
     :target="comment.com_id"
     :article-id="articleId"
     @post-succes="onPostSuccess"
    ></PostComment>
    </van-popup>
  </div>
</template>

<script>
import PostComment from './post-comment.vue'
import CommentList from './commrnt-list.vue'
import commentitem from './comment-item.vue'
export default {
    name:"Commentreply",
    components: {
        commentitem,
        CommentList,
        PostComment
    },
    props: {
        comment:{
            type:Object,
            required:true,
        },
        articleId:{
            type:[Number,String,Object],
            required:true,
        }
    },
    data() {
        return {
            ispostshoow:false,
            commentList:[]//评论的评论列表
        }
    },
    methods: {
        onPostSuccess(comment){
            this.commentList.nushift(comment)
            //将发布成功的评论放到评论列表的顶部
            //更新评论的回复数量
            this.comment.reply_count++
            this.ispostshoow=false
        }
    }
}
</script>

<style lang="less"scoped>
   .article-button {
  background: #ffff;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  .comment-btn {
    width: 100%;
  }
   }
</style>