<template>
  <div class="article-container">
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      @click-left="$router.back()"
      left-arrow
    />
    <h1 class="title">{{ article.title }}</h1>
    <van-cell center class="user-info">
      <div slot="title">{{ article.aut_name }}</div>
      <van-image
        slot="icon"
        class="avater"
        fit="cover"
        round
        :src="article.aut_photo"
      />
      <div slot="label" class="pubdate">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        round
        size="small"
        :type="article.is_followed ? '' : 'info'"
        class="follow-btn"
        :icon="article.is_followed ? '' : 'plus'"
        >{{ article.is_followed ? "已关注" : "关注" }}</van-button
      >
    </van-cell>
    <div class="content markdown-body" v-html="article.content"></div>
  </div>
</template>

<script>
//在组件中，获取动态路由参数
//方式1 this.$route.parms.xxx
//方式2 props 传参
import { getarticlebyId } from "@/Api/article.js";
import "./github-markdown.css";
export default {
  name: "ArticleIndex",
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      const { data } = await getarticlebyId(this.articleId);
      this.article = data.data;
      //   console.log(data);
    },
  },
  data() {
    return {
      article: {}, //文章数据对象
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 0.45rem;
  color: #3a3a3a;
  padding: 0.28rem;
}
.user-info {
  .avater {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.05rem;
  }
  font-size: 0.26rem;
  color: #333333;
  .pubdate {
    color: #b4b4b4;
    font-size: 0.2rem;
  }
  .follow-btn {
    width: 2rem;
  }
}
.markdown-body {
  padding: 0.28rem;
  background: #fff;
}
</style>