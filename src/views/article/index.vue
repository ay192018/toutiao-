<template>
  <div class="article-container">
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      @click-left="$router.back()"
      left-arrow
    />
    <div class="article-wrap">
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
          :loading="inFollowloding"
          @click="onFollow"
          >{{ article.is_followed ? "已关注" : "关注" }}
        </van-button>
      </van-cell>
      <div
        class="content markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>

      <!-- 文章评论列表 -->

      <CommentList 
      :source="articleId"
      :List="commentList"
      @update-toral-count="toral=$event"
      @reply-click="onReplyclick"
      ></CommentList>
    </div>

    <!-- 底部区域 -->
    <div class="article-button">
      <van-button
       class="comment-btn" 
       type="default" 
       round 
       size="small"
      @click="ispostshoow=true"
        >写评论</van-button
      >
      <van-icon
        class="button"
        name="comment-o"
        :info="toral"
        color="#777"
      ></van-icon>
      <van-icon
        class="button"
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="oncollected"
      ></van-icon>
      <van-icon
        class="button"
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      ></van-icon>
      <van-icon class="button" name="share" color="#77777"></van-icon>
    </div>
    <!-- 发布评论 -->
    <van-popup 
    v-model="ispostshoow" 
    position="bottom"> 
    <PostComment 
    :target="articleId"
    @post-success="onPostSuccess"
    ></PostComment>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup position="bottom" v-model="isReplyshow">
      <Commentreply 
      v-if="isReplyshow" 
      :comment="Replycomment" 
      :article-id="articleId" 
      @close="isReplyshow=false">
      </Commentreply>
    </van-popup>
  </div>
</template>

<script>
//在组件中，获取动态路由参数
//方式1 this.$route.parms.xxx
//方式2 props 传参
import Commentreply from './components/comment-reply.vue'
import PostComment from './components/post-comment.vue'
import { ImagePreview } from "vant";
import {
  getarticlebyId,
  deletecollect,
  addcollect,
  addLike,
  deleteLike,
} from "@/Api/article.js";
import { addFollow, deleteFollow } from "@/Api/user.js";
import "./github-markdown.css";
import CommentList from "./components/commrnt-list.vue";
export default {
  components: {
    CommentList,
    PostComment,
    Commentreply
  },
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
      // console.log(data);
      this.$nextTick(() => {
        this.handlePerviewImge();
      });
    },
    handlePerviewImge() {
      const articleContent = this.$refs["article-content"];

      const imgs = articleContent.querySelectorAll("img");
      // console.log(imgs.src);
      // console.log(this.article);
      const imgPath = [];
      imgs.forEach((img, index) => {
        imgPath.push(img.src);
        img.addEventListener("click", () => {
          ImagePreview({
            images: imgPath,

            startPosition: index,
          });
        });
      });
    },
    async onFollow() {
      this.inFollowloding = true;
      if (this.article.attitude === 1) {
        //已关注 取消关注
        await deleteFollow(this.article.aut_id);
      } else {
        //没有关注，添加关注
        await addFollow(this.article.aut_id);
      }
      this.article.is_followed = !this.article.is_followed;
      this.inFollowloding = false;
      this.$toast.success(`${this.article.is_followed ? "" : "取消"}关注成功`);
    },
    async oncollected() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });
      this.incollectloding = true;
      if (this.article.is_collected) {
        //已收藏，取消收藏
        await  deletecollect(this.articleId);
      } else {
        //没有收藏，添加收藏
        await addcollect(this.articleId);
      }
      this.article.is_collected = !this.article.is_collected;
      this.incollectloding = false;
      this.$toast.success(`${this.article.is_collected ? "" : "取消"}收藏成功`);
    },
    async onLike() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });
      // console.log(this.article.attitude);
      if (this.article.attitude === 1) {
        //已点赞，取消点赞
        await deleteLike(this.articleId);
        this.article.attitude = -1;
      } else {
        //没有点赞，添加点赞
        await addLike(this.articleId);
        this.article.attitude = 1;
      }
      this.$toast.success(
        `${this.article.attitude === 1 ? "" : "取消"}点赞成功`
      );
    },
    onPostSuccess(comment) {
        // console.log(comment);
        //评论数据对象放到评论列表顶部
        //关闭发布评论弹出层
        this.toral++
        this.commentList.unshift(comment)
        this.ispostshoow=false
    },
    onReplyclick(comment){
      // console.log('onReplyclick',comment);
      this.Replycomment=comment
      //展示回复内容
      this.isReplyshow=true
    }
  },
  data() {
    return {
      article: {}, //文章数据对象
      inFollowloding: false, //关注用户的loading状态
      incollectloding: false, //收藏的状态
      ispostshoow:false,//评论弹出层默认隐藏
      commentList:[],//文章评论列表
      toral:0,//评论总数量
      isReplyshow:false,//控制评论回复的显示状态
      Replycomment:{}
    };
  },
};
</script>

<style lang="less" scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0.6rem;
  bottom: 0.8rem;
  overflow-y: auto;
}
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
.article-button {
  background: #ffff;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  .comment-btn {
    width: 40%;
  }
  .button {
    text-align: center;
    flex: 1;
  
  }
}
</style>