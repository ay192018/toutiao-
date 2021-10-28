<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isFhLoading"
      @refresh="onRefresh"
      :success-text="pulltext"
      :success-duration="2000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <Articleitem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />

        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticles } from "@/Api/article.js";
import Articleitem from "@/components/article-list/index.vue";
export default {
  name: "articlelist",
  components: {
    Articleitem,
  },
  props: {
    channels: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], //存储列表数据
      loading: false,
      finished: false,
      timestamp: null, //请求下一页的时间戳
      error: false, //控制请求失败的
      isFhLoading: false, //控制下拉刷新的loading状态
      pulltext: "",
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getarticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now(),
        });
        // if (Math.random() > 0.5) {
        //   JSON.parse("asdasdsadasdas");
        // }

        // console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
          //更新获取下一页数据的时间戳
        } else {
          //没有数据了，讲finished设置为true
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败", err);
        this.$toast("请求失败了");
        this.error = true;
        this.loading = false;
      }
    },
    //当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      this.isFhLoading = false;
      try {
        //请求获取数据
        //将数据追加到了列表的顶部
        //关闭下拉刷新的loading状态
        const { data } = await getarticles({
          channel_id: this.channels.id,
          timestamp: Date.now(),
        });
        // if (Math.random() > 0.2) {
        //   JSON.parse("asdasdsadasdas");
        // }
        const { results } = data.data;
        this.list.shift(...results);
        this.$toast(`刷新成功,更新了${results.length}条数据`);
        this.pulltext = "刷新成功";
        this.isFhLoading = false;
      } catch (err) {
        this.pulltext = "刷新失败";
        this.isFhLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>