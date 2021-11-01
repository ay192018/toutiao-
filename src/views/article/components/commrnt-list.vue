<template>
  <div comment-list>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content"
      /> -->
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import { getcomments } from "@/Api/comment.js";
export default {
  components: {
    CommentItem,
  },
  name: "CommentList",
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    //获取文章评论获取字符a
    //获取评论回复 获取字符c
    type:{
      type:String,
      default:"a"
    },
    List:{
      type:Array,
      //引用类型或者对象的默认值必须通过函数返回
      default:()=>{
        []
      }

    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页的数据页码
      limit: 10, //每页大小
    };
  },
  methods: {
    async onLoad() {
      //请求获取数据
      const { data } = await getcomments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit,
      });
      this.$emit('update-toral-count',data.data.total_count)
      //把数据放到列表中
      const { results } = data.data;
      this.list.push(...results);
      //讲本次的loading关闭
      this.loading = false;
      if (results.length) {
        //判断是否还有数据
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style>
</style>