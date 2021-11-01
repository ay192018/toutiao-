<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      :src="comment.aut_photo"
      fit="cover"
    />
    <div slot="title">
      <div class="title-warp">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap">
          <van-icon name="good-job-o" size="mini" class="like-icon" />
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdate">{{ comment.pubdate | datetime }}</span>
        <van-button round size="mini" class="reply-btn" @click="$emit('reply-click',comment)"
          >{{ comment.reply_count }} 回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "commentitem",
  props: {
    comment: {
      type: Object,
      required: true,

    },
  },
};
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
  }
  .name {
    font-size: 0.4rem;
    color: #406599;
  }
  .content {
    font-size: 0.3rem;
    color: #222222;
  }
  .pubdate {
    font-size: 0.1rem;
    margin-right: 0.2rem;
  }
  .title-warp {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .like-wrap {
    font-size: 0.48rem;
  }
}
</style>