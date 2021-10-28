<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        show-action
        @focus="isResult = false"
      />
    </form>
    <!-- 搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isREsult" :search-text="searchText"></search-result>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <search-jianyi
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    >
    </search-jianyi>
    <!-- 联想建议 -->

    <!-- 历史记录 -->
    <search-lishi v-else></search-lishi>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import searchJianyi from "./components/search-jianyi.vue";
import SearchLishi from "./components/search-lishi.vue";
import SearchResult from "./components/search-result.vue";
export default {
  name: "search",
  components: {
    searchJianyi,
    SearchLishi,
    SearchResult,
  },
  data() {
    return {
      searchText: "",
      isREsult: false, //控制搜索结果的状态
    };
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      this.isREsult = true;
    },
  },
};
</script>

<style>
</style>