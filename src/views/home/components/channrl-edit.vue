<template>
  <div class="channrl-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="small "
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in channels"
        :key="index"
        :text="item.name"
        :class="{ active: index === active }"
        class="grid-item"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        @click="onuserchannelclick(index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="items in recommandchannnels"
        :key="items.id"
        :text="items.name"
        class="grid-item"
        @click="onAdd(items, isEdit)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllchannels,
  adduserchannel,
  deleteuserchannel,
} from "@/Api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/Utils/starage.js";
export default {
  name: "channrl-edit",
  data() {
    return {
      allchannels: [], //所有频道数据
      isEdit: false, //控制编辑显示状态
    };
  },
  props: {
    channels: {
      //推荐频道数据
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.loadallchannels();
    this.$emit("share", this.isEdit);
  },
  methods: {
    async loadallchannels() {
      try {
        const { data } = await getAllchannels();
        // console.log(data);
        this.allchannels = data.data.channels;
        // console.log(this.allchannels);
      } catch (error) {
        this.$toast("获取频道列表失败", error);
      }
    },
    async onAdd(items, isEdit) {
      if (isEdit) {
        this.channels.push(items);
      }
      if (this.user) {
        await adduserchannel({
          channels: [{ id: items.id, seq: this.channels.length }],
        });
        //登录状态
      } else {
        setItem("userchannels", this.channels);
      }
      //数据持久化
    },
    onuserchannelclick(index) {
      if (this.isEdit && index !== 0) {
        this.deletechannel(index);
      } else {
        this.switchchannel(index);
      }
    },
    async deletechannel(index) {
      // console.log("删除频道");
      if (index <= this.active) {
        this.$emit("update-active", this.active - 1);
      }
      this.channels.splice(index, 1);
    },
    switchchannel(index) {
      // console.log("切换频道");
      //关闭弹出层
      this.$emit("close");
      this.$emit("update-active", index);
    },
  },
  computed: {
    ...mapState(["user"]),
    //推荐频道列表
    recommandchannnels() {
      return this.allchannels.filter((allchannels) => {
        return !this.channels.find((channels) => {
          //找到满足该条件的元素
          return channels.id === allchannels.id;
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.channrl-edit {
  padding-top: 1.3rem;
  .title {
    color: #333333;
  }
  .grid-item {
    height: 1rem;
    /deep/ .van-grid-item__content {
      background: #f4f5f6;
      .van-grid-item__text {
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -0.1rem;
      top: -0.1rem;
      font-size: 0.45rem;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: #ff6700 !important;
    }
  }
}
</style>