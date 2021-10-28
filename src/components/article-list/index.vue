<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId:article.art_id
      },
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" fit="cover" class="cover-img" />
        </div>
      </div>
      <div class="time">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "Article-item",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 0.38rem;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 3.5rem;
    height: 2.5rem;
    padding-left: 0.3rem;
  }
  .right-cover {
    width: 3.5rem;
    height: 2.5rem;
  }
  .time span {
    font-size: 0.2rem;
    color: #b4b4b4;
  }
  .cover-wrap {
    display: flex;
    padding: 0.4rem 0;
    .cover-item {
      flex: 1;
      height: 2.3rem;
      &:not(:last-child) {
        padding-right: 0.05rem;
      }

      .cover-img {
        width: 100%;
        height: 2.3rem;
      }
    }
  }
}
</style>