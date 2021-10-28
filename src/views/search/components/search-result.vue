<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getsearchresult } from "@/Api/search.js";
export default {
  name: "searchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //页码
      perpage: 10, //每页大小
    };
  },
  methods: {
    async onLoad() {
      //请求获取数据
      //将数据放到数据列表中
      //关闭本次的loading
      const { data } = await getsearchresult({
        page: this.page,
        per_page: this.perpage,
        q: this.searchText,
      });
      
      const { results } = data.data;

      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 1rem;
  bottom: 0;
  overflow-y: auto;
}
</style>