<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >
        搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="tabs">
      <van-tab
        :title="channels.name"
        v-for="channels in userchannels"
        :key="channels.id"
      >
        <!-- 文章列表 -->

        <Articlelist :channels="channels" />
      </van-tab>
      <div slot="nav-right" class="hanbao-btn" @click="isChannelout">
        <i class="toutiao icon-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannel"
      position="bottom"
      class="channrl-edit"
      close-icon-position="top-left"
      closeable
      get-container="body"
      style="height: 100%"
    >
      <channrledit
        :channels="userchannels"
        @close="isChannel = false"
        :active="active"
        @update-active="onupdateactive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getuserchannels } from "@/Api/user.js";
import channrledit from "@/views/home/components/channrl-edit.vue";
import Articlelist from "./components/article.vue";
export default {
  components: {
    Articlelist,
    channrledit,
  },
  name: "homeIndex",
  data() {
    return {
      active: 0, //被激活的标签
      userchannels: [],
      isChannel: false, //控制频道编辑编辑状态
    };
  },
  created() {
    this.loadchannels();
  },
  methods: {
    async loadchannels() {
      const { data } = await getuserchannels();
      this.userchannels = data.data.channels;
      // console.log(data);
      try {
      } catch (err) {
        this.$toast("获取频道数据失败");
      }
    },
    isChannelout() {
      this.isChannel = true;
    },
    onupdateactive(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  .search-btn {
    width: 6rem;
    height: 1rem;
    background: #5babfb;
    border: none;
  }
  /deep/ .tabs {
    .van-tabs__wrap {
      height: 1rem;
      position: fixed;
      z-index: 1;
      top: 1.2rem;
      left: 0;
      right: 0;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 2.7rem;
      font-size: 0.38rem;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      width: 0.6rem !important;
      background: #3296fa;
    }
    .hanbao-btn {
      position: fixed;
      right: 0.5rem;
      top: 1.3rem;
    }
  }
  .channrl-edit {
    height: 100%;
  }
}
</style>