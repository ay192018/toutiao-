<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 标签导航栏 -->
    <van-tabbar v-model="active" class="layout-tabbar" router>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/wenda">
        <i slot="icon" class="toutiao icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao icon-wode"></i>
        <span class="text">{{ $store.state ? "我的" : " 未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layoutIndex",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 0.46rem;
    }
    span.text {
      font-size: 0.35rem;
    }
  }
}
</style>