<template>
  <div id="app">
    <router-view />
    <h1>头条</h1>
    <div>
      <i class="toutiao icon-wode"></i>
      <van-button loading type="info" loading-text="Loading..." />
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="less">
</style>
