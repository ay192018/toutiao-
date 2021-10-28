<template>
  <div class="search-jianyi">
    <van-cell icon="search" v-for="(str, index) in suggestions" :key="index"
      @click="$emit('search',str)"><div slot="title" v-html="highlight(str)"></div
    ></van-cell>
  </div>
</template>

<script>
import { getsearchjianyi } from "@/Api/search.js";
import { debounce } from "lodash";

export default {
  name: "searchJianyi",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //聯想數據列表
      htmlstr: "hello<span style='color:red'>world</span>",
    };
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        //找到数据接口，请求获取数据
        const { data } = await getsearchjianyi(this.searchText);
        this.suggestions = data.data.options;
        // console.log(this.suggestions);
      }, 200),

      immediate: true,
    },
  },
  methods: {
    highlight(str) {
      return str.replace(
        new RegExp(this.searchText, "gi"),
        `<span style='color:#ff6700'>${this.searchText}</span>`
      );
    },
  },
};
</script>

<style>
</style>